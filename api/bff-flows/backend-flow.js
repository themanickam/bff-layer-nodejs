'use strict';

var async = require('async');
var https = require('https');
var serviceUtill = require('../common/service-utill');

const hostname = "ebae18d0-aa21-4b88-8f41-ef2aed650029.mock.pstmn.io";
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEUEUiLCJzdWIiOiJCMkJDWiIsImp0aSI6IjM4Yjc1MDllLTk0MWYtNDdkMS04MGNhLThkNGY4NzA4YWFlMSIsImZsZWV0bWFuYWdlcmlkIjoiNjM1OTgiLCJtYW5hZ2VkQWNjb3VudHMiOlsiNS4xNjA2OSJdLCJyb2xlcyI6WyIiXSwicGFyYW1zIjpbInRvcEJzY3NJZDpOUzR4TmpBMk9RPT0iXSwibGFuZ3VhZ2UiOiJmciIsImNvdW50IjowLCJpYXQiOjE1ODUzMzA1OTcsImV4cCI6MjAwMDAwMDAwMH0.HnIrcX7ReWpdY4T5GFizcwEqLZMSE_2YdwhfpotP_e6-CBow5TSYzQ5lbPsUwarb2TkQ9V5grIC85SwpIsMDCzEczWQXnp2s-bmrddtWUhcY3RHPGzTgozFfJQXWoQ5R3OAzQjyRYZXljvaiCAg2pLXzw5G6sKn9WScUJHzQqiwRu9CEYlDi_i7tmSlOwTTYnwlyF3WMNNRhWuqGnDMA-zI9ulve7Y1Ddau6nOKYUyuWLsU3n3QazVQqoSOYNpo1IChaJpKQgMN1LhwBxIdCaqGGfvjx-pCxOLWjN_NhObCJbpMhQIjHL_HmCZG6WD5ouFmcdV_XzYiqSxz5qoAz1JNicxu4ubtLZsok41BBOy7Uj_Uuly69TRi1mXFmqfxwG2bZMoDzy3LO60Da6Yrl6pGbU4rHRjisUyAhPXPR5eA-2KpQPgKvtG3PIpso6m6Fp_X1YkxJfSXrcEwSDme20RCecvbNhlcqLIDWR5xE4snJQH6knh2uHlFyILJ3DTt_kNs_8BHuvS-uYX-W_xL69mRaQh0N9fBkE4E4OroaNqiKa_0NVXpuMsTTSya2DAfLkWFMdiDynrisjgcUktIZcT9GCyl3D_OT4rJ-L_RP44GksSRW_QP2KeEJ3p5aoBllti7CviQNcB0y8g1JtBCs1EN2Wwnvd0KBgFtMqn99FHU";

exports.execute = (req, res) => {
    console.log('backend-flow is started...');
    async.parallel({
        backend1: (callback) => {
            serviceUtill.httpsget(hostname, '/backend1', { Authorization: 'Bearer ' + token }, req, res, callback)
        },
        backend2: (callback) => {
            serviceUtill.httpsget(hostname, '/backend2', { Authorization: 'Bearer ' + token }, req, res, callback)
        },
        backend3: (callback) => {
            serviceUtill.httpsget(hostname, '/backend3', { Authorization: 'Bearer ' + token }, req, res, callback)
        }
    }, function (err, results) {
        res.writeHead(200, { "Content-Type": "application/json" });
        var combinedResponse = new Object();
        // backend1 response processing
        console.log('/backend1 response...');
        console.log(results.backend1);
        combinedResponse.javaVersion = results.backend1.java.javaVersion;
        combinedResponse.operatingsystem = results.backend1.os;
        // backend2 response processing
        console.log('/backend2 response...');
        console.log(results.backend2);
        combinedResponse.freeMemory = results.backend2.freeMemory
        // backend3 response processing
        console.log('/backend3 response...');
        console.log(results.backend3);
        var date = new Object()
        date.dayOfMonth = results.backend3.timedata.dayOfMonth;
        date.hour = results.backend3.timedata.hour;
        date.minute = results.backend3.timedata.minute;
        date.month = results.backend3.timedata.month;
        date.second = results.backend3.timedata.second;
        date.year = results.backend3.timedata.year;
        combinedResponse.date = date;
        combinedResponse.process = results.backend3.processdata.process;
        res.end(JSON.stringify(combinedResponse));
    });
};

