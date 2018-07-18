/* create arrays to store data 
var dateArray = [];
var timeArray = [];
var cityArray = [];
var countryArray = [];
var continentArray = [];
var latitudeArray = [];
var longitudeArray = [];
var temperatureArray = [];
var humidityArray = [];
var windspeedArray = [];
var cloudArray = [];

/* process data 
dataset_20180616.forEach(function (data) {
    dateArray.push(data.date);
    timeArray.push(data.time);
    cityArray.push(data.city);
    countryArray.push(data.country);
    continentArray.push(data.continent);
    latitudeArray.push(data.latitude);
    longitudeArray.push(data.longitude);
    temperatureArray.push(data.temperature);
    humidityArray.push(data.humidity);
    windspeedArray.push(data.windSpeed);
    cloudArray.push(data.cloudiness);
});

/* set up scatter

var trace = {
    x: latitudeArray,
    y: temperatureArray,
    name: 'Temperature',
    type: 'scatter',
    mode: 'markers',
    marker: {
        color: continentArray
    }
};

var layout = {
    title: 'Latitude vs Temperature'
};

Plotly.newPlot('plot', [trace], layout);

console.log("all done");*/
