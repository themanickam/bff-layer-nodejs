'use strict';
module.exports = (app) => {
    //Registering backend-flow
    var backendFlow = require('../bff-flows/backend-flow');
    app.route('/backend').get(backendFlow.execute);
    console.log('/backend - URI registered succefully');
};