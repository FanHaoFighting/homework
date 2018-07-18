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
    var ar = [];
    for(var i = 0;i < array.length;i++){
      ar.push(array[i]);
    }
    for(var i = 0;i < ar.length;i++){
      if(ar[i] == null || ar[i] == 0 || ar[i] == "" || !ar[i] || ar[i] != ar[i])
      {
        if(pointer == undefined){
          pointer = i;
        }
        sum++;
      }
      else{
        if(pointer != undefined){
          ar[pointer] = ar[i];
          pointer++
        }
      }
    }
    ar.length = ar.length - sum;
    array = ar;
    return array
  },
  difference: function(array, values){

  }


}


