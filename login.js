function validate(){
    location.replace("home.html")
    var username = document.getElementById("username").value;
    localStorage.setItem("user", username);
    var password = document.getElementById("password").value;
    
    if ( username == 1001 && password == 1001){
        var logginstatus = "logged_in"
    localStorage.setItem("logstatus", logginstatus)
    console.log("redirecting",logginstatus)
    location.replace("home.html")
    alert ("Login successfully");
    }
    else{
    // Decrementing by one.
    alert("Please try login with correct credentials");
    window.location.href = "http://dachserkpi.westus.cloudapp.azure.com/";

  
    }
    }

    document.querySelector("#myForm").addEventListener("submit", function(e){
        // Prevent the form from submitting
        e.preventDefault();
        // login() will be called when the form is submitted
        validate();
    });