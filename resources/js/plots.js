/* ------------------------------------------------
STEP 0.5:
Create global arrays to store data.
-------------------------------------------------*/
var africa_dateArray = [];
var africa_timeArray = [];
var africa_cityArray = [];
var africa_countryArray = [];
var africa_continentArray = [];
var africa_latitudeArray = [];
var africa_longitudeArray = [];
var africa_temperatureArray = [];
var africa_humidityArray = [];
var africa_windspeedArray = [];
var africa_cloudArray = [];

var oceania_dateArray = [];
var oceania_timeArray = [];
var oceania_cityArray = [];
var oceania_countryArray = [];
var oceania_continentArray = [];
var oceania_latitudeArray = [];
var oceania_longitudeArray = [];
var oceania_temperatureArray = [];
var oceania_humidityArray = [];
var oceania_windspeedArray = [];
var oceania_cloudArray = [];

var europe_dateArray = [];
var europe_timeArray = [];
var europe_cityArray = [];
var europe_countryArray = [];
var europe_continentArray = [];
var europe_latitudeArray = [];
var europe_longitudeArray = [];
var europe_temperatureArray = [];
var europe_humidityArray = [];
var europe_windspeedArray = [];
var europe_cloudArray = [];

var nAmerica_dateArray = [];
var nAmerica_timeArray = [];
var nAmerica_cityArray = [];
var nAmerica_countryArray = [];
var nAmerica_continentArray = [];
var nAmerica_latitudeArray = [];
var nAmerica_longitudeArray = [];
var nAmerica_temperatureArray = [];
var nAmerica_humidityArray = [];
var nAmerica_windspeedArray = [];
var nAmerica_cloudArray = [];

var sAmerica_dateArray = [];
var sAmerica_timeArray = [];
var sAmerica_cityArray = [];
var sAmerica_countryArray = [];
var sAmerica_continentArray = [];
var sAmerica_latitudeArray = [];
var sAmerica_longitudeArray = [];
var sAmerica_temperatureArray = [];
var sAmerica_humidityArray = [];
var sAmerica_windspeedArray = [];
var sAmerica_cloudArray = [];

var asia_dateArray = [];
var asia_timeArray = [];
var asia_cityArray = [];
var asia_countryArray = [];
var asia_continentArray = [];
var asia_latitudeArray = [];
var asia_longitudeArray = [];
var asia_temperatureArray = [];
var asia_humidityArray = [];
var asia_windspeedArray = [];
var asia_cloudArray = [];

/* ------------------------------------------------
STEP 1:
Create layout variable to be used in the Plotly 
graph.
-------------------------------------------------*/
var layout = {
    title: 'Latitude vs Temperature',
    xaxis: {
        title: 'Latitude'
    },
    yaxis: {
        title: 'Temperature'
    }
};


/* ------------------------------------------------
STEP 2:
Declare function to process data and update global
data arrays.
-------------------------------------------------*/
function processData(currentDataFile) {
    /* purge previous data if any*/
    africa_dateArray = [];
    africa_timeArray = [];
    africa_cityArray = [];
    africa_countryArray = [];
    africa_continentArray = [];
    africa_latitudeArray = [];
    africa_longitudeArray = [];
    africa_temperatureArray = [];
    africa_humidityArray = [];
    africa_windspeedArray = [];
    africa_cloudArray = [];

    oceania_dateArray = [];
    oceania_timeArray = [];
    oceania_cityArray = [];
    oceania_countryArray = [];
    oceania_continentArray = [];
    oceania_latitudeArray = [];
    oceania_longitudeArray = [];
    oceania_temperatureArray = [];
    oceania_humidityArray = [];
    oceania_windspeedArray = [];
    oceania_cloudArray = [];

    europe_dateArray = [];
    europe_timeArray = [];
    europe_cityArray = [];
    europe_countryArray = [];
    europe_continentArray = [];
    europe_latitudeArray = [];
    europe_longitudeArray = [];
    europe_temperatureArray = [];
    europe_humidityArray = [];
    europe_windspeedArray = [];
    europe_cloudArray = [];

    nAmerica_dateArray = [];
    nAmerica_timeArray = [];
    nAmerica_cityArray = [];
    nAmerica_countryArray = [];
    nAmerica_continentArray = [];
    nAmerica_latitudeArray = [];
    nAmerica_longitudeArray = [];
    nAmerica_temperatureArray = [];
    nAmerica_humidityArray = [];
    nAmerica_windspeedArray = [];
    nAmerica_cloudArray = [];

    sAmerica_dateArray = [];
    sAmerica_timeArray = [];
    sAmerica_cityArray = [];
    sAmerica_countryArray = [];
    sAmerica_continentArray = [];
    sAmerica_latitudeArray = [];
    sAmerica_longitudeArray = [];
    sAmerica_temperatureArray = [];
    sAmerica_humidityArray = [];
    sAmerica_windspeedArray = [];
    sAmerica_cloudArray = [];

    asia_dateArray = [];
    asia_timeArray = [];
    asia_cityArray = [];
    asia_countryArray = [];
    asia_continentArray = [];
    asia_latitudeArray = [];
    asia_longitudeArray = [];
    asia_temperatureArray = [];
    asia_humidityArray = [];
    asia_windspeedArray = [];
    asia_cloudArray = [];

    /* process data*/
    currentDataFile.forEach(function (data) {
        if (data.continent == 'Africa') {
            africa_dateArray.push(data.date);
            africa_timeArray.push(data.time);
            africa_cityArray.push(data.city);
            africa_countryArray.push(data.country);
            africa_continentArray.push(data.continent);
            africa_latitudeArray.push(data.latitude);
            africa_longitudeArray.push(data.longitude);
            africa_temperatureArray.push(data.temperature);
            africa_humidityArray.push(data.humidity);
            africa_windspeedArray.push(data.windSpeed);
            africa_cloudArray.push(data.cloudiness);
        } else if (data.continent == 'Oceania') {
            oceania_dateArray.push(data.date);
            oceania_timeArray.push(data.time);
            oceania_cityArray.push(data.city);
            oceania_countryArray.push(data.country);
            oceania_continentArray.push(data.continent);
            oceania_latitudeArray.push(data.latitude);
            oceania_longitudeArray.push(data.longitude);
            oceania_temperatureArray.push(data.temperature);
            oceania_humidityArray.push(data.humidity);
            oceania_windspeedArray.push(data.windSpeed);
            oceania_cloudArray.push(data.cloudiness);
        } else if (data.continent == 'Europe') {
            europe_dateArray.push(data.date);
            europe_timeArray.push(data.time);
            europe_cityArray.push(data.city);
            europe_countryArray.push(data.country);
            europe_continentArray.push(data.continent);
            europe_latitudeArray.push(data.latitude);
            europe_longitudeArray.push(data.longitude);
            europe_temperatureArray.push(data.temperature);
            europe_humidityArray.push(data.humidity);
            europe_windspeedArray.push(data.windSpeed);
            europe_cloudArray.push(data.cloudiness);
        } else if (data.continent == 'North America') {
            nAmerica_dateArray.push(data.date);
            nAmerica_timeArray.push(data.time);
            nAmerica_cityArray.push(data.city);
            nAmerica_countryArray.push(data.country);
            nAmerica_continentArray.push(data.continent);
            nAmerica_latitudeArray.push(data.latitude);
            nAmerica_longitudeArray.push(data.longitude);
            nAmerica_temperatureArray.push(data.temperature);
            nAmerica_humidityArray.push(data.humidity);
            nAmerica_windspeedArray.push(data.windSpeed);
            nAmerica_cloudArray.push(data.cloudiness);
        } else if (data.continent == 'South America') {
            sAmerica_dateArray.push(data.date);
            sAmerica_timeArray.push(data.time);
            sAmerica_cityArray.push(data.city);
            sAmerica_countryArray.push(data.country);
            sAmerica_continentArray.push(data.continent);
            sAmerica_latitudeArray.push(data.latitude);
            sAmerica_longitudeArray.push(data.longitude);
            sAmerica_temperatureArray.push(data.temperature);
            sAmerica_humidityArray.push(data.humidity);
            sAmerica_windspeedArray.push(data.windSpeed);
            sAmerica_cloudArray.push(data.cloudiness);
        } else if (data.continent == 'Asia') {
            asia_dateArray.push(data.date);
            asia_timeArray.push(data.time);
            asia_cityArray.push(data.city);
            asia_countryArray.push(data.country);
            asia_continentArray.push(data.continent);
            asia_latitudeArray.push(data.latitude);
            asia_longitudeArray.push(data.longitude);
            asia_temperatureArray.push(data.temperature);
            asia_humidityArray.push(data.humidity);
            asia_windspeedArray.push(data.windSpeed);
            asia_cloudArray.push(data.cloudiness);
        }
    });
}



/* ------------------------------------------------
STEP 3:
Declare function that takes in the name of the 
dataset the user has selected, changes the value 
of the current dataset, sends the name of the new
dataset to the ProcessData function to update the
global data arrays, then calls UpdatePlotly to 
display the results.
-------------------------------------------------*/
function getData(data) {
    var currentDataset;
    switch (data) {
        case "default":
            currentDataset = dataset_20180616;
            break;
        case "june15":
            currentDataset = dataset_20180615;
            break;
        case "june13":
            currentDataset = dataset_20180613;
            break;
        case "june12":
            currentDataset = dataset_20180612;
            break;
        case "june09":
            currentDataset = dataset_20180609;
            break;
        case "june08":
            currentDataset = dataset_20180608;
            break;
        case "june07":
            currentDataset = dataset_20180607;
            break;
    }
    processData(currentDataset);
    updatePlotly();
};




/* ------------------------------------------------
STEP 4:
Declare function to generate traces. Returns an 
array of traces to be used in a Plotly plot.
-------------------------------------------------*/
function generateTraces() {
    // set up scatters for temperature and latitude
    var trace = {
        x: africa_latitudeArray,
        y: africa_temperatureArray,
        name: 'Africa',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#F15775',
            size: 10
        }
    };

    var trace1 = {
        x: oceania_latitudeArray,
        y: oceania_temperatureArray,
        name: 'Oceania',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#AB8725',
            size: 10
        }
    };

    var trace2 = {
        x: europe_latitudeArray,
        y: europe_temperatureArray,
        name: 'Europe',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#42A426',
            size: 10
        }
    };

    var trace3 = {
        x: nAmerica_latitudeArray,
        y: nAmerica_temperatureArray,
        name: 'North America',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#2E9D93',
            size: 10
        }
    };

    var trace4 = {
        x: sAmerica_latitudeArray,
        y: sAmerica_temperatureArray,
        name: 'South America',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#3190E7',
            size: 10
        }
    };

    var trace5 = {
        x: asia_latitudeArray,
        y: asia_temperatureArray,
        name: 'Asia',
        type: 'scatter',
        showlegend: true,
        mode: 'markers',
        marker: {
            color: '#DD45F0',
            size: 10
        }
    };

    // set up arrays with all necessary data
    chartData = [trace, trace1, trace2, trace3, trace4, trace5];
    return chartData;
}



/* ------------------------------------------------
STEP 5:
Declare function that will update the Plotly graph
by purging the plot contents, then plotting a new
graph.
-------------------------------------------------*/
function updatePlotly() {
    var newTraces = generateTraces();
    Plotly.purge("plot");
    Plotly.plot("plot", newTraces, layout);
};

/* ------------------------------------------------
STEP 6:
Generate first plot/
-------------------------------------------------*/
processData(dataset_20180616);
updatePlotly();
