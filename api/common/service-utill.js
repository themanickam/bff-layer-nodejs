'use strict';

var https = require('https');
var http = require('http');
const { Console } = require('console');

exports.httpsget = (hostname, uri, headers, req, res, callback) => {
    console.log("Calling service : " + uri);
    https.get({
        hostname: hostname,
        path: uri,
        headers: headers
    }, res => {
        var data = '';
        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response ended: ');
            callback(null, JSON.parse(data));
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
}

exports.httpget = (hostname, uri, headers, req, res, callback) => {
    console.log("Calling service : " + hostname + uri);
    var req = http.request({
        host: hostname,
        path: uri,
        headers: headers
    }, res => {
        var data = '';
        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response ended: ');
            callback(null, JSON.parse(data));
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
    req.end();
}