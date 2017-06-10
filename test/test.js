var VueSession=require('../dist/vue-session');
var assert=require('assert');

var localstorage={
  setItem:function (key,value) {
    this[key]=value;
  },
  getItem:function (key) {
    return this[key];
  },
  removeItem:function (key) {
    delete this[key];
  }
};

var session=new VueSession.Session(10000,'test',localstorage);

describe('Session',function () {
  
  describe('new Session',function () {
    
    it('session maxAge should eq "10000"',function () {
      assert.equal(session.__maxAge__,10000);
    });
  
    it('session prefix should eq "test"',function () {
      assert.equal(session.__prefix__,'test');
    });
  
    it('session signedin should eq "false"',function () {
      assert.equal(session.signedin,false);
    });
    
    describe('Session#regenerate',function () {
    
      it('call generate method, token should eq "thisisatesttoken"',function () {
        
        session.regenerate('thisisatesttoken');
        assert.equal(session.token,'thisisatesttoken');
      });
  
      it('signedin property should eq "true"',function () {
        assert.equal(session.signedin,true);
      });
    });
  
    describe('Session#destroy',function () {
  
      
      it('call destroy method,will destroy the session,the token property should eq "null" ',function () {
        session.destroy();
        assert.equal(session.token,null);
      });
      it('the createAt property should eq "null"',function () {
        assert.equal(session.createAt,null);
      });
      it('the signedin property should eq "false" ',function () {
        assert.equal(session.signedin,false);
      });
    });
    
  });
  
});
