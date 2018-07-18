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
  }


}


