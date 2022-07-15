document.addEventListener("DOMContentLoaded", function(){
    // alert(localStorage.getItem("email"))
    document.getElementById("email").innerHTML = localStorage.getItem("email");
    document.getElementById("first_name").innerHTML = localStorage.getItem("first_name");
    document.getElementById("last_name").innerHTML = localStorage.getItem("last_name");
    
})


//This function either hides or displays the generation type
//options based on the quantity option
function get_quantity(){
    
    let quantity = document.querySelector("select[name=quantity]").value;
    let gen_type = document.querySelector("li[id=gen_type]");
    if(quantity == "type") gen_type.style.visibility = "visible";
    else gen_type.style.visibility = "hidden";

}

function logout(){
    window.location.assign("../SSO/SSO.html");
}
// let namex = sessionStorage.getItem("first_name");


// document.addEventListener("DOMContentLoaded", function () {
    //     let email = location.search.substring(1);
    //     // let a = first_last.split("|");
    //     // window.alert(email_query);
    //     // let email = a[0];
    //     // let last = a[1];
    //     // document.getElementById("first_last_name").innerHTML = "Hello " + email;
    //     // let quantity = document.getElementById("quantity")
    // let quantity = document.querySelector("select[name=quantity]").value;
    // let gen_type = document.querySelector("li[id=gen_type]");
    //     // alert(typeof(gen_type));  
    //     alert(quantity);  
    //     // if(quantity == "type"){
        //     //     alert("yo");
        //     // }
        
        //     //alert("Page Loaded...");
        
        
        
        


// })