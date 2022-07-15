document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("first_name").value = localStorage.getItem("given_name");
    document.getElementById("last_name").value = localStorage.getItem("family_name");
    document.getElementById("email").value = localStorage.getItem("email");
    // alert(localStorage.getItem("name"));
    // document.getElementById("first_name").innerHTML = localStorage.getItem("given_name");
    // alert(localStorage.getItem("first_name"));

})

function back(){
    window.location.assign("../Charts/Charts.html")
}