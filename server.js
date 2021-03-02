var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./api/config/flow-routes');
var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); 
app.listen(port, () => {
    console.log('BFF layer service started on port', + port);
});