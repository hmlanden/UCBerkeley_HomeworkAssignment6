
## WeatherPy: Weather Analysis Based on Latitude (6/12/2018)

Based on this analysis, latitude can only be used to predict temperature and demonstrates no relationship with a city's humidity, cloudiness, or wind speed.

To perform this analysis:
- To ensure a good sample of data, I generated 1,500 random, unique cities around the world using a combination of randomized latitude/longitude pairs and Citipy (to ensure I returned an actual city, not just a location on a map).
- To ensure that I didn't have false positives when determining if a city was a duplicate (for example, Bagdhad, Arizona and Baghdad, Iraq are two very different cities), I combined the city and county to create a hash of sorts.
- I pulled weather data that corresponded to those cities from OpenWeatherMap on 6/12/2018 at approximately 7:00 PM PST.


```python
# -----------------------------------------------------------------------------------
# Step 1: Import the modules 
# -----------------------------------------------------------------------------------
import seaborn as sns
import json
import datetime as dt
import matplotlib.pyplot as plt
import requests as req
import pandas as pd
import random as rd
from citipy import citipy
import localenv
import aux
```

## City Data


```python
# -----------------------------------------------------------------------------------
# Step 2: Store all our basic API data. I'd use params, but I couldn't get it to work
# with the unique structure of some of these parameters
# -----------------------------------------------------------------------------------

openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?"
```


```python
# -----------------------------------------------------------------------------------
# Step 3: Create a list of non-duplicate cities
# -----------------------------------------------------------------------------------
# create a list that we'll store all our data in
weatherData_list = []
city_list = []

# create dupe checking set
cityDupeChecker = set()

# create counter
i = 0

# create a list of 1500 possible cities (so even if a query fails still have good sample)
while len(cityDupeChecker) < 1500:
    
    # set random lat and long
    latitude = rd.uniform(-90.0,90.0)
    longitude = rd.uniform(-180.0,180.0)
    
    # get city
    city = citipy.nearest_city(latitude,longitude).city_name
    country = citipy.nearest_city(latitude,longitude).country_code
    city_country_pair = f"{city}_{country}"
    
    if city_country_pair not in cityDupeChecker:
        cityDupeChecker.add(city_country_pair)
        
        # try to pull in a random value and add to dupe checker
        city_list.append([city, country])

# -----------------------------------------------------------------------------------
# Step 4: Pull city data from openweatherapi
# -----------------------------------------------------------------------------------
for i in range(len(city_list)):
    
    # get current city and country
    city = city_list[i][0]
    country= city_list[i][1]
        
    # try searching by city + country code
    try:
        response = req.get(f"{openWeatherURL}q={city},{country}&units=imperial&APPID={localenv.api_key}").json()
        
        # add information from response to list
        weatherData_list.append({'cityID':response['id'],
                                 'date': dt.datetime.utcnow().strftime('%Y-%m-%d'),
                                 'time': dt.datetime.utcnow().strftime('%H:%M'),
                                 'city': response['name'],
                                 'country': country.upper(),
                                 'continent': aux.continentFromCountry(country.upper()),
                                 'latitude':response['coord']['lat'],
                                 'longitude':response['coord']['lon'],
                                 'humidity':response['main']['humidity'],
                                 'temperature':response['main']['temp'],
                                 'windSpeed':response['wind']['speed'],
                                 'cloudiness':response['clouds']['all'] })
        
        #show city
        #aux.displayProcessingCity(i,response)
    except:    
        try:
            response = req.get(f"{openWeatherURL}q={city}&units=metric&APPID={localenv.api_key}").json()
            
            # add information from response to list
            weatherData_list.append({'cityID':response['id'],
                                     'date': dt.datetime.now().strftime('%Y-%m-%d'),
                                     'time': dt.datetime.utcnow().strftime('%H:%M'),
                                     'city': response['name'],
                                     'country': response['main']['sys']['country'].upper(),
                                     'continent': aux.continentFromCountry(response['main']['sys']['country'].upper()),
                                     'latitude': response['coord']['lat'],
                                     'longitude': response['coord']['lon'],
                                     'humidity':response['main']['humidity'],
                                     'temperature':response['main']['temp'],
                                     'windSpeed':response['wind']['speed'],
                                     'cloudiness':response['clouds']['all']})
                                    
            #show city
            #aux.displayProcessingCity(i,response)
        except:
            #aux.displayFailedCity(i, city, country)
            pass
```


```python
# -----------------------------------------------------------------------------------
# Step 4: Create a pretty dataframe that we can reference because visual aids are
# the actual best thing ever and export a CSV we can hang onto
# -----------------------------------------------------------------------------------
cleanedWeather_df = pd.DataFrame(weatherData_list)

# rearrange columns sensibly
cleanedWeather_df = cleanedWeather_df[['cityID', 'date', 'time', 'city', 'country', 'continent',
                                       'latitude', 'longitude',
                                       'temperature', 
                                       'humidity', 
                                       'windSpeed',
                                       'cloudiness']].sort_index(ascending=True)

# export the csv
date = dt.datetime.now().strftime('%Y-%m-%d')
filename = f"csv/WeatherData{date}.csv"
cleanedWeather_df.to_csv(filename)
cleanedWeather_df.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>cityID</th>
      <th>date</th>
      <th>time</th>
      <th>city</th>
      <th>country</th>
      <th>continent</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>temperature</th>
      <th>humidity</th>
      <th>windSpeed</th>
      <th>cloudiness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3833367</td>
      <td>2018-06-13</td>
      <td>02:24</td>
      <td>Ushuaia</td>
      <td>AR</td>
      <td>South America</td>
      <td>-54.81</td>
      <td>-68.31</td>
      <td>35.60</td>
      <td>74</td>
      <td>8.05</td>
      <td>40</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2077963</td>
      <td>2018-06-13</td>
      <td>02:24</td>
      <td>Albany</td>
      <td>AU</td>
      <td>Oceania</td>
      <td>-35.02</td>
      <td>117.88</td>
      <td>58.71</td>
      <td>66</td>
      <td>10.87</td>
      <td>68</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2123814</td>
      <td>2018-06-13</td>
      <td>02:24</td>
      <td>Leningradskiy</td>
      <td>RU</td>
      <td>Europe</td>
      <td>69.38</td>
      <td>178.42</td>
      <td>38.01</td>
      <td>80</td>
      <td>9.42</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6165406</td>
      <td>2018-06-13</td>
      <td>02:24</td>
      <td>Thompson</td>
      <td>CA</td>
      <td>North America</td>
      <td>55.74</td>
      <td>-97.86</td>
      <td>64.40</td>
      <td>45</td>
      <td>5.82</td>
      <td>75</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5367788</td>
      <td>2018-06-13</td>
      <td>02:24</td>
      <td>Lompoc</td>
      <td>US</td>
      <td>North America</td>
      <td>34.64</td>
      <td>-120.46</td>
      <td>66.27</td>
      <td>82</td>
      <td>11.41</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



# Styling
To ensure a consistent look for the results, I established an overall color palette: husl, which is one of Seaborn's default palettes.


```python
# parse palette into hex codes
palette = sns.color_palette('husl', n_colors=6)
hexCodes = palette.as_hex()

# create palette dict
palette_dict = {'Africa':hexCodes[0],
                'Oceania':hexCodes[1],
                'Europe':hexCodes[2],
                'North America':hexCodes[3],
                'South America':hexCodes[4],
                'Asia':hexCodes[5]}

# show palette
sns.palplot(palette)
```


![png](output_7_0.png)


# Review Cities to Ensure Good Distribution
After pulling my dataset, I wanted to review my dataset to ensure that I had good coverage of the world. The simplest way to do this was to visualize the location of all cities in my dataset.


```python
import plotly.plotly as py
import plotly.graph_objs as go

data = [
    go.Scattermapbox(
        lat=cleanedWeather_df['latitude'],
        lon=cleanedWeather_df['longitude'],
        mode='markers',
        marker=dict(
            size=5,
            color='#5BAE7E',
            opacity=0.7
        ),
        text=cleanedWeather_df['city'] + ', ' + cleanedWeather_df['country'],
        hoverinfo='text'
    )]


layout = go.Layout(
    title= 'Cities Analyzed in Dataset',
    autosize=True,
    hovermode='closest',
    showlegend=False,
    mapbox=dict(
        accesstoken=localenv.mapbox_api_key,
        bearing=0,
        pitch=0,
        zoom=0.5,
        style='dark'
    ),
)

fig = dict(data=data, layout=layout)

py.iplot(fig, filename=f'datapoints {date}')
```




<div>
    <a href="https://plot.ly/~hmlanden518213085/14/?share_key=klq6CQqDp1bA9RSqRlUJxu" target="_blank" title="datapoints 2018-06-12" style="display: block; text-align: center;"><img src="https://plot.ly/~hmlanden518213085/14.png?share_key=klq6CQqDp1bA9RSqRlUJxu" alt="datapoints 2018-06-12" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>



# Plotting Our Data
## Latitude vs Temperature (F)
There is a definite relationship between latitude and temperature. As we approach the equator, or 0 degrees latitude, temperature increases.


```python
# -----------------------------------------------------------------------------------
# Step 5: Generate charts.
#  1) Temperature (F) vs. Latitude
#  2) Humidity (%) vs. Latitude
#  3) Cloudiness (%) vs. Latitude
#  4) Wind Speed (mph) vs. Latitude
# -----------------------------------------------------------------------------------
sns.set_style("darkgrid")
sns.set_context("notebook", font_scale=1.5, rc={"lines.linewidth": 2.5})

# Chart 1: Temperature vs Latitude
latVsTemp_plot = sns.lmplot(x='latitude', 
                            y='temperature', 
                            data=cleanedWeather_df,
                            hue='continent',
                            fit_reg=False, 
                            palette='husl')
plt.title("Latitude vs Temperature (Fahrenheit)")
plt.savefig("images/latXtemp.png")
plt.show()
```


![png](output_11_0.png)



```python
# generate plotly scatter by continent
africa_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Africa', 'latitude', 'temperature', palette_dict)
oceania_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Oceania', 'latitude', 'temperature', palette_dict)                                           
europe_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Europe', 'latitude', 'temperature', palette_dict)
northAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'North America', 'latitude','temperature', palette_dict)
southAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'South America', 'latitude', 'temperature', palette_dict)
asia_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Asia', 'latitude', 'temperature', palette_dict)

# combine into single data list
data = [africa_scatter, oceania_scatter, europe_scatter, 
        northAmerica_scatter, southAmerica_scatter, asia_scatter]

layout = dict(title = 'Latitude vs Temperature', 
              hovermode='closest',
              xaxis=dict(title='Latitude', 
                         autorange=True), 
              yaxis=dict(title='Temperature (F)', 
                         autorange=True))

# plot data
fig = dict(data=data, layout=layout)
py.iplot(fig, filename='latXtemp-fancy.png')
```




<div>
    <a href="https://plot.ly/~hmlanden518213085/6/?share_key=tHgvrLvYPCDbVCvVXAI8C4" target="_blank" title="latXtemp-fancy.png" style="display: block; text-align: center;"><img src="https://plot.ly/~hmlanden518213085/6.png?share_key=tHgvrLvYPCDbVCvVXAI8C4" alt="latXtemp-fancy.png" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>


## Latitude vs Humidity (%)
There is no relationship between latitude and humidity.


```python
# Chart 2: humidity vs Latitude
sns.set_style("darkgrid")
sns.set_context("notebook", font_scale=1.5, rc={"lines.linewidth": 2.5})

latVsTemp_plot = sns.lmplot(x='latitude', 
                            y='humidity', 
                            data=cleanedWeather_df,
                            hue='continent',
                            palette='husl',
                            fit_reg=False)
plt.title("Latitude vs Humidity (%)")
plt.savefig("images/latXhumid.png")
plt.show()
```


![png](output_14_0.png)



```python
# generate plotly scatter by continent
africa_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Africa', 'latitude', 'humidity', palette_dict)
oceania_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Oceania', 'latitude', 'humidity', palette_dict)                                           
europe_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Europe', 'latitude', 'humidity', palette_dict)
northAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'North America', 'latitude','humidity', palette_dict)
southAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'South America', 'latitude', 'humidity', palette_dict)
asia_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Asia', 'latitude', 'humidity', palette_dict)

# combine into single data list
data = [africa_scatter, oceania_scatter, europe_scatter, 
        northAmerica_scatter, southAmerica_scatter, asia_scatter]

layout = dict(title = 'Latitude vs Humidity', 
              hovermode='closest',
              xaxis=dict(title='Latitude', 
                         autorange=True), 
              yaxis=dict(title='Humidity (%)', 
                         autorange=True))

# plot data
fig = dict(data=data, layout=layout)
py.iplot(fig, filename='latXhum-fancy.png')
```




<div>
    <a href="https://plot.ly/~hmlanden518213085/16/?share_key=a5OaYy5ewzijz88Zem9WKR" target="_blank" title="latXhum-fancy.png" style="display: block; text-align: center;"><img src="https://plot.ly/~hmlanden518213085/16.png?share_key=a5OaYy5ewzijz88Zem9WKR" alt="latXhum-fancy.png" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>



## Latitude vs Cloudiness (%)
There is no relationship between latitude and cloudiness.


```python
# Chart 3: cloudiness vs Latitude
sns.set_style("darkgrid")
sns.set_context("notebook", font_scale=1.5, rc={"lines.linewidth": 2.5})

latVsTemp_plot = sns.lmplot(x='latitude', y='cloudiness', 
                            data=cleanedWeather_df,
                            hue='continent',
                            palette='husl',
                            fit_reg=False)
plt.title("Latitude vs Cloudiness")
plt.savefig("images/latXcloud.png")
plt.show()
```


![png](output_17_0.png)



```python
# generate plotly scatter by continent
africa_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Africa', 'latitude', 'cloudiness', palette_dict)
oceania_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Oceania', 'latitude', 'cloudiness', palette_dict)                                           
europe_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Europe', 'latitude', 'cloudiness', palette_dict)
northAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'North America', 'latitude','cloudiness', palette_dict)
southAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'South America', 'latitude', 'cloudiness', palette_dict)
asia_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Asia', 'latitude', 'cloudiness', palette_dict)

# combine into single data list
data = [africa_scatter, oceania_scatter, europe_scatter, 
        northAmerica_scatter, southAmerica_scatter, asia_scatter]

layout = dict(title = 'Latitude vs Cloudiness', 
              hovermode='closest',
              xaxis=dict(title='Latitude', 
                         autorange=True), 
              yaxis=dict(title='Cloudiness (%)', 
                         autorange=True))

# plot data
fig = dict(data=data, layout=layout)
py.iplot(fig, filename='latXcloud-fancy.png')
```




<div>
    <a href="https://plot.ly/~hmlanden518213085/18/?share_key=XXgM9fBNg3tNRXOiUBqxcB" target="_blank" title="latXcloud-fancy.png" style="display: block; text-align: center;"><img src="https://plot.ly/~hmlanden518213085/18.png?share_key=XXgM9fBNg3tNRXOiUBqxcB" alt="latXcloud-fancy.png" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>



## Latitude vs Wind Speed (MPH)
There is no apparent relationship between latitude and wind speed.


```python
# Chart 4: wind speed vs Latitude
sns.set_style("darkgrid")
sns.set_context("notebook", font_scale=1.5, rc={"lines.linewidth": 2.5})

latVsTemp_plot = sns.lmplot(x='latitude', y='windSpeed', 
                            data=cleanedWeather_df,
                            hue='continent',
                            palette='husl',
                            fit_reg=False)
plt.title("Latitude vs Wind Speed")
plt.savefig("images/latXwind.png")
plt.show()
```


![png](output_20_0.png)



```python
# generate plotly scatter by continent
africa_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Africa', 'latitude', 'windSpeed', palette_dict)
oceania_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Oceania', 'latitude', 'windSpeed', palette_dict)                                           
europe_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Europe', 'latitude', 'windSpeed', palette_dict)
northAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'North America', 'latitude','windSpeed', palette_dict)
southAmerica_scatter = aux.generateScatterPoints(cleanedWeather_df, 'South America', 'latitude', 'windSpeed', palette_dict)
asia_scatter = aux.generateScatterPoints(cleanedWeather_df, 'Asia', 'latitude', 'windSpeed', palette_dict)

# combine into single data list
data = [africa_scatter, oceania_scatter, europe_scatter, 
        northAmerica_scatter, southAmerica_scatter, asia_scatter]

layout = dict(title = 'Latitude vs Cloudiness', 
              hovermode='closest',
              xaxis=dict(title='Latitude', 
                         autorange=True), 
              yaxis=dict(title='Wind Speed (MPH)', 
                         autorange=True))

# plot data
fig = dict(data=data, layout=layout)
py.iplot(fig, filename='latXwind-fancy.png')
```




<div>
    <a href="https://plot.ly/~hmlanden518213085/20/?share_key=nHwXaZzVQRwn5yw5WwpdBK" target="_blank" title="latXwind-fancy.png" style="display: block; text-align: center;"><img src="https://plot.ly/~hmlanden518213085/20.png?share_key=nHwXaZzVQRwn5yw5WwpdBK" alt="latXwind-fancy.png" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>


