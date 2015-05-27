/*
 * Digital Sensor driver
 * http://www.playteka.com
 *
 * Copyright (c) 2013-2014 Playteka
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var Cylon = require("cylon");

var events = [
              /**
               * Emitted when the digital Sensor has fetched a new value
               *
               * @event digitalChange
               */
              "digitalChange"
              ];

/**
 * An Digital Sensor driver
 *
 * @constructor digital-sensor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number=} opts.upperLimit
 * @param {Number=} opts.lowerLimit
 */
var DigitalSensor = module.exports = function DigitalSensor(opts) {
    DigitalSensor.__super__.constructor.apply(this, arguments);
    
    this.digitalVal = null;
    
    if (this.pin == null) {
        throw new Error("No pin specified for Digital Sensor. Cannot proceed");
    }
    
    this.commands = {
    digital_read: this.digitalRead
    };
    
    this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(DigitalSensor, Cylon.Driver);

/**
 * Gets the current value from the Analog Sensor
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} the current sensor value
 * @publish
 */
DigitalSensor.prototype.digitalRead = function (callback) {
    var val = this.digitalVal;
    
    if (typeof callback === "function") {
        callback(null, val);
    }
    
    return val;
};


/**
 * Gets the current value from the Digital Sensor
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} the current sensor value
 * @publish
 */
DigitalSensor.prototype.digitalRead = function (callback) {
    var val = this.digitalVal;
    
    if (typeof callback === "function") {
        callback(null, val);
    }
    
    return val;
};

/**
 * Starts the Analog Sensor
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
DigitalSensor.prototype.start = function (callback) {
    this.connection.digitalRead(this.pin, function (err, readVal) {
                                this.digitalVal = readVal;
                                
                                this.previousVal = this.currentVal;
                                this.currentVal = readVal;
                                
                                if (this.currentVal != this.previousVal) {
                                this.emit("digitalChange", readVal);
                                }
                                }.bind(this));
    
    callback();
};
