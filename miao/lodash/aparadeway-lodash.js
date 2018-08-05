var aparadeway = {
  identity:function(value){
    return value
  },
  keys:function(object){
    return Object.keys(object)
  },
  isObject:function(value){
    return (value instanceof Object)
  },
  isEqual:function(value,other){
    if(value === other || (value !== value && other !== other)){
      return true
    }
    if(Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)){
      return false
    }
    //判断引用类型
    if(this.isObject(value) === true && this.isObject(other) === true){
      let values = this.keys(value);
      let others = this.keys(other);
      let lengthOfValues = values.length;
      if(lengthOfValues !== others.length){
        return false
      }
      for(let i = 0;i < lengthOfValues;i++){
        if(value[values[i]] === value[values[i]] && value[values[i]] !== other[values[i]] && (!this.isEqual(value[values[i]],other[values[i]]))){
          return false
        }
      }
      return true
    }
    else{
      return false
    }
  },
  isMatch:function(object,source){
    if(this.isEqual(object,source)){
      return true
    }
    let objects = this.keys(object);
    let sizeOfObjects = objects.length;
    for(let i = 0;i < sizeOfObjects;i++){
      if(object[objects[i]] === source[objects[i]]){
        return true
      }
      if(this.isEqual(object[objects[i]],source[objects[i]])){
        return true
      }
    }
    return false
  },
  matches:function(source){
    let that = this;
    return function(object){
      return that.isMatch(object,source);
    }
  },
  matchesProperty:function(path,srcValue){
    let that = this;
    return function(object){
      if(!object || !object[path]){
        return false
      }
      else{
        if(that.isEqual(object[path],srcValue)){
          return true
        }
        else{
          return false
        }
      }
    }
  },
  isArray:function(value){
    return (Object.prototype.toString.call(value) === '[object Array]')
  },
  iteratee:function(func = this.identity){
    if(Array.isArray(func)){
      return this.matchesProperty
    }
    else if(func instanceof Object){
      return this.matches(func)
    }
  },
  concat:function(array,...values){
    let arr = [];
    let sizeOfArray = array.length;
    let sizeOfValues = values.length;
    for(let i = 0;i < sizeOfArray;i++){
      arr.push(array[i]);
    }
    for(let i = 0;i < sizeOfValues;i++){
      if(this.isArray(values[i])){
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
  },
  slice:function(array,start = 0,end = array.length){
    let arr = [];
    for(let i = start;i < end;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  },
  chunk:function(array,size = 1){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i += size){
      arr.push(this.slice(array,i,i + size));
    }
    return arr
  },
  compact:function(array){
    let arr = [];
    let len = array.length;
    for(let i = 0;i < len;i++){
      if(array[i]){
        arr.push(array[i]);
      }
    }
    return arr
  },
  indexOf:function(array,value,fromIndex = 0){
    let sizeOfArray = array.length;
    if(fromIndex < 0){
      fromIndex = sizeOfArray - 1;
    }
    for(let i = fromIndex;i < sizeOfArray;i++){
      if(array[i] === value){
        return i
      }
    }
    return -1
  },
  flatten:function(array){
    return this.concat([],...array);
  },
  flattenDeep:function(array){
    let res = [];
    for(let i = 0;i < array.length;i++){
      if(Array.isArray(array[i])){
        res = this.concat(res,this.flattenDeep(array[i]));
      }
      else{
        res = this.concat(res,array[i]);
      }
    }
    return res
  }
}


