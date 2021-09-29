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
    field[4] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    console.log(field[4])
    // data preview
    var output = document.getElementById('Result');
    
    output.innerHTML = "Total Consignment in Excel is "+(field[4].length-1)
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
 