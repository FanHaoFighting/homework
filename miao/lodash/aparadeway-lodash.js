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
  }


}


