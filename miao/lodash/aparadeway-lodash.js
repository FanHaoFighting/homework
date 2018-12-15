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
  methods: (path, ...args) => {
    if(typeof path === 'string') path = aparadeway.toPath(path);

  },
  property: (path) => {
    return (object) => {

    }
  },
  matchesProperty: (path, srcValue) => {
    return 1
  },
  iteratee: (func = aparadeway.identity) => {

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
        if(value[key] !== other[key]) return false
      }
      return true
    }
    return false
  },
  toPairs: (object) => {
    let res = [];
    let objectKeys = Object.keys(object);
    objectKeys.forEach((item) => res.push([item,object[item]]));
    return res
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
  }

}