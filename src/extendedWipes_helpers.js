var  _slicesToArray=function(r,c){
  var arr=[],b=0;

  for(var i = 0; i < r; i++) {
    arr[i] = new Array(c);
    for(var j = 0; j < c; j++) {
        arr[i][j] = b;
        b++;
    }
  }
  return arr;
},
groupCentrally=function(r,c){
  var grouped=[],arr=_slicesToArray(r,c),columnLength,
  isEven=(((columnLength = arr[0].length) % 2) == 0);

  var middle=Math.floor((columnLength-1)/2);
  var group=[];
  for(var i=0;i<r;i++){
    var box=middle + (columnLength*i);
    group.push(box);
    if(isEven){
      group.push(box+1);
    }
  }
  grouped.push(group);
  var numTimes=group[0],k=0;
  for(var j=numTimes-1;j>-1;j--){
    var gr=[];
    k=k+2;
    for(var i=0;i<r;i++){
      gr.push(j+(i*columnLength),j+(i*columnLength)+k+(isEven ? 1 : 0));
    }
    grouped.push(gr);
  }

  return grouped;
},
groupDiagonally=function(r,c,rev){
  var grouped=[],arr=_slicesToArray(r,c);

  if(rev){
    for (var i = 1 - r; i < c; i++) {
      var group = [];
      for (var j = 0; j < r; j++) {
        if ((i + j) >= 0 && (i + j) < c) {
          group.push(arr[j][i + j]);
        }
      }
      grouped.push(group);
    }
  }else{
    for (var i = 0; i < r + c - 1; i++) {
      var z1 = (i < c) ? 0 : i - c + 1;
      var z2 = (i < r) ? 0 : i - r + 1;
      var group=[];
      for (var j = i - z2; j >= z1; j--) {
        group.push(arr[j][i - j]);
      }
      grouped.push(group);
    }
  }

  return grouped;
};
