//import fetch from "node-fetch";

/*const api = axios.create({
    baseURL: "http://localhost:4002/totalload/",
});*/

    let data = []
    let options = {

title: {
    text: 'Solar Employment Growth by Sector, 2010-2016'
},

subtitle: {
    text: 'Source: thesolarfoundation.com'
},

yAxis: {
    title: {
        text: 'Number of Employees'
    }
},

xAxis: {
    accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
    }
},

legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
},

plotOptions: {
    series: {
        label: {
            connectorAllowed: false
        },
        pointStart: 2010
    }
},

series: [{
    name: 'Installation',
    data: data
}],

responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
}

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
    /*function addFromWeb(){
        const url = 'https://jsonplaceholder.typicode.com/todos/'+ userId;
        //console.log("1");
        const res = api.get("DE/2000-01-01%2000:00:00/2030-01-01%2000:00:00/")
        .then(res => res.json()).then(json=> {
            //alert(res);
            console.log(json.ind);
    });*/
        /*fetch(url).then(response => response.json()).then(json => {
             //console.log(json.ind);
             //alert("1");
             data.push(json['id']*2000);
             options.series[0].data = data;
             plot()
        }
        )
    }*/
    function addFromWeb1(){
        const url = 'http://localhost:4002/totalload/DE/2000-01-01%2000:00:00/2030-01-01%2000:00:00/';
        //console.log("1");
        //alert("1");
        fetch(url).then(response => response.json()).then(json => {
             //console.log(json.ind);
             //alert("1");
             //console.log(json.ind);
             alert("1");
             data.push(json.ind*2000);
             options.series[0].data = data;
             plot()
        }
        )
    }
//addFromWeb1()