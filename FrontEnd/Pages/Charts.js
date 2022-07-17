document.addEventListener("DOMContentLoaded", function(){
    // alert(localStorage.getItem("email"))
    document.getElementById("email").innerHTML = localStorage.getItem("email");
    document.getElementById("first_name").innerHTML = localStorage.getItem("given_name");
    document.getElementById("last_name").innerHTML = localStorage.getItem("family_name");

    
})

//This function either hides or displays the generation type
//options based on the quantity option
function get_quantity(){
    
    let quantity = document.querySelector("select[name=quantity]").value;
    let gen_type = document.querySelector("li[id=gen_type]");
    if (quantity == "Generation per type") gen_type.style.visibility = "visible";
    else gen_type.style.visibility = "hidden";

}

function logout(){
    window.localStorage.clear();   
    // window.location.assign("../SSO/SSO.html");
    window.location.assign("index.html");
}

function goto_extend(){
    // window.location.assign("../ExtendPlan/Extend.html")
    window.location.assign("Extend.html")
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
//testing
function addFromWeb(){
    const url = 'https://jsonplaceholder.typicode.com/todos/'+ userId;
    //console.log("1");
    fetch(url).then(response => response.json()).then(json => {
         userId++;
         data.push(json['id']*2000);
         options.series[0].data = data;
         plot()
    }
    )
}

//get values from api microservices
function addFromWeb1(){
    const date1 = document.querySelector('input[name=date1]').value;
    const date2 = document.querySelector('input[name=date2]').value;
    console.log(date1);
    const quantity = document.getElementById('quantity').value;
    const country = document.getElementById('country').value;
    const gen_type = document.getElementById('gen').value;
    console.log(quantity);
    //url depending on quantity type
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
         const country1 = document.querySelector('option[value='+country+']').innerText;
        //  console.log(country1);
         check1.innerText = quantity;
         check3.innerText = country1;
         const gen_type = document.getElementById('gen').value;
        //  console.log(gen_type);
         check2.innerText = gen_type;
         if (quantity == "Actual total load") check2.innerText = "";
         try{check4.innerText = json.list[i-1].UpdateTime;}
         catch{alert("No values found!")}
         plot()
         data = [];
    }
    )
}



