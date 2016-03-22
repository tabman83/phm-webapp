angular.module('PhmWebApp').provider('DataService', function () {
    'use strict';

    var sensorProtocolDefinitionUrl = 'https://raw.githubusercontent.com/tabman83/phm-messages/master/sensor-message.proto';

    this.$get = function($http, $rootScope, settings) {

        function DataService() {
            var self = this;

            var mqttClient = null;

            var initialize = function() {
                $http.get(sensorProtocolDefinitionUrl).then(function(result) {
                    var builder = dcodeIO.ProtoBuf.loadProto(result.data);
                    if(!builder) {
                        console.error('Error while decoding protobuf definition file.');
                    } else {
                        var SensorMessage = builder.build('SensorMessage');

                        if(typeof mqtt === 'undefined') {
                            console.error('Cannot load \'mqtt.js\'. Cannot contact MQTT server.');
                        } else {
                            console.log('Connection to MQTT broker established.');
                            var mqttUrl = 'mqtt://' + settings.MQTT_HOSTNAME + ':' + settings.MQTT_PORT;
                            mqttClient = mqtt.connect(mqttUrl, {
                                username: settings.MQTT_USERNAME,
                                password: settings.MQTT_PASSWORD
                            });
                            mqttClient.subscribe(settings.MQTT_SENSORS_QUEUE);
                            mqttClient.on('message', function(topic, payload) {
                                if(topic === 'phm/sensors') {
                                    var sensorMessage = SensorMessage.decode(payload);
                                    $rootScope.$emit('sensor', sensorMessage);
                                    //var date = new Date(+sensorMessage.timestamp.toString());
                                    //console.log(date, sensorMessage);
                                } else {
                                    console.log(topic, payload);
                                }
                            });
                        }

                    }
                }).catch(function() {
                    console.error('Cannot download \'sensor-message.proto\'.');
                });

            };

            this.sendBoolean = function(location, value) {
                if(mqttClient) {
                    var topic = 'phm/actuators';
                    mqttClient.publish(topic, 'H');
                } else {
                    console.error('MQTT client not initialized.');
                }
            };

            this.apiCall = function() {
            };

            initialize();

        }

        return new DataService();
    };
});
