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
  findIndex: function(){

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
    for(let i = findIndex;i < array.length;i++){
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


}


