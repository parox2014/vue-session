let session=null;

let PREFIX='vue-session';
let TOKEN_KEY='token';
let CREATE_TIME_KEY='create-time';

export function getInstance(maxAge,prefix){
  return session?session:new Session(maxAge,prefix);
}


export class Session{
  
  constructor(maxAge=7200000,prefix=PREFIX,storage=localStorage){
    
    if(session&&session instanceof Session)return session;
    
    this.__maxAge__=maxAge;
    this.__prefix__=prefix;
    this.__storage__=storage;
    this.__token__=null;
    this.__createAt__=null;
    session=this;
  }
  
  get tokenKey(){
    return `${this.__prefix__}-${TOKEN_KEY}`;
  }
  
  get createTimeKey(){
    return `${this.__prefix__}-${CREATE_TIME_KEY}`;
  }
  
  get token(){
    return this.__token__;
  }
  
  get createAt(){
    return this.__createAt__;
  }
  
  get maxAge(){
    return this.__maxAge__;
  }
  
  get signedin(){
    let {token,maxAge,createAt}=this;
    let now=Date.now();
    return !!token&&!!createAt&&(now-createAt<maxAge);
  }
  
  regenerate(token){
    let storage=this.__storage__;
    let createAt=Date.now();
    this.__token__=token;
    this.__createAt__=createAt;
    
    storage.setItem(this.tokenKey,token);
    storage.setItem(this.createTimeKey,createAt);
  }
  
  destroy(){
    let {__storage__,tokenKey,createTimeKey}=this;
    this.__token__=null;
    this.__createAt__=null;
    __storage__.removeItem(tokenKey);
    __storage__.removeItem(createTimeKey);
  }
  static getInstance=getInstance;
  static install(Vue,{maxAge,prefix}={}){
    
    new Session(maxAge,prefix);
    
    Object.defineProperty(Vue.prototype,'$session',{
      value:session,
      writable:false,
      configurable:false,
      enumerable:false
    });
    
  }
}


export default Session;