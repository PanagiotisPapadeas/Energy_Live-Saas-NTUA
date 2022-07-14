// let namex = sessionStorage.getItem("first_name");

    
document.addEventListener("DOMContentLoaded", function () {
    let email = location.search.substring(1);
    // let a = first_last.split("|");
    // window.alert(email_query);
    // let email = a[0];
    // let last = a[1];
    // document.getElementById("first_last_name").innerHTML = "Hello " + email;
    // let quantity = document.getElementById("quantity")
    let quantity = document.querySelector("select[name=quantity]").value;
    let gen_type = document.querySelector("li[id=gen_type]");
    // alert(typeof(gen_type));  
    alert(quantity);  
    // if(quantity == "type"){
    //     alert("yo");
    // }
    
    //alert("Page Loaded...");

   


})