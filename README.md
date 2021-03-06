# VueSession
### A vue front-end session plugin


### Install

```
$ npm install dwy-vue-session --save
```
### Import

##### script

```html
<script src="../node_modules/vue-session/dist/vue-session.js"></script>

```

##### es2015

```js
  import Session from 'dwy-vue-session'
```

##### cmd

```js
  var VueSession=require('dwy-vue-session');
```

### Usage

####
```js
import VueSession from 'dwy-vue-session'

//in main.js,mount Session's instance to Vue's prototype via Vue.use
//then you can access session via every Vue's instance
Vue.use(Session);

//when signedin,
//call instance method regenerate to generate session;
this.$session.regenerate(token);


//judge signin state
if(this.$session.signedin){
  //do something
}

//when signout,call method destroy to destroy the session;
this.$session.destroy();
```

### Example

1. main.js
```js
import Vue from 'vue'
import VueSession from 'dwy-vue-session'

Vue.use(VueSession,{
  maxAge:1000*60*60*24,
  prefix:'app'
});
```
2. signin.vue

```vue
<script>
  import AuthService from '../auth.service'
  
  export default{
    data(){
      return {
        username:'',
        password:''
      }
    },
    method:{
      onSubmit(){
        let {username,password}=this;
        AuthService.signin(username,password)
        .then(token=>{
          this.$session.regenerate(token);
        });
      }
    }
  }
</script>
```
3. profile.vue
```vue
<script>
  import VueSession from 'dwy-vue-session'
  import AuthService from '../auth.service'
  export default{
      data(){
        return {
          profile:null
        }
      },
      beforeRouteEnter(to,from,next){
        //in beforeRouteEnter hook
        //we can not access `this`
        //but can access session via Session's static method `getInstance`
        let session=VueSession.getInstance();
        if(session.signedin){
          return next();
        }
        next('/signin');
      },
      methods:{
        onSignoutButtonClick(){
          AuthService.signout()
            .then(()=>{
              this.$session.destroy();
              this.$router.push('/signin');
            });
        }
      }
    }
</script>
```
### API
  #### constructor params;
  1. `maxAge` session expire time ,default:`7200000ms`.
  2. `prefix` localstorage key prefix,default:`vue-session`.
  
  #### instance
  1. `token` property,readonly;
  2. `createAt` property,readonly;
  3. `signedin` property,readonly;
  4. `regenerate` method,call it to generate session;
  5. `destroy` method,call it to destroy session;

### Test
```
$ npm test
```