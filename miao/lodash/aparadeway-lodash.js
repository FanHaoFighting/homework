var aparadeway = {
  chunk: function (array, size){
    var myCars = []
    for (var i = 0; i < array.length; i = i + size){
      myCars.push(array.slice(i,i+size))
    }
    return myCars
  }

}


