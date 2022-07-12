//import fetch from "node-fetch";

function addFromWeb1(){
    const url = 'http://localhost:4002/totalload/DE/2000-01-01%2000:00:00/2030-01-01%2000:00:00/';
    fetch(url).then(response => response.json()).then(json => {
         console.log(json.list[0].TotalLoadValue);
         //data.push(json['ind']*2000);
         //options.series[0].data = data;
         //plot()
    }
    )
}
addFromWeb1()