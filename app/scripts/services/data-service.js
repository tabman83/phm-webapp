angular.module('PhmWebApp').service('dataService', function($http, $log, $rootScope, settings) {
    'use strict';

    var sensorProtocolDefinitionUrl = 'https://raw.githubusercontent.com/tabman83/phm-messages/master/sensor-message.proto';

    var mqttClient = null;

    return {
        sendBoolean: function(location, value) {
            if(mqttClient) {
                var topic = 'phm/actuators';
                mqttClient.publish(topic, value ? 'ON': 'OFF');
            } else {
                $log.error('MQTT client not initialized.');
            }
        },
        initialize: function() {
            return $http.get(sensorProtocolDefinitionUrl).then(function(result) {
                var builder = dcodeIO.ProtoBuf.loadProto(result.data);
                if(!builder) {
                    $log.error('Error while decoding protobuf definition file.');
                    return false;
                } else {
                    var SensorMessage = builder.build('SensorMessage');
                    if(typeof mqtt === 'undefined') {
                        console.error('Cannot load \'mqtt.js\'. Cannot contact MQTT server.');
                        return false;
                    } else {
                        console.log('Connection to MQTT broker established.');
                        var mqttUrl = 'mqtt://' + settings.MQTT_HOSTNAME + ':' + settings.MQTT_PORT;
                        mqttClient = mqtt.connect(mqttUrl, {
                            username: settings.MQTT_USERNAME,
                            password: settings.MQTT_PASSWORD
                        });
                        mqttClient.subscribe([settings.MQTT_SENSORS_QUEUE, settings.MQTT_ACTUATORS_QUEUE]);
                        mqttClient.on('message', function(topic, payload) {
                            if(topic === settings.MQTT_SENSORS_QUEUE) {
                                var sensorMessage = SensorMessage.decode(payload);
                                $rootScope.$emit('sensor', sensorMessage);
                                var date = new Date(+sensorMessage.timestamp.toString());
                                $log.log(date, sensorMessage);
                            }

                            if(topic === settings.MQTT_ACTUATORS_QUEUE) {
                                $rootScope.$emit('actuator', (payload.toString() === 'ON'));
                            }
                        });
                        return true;
                    }
                }
            }).catch(function() {
                $log.error('Cannot download \'sensor-message.proto\'.');
            });
        }
    };

});
