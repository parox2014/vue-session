# dwy-cache
a javascript data cache plugin,implements 3 cache strategies:FIFO,LRU and LFU

插件已经实现了三种缓存过期策略，可以根据项目需求选用合适的策略

##### FIFO：First In First Out，先进先出
##### LRU：Least Recently Used，最近最少使用
##### LFU：Least Frequently Used，最不经常使用

###安装

```
$ npm install dwy-cache --save
```
###引入

##### script

```html
<script src="../node_modules/dwy-cache/dist/dwy-cache.js"></script>
//引入后，会暴露全局变量dwyCache
//然后可以通过dwyCache访问
//CacheList/FIFOStrategy/LRUStrategy/LFUStrategy等成员
```

##### es2015

```js
  import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'
```

##### cmd

```js
  var dwyCache=require('dwy-cache');
```

###使用

####
```js
import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'

var fifoStrategy=new FIFOStrategy();
var lruStrategy=new LRUStrategy();
var lfuStrategy=new LFUStrategy();

//创建缓存列表
var cacheList=new CacheList({
  strategy:fifoStrategy,//缓存策略
  max:100,//最大缓存数目，当缓存超过此数，会根据淘汰策略删除缓存
  expire:3000//缓存过期时间,单位毫秒
});

//实例化时，可以不传入strategy
//通过cacheList.use使用策略
//在切换策略时，如果已经存入了缓存数据
//则会重置所有缓存数据的使用时间与引用计数
cacheList.use(lruStrategy);
cacheList.use(lfuStrategy);

//设置最大缓存数
//注意：如果之前已经有缓存数据
//并且新设置的缓存数比之前的小
//则会将超出的缓存数丢弃
//例如：之前缓存数是10，并且已经存入了10条
//如果新设置的缓存数为8，则会移除队列头部的两条数据
cacheList.setMax(100);


//将数据放入缓存列表
//在存入数据前，必须先设置缓存策略，否则会报错
cacheList.put('cacheName','data',3000);

//根据名称取出缓存
var cacheData=cacheList.get('cacheName');

//清空缓存
cacheList.clear();

//获取缓存数目
cacheList.getLength();
```

###示例

```js
import {CacheList ,LFUStrategy} from 'dwy-cache'
import {Http,URLSearchParams} from 'http'

var cacheList=new CacheList({
  strategy:new LFUStrategy(),
  max:100,
  expire:1000*60*60
});

export class TodoService{

  static todoListURL='/todos';
  
  static query(params){

    var {todoListURL}=this;
    var cacheName=todoListURL+'?'+new URLSearchParams(params).toString();
    var data=cacheList.get(cacheName);
      
    if(data){
      return Promise.resolve(data);
    }
      
    return Http.get(todoListURL,{data:params})
      .then(function(resp){
          
        cacheList.put(cacheName,resp.data);
        return resp.data;
      });
  }
}
```

### 测试

```
$ npm test
```