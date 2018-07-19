var aparadeway = {
  chunk: function (array, size){
    var newArr = [];
    var k = 0;
    for(var i = 0;i < array.length;i++){
      if(newArr[k] != undefined && newArr[k].length == size){
        k ++;
      }
      if(newArr[k] == undefined){
        newArr[k] = [];
      }
      newArr[k].push(array[i]);
    }
    return newArr
  },
  compact: function (array){
    var pointer;
    var sum = 0;
    for(var i = 0;i < array.length;i++){
      if(array[i] == null || array[i] == 0 || array[i] == "" || !array[i] || array[i] != array[i])
      {
        if(pointer == undefined){
          pointer = i;
        }
        sum++;
      }
      else{
        if(pointer != undefined){
          array[pointer] = array[i];
          pointer++
        }
      }
    }
    array.length = array.length - sum;
    return array
  },
  difference: function(array,...values){
    var map = [];
    for(var i = 0;i < values.length;i++){
      for(var j = 0;j < values[i].length;j++){
        map[values[i][j]] = 1;
      }
    }
    var arr = [];
    for(var i = 0;i < array.length;i++){
      arr.push(array[i]);
    }
    var sum = 0;
    for(var i = 0;i < arr.length;i++){
      if(map[arr[i]] == 1){
        arr[i] = null;
        sum++;
      }
    }
    var p;
    for(var i = 0;i < arr.length;i++){
      if(p == undefined && arr[i] == null){
        p = i;
      }
      else if(p != undefined && arr[i] != null){
        arr[p] = arr[i];
        p++;
      }
    }
    arr.length -= sum;
    return arr
  },
  differenceBy: function(array,...values){
  },
  differenceWith: function(){

  },
  drop: function(array,n = 1){
    let p;
    let sum = 0;
    for(let i = 0;i < n;i++){
      array[i] = null;
      sum ++;
    }
    for(let i = 0;i < array.length;i++){
      if(p == undefined){
        if(array[i] == null){
          p = i;
        }
      }
      else{
        if(array[i] != null){
          array[p] = array[i];
          p++;
        }
      }
    }
    array.length -= sum;
    return array
  },
  dropRight: function(array,n = 1){
    if(n >= array.length){
      return []
    }
    else{
      array.length -= n;
      return array
    }
  },
  dropRightWhile: function(){

  },
  dropWhile: function(){

  },
  fill:function(array,value,start = 0,end = array.length){
    for(var i = start;i < end;i++){
      array[i] = value;
    }
    return array
  },
  findIndex: function(array, predicate,fromIndex = 0){
    for(var i = fromIndex;i < array.length;i++){

    }
  },
  findLastIndex: function(){

  },
  flatten: function(array){
    var arr = [];
    for(var i = 0;i < array.length;i++){
      if(typeof(array[i]) == typeof([])){
        for(var j = 0;j < array[i].length;j++){
          arr.push(array[i][j]);
        }
      }
      else{
        arr.push(array[i]);
      }
    }
    return arr
  },
  flattenDeep: function(array){
    var arr = [];
    Traversal(array);
    function Traversal(ary){
      for(var i = 0;i < ary.length;i++){
        if(typeof(ary[i]) == typeof([])){
          Traversal(ary[i]);
        }
        else{
          arr.push(ary[i]);
        }
      }
    }
    return arr
  },
  flattenDepth: function(array,depth = 1){
    var arr = [];
    var index = 0;
    Traversal(array,1);
    function Traversal(ary,d){
      for(var i = 0;i < ary.length;i++){
        if(typeof(ary[i]) == typeof([]) && d <= depth){
          Traversal(ary[i],d + 1);
        }
        else{
          arr.push(ary[i]);
        }
      }
    }
    return arr
  },
  fromPairs: function(pairs){
    var obj = {};
    for(var i = 0;i < pairs.length;i++){
      obj[pairs[i][0]] = pairs[i][1];
    }
    return obj
  },
  head: function(array){
    return array[0]
  },
  indexOf: function(array,value,fromIndex = 0){
    for(let i = fromIndex;i < array.length;i++){
      if(array[i] == value){
        return i
      }
    }
    return -1
  },
  initial: function(array){
    array.length -= 1;
    return array
  },
  intersection: function(...arrays){
    if(arrays.length == 0){
      return []
    }
    else{
      let res = [];
      let map = [];
      for(let i = 0;i < arrays.length;i++){
        for(var j = 0;j < arrays[0].length;j++){
          if(map[arrays[i][j]] == undefined){
            map[arrays[i][j]] = 1;
          }
          else{
            map[arrays[i][j]]++;
          }
        }
      }
      for(let i = 0;i < map.length;i++){
        if(map[i] != undefined && map[i] > 1){
          res.push(map[i]);
        }
      }
      return res
    }
  },
  join: function(array,separator = ','){
    let str = '';
    for(let i = 0;i < array.length - 1;i++){
      str += array[i] + ('' + separator);
    }
    str += array[array.length - 1];
    return str
  },
  last: function(array){
    return array[array.length - 1];
  },
  groupBy: function(collection,iteratee){
    if(!iteratee || iteratee == undefined || iteratee.length == 0){
      return collection
    }
    else{
      let obj = {};
      if(typeof(iteratee) == 'function'){
        for(let i = 0;i < collection.length;i++){
          if(obj[iteratee(collection[i])] == undefined){
            obj[iteratee(collection[i])] = [];
          }
          if(obj[iteratee(collection[i])] != undefined){
            obj[iteratee(collection[i])].push(collection[i]);
          }
        }
      }
      else if(typeof(iteratee) == typeof('')){
        for(let i = 0;i < collection.length;i++){
          if(obj[collection[i][iteratee]] == undefined){
            obj[collection[i][iteratee]] = [];
          }
          if(obj[collection[i][iteratee]] != undefined){
            obj[collection[i][iteratee]].push(collection[i]);
          }
        }
      }
      return obj
    }
  },
  reduce: function(collection,iteratee,accumulator){
    if(arguments.length == 1){
      if(collection.length <= 1){
        return collection
      }
    }
    else{
      for(let i in collection){
        if(accumulator == undefined || !accumulator){
          accumulator = collection[i];
        }
        else{
          accumulator = iteratee(accumulator,collection[i],i);
        }
      }
      return accumulator
    }
  },
  includes: function(collection,value,fromIndex = 0){
    for(var i = fromIndex;i < collection.length;i++){
      if(collection[i] === value){
        return true
      }
    }
    return false
  },
  map:function(collection,iteratee){
    if(!iteratee || iteratee == undefined){
      return collection
    }
    else{
      var res = [];
      for(var i in collection){
        res.push(iteratee(collection[i],i));
      }
      return res
    }
  },
  identity:function(){
    return arguments[0]
  },
  filter:function(collection,predicate){
    if(!predicate || predicate == undefined){
      return collection
    }
    else{
      var res = [];
      for(let i in collection){
        if(predicate(collection[i],i)){
          res.push(collection[i]);
        }
      }
    }
  }

}


