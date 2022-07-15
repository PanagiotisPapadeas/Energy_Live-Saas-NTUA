document.addEventListener("DOMContentLoaded", function(){
    // alert(localStorage.getItem("email"))
    document.getElementById("email").innerHTML = localStorage.getItem("email");
    document.getElementById("first_name").innerHTML = localStorage.getItem("first_name");
    document.getElementById("last_name").innerHTML = localStorage.getItem("last_name");
    
})

// const check1 = document.getElementById('Check1');
// const check2 = document.getElementById('Check2');
// const check3 = document.getElementById('Check3');
// const check4 = document.getElementById('dateupdate');
// const quantity = document.getElementById('quantity').innerHTML;
// const country = document.getElementById('country');

//This function either hides or displays the generation type
//options based on the quantity option
function get_quantity(){
    
    let quantity = document.querySelector("select[name=quantity]").value;
    let gen_type = document.querySelector("li[id=gen_type]");
    if (quantity == "Generation per type") gen_type.style.visibility = "visible";
    else gen_type.style.visibility = "hidden";

}

function logout(){
    window.location.assign("../SSO/SSO.html");
}

function plot(){
    Highcharts.chart('container', options);
}
function addElement(){
    data.push(Math.floor(Math.random()*1000))
    options.series[0].data = data;
    plot()
}
let userId =  1;
function addFromWeb(){
    const url = 'https://jsonplaceholder.typicode.com/todos/'+ userId;
    //console.log("1");
    fetch(url).then(response => response.json()).then(json => {
         //console.log(json.ind);
         //alert("1");
         userId++;
         data.push(json['id']*2000);
         options.series[0].data = data;
         plot()
    }
    )
}

function addFromWeb1(){
    const date1 = document.querySelector('input[name=date1]').value;
    const date2 = document.querySelector('input[name=date2]').value;
    console.log(date1);
    const quantity = document.getElementById('quantity').value;
    const country = document.getElementById('country').value;
    const gen_type = document.getElementById('gen').value;
    console.log(quantity);
    if (quantity == "Actual total load")
    var url = 'http://localhost:4002/totalload/'+country+'/'+date1+'/'+date2+'/';
    else 
    var url = 'http://localhost:4003/generation/'+country+'/'+gen_type+'/'+date1+'/'+date2+'/';
    console.log(url);
    //console.log("1");
    //alert("1");
    fetch(url).then(response => response.json()).then(json => {
         //console.log(json.ind);
         //alert("1");
         //console.log(json.list[0].TotalLoadValue)
         const quantity = document.getElementById('quantity').value;
         var x = (Object.keys(json.list).length)
         for (var i=0; i<x; i++){
         //console.log(json.list[i].TotalLoadValue);
         if  (quantity == "Actual total load")
             data.push(json.list[i].TotalLoadValue);
         else
             data.push(json.list[i].ActualGenerationOutput);
         }
         options.series[0].data = data;
         //x = quantity.innerHTML;
         const check1 = document.getElementById('Check1');
         const check2 = document.getElementById('Check2');
         const check3 = document.getElementById('Check3');
         const check4 = document.getElementById('dateupdate');
         //const quantity = document.getElementById('quantity').value;
         const country = document.getElementById('country').value;
         console.log(quantity);
         check1.innerText = quantity;
         check3.innerText = country;
         const gen_type = document.getElementById('gen').value;
         console.log(gen_type);
         check2.innerText = gen_type;
         if (quantity == "Actual total load") check2.innerText = "";
         try{check4.innerText = json.list[i-1].UpdateTime;}
         catch{alert("No values found!")}
         plot()
         data = [];
    }
    )
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
