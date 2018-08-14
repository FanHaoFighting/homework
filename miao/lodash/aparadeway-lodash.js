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
    let res = [];
    for(let i = 0;i < array.length;i++){
      if(Array.isArray(array[i])){
        res = concat(res,flattenDeep(array[i]));
      }
      else{
        res = concat(res,array[i]);
      }
    }
    return res
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
    let iteratee = iteratee(values[values.length - 1])
    values.length -= 1;
    return array.filter(function (item,index){
      if(concat([],...values).map(function (it,idx){
        return iteratee(it);
      }).indexOf(iteratee(item)) == -1)
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

  return {
    chunk: chunk,
    compact: compact, 
    difference: difference,
    drop : drop, 
    dropRight: dropRight,
    slice:slice,
    //unary : unary,
    //negate : negate,
    //range: range,
    //rangeRight: rangeRight,
    //sum : sum,
    keys : keys,
    //uniq : uniq,
    isEqual : isEqual,
    map : map,
    //forEachRight: forEachRight,
    //forEach: forEach,
    differenceBy: differenceBy,
    dropWhile : dropWhile,
    dropRightWhile : dropRightWhile,
    identity: identity,
    //toPath: toPath,
    get : get,
    property : property,
    //sumBy : sumBy,
    isMatch : isMatch,
    //toArray : toArray,
    //flip : flip,
    //fromPairs : fromPairs,
    //toPairs : toPairs,
    matches : matches,
    matchesProperty : matchesProperty,
    iteratee : iteratee,
    //ary : ary,
    //fill : fill,
    //findLastIndex : findLastIndex,
    //findIndex : findIndex,
    flatten : flatten,
    //flattenDepth: flattenDepth,
    flattenDeep: flattenDeep,
    reduce : reduce,
    //head : head,
    indexOf : indexOf,
    //lastIndexOf : lastIndexOf,
    //initial : initial,
    //intersection: intersection,
    //join : join,
    //last : last,
    //nth : nth,
    // intersectionBy : intersectionBy,
    // intersectionWith : intersectionWith,
    filter : filter,
    // bind : bind,
    differenceWith : differenceWith,
    // pull : pull,
    // pullAll : pullAll,
    // pullAllBy :pullAllBy,
    // pullAllWith : pullAllWith,
    // reverse : reverse,
    // tail : tail,
    // take : take,
    // takeWhile : takeWhile,
    // takeRight : takeRight,
    // takeRightWhile : takeRightWhile,
    // union : union,
    // unionBy : unionBy,
    // unionWith : unionWith,
    // uniqBy : uniqBy,
    // uniqWith : uniqWith,
    // spread : spread,
    // zip : zip,
    // unzip : unzip,
    // unzipWith : unzipWith,
    // add : add,
    // without : without,
    // xor : xor,
    concat : concat,
    // xorBy : xorBy,
    // xorWith : xorWith,
    // sortedIndex : sortedIndex,
    // sortedIndexOf : sortedIndexOf,
    // sortedIndexBy : sortedIndexBy,
    // sortedLastIndex : sortedLastIndex,
    // sortedLastIndexOf : sortedLastIndexOf,
    // sortedLastIndexBy : sortedLastIndexBy,
    // sortedUniq : sortedUniq,
    // sortedUniqBy : sortedUniqBy,
    // zipObject : zipObject,
    // zipObjectDeep : zipObjectDeep,
    // zipWith : zipWith,
    // countBy : countBy,
    // every : every,
    // findLast : findLast,
    // find : find,
    // flatMap : flatMap,
    // flatMapDeep : flatMapDeep,
    // flatMapDepth : flatMapDepth,
    // groupBy : groupBy,
    // includes : includes,
    // invoke : invoke,
    // invokeMap : invokeMap,
    // keyBy : keyBy,
    // partition : partition,
    // reject : reject,
    // sortBy : sortBy,
    // reduceRight : reduceRight,
    // orderBy : orderBy,
    // sample : sample,
    // sampleSize : sampleSize,
    // shuffle : shuffle,
    // some : some,
    // castArray : castArray,
    // conforms : conforms,
    // conformsTo : conformsTo,
    // size : size,
    // eq : eq,
    // gt : gt,
    // gte : gte,
    // isArguments : isArguments,
    isArray : isArray,
    // isArrayBuffer : isArrayBuffer, 
    // isArrayLike : isArrayLike,
    // isArrayLikeObject: isArrayLikeObject,
    // isBoolean : isBoolean,
    // isDate : isDate,
    // isElement : isElement,
    // isEmpty : isEmpty,
    // isFinite : isFinite,
    // isFunction : isFunction,
    // isInteger : isInteger,
    // isLength : isLength,
    // isMap : isMap,
    // isSet : isSet,
    // isError : isError, 
    // isNaN : isNaN,
    // isNative : isNative,
    // isNil : isNil,
    // isNull : isNull,
    // isNumber : isNumber,
    isObject : isObject
  }
}()

