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
  isArray:function(value){
    return (Object.prototype.toString.call(value) === '[object Array]')
  },
  concat:function(array,values = []){
    if(this.isArray(values)){
      let index = 0;
      let len = array.length + values.length;
      for(let i = array.length;i < len;i++){
        array[i] = values[index];
        index++;
      }
    }
    else{
      array[array.length] = values;
    }
    return array
  },
  slice:function(array,start = 0,end = array.length){
    let arr = [];
    for(let i = start;i < end;i++){
      arr.push(array[i]);
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
  }
}


