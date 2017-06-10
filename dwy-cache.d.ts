namespace dwyCache{
  
  class CacheModel{
    constructor(name:string,value:any,expire?:number);
    name:string;
    value:any;
    createdAt:number;
    usedAt:number;
    frequency:number;
    expire?:number;
    reset():this;
    increaseFrequency():this;
    updateUsedTime():this;
    isExpired():boolean;
  }
  
  interface Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  class FIFOStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  class LRUStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  class LFUStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  
  interface Option{
    max?:number;
    strategy?:Strategy;
    expire?:number;
  }
  
  class CacheList{
    private max:number;
    private strategy:Strategy;
    private expire?:number;
    private dataStore:CacheModel[];
    constructor(option?:Option);
    use(strategy:Strategy):any;
    put(name:string,value?:any,expire?:number):any;
    get(name:string):any;
    setMax(newMax:number):any;
    clear():any;
    getLast():CacheModel;
    getFirst():CacheModel;
    getLength():number;
    private remove(cache:CacheModel):any;
    private getItemIndex(cache:CacheModel):number;
  }
}