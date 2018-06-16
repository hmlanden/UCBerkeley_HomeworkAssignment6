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

# -----------------------------------------------------------------------------------
# Step 2: Store all our basic API data. I'd use params, but I couldn't get it to work
# with the unique structure of some of these parameters
# -----------------------------------------------------------------------------------

openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?"

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
        
# -----------------------------------------------------------------------------------
# Step 4: Create a pretty csv
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
filename = f"../csv/WeatherData{date}.csv"
cleanedWeather_df.to_csv(filename)