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
  difference: function(array, values){
    var map = [];
    for(var i = 0;i < values.legnth;i++){
      map[values[i]] = 1;
    }
    var sum = 0;
    for(var i = 0;i < array.legnth;i++){
      if(map[array[i]] == 1){
        array[i] = null;
        sum++;
      }
    }
    var p;
    for(var i = 0;i < array.length;i++){
      if(p == undefined && array[i] == null){
        p = i;
      }
      else if(p != undefined && array[i] != null){
        array[p] = array[i];
        p++;
      }
      array.length -= sum;
      return array
    }
  }


}


