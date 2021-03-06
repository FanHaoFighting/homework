var aparadeway = {
  identity: value => value,
  isArray: value => Object.prototype.toString.call(value) === '[object Array]',
  isObject: value => {
    if(typeof value === 'function') return true
    return (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]')
  },
  isMatch: (object, source, iteratee) => {
    let objectKeys = Object.keys(object);
    return objectKeys.some(item => aparadeway.isEqualWith(object[item], source[item], iteratee))
  },
  matches: (object) => ((source) => aparadeway.isMatch(object, source)),
  isMatchWith: (object, source, customiser) => aparadeway.isMatch(object , source, customiser),
  toPath: (value) => {
    // 暂未考虑路径含有特殊符号的情况
    if(Array.isArray(value)) return value
    if(aparadeway.isObject(value)) return ['object object']
    return value.match(/[a-z0-9]+/gi)
  },
  get:(object, path, defaultValue) => {
    let res = object;
    if(typeof path === 'string') path = aparadeway.toPath(path);
    for(let key of path){
      if(res) res = res[key];
      else break;
    }
    return (typeof res === 'undefined') ? defaultValue : res
  },
  at: (object, ...paths) => {
    //aparadeway.
  },
  invoke: (object, path, ...args) => {
    path = aparadeway.toPath(path);
    let func = path.pop();
    return aparadeway.get(object, path)[func](...args)
  },
  method: (path, ...args) => ((source) => aparadeway.get(source, path)(...args)),
  methodOf: (object, ...args) => ((path) => aparadeway.get(object, path)(...args)),
  property: (path) => (source) => (aparadeway.get(source, path)),
  propertyOf: (object) => (path) => (aparadeway.get(object, path)),
  matchesProperty: (path, srcValue) => ((object) => aparadeway.isEqual(aparadeway.get(object, path), srcValue)),
  iteratee: (func = aparadeway.identity) => {
    if(Array.isArray(func)) return aparadeway.matchesProperty(...func)
    if(typeof func === 'function') return (value) => func(value)
    if(aparadeway.isObject(func)) return aparadeway.matches(func)
    if(typeof func === 'string') return aparadeway.property(func)
  },
  forEach: (collection, iteratee = aparadeway.identity) => {
    let collectionKeys = Object.keys(collection);
    for(let i of collectionKeys) iteratee(collection[i], i, collection);
    return collection
  },
  forEachRight: (collection, iteratee = aparadeway.identity) => {
    let collectionKeys = Object.keys(collection);
    let len = collectionKeys.length;
    for(let i = len - 1;i >= 0;i--) iteratee(collection[i], i, collection);
    return collection
  },
  forOwn: (object, iteratee = aparadeway.identity) => aparadeway.forEach(object, iteratee),
  forOwnRight: (object, iteratee = aparadeway.identity) => aparadeway.forEachRight(object, iteratee),
  keys: object => {
    let res = [];
    for(let i in object){
      if(object.hasOwnProperty(i)) res.push(i)
    }
    return res
  },
  isEqual: (value, other) => {
    if(value === other || (value !== value && other !== other)) return true
    let objToString = Object.prototype.toString;
    if(objToString.call(value) !== objToString.call(other)) return false
    if(aparadeway.isObject(value)){
      let valueKeys = Object.keys(value);
      let otherKeys = Object.keys(other);
      if(valueKeys.length !== otherKeys.length) return false
      for(let key of valueKeys){
        if(!aparadeway.isEqual(value[key], other[key])) return false
      }
      return true
    }
    return false
  },
  isEqualWith: (value, other, customiser) => {
    if(typeof customiser === 'undefined') return aparadeway.isEqual(value, other)
    if(typeof value !== typeof other) return false
    if(typeof value !== 'object') return customiser(value, other);
    else{
      let valueKeys = Object.keys(value);
      let otherKeys = aparadeway.toPairs(other);
      if(valueKeys.length !== otherKeys.length) return false
      return valueKeys.some((item,key) => customiser(value[item],other[item],item,value,other))
    }
  },
  toPairs: (object) => {
    let res = [];
    let objectKeys = Object.keys(object);
    objectKeys.forEach((item) => res.push([item,object[item]]));
    return res
  },
  fromPairs: (pairs) => pairs.reduce((acc,item) => {
    acc[item[0]] = item[1];
    return acc
  },{}),
  constant: (value) => (() => value),
  flatten: (array) => array.reduce((acc, item) => acc.concat(item),[]),
  flattenDeep: (array) => array.reduce((acc, item) => acc.concat(Array.isArray(item) ? aparadeway.flattenDeep(item) : item),[]),
  flattenDepth: (array, depth = 1) => array.reduce((acc, item) => acc.concat((Array.isArray(item) && depth-- !== 1) ? aparadeway.flattenDepth(item, depth) : item),[]),
  chunk: (array, size = 1) => {
    let res = [];
    while(array.length){
      res.push(array.splice(0, size))
    }
    return res
  },
  compact: (array) => array.filter(item => Boolean(item)),
  concat: (...values) => values.reduce((res, item) => {
    Array.isArray(item) ? item.reduce((r, i) => { res.push(i) },[]) : res.push(item);
    return res
  },[]),
  slice: (array, start = 0, end = array.length) => array.reduce((res, item, index) => {
    if(index >= start && index < end) res.push(item);
    return res
  },[]),
  difference: (array, ...values) => {
    let check = [].concat(...values)
    return array.filter((item) => check.indexOf(item) === -1)
  },
  differenceBy: (array, ...args) => {
    let iteratee = (args.length > 1 && (args[args.length - 1].length > 1)) ? aparadeway.iteratee(args.pop()) : aparadeway.identity;
    args = [].concat(...args);
    args.forEach((item, index, ary) => { 
      ary[index] = iteratee(item);
    });
    return array.filter((item) => args.indexOf(iteratee(item)) === -1)
  },
  indexOf: (array, value, fromIndex = 0) => {
    let len = array.length;
    fromIndex = fromIndex < 0 ? (len + fromIndex) : fromIndex;
    for(let i = fromIndex;i < len;i++){
      if(array[i] === value) return i
    }
    return - 1 
  }
}