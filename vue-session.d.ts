declare module VueSession{
  
  interface GetInstance{
    (maxAge?:number,prefix?:string):Session
  }
  
  export const getInstance:GetInstance;
  
  export class Session {
    constructor(maxAge?:number,prefix?:string);
    private __token__:string;
    private __createAt__:number;
    private __storage__:any;
    private __maxAge__:number;
    private __prefix__:string;
    
    public tokenKey:string;
    public createTimeKey:string;
    public token:string;
    public createAt:string;
    public signedin:boolean;
    
    regenerate(token:string):void;
    destroy():void;
    static getInstance:GetInstance;
    static install(Vue:any,{maxAge,prefix}:{maxAge:number;prefix:string;}):void;
  }
}