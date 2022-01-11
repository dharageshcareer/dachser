function excelfun() {
  //Reference the FileUpload element.
  $('#exinput').empty()
  $("#Result").empty()
  var file = document.getElementById("exinput");
  console.log(file.files[0],"Fileupload")
  
  // input canceled, return
  if (!file) return;
  
  var FR = new FileReader();
  FR.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {type: 'array'});
    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // header: 1 instructs xlsx to create an 'array of arrays'
    conslis = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    nooflines = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    console.log("conslis is",conslis)
    array2[0]=0
    i=1
    notineleven=[]
    field[4]=[]
    k=0
    try{
    while(i<=nooflines.length){
      
      console.log(i,typeof i,typeof nooflines[i][1],nooflines[i][1])
     
      array2[0]=array2[0]+nooflines[i][1]
      console.log("so far sum of lines is",array2[0])
      console.log("cons len",conslis[i][0].toString().length)
      if(conslis[i][0].toString().length != 14){
        notineleven[k]=conslis[i][0]
        k++
      }
      field[4][i-1]=conslis[i][0]
      i++
      
    }
    
  }
  catch(err) {
                  console.log("After Sum",array2[0],"notineleven is",notineleven,"field4 is",field[4])
                  if(notineleven.length>0){
                    var output = document.getElementById('Result');
                    output.innerHTML = "Consignment must have 14 digit...<br /><p>Recheck the below and add new file by saving it in new version<p style='color: red;'>"+notineleven+"</p>"
                  }
                  else{
                    // data preview
                    var output = document.getElementById('Result');
                    output.innerHTML = "Total Consignment in Excel is "+(field[4].length)+"<br />" +"No of Lines is "+array2[0]+"<br />"+"<input style='background: #28a745; width:200px; font-size:18px;' type='button' id='subbutton' value='submit' onclick='submitresult();'></input>"
                  }

    }
    
  };
  FR.readAsArrayBuffer(file.files[0]);
}

function excelfun1() {
  //Reference the FileUpload element.
  var fileUpload = document.getElementById("exinput");
  console.log(fileUpload.files[0],"Fileupload")

  //Validate whether File is valid Excel file.
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var FR = new FileReader();

          //For Browsers other than IE.
          if (FR.readAsBinaryString) {
              FR.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {type: 'array'});
                var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                
                // header: 1 instructs xlsx to create an 'array of arrays'
                field[4] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                
                // data preview
                $("#Result").empty()
                var output = document.getElementById('Result');
                output.innerHTML = field[4].length-1
              };
              FR.readAsArrayBuffer(fileUpload.files[0]);
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                  var data = "";
                  var bytes = new Uint8Array(e.target.result);
                  for (var i = 0; i < bytes.byteLength; i++) {
                      data += String.fromCharCode(bytes[i]);
                  }
                  console.log(data)
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
          }
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid Excel file.");
  }
};
 