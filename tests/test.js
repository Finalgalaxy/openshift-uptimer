var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var openshift=require('../openshift_uptimer');
openshift.auto_configure();

describe('OpenShift Uptimer', function() {
  it('should GET the HTTP endpoint /uptime_route', function(done){
      chai.request(openshift.get_express())
        .get('/uptime_route')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });
  });
});