var express = require('express');

let openshift_uptimer = function(){
    let express_app,logger_enabled=false;

    let log_message = function(message){
        if(logger_enabled)  console.log(message);
    }

    this.auto_configure = function(){
        this.express_app = express();
        var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
        var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        this.express_app.listen(port, ipaddress, function(){
            log_message('[openshift_uptimer Express] Ready! IP='+ipaddress+', port='+port);
        });
        this.set_uptime_route('/uptime_route');
    }

    this.get_express = function(){
        return this.express_app;
    }

    this.set_express = function(app){
        this.express_app = app;
    }

    this.set_uptime_route = function(path){
        this.express_app.get(path, function(req,res){res.send('Uptime OK!')});
    }

    this.log = function(status){
        logger_enabled=status;
    }
}

module.exports = new openshift_uptimer();