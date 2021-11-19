var field=Array()
var logtoken

self.getToken = function() {
    return localStorage.getItem("jwttoken")
  }
logtoken=getToken()

$(document).ready(function() {
    
    //logtoken=localStorage.getItem("token")
    console.log("Loggin token is ",logtoken)
    
    if(logtoken){
            usernamestore=localStorage.getItem("user")
            console.log("stored uname is",usernamestore)
            console.log(localStorage.getItem("user"));
            $("#banner").empty();
            $("#banner").append("<h1>Welcome "+localStorage.getItem("user")+"</h1>")
            $("#field3").change(function() {
                    var select = $("#field3 option:selected").val(); //Getting selected Menu3
                    switch (select) {
                        case "Custom Import":
                        //appending option under Import;
                        $("#field4").empty(); // initialize empty
                        $.get("CustomImport.html", function( htmloptions) { //append option from html file
                        $("#field4").append(htmloptions);
                        });
                        break;
                        case "Custom Export":
                            //appending city option under Export;
                            $("#field4").empty(); // initialize empty
                            $.get("CustomExport.html", function( htmloptions) { //append option from html file
                            $("#field4").append(htmloptions);
                        });
                            break;
                    }
                });
                $("#field4").change(function() {
                
                    var select = $("#field4 option:selected").val(); //Getting selected Menu3
                    field[0] = $( "#field1" ).val();
                    field[1] = $( "#field2" ).val();
                    field[2] = $( "#field3" ).val();
                    field[3] = $( "#field4" ).val();
                    switch (select) {
                        case "Import_Declaration":
                        //appending option under Import;
                        
                        $("form").empty(); // initialize empty
                        
                        $("form").append("<p>Country:"+field[0]+"</p>");
                        $("form").append("<p>Branch:"+field[1]+"</p>");
                        $("form").append("<p>Team:"+field[2]+"</p>");
                        $.get("importform.html", function(htmloptions) { //append option from html file
                        $("form").append(htmloptions);
                        });
                        break; 
                        case "Arrival":
                        //appending option under Import;
                        $("form").empty(); // initialize empty
                        $.get("importform.html", function(htmloptions) { //append option from html file
                        $("form").append(htmloptions);
                        });
                        break;
                        case "Export_Declaration":
                        //appending option under Import;
                        $("form").empty(); // initialize empty
                        $.get("exportform.html", function(htmloptions) { //append option from html file
                        $("form").append(htmloptions);
                        });
                        break;
                        case "EAD":
                        //appending option under Import;
                        $("form").empty(); // initialize empty
                        $.get("exportform.html", function(htmloptions) { //append option from html file
                        $("form").append(htmloptions);
                        });
                        break;
                    }
                
        });
    }
    else{
        console.log(logtoken)
        alert ("Please Login...");
        location.replace("index.html")
    }
});
function goBack() {
    window.history.back()
  }

var x = 0;
var array = Array();

function add_element_to_array()
{
 array[x] = document.getElementById("text1").value;
 //alert("Element: " + array[x] + " Added at index " + x);
 display_array()
 x++;
 document.getElementById("text1").value = "";
 
}

function display_array()
{
   var e = "<p>";   
    
   for (var y=0; y<array.length; y++)
   {
    j=y+1
    e += "Consignment Number " + j + " = " + array[y] + "</p>";
   }
   console.log(e)
    $("#Result").empty(); // initialize empty
    $("#Result").append(e);
   
}
function clear_array()
{
    console.log(array)
    x=0
   array=[]  
   var e = "<p>Cleared add again</p>" 
   console.log(array)
   $("#exinput").empty()
    $("#Result").empty(); // initialize empty
    $("#Result").append(e);
   
}
var x2 = 0;
var array2 = Array();
function add_element_to_array2()
{
 array2[x2] = document.getElementById("text2").value;
 //alert("Element: " + array[x2] + " Added at index " + x);
 display_array2()
 document.getElementById("text2").value = "";
 
}

function display_array2()
{
   var e = "<p>";   
    
   for (var y=0; y<array2.length; y++)
   {
     e += "No of Lines = " + array2[y] + "</p>";
   }
   console.log(e)
    $("#Result2").empty(); // initialize empty
    $("#Result2").append(e);
   
}
function clear_array2()
{
    console.log(array2)
   x2=0
   array2=[]  
   var e = "<p>Cleared add again</p>" 
   console.log(array2)
    $("#Result2").empty(); // initialize empty
    $("#Result2").append(e);
   
}

async function checkresult(){
    //validation inputs
    flag=false
    userdet=localStorage.getItem("user")
    conslist0=field[4].slice(0,field[4].length)
    /*for(i=1;i<=field[4].length;i++){
        temp=field[4].slice(0,field[4].length);
        console.log(temp[i]);  
        connum=temp[i].length;
        console.log(i,connum)
        if(connum != 11){
            flag=true
            }
        }
        if(flag=true){
            alert("Consignment number digit check")
        }
        else{*/
    
    
    conslist0.shift()
    console.log("Consignment checking are",conslist0)
    S=conslist0.length
    x=5
    y=2
    n=array2[0]
    result=S * [x + (n*1/y)]
    result2=result/100
    console.log("num of cons is", S)
    console.log("num of line is is", n)
    brace="]"
    checkurl ="http://dachserkpi.westus.cloudapp.azure.com:5000/consignment?consignId=["+conslist0+"]"
    //checkurl ="http://127.0.0.1:5000/consignment?consignId=[8001]"
    console.log(checkurl)
    console.log("For checking below are tokens")
    console.log(logtoken)
    
    //await fetch(checkurl).then(response => response.json()).then(data => console.log(data));
    // Storing response
    const response = await fetch(checkurl, { headers: { Authorization: `Bearer ${logtoken}`}});
    //const response = await fetch(checkurl, { headers: { Authorization: localStorage.getItem("tokenrec")}});

    // Storing data in form of JSON
    var data = await response.json();
    
    console.log(data);
    conscheck=data
    console.log("cons check",conscheck)
    localStorage.setItem("consstatus",conscheck[0])
    localStorage.setItem("consdatadup", data)
    if (conscheck[0] == "unique"){

        insert(showresult);
    }
    else{
        showresult();
    }
}


async function insert(showresult){ 
    console.log("Data getting inserted")
    userdet=localStorage.getItem("user")
    conslist1=field[4].slice(0,field[4].length)
    conslist1.shift()
    insertUrl1="http://dachserkpi.westus.cloudapp.azure.com:5000/addconsignment?user_ID="+userdet+"&consignment=["+conslist1+"]&consignment_type="+field[3]
    
    console.log("inserted",conslist1)
    S=conslist1.length
    x=5
    y=2
    n=array2[0]
    result=S * [x + (n*1/y)]
    result2=result/100
    
    insertUrl2="http://dachserkpi.westus.cloudapp.azure.com:5000/addkpi?user_ID="+userdet+"&totalconsignment="+S+"&consignment_type="+field[3]+"&workingTime="+result+"&kpi="+result2
    await fetch(insertUrl1);
    await fetch(insertUrl2);
    showresult();
}

function showresult(){
    userdet=localStorage.getItem("user")
    console.log("showing field4",field[4])
    conslist2=field[4].slice(0,field[4].length)
    conslist2.shift()
    S=conslist2.length
    console.log("showing ",field[4],S,conslist2)
    x=5
    y=2
    n=array2[0]
    result=S * [x + (n*1/y)]
    result2=result/100
    console.log("S is", S)
    console.log("n is", n)
    var e="<button class='btn btn-danger' onclick=goBack()>Back</button>"
    
    $("form").empty(); // initialize empty
    $("form").append(e);
    $.get("result.html", function(htmloptions) { //append option from html file
        
        $("form").append(htmloptions);
        $("#uname").append(localStorage.getItem("user"));
        $("#Country").append(field[0]);
        $("#Branch").append(field[1]);
        $("#Team").append(field[2]);
        $("#Type").append(field[3]);
        $("form").append("<p>Total Consignments:"+conslist2.length+"</p>");
        $("form").append("<p>No of Lines:"+array2+"</p>");
        $("form").append("<p style='color:#00008B'><b>Working Time:</b>"+result+" Minutes</p>");
        $("form").append("<p style='color:#00008B'><b>KPI Units:</b>"+result2+"</p>");
        $("#status").append("<p>Checking Duplicates....</p>");
        if(localStorage.getItem("consstatus") == "unique"){
            $("#dupstatus").hide()
            $("#datainsstatus").empty();
            $("#datainsstatus").append("<p>New Entry Created Succesfully</p>");  
            console.log("No Duplicate Entry and data getting inserted");
        }
        else{
            $("#datainsstatus").hide()
            $("#dupstatus").empty();
            $("#dupstatus").append("<p>Duplicate entry Present,Please Remove and reupload</p>");  
            console.log("Duplicate Entry are there")
            consdups=localStorage.getItem("consdatadup");
            console.log(consdups)
            $("#dupstatus").append("<p>"+consdups+"</p>");
        }
        
        });
}

function submitresult(){
    
    var myItem = localStorage.getItem('user');
    var myItem2 = localStorage.getItem('jwttoken')
    localStorage.clear();
    localStorage.setItem('user',myItem);
    localStorage.setItem('jwttoken',myItem2);
    console.log(myItem,"username---------------------");
    $("form").empty(); // initialize empty
    $.get("loading.html", function(htmloptions) { //append option from html file
        $("form").append(htmloptions);
    });
    checkresult();
}
function logout(){
    console.log("logging out")
    localStorage.removeItem("jwttoken")
    location.replace("index.html")
}