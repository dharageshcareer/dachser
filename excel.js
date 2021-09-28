$("#exinput").on("change", function (e) {
  var file = e.target.files[0];
  // input canceled, return
  if (!file) return;
  
  var FR = new FileReader();
  FR.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {type: 'array'});
    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // header: 1 instructs xlsx to create an 'array of arrays'
    field[4] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    
    // data preview
    $("#Result").empty()
    var output = document.getElementById('Result');
    output.innerHTML = field[4]
  };
  FR.readAsArrayBuffer(file);
});
 