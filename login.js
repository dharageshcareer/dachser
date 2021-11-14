async function validate(){
    console.log("Validating")
    //location.replace("home.html")
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    loginurl="http://dachserkpi.westus.cloudapp.azure.com:5000/login?user_ID="+username+"&password="+password
    console.log(loginurl)
    const response = await fetch(loginurl);
    // Storing data in form of JSON
    var token = await response.json();
    console.log(token)
    if(token["access_token"]){
        alert("Token Received")
        console.log(token["access_token"])
        localStorage.setItem("user", username);
        localStorage.setItem("token",token["access_token"])
        location.replace('home.html')
    }
    else{
        alert("Please Login right credential")
    }
    
}

    document.querySelector("#myForm").addEventListener("submit", function(e){
        // Prevent the form from submitting
        e.preventDefault();
        // login() will be called when the form is submitted
        validate();
    });