async function submit()
{
console.log("started execution")
sdate=document.getElementById("Start Date").value
edate=document.getElementById("End Date").value
team=document.getElementById("team").value
if (sdate <= edate)
{
  console.log(sdate,"start date",edate,"start date",team,"team")
  checkurl1 ="http://dachserkpi.westus.cloudapp.azure.com:5000/StartEndDate?team="+team+"&start_date="+sdate+"&end_date="+edate;
  
  console.log(checkurl1)
}
else
{
  
  alert("Start date should be less than end date");
  //document.getElementById("edate").value="";
}
//team="Custom Import"

console.log(sdate,"start date",edate,"start date",team,"team")
checkurl1 ="http://dachserkpi.westus.cloudapp.azure.com:5000/StartEndDate?team="+team+"&start_date="+sdate+"&end_date="+edate;

console.log(checkurl1)
const response = await fetch(checkurl1);
var data = await response.json();
console.log(data)
JSONToCSVConvertor(data, "KPI Report", true);
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.onload = function(e){ 
  jwttoken=localStorage.getItem("jwttoken")
  console.log("Loggin status is ",jwttoken)
  if(!jwttoken){
    alert ("Please Login...");
    location.replace("index.html")
  }
}

function logout(){
  console.log("logging out")
  logstatus="logged_out"
  localStorage.setItem("logstatus",jwttoken)
  location.replace("index.html")
}