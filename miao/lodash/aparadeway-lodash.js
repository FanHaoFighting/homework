aparadeway = function(){
  //自定义函数
  var custom = {};
  // 压缩稀疏数组，返回原数组
  custom.condenseArray = function(arr){
    for(let i = arr.length - 1;i >= 0;i--){
      if(arr[i] === null){
        arr.splice(i,1);
      }
    }
    return arr
  }
  var exports = {};
  exports.identity = function(value){
    return value
  }

  exports.keys = function(object){
    let arr = [];
    for(var i in object){
      if(object.hasOwnProperty(i)){
        arr.push(i);
      }
    }
    return arr
  }

  exports.isObject = function(value){
    return (value instanceof Object)
  }

  exports.isEqual = function(value,other){
    if(value === other || (value !== value && other !== other)){
      return true
    }
    if(Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)){
      return false
    }
    //判断引用类型
    if(exports.isObject(value) === true && exports.isObject(other) === true){
      let values = exports.keys(value);
      let others = exports.keys(other);
      let lengthOfValues = values.length;
      if(lengthOfValues !== others.length){
        return false
      }
      for(let i = 0;i < lengthOfValues;i++){
        if(value[values[i]] === value[values[i]] && value[values[i]] !== other[values[i]] && (!exports.isEqual(value[values[i]],other[values[i]]))){
          return false
        }
      }
      return true
    }
    else{
      return false
    }
  }
  exports.isMatch = function(object,source){
    if(exports.isEqual(object,source)){
      return true
    }
    let sources = exports.keys(source);
    let sizeOfSources = sources.length;
    for(let i = 0;i < sizeOfSources;i++){
      if(exports.isEqual(object[sources[i]],source[sources[i]])){
        continue;
      }
      else if(object[sources[i]] == undefined || object[sources[i]] !== source[sources[i]]){
        return false
      }
    }
    return true
  }
  exports.matches = function(source){
    return function (object){
      return exports.isMatch(object,source);
    }
  }
  exports.get = function(object,path,defaultValue){
    let arr;
    if(typeof path === 'string'){
      let reg = /\b\w+\b/g;
      arr = path.match(reg);
    }
    else if(Array.isArray(path)){
      arr = exports.flattenDeep(path);
    }
    let temp = object;
    for(let i = 0;i < arr.length;i++){
      if(temp[arr[i]] == undefined){
        return defaultValue
      }
      else{
        temp = temp[arr[i]];
      }
    }
    return temp
  }
  exports.property = function(path){
    return function (object){
      if(object == undefined){
        return
      }
      else{
        return exports.get(object,path)
      }
    }
  }
  exports.matchesProperty = function(path,srcValue){
    return function (object){
      if(object == undefined || object[path] == undefined){
        return false
      }
      else{
        if(exports.isEqual(object[path],srcValue)){
          return true
        }
        else{
          return false
        }
      }
    }
  }
  exports.sArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]')
  }
  exports.iteratee = function(func = exports.identity){
    if(Array.isArray(func)){
      return exports.matchesProperty(func[0],func[1])
    }
    else if(typeof func === 'function'){
      return func
    }
    else if(func instanceof Object){
      return exports.matches(func)
    }
    else if(typeof func === 'string'){
      return exports.property(func)
    }
  }
  exports.map = function(collection,ite = exports.identity){
    ite = exports.iteratee(ite);
    let res = [];
    if(Array.isArray(collection)){
      for(let i = 0;i < collection.length;i++){
        res.push(ite(collection[i],i,collection));
      }
    }
    else{
      for(let i in collection){
        if(collection.hasOwnProperty(i)){
          res.push(ite(collection[i],i,collection));
        }
      }
    }
    return res
  }
  exports.reduce = function(collection,ite = exports.identity,accumulator){
    let key = exports.keys(collection);
    let i = accumulator?0:1;
    accumulator = !accumulator?collection[key[0]]:accumulator;
    let res = accumulator?accumulator:collection[key[0]];
    for(i;i < key.length;i++){
      res = ite(res,collection[key[i]],key[i],collection);
    }
    return res
  }
  exports.filter = function(collection,predicate){
    if(!predicate){
      return collection
    }
    predicate = exports.iteratee(predicate);
    console.log(predicate)
    let arr = [];
    let key = exports.keys(collection);
    for(let i = 0;i < key.length;i++){
      if(predicate(collection[key[i]],key[i],collection)){
        arr.push(collection[key[i]]);
      }
    }
    return arr
  }
  exports.concat = function(array,...values){
    let arr = [];
    let sizeOfArray = array.length;
    let sizeOfValues = values.length;
    for(let i = 0;i < sizeOfArray;i++){
      arr.push(array[i]);
    }
    for(let i = 0;i < sizeOfValues;i++){
      if(Array.isArray(values[i])){
        let sizeOfValue = values[i].length;
        for(let j = 0;j < sizeOfValue;j++){
          arr.push(values[i][j]);
        }
      }
      else{
        arr.push(values[i]);
      }
    }
    return arr
  }
  exports.slice = function(array,start = 0,end = array.length){
    let arr = [];
    for(let i = start;i < end;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  }
  exports.chunk = function(array,size = 1){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i += size){
      arr.push(exports.slice(array,i,i + size));
    }
    return arr
  }
  exports.compact = function(array){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  }
  exports.indexOf = function(array,value,fromIndex = 0){
    let sizeOfArray = array.length;
    if(fromIndex < 0){
      fromIndex = 0;
    }
    for(let i = fromIndex;i < sizeOfArray;i++){
      if(array[i] === value){
        return i
      }
    }
    return -1
  }
  exports.flatten = function(array){
    return exports.concat([],...array);
  }
  exports.flattenDeep = function(array){
    return array.reduce(function(res,item,i,arr){
      if(Array.isArray(array[i])){
        res = concat(res,flattenDeep(array[i]));
      }
      else{
        res = concat(res,array[i]);
      }
      return res
    },[])
  }
  exports.flattenDepth = function(array,depth = 1){
    let i = 0;
    while(depth--){
      array = exports.flatten(array);
    }
    return array
  }
  exports.difference = function(array,...values){
    return array.filter(function (item,index,arr){
      return exports.indexOf(exports.concat([],...values),item) == -1
    })
  }
  exports.differenceBy = function(array,...values){
    if(Array.isArray(values[values.length - 1])){
      return exports.difference(array,...values);
    }
    let ite = exports.iteratee(values[values.length - 1]);
    values.length -= 1;
    return array.filter(function (item,index){
      if(exports.concat([],...values).map(function (it,idx){
        return ite(it);
      }).indexOf(ite(item)) == -1)
      return item
    })
  }
  exports.differenceWith = function(array,...values){
    if(typeof values[values.length - 1] !== 'function'){
      return exports.difference(array,...values);
    }
    else{
      let comparator = values[values.length - 1];
      values.length -= 1;
      values = exports.flatten(values);
      return array.filter(function (item,index){
        for(let i = 0;i < values.length;i++){
          if(comparator(item,values[i])){
            return false
          }
        }
        return true
      })
    }
  }
  exports.drop = function(array,number = 1){
    return array.slice(number);
  }
  exports.dropRight = function(array,number = 1){
    if(number > array.length){
      number = array.length;
    }
    array.length -= number;
    return array
  }
  exports.dropRightWhile = function(array,predicate = exports.identity){
    if(!(typeof predicate == 'function')){
      predicate = exports.iteratee(predicate);
    }
    for(let i = array.length - 1;i >= 0;i--){
      if(predicate(array[i],i,array) === false){
        array.length = i + 1;
        return array
      }
    }
  }
  exports.dropWhile = function(array,predicate = exports.identity){
    if(!(typeof predicate == 'function')){
      predicate = exports.iteratee(predicate);
    }
    for(let i = 0;i < array.length;i++){
      if(predicate(array[i],i,array) === false){
        return array.slice(i)
      }
    }
  }
  exports.fill = function(array,value,start = 0,end = array.length){
    for(let i = start;i < end;i++){
      array[i] = value;
    }
    return array
  }
  exports.findIndex = function(array,predicate = exports.identity){
    if(predicate){
      predicate = exports.iteratee(predicate);
    }
    for(let i = 0;i < array.length;i++){
      if(predicate(array[i])){
        return i
      }
    }
    return -1
  }
  exports.findLastIndex = function(array,predicate = exports.identity){
    if(predicate){
      predicate = exports.iteratee(predicate);
    }
    for(let i = array.length - 1;i >= 0;i--){
      if(predicate(array[i])){
        return i
      }
    }
    return -1
  }
  exports.fromPairs = function(pairs){
    return pairs.reduce(function(res,item,i){
      res[item[0]] = item[1];
      return res
    },{})
  }
  exports.head = function(array){
    return array[0]
  }
  exports.indexOf = function(array,value,fromIndex = 0){
    for(let i = fromIndex;i < array.length;i++){
      if(array[i] === value){
        return i
      }
    }
    return -1
  }
  exports.initial = function(array = []){
    if(array.length > 0){
      array.length -= 1;
    }
    return array
  }
  exports.intersection = function(...arrays){
    if(!arrays || arrays.length == 0){
      return []
    }
    let comp = arrays.shift();
    return comp.filter(function(item,index){
      return arrays.reduce(function(res,it,idx){
        return res = res || it.reduce(function(r,i,indx){
          return r = r || exports.isEqual(item,i)
        },false)
      },false)
    })
  }
  exports.intersectionBy = function(...arrays){
    if(!arrays || arrays.length == 0){
      return []
    }
    let it = exports.identity;
    if(!Array.isArray(arrays[arrays.length - 1])){
      ite = exports.iteratee(arrays.pop());
    }
    let comp = arrays.shift();
    return comp.filter(function(item,index){
      return arrays.reduce(function(res,it,idx){
        return res = res || it.reduce(function(r,i,indx){
          return r = r || exports.isEqual(ite(item),ite(i))
        },false)
      },false)
    })
  }
  exports.intersectionWith = function(...arrays){
    if(!arrays || arrays.length < 2 || (typeof arrays[arrays.length - 1] != 'function')){
      return []
    }
    let it = exports.identity;
    if(!Array.isArray(arrays[arrays.length - 1])){
      ite = exports.iteratee(arrays.pop());
    }
    let comp = arrays.shift();
    return comp.filter(function(item,index){
      return arrays.reduce(function(res,it,idx){
        return res = res || it.reduce(function(r,i,indx){
          return r = r || ite(item,i)
        },false)
      },false)
    })
  }
  exports.join = function(array,separator = ','){
    let str = array.reduce(function(res,item,idx){
      return res += '' + separator + item
    })
    str.length -= 1;
    return str
  }
  exports.last = function(array){
    if(!array || array.length == 0){
      return null
    }
    return array[array.length - 1]
  }
  exports.lastIndexOf = function(array,value,fromIndex = array.length - 1){
    for(let i = fromIndex;i >= 0;i--){
      if(array[i] === value){
        return i
      }
    }
  }
  exports.nth = function(array,n = 0){
    return n >= 0?array[n]:array[array.length + n]
  }
  exports.pull = function(array,...values){
    return exports.pullAllBy(array,values);
  }
  exports.pullAll = function(array,values){
    return exports.pull(array,...values)
  }
  exports.pullAllBy = function(array,...values){
    let iteratee = exports.identity;
    if(!Array.isArray(values[values.length - 1])){
      iteratee = exports.iteratee(values[values.length - 1]);
      values.length -= 1;
    }
    values = exports.flatten(values);
    array.forEach(function(item,index){
      if(values.some(function(currentItem){
        return exports.isEqual(iteratee(item),iteratee(currentItem))
      })){
        array[index] = null;
      }
    })
    custom.condenseArray(array);
    return array
  }
  exports.pullAllWith = function(array,...values){
    let comparator;
    if(!typeof values[values.length - 1] === 'function'){
      return array
    }
    comparator = values[values.length - 1];
    values.length -= 1;
    values = exports.flatten(values);
    array.forEach(function(item,index){
      if(values.some(function(currentItem){
        return comparator(item,currentItem)
      })){
        array[index] = null;
      }
    })
    custom.condenseArray(array);
    return array
  }
  exports.reverse = function(array){
    let len = array.length;
    let end = parseInt(len / 2);
    let temp;
    for(let i = 0;i < end;i++){
      temp = array[i];
      array[i] = array[len - i - 1];
      array[len - i - 1] = temp;
    }
    return array
  }
  exports.sortedIndex = function(array,value){
    return sortedIndexBy(array,value)
  }
  exports.sortedIndexBy = function(array,value,iteratee = exports.identity){
    if(iteratee){
      iteratee = exports.iteratee(iteratee);
    }
    for(let i = 0;i < array.length;i++){
      if(iteratee(array[i]) >= iteratee(value)){
        return i
      }
    }
    return array.length
  }
  exports.sortedIndexOf = function(array,value){
    for(let i = 0;i < array.length;i++){
      if(array[i] === value){
        return i
      }
    }
    return -1
  }

  exports.forOwn = function(object,ite = exports.identity){
    let it = exports.iteratee(ite);
    let key = exports.keys(object);
    for(let i = 0;i < key.length;i++){
      if(it(object[key[i]]) === false){
        continue;
      }
      else{
        object[key[i]] = it(object[key[i]],key[i],object);
      }
    }
    return object
  }
  // 计算数目
  Object.defineProperty(exports,'countSize',{
    get(){
      let size = 0;
      for(let i in this){
        if(this.hasOwnProperty(i)){
          size++;
        }
      }
      return size - 1
    }
  })
  return exports
}()

