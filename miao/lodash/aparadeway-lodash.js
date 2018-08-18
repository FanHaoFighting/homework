aparadeway = function(){

  function identity(value){
    return value
  }

  function keys(object){
    return Object.keys(object)
  }
  function isObject(value){
    return (value instanceof Object)
  }
  function isEqual(value,other){
    if(value === other || (value !== value && other !== other)){
      return true
    }
    if(Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)){
      return false
    }
    //判断引用类型
    if(isObject(value) === true && isObject(other) === true){
      let values = keys(value);
      let others = keys(other);
      let lengthOfValues = values.length;
      if(lengthOfValues !== others.length){
        return false
      }
      for(let i = 0;i < lengthOfValues;i++){
        if(value[values[i]] === value[values[i]] && value[values[i]] !== other[values[i]] && (!isEqual(value[values[i]],other[values[i]]))){
          return false
        }
      }
      return true
    }
    else{
      return false
    }
  }
  function isMatch(object,source){
    if(isEqual(object,source)){
      return true
    }
    let sources = keys(source);
    let sizeOfSources = sources.length;
    for(let i = 0;i < sizeOfSources;i++){
      if(isEqual(object[sources[i]],source[sources[i]])){
        continue;
      }
      else if(object[sources[i]] == undefined || object[sources[i]] !== source[sources[i]]){
        return false
      }
    }
    return true
  }
  function matches(source){
    return function (object){
      return isMatch(object,source);
    }
  }
  function get(object,path,defaultValue){
    let arr;
    if(typeof path === 'string'){
      let reg = /\b\w+\b/g;
      arr = path.match(reg);
    }
    else if(Array.isArray(path)){
      arr = flattenDeep(path);
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
  function property(path){
    return function (object){
      if(object == undefined){
        return
      }
      else{
        return get(object,path)
      }
    }
  }
  function matchesProperty(path,srcValue){
    return function (object){
      if(object == undefined || object[path] == undefined){
        return false
      }
      else{
        if(isEqual(object[path],srcValue)){
          return true
        }
        else{
          return false
        }
      }
    }
  }
  function isArray(value){
    return (Object.prototype.toString.call(value) === '[object Array]')
  }
  function iteratee(func = identity){
    if(Array.isArray(func)){
      return matchesProperty(func[0],func[1])
    }
    else if(typeof func === 'function'){
      return func
    }
    else if(func instanceof Object){
      return matches(func)
    }
    else if(typeof func === 'string'){
      return property(func)
    }
  }
  function map(collection,iteratee = identity){
    iteratee = iteratee(iteratee);
    let res = [];
    if(Array.isArray(collection)){
      for(let i = 0;i < collection.length;i++){
        res.push(iteratee(collection[i],i,collection));
      }
    }
    else{
      for(let i in collection){
        if(collection.hasOwnProperty(i)){
          res.push(iteratee(collection[i],i,collection));
        }
      }
    }
    return res
  }
  function reduce(collection,iteratee = identity,accumulator){
    let keys = keys(collection);
    let i = accumulator?0:1;
    accumulator = !accumulator?collection[keys[0]]:accumulator;
    let res = accumulator?accumulator:collection[keys[0]];
    for(i;i < keys.length;i++){
      res = iteratee(res,collection[keys[i]],keys[i],collection);
    }
    return res
  }
  function filter(collection,predicate){
    if(!predicate){
      return collection
    }
    predicate = iteratee(predicate);
    let arr = [];
    let keys = keys(collection);
    for(let i = 0;i < keys.length;i++){
      if(predicate(collection[keys[i]],keys[i],collection)){
        arr.push(collection[keys[i]]);
      }
    }
    return arr
  }
  function concat(array,...values){
    let arr = [];
    let sizeOfArray = array.length;
    let sizeOfValues = values.length;
    for(let i = 0;i < sizeOfArray;i++){
      arr.push(array[i]);
    }
    for(let i = 0;i < sizeOfValues;i++){
      if(isArray(values[i])){
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
  function slice(array,start = 0,end = array.length){
    let arr = [];
    for(let i = start;i < end;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  }
  function chunk(array,size = 1){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i += size){
      arr.push(slice(array,i,i + size));
    }
    return arr
  }
  function compact(array){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  }
  function indexOf(array,value,fromIndex = 0){
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
  function flatten(array){
    return concat([],...array);
  }
  function flattenDeep(array){
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
  function flattenDepth(array,depth = 1){
    let i = 0;
    while(depth--){
      array = flatten(array);
    }
    return array
  }
  function difference(array,...values){
    return array.filter(function (item,index,arr){
      return indexOf(concat([],...values),item) == -1
    })
  }
  function differenceBy(array,...values){
    if(Array.isArray(values[values.length - 1])){
      return difference(array,...values);
    }
    let ite = iteratee(values[values.length - 1]);
    values.length -= 1;
    return array.filter(function (item,index){
      if(concat([],...values).map(function (it,idx){
        return ite(it);
      }).indexOf(ite(item)) == -1)
      return item
    })
  }
  function differenceWith(array,...values){
    if(typeof values[values.length - 1] !== 'function'){
      return difference(array,...values);
    }
    else{
      let comparator = values[values.length - 1];
      values.length -= 1;
      values = flatten(values);
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
  function drop(array,number = 1){
    return array.slice(number);
  }
  function dropRight(array,number = 1){
    if(number > array.length){
      number = array.length;
    }
    array.length -= number;
    return array
  }
  function dropRightWhile(array,predicate = identity){
    if(!(typeof predicate == 'function')){
      predicate = iteratee(predicate);
    }
    for(let i = array.length - 1;i >= 0;i--){
      if(predicate(array[i],i,array) === false){
        array.length = i + 1;
        return array
      }
    }
  }
  function dropWhile(array,predicate = identity){
    if(!(typeof predicate == 'function')){
      predicate = iteratee(predicate);
    }
    for(let i = 0;i < array.length;i++){
      if(predicate(array[i],i,array) === false){
        return array.slice(i)
      }
    }
  }
  function fill(array,value,start = 0,end = array.length){
    for(let i = start;i < end;i++){
      array[i] = value;
    }
    return array
  }
  function findIndex(array,predicate = identity){
    if(predicate){
      predicate = iteratee(predicate);
    }
    for(let i = 0;i < array.length;i++){
      if(predicate(array[i])){
        return i
      }
    }
    return -1
  }
  function findLastIndex(array,predicate = identity){
    if(predicate){
      predicate = iteratee(predicate);
    }
    for(let i = array.length - 1;i >= 0;i--){
      if(predicate(array[i])){
        return i
      }
    }
    return -1
  }
  function fromPairs(pairs){
    return pairs.reduce(function(res,item,i){
      res[item[0]] = item[1];
      return res
    },{})
  }
  function head(array){
    return array[0]
  }
  function indexOf(array,value,fromIndex = 0){
    for(let i = fromIndex;i < array.length;i++){
      if(array[i] === value){
        return i
      }
    }
    return -1
  }
  function initial(array = []){
    if(array.length > 0){
      array.length -= 1;
    }
    return array
  }
  function intersection(arrays){
    if(!arrays || arrays.length == 0){
      return []
    }
    let comp = arrays.shift();
    return comp.filter(function(item,index){
      return arrays.reduce(function(res,it,idx){
        return res = res || it.reduce(function(r,i,indx){
          return r = r || isEqual(item,i)
        },false)
      },false)
    })
  }
  function intersectionBy(...arrays){
    if(!arrays || arrays.length == 0){
      return []
    }
    let it = identity;
    if(!isArray(arrays[arrays.length - 1])){
      ite = iteratee(arrays.pop());
    }
    let comp = arrays.shift();
    return comp.filter(function(item,index){
      return arrays.reduce(function(res,it,idx){
        return res = res || it.reduce(function(r,i,indx){
          return r = r || isEqual(ite(item),ite(i))
        },false)
      },false)
    })
  }
  return {
    get size(){
      let size = 0;
      for(let i in this){
        if(this.hasOwnProperty(i)){
          size++;
        }
      }
      return size - 1
    },
    intersectionBy:intersectionBy,
    intersection:intersection,
    initial:initial,
    indexOf:indexOf,
    head:head,
    fromPairs:fromPairs,
    flattenDepth:flattenDepth,
    findLastIndex:findLastIndex,
    findIndex:findIndex,
    chunk: chunk,
    compact: compact, 
    fill:fill,
    difference: difference,
    drop : drop, 
    dropRight: dropRight,
    slice:slice,
    keys : keys,
    isEqual : isEqual,
    map : map,
    differenceBy: differenceBy,
    dropWhile : dropWhile,
    dropRightWhile : dropRightWhile,
    identity: identity,
    get : get,
    property : property,
    isMatch : isMatch,
    matches : matches,
    matchesProperty : matchesProperty,
    iteratee : iteratee,
    flatten : flatten,
    flattenDeep: flattenDeep,
    reduce : reduce,
    indexOf : indexOf,
    filter : filter,
    differenceWith : differenceWith,
    concat : concat,
    isArray : isArray,
    isObject : isObject
  }
}()

