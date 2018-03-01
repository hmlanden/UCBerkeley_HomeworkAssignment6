
# WeatherPy: Weather Analysis Based on Latitude (3/1/2018)

Based on this analysis, latitude can only be used to predict temperature and demonstrates no relationship with a city's humidity, cloudiness, or wind speed.

To perform this analysis:
- To ensure a good sample of data, I generated 1,000 random, unique cities around the world using a combination of randomized latitude/longitude pairs and Citipy (to ensure I returned an actual city, not just a location on a map).
- To ensure that I didn't have false positives when determining if a city was a duplicate (for example, Bagdhad, Arizona and Baghdad, Iraq are two very different cities), I used the unique ID that OpenWeatherMap assigns each city to eliminate my dupes.
- I pulled weather data that corresponded to those cities from OpenWeatherMap on 3/1/2018 at approximately 3:00 AM PST.


```python
# -----------------------------------------------------------------------------------
# Step 1: Import the modules 
# -----------------------------------------------------------------------------------
import seaborn as sns
import json
import matplotlib.pyplot as plt
import requests as req
import pandas as pd
import random as rd
from citipy import citipy
from localenv import apiKey

# also define my print function to make life cleaner
def displayProcessingCity(i,response):
    print(f"City #{i+1}")
    print(f"City URL: http://api.openweathermap.org/data/2.5/weather?id={response['id']}")
    print(f"City Name: {response['name']}")
    print(f"City ID: {response['id']}")
    print("----------------------------------------------------------------------------")  
```

## City Data


```python
# -----------------------------------------------------------------------------------
# Step 2: Store all our basic API data. I'd use params, but I couldn't get it to work
# with the unique structure of some of these parameters
# -----------------------------------------------------------------------------------

tempUnits = 'Imperial'
openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?"
```


```python
# -----------------------------------------------------------------------------------
# Step 3: Pull data based on city IDs 
# -----------------------------------------------------------------------------------
# create a list that we'll store all our data in
weatherData_list = []

# create dupe checking set
cityDupeChecker = set()

# create counter
i = 0

# loop through all the cities, pull data and add to dictionaries, and print requested log information
while len(cityDupeChecker) < 1000:
    
    # set random lat and long
    latitude = rd.uniform(-90.0,90.0)
    longitude = rd.uniform(-180.0,180.0)

    # try to pull in a random value
    city = [citipy.nearest_city(latitude,longitude).city_name, citipy.nearest_city(latitude,longitude).country_code]
    
    # set value for current city and country code so we don't have to keep calling for it
    currentCityName = city[0]
    currentCountryCode = city[1]

    # get response
    try:
        response = req.get(f"{openWeatherURL}q={currentCityName},{currentCountryCode}&units={tempUnits}&APPID={apiKey}").json()
        
        try:
            if response['id'] not in cityDupeChecker:
                #show city
                displayProcessingCity(i,response)
            
                #increment counter
                i+=1
            
                # add to dupe checker
                cityDupeChecker.add(response['id'])

                # add information from response to list
                weatherData_list.append({'ID':response['id'],'Name': response['name'],\
                                         'Latitude':response['coord']['lat'],\
                                         'Humidity (%)':response['main']['humidity'],\
                                         'Temperature (Fahrenheit)':response['main']['temp'],\
                                         'Wind Speed':response['wind']['speed'],\
                                         'Cloudiness':response['clouds']['all'] })
        except:
            pass
    except Exception:
        pass
    else:    
        response = req.get(f"{openWeatherURL}q={currentCityName}&units={tempUnits}&APPID={apiKey}").json()
        
        try:
            if response['id'] not in cityDupeChecker:
                 #show city
                displayProcessingCity(i,response)
            
                #increment counter
                i+=1
            
                # add to dupe checker
                cityDupeChecker.add(response['id'])

                # add information from response to list
                weatherData_list.append({'ID':response['id'],'Name': response['name'],\
                                         'Latitude':response['coord']['lat'],\
                                         'Humidity (%)':response['main']['humidity'],\
                                         'Temperature (Fahrenheit)':response['main']['temp'],\
                                         'Wind Speed':response['wind']['speed'],\
                                         'Cloudiness':response['clouds']['all'] })
        
        except:
            pass
```

    City #1
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3418910
    City Name: Upernavik
    City ID: 3418910
    ----------------------------------------------------------------------------
    City #2
    City URL: http://api.openweathermap.org/data/2.5/weather?id=889453
    City Name: Kadoma
    City ID: 889453
    ----------------------------------------------------------------------------
    City #3
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2075265
    City Name: Busselton
    City ID: 2075265
    ----------------------------------------------------------------------------
    City #4
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3833367
    City Name: Ushuaia
    City ID: 3833367
    ----------------------------------------------------------------------------
    City #5
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6201424
    City Name: Mataura
    City ID: 6201424
    ----------------------------------------------------------------------------
    City #6
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3463237
    City Name: Florianopolis
    City ID: 3463237
    ----------------------------------------------------------------------------
    City #7
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3874787
    City Name: Punta Arenas
    City ID: 3874787
    ----------------------------------------------------------------------------
    City #8
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3369157
    City Name: Cape Town
    City ID: 3369157
    ----------------------------------------------------------------------------
    City #9
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2206939
    City Name: Bluff
    City ID: 2206939
    ----------------------------------------------------------------------------
    City #10
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2175403
    City Name: Bluff
    City ID: 2175403
    ----------------------------------------------------------------------------
    City #11
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3429594
    City Name: Reconquista
    City ID: 3429594
    ----------------------------------------------------------------------------
    City #12
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5880568
    City Name: Bethel
    City ID: 5880568
    ----------------------------------------------------------------------------
    City #13
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4030556
    City Name: Rikitea
    City ID: 4030556
    ----------------------------------------------------------------------------
    City #14
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1633419
    City Name: Padang
    City ID: 1633419
    ----------------------------------------------------------------------------
    City #15
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2450173
    City Name: Taoudenni
    City ID: 2450173
    ----------------------------------------------------------------------------
    City #16
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3831208
    City Name: Qaanaaq
    City ID: 3831208
    ----------------------------------------------------------------------------
    City #17
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5855927
    City Name: Hilo
    City ID: 5855927
    ----------------------------------------------------------------------------
    City #18
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5563839
    City Name: Fortuna
    City ID: 5563839
    ----------------------------------------------------------------------------
    City #19
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2517679
    City Name: Fortuna
    City ID: 2517679
    ----------------------------------------------------------------------------
    City #20
    City URL: http://api.openweathermap.org/data/2.5/weather?id=964432
    City Name: Port Alfred
    City ID: 964432
    ----------------------------------------------------------------------------
    City #21
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5681948
    City Name: Fallon
    City ID: 5681948
    ----------------------------------------------------------------------------
    City #22
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1006984
    City Name: East London
    City ID: 1006984
    ----------------------------------------------------------------------------
    City #23
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3617154
    City Name: Puerto Cabezas
    City ID: 3617154
    ----------------------------------------------------------------------------
    City #24
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2163355
    City Name: Hobart
    City ID: 2163355
    ----------------------------------------------------------------------------
    City #25
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6089245
    City Name: Norman Wells
    City ID: 6089245
    ----------------------------------------------------------------------------
    City #26
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2618795
    City Name: Klaksvik
    City ID: 2618795
    ----------------------------------------------------------------------------
    City #27
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2077963
    City Name: Albany
    City ID: 2077963
    ----------------------------------------------------------------------------
    City #28
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5106834
    City Name: Albany
    City ID: 5106834
    ----------------------------------------------------------------------------
    City #29
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1279390
    City Name: Achalpur
    City ID: 1279390
    ----------------------------------------------------------------------------
    City #30
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3985168
    City Name: San Patricio
    City ID: 3985168
    ----------------------------------------------------------------------------
    City #31
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3437029
    City Name: San Patricio
    City ID: 3437029
    ----------------------------------------------------------------------------
    City #32
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2159220
    City Name: Mackay
    City ID: 2159220
    ----------------------------------------------------------------------------
    City #33
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5921525
    City Name: Mackay
    City ID: 5921525
    ----------------------------------------------------------------------------
    City #34
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5848280
    City Name: Kapaa
    City ID: 5848280
    ----------------------------------------------------------------------------
    City #35
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2136150
    City Name: Luganville
    City ID: 2136150
    ----------------------------------------------------------------------------
    City #36
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5871146
    City Name: Palmer
    City ID: 5871146
    ----------------------------------------------------------------------------
    City #37
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2067070
    City Name: Palmer
    City ID: 2067070
    ----------------------------------------------------------------------------
    City #38
    City URL: http://api.openweathermap.org/data/2.5/weather?id=7522928
    City Name: San Andres
    City ID: 7522928
    ----------------------------------------------------------------------------
    City #39
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1690438
    City Name: San Andres
    City ID: 1690438
    ----------------------------------------------------------------------------
    City #40
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3939168
    City Name: Huarmey
    City ID: 3939168
    ----------------------------------------------------------------------------
    City #41
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3355672
    City Name: Luderitz
    City ID: 3355672
    ----------------------------------------------------------------------------
    City #42
    City URL: http://api.openweathermap.org/data/2.5/weather?id=86049
    City Name: Jalu
    City ID: 86049
    ----------------------------------------------------------------------------
    City #43
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2208248
    City Name: Kaitangata
    City ID: 2208248
    ----------------------------------------------------------------------------
    City #44
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4031574
    City Name: Provideniya
    City ID: 4031574
    ----------------------------------------------------------------------------
    City #45
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2074865
    City Name: Carnarvon
    City ID: 2074865
    ----------------------------------------------------------------------------
    City #46
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1014034
    City Name: Carnarvon
    City ID: 1014034
    ----------------------------------------------------------------------------
    City #47
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5861897
    City Name: Fairbanks
    City ID: 5861897
    ----------------------------------------------------------------------------
    City #48
    City URL: http://api.openweathermap.org/data/2.5/weather?id=448149
    City Name: Sinjar
    City ID: 448149
    ----------------------------------------------------------------------------
    City #49
    City URL: http://api.openweathermap.org/data/2.5/weather?id=174611
    City Name: Sinjar
    City ID: 174611
    ----------------------------------------------------------------------------
    City #50
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6185377
    City Name: Yellowknife
    City ID: 6185377
    ----------------------------------------------------------------------------
    City #51
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3573197
    City Name: Hamilton
    City ID: 3573197
    ----------------------------------------------------------------------------
    City #52
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1881727
    City Name: Baisha
    City ID: 1881727
    ----------------------------------------------------------------------------
    City #53
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2411397
    City Name: Georgetown
    City ID: 2411397
    ----------------------------------------------------------------------------
    City #54
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3378644
    City Name: Georgetown
    City ID: 3378644
    ----------------------------------------------------------------------------
    City #55
    City URL: http://api.openweathermap.org/data/2.5/weather?id=935215
    City Name: Saint-Philippe
    City ID: 935215
    ----------------------------------------------------------------------------
    City #56
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6138908
    City Name: Saint-Philippe
    City ID: 6138908
    ----------------------------------------------------------------------------
    City #57
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4001956
    City Name: La Huacana
    City ID: 4001956
    ----------------------------------------------------------------------------
    City #58
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1507390
    City Name: Dikson
    City ID: 1507390
    ----------------------------------------------------------------------------
    City #59
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3372707
    City Name: Ribeira Grande
    City ID: 3372707
    ----------------------------------------------------------------------------
    City #60
    City URL: http://api.openweathermap.org/data/2.5/weather?id=540761
    City Name: Kropotkin
    City ID: 540761
    ----------------------------------------------------------------------------
    City #61
    City URL: http://api.openweathermap.org/data/2.5/weather?id=934322
    City Name: Mahebourg
    City ID: 934322
    ----------------------------------------------------------------------------
    City #62
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2662689
    City Name: Visby
    City ID: 2662689
    ----------------------------------------------------------------------------
    City #63
    City URL: http://api.openweathermap.org/data/2.5/weather?id=118994
    City Name: Rafsanjan
    City ID: 118994
    ----------------------------------------------------------------------------
    City #64
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2087894
    City Name: Rabaul
    City ID: 2087894
    ----------------------------------------------------------------------------
    City #65
    City URL: http://api.openweathermap.org/data/2.5/weather?id=737611
    City Name: Yenisehir
    City ID: 737611
    ----------------------------------------------------------------------------
    City #66
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2126123
    City Name: Chokurdakh
    City ID: 2126123
    ----------------------------------------------------------------------------
    City #67
    City URL: http://api.openweathermap.org/data/2.5/weather?id=214575
    City Name: Kampene
    City ID: 214575
    ----------------------------------------------------------------------------
    City #68
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3908339
    City Name: Patacamaya
    City ID: 3908339
    ----------------------------------------------------------------------------
    City #69
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4035715
    City Name: Avarua
    City ID: 4035715
    ----------------------------------------------------------------------------
    City #70
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1797551
    City Name: Qinzhou
    City ID: 1797551
    ----------------------------------------------------------------------------
    City #71
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5594956
    City Name: Hailey
    City ID: 5594956
    ----------------------------------------------------------------------------
    City #72
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3621607
    City Name: Santa Cruz
    City ID: 3621607
    ----------------------------------------------------------------------------
    City #73
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5393052
    City Name: Santa Cruz
    City ID: 5393052
    ----------------------------------------------------------------------------
    City #74
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3471451
    City Name: Arraial do Cabo
    City ID: 3471451
    ----------------------------------------------------------------------------
    City #75
    City URL: http://api.openweathermap.org/data/2.5/weather?id=101312
    City Name: Turayf
    City ID: 101312
    ----------------------------------------------------------------------------
    City #76
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2063036
    City Name: Port Lincoln
    City ID: 2063036
    ----------------------------------------------------------------------------
    City #77
    City URL: http://api.openweathermap.org/data/2.5/weather?id=578842
    City Name: Bashmakovo
    City ID: 578842
    ----------------------------------------------------------------------------
    City #78
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2633553
    City Name: Workington
    City ID: 2633553
    ----------------------------------------------------------------------------
    City #79
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122614
    City Name: Ekhabi
    City ID: 2122614
    ----------------------------------------------------------------------------
    City #80
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6167817
    City Name: Torbay
    City ID: 6167817
    ----------------------------------------------------------------------------
    City #81
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1011918
    City Name: Danielskuil
    City ID: 1011918
    ----------------------------------------------------------------------------
    City #82
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4407665
    City Name: Kodiak
    City ID: 4407665
    ----------------------------------------------------------------------------
    City #83
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2110227
    City Name: Butaritari
    City ID: 2110227
    ----------------------------------------------------------------------------
    City #84
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1106677
    City Name: Bambous Virieux
    City ID: 1106677
    ----------------------------------------------------------------------------
    City #85
    City URL: http://api.openweathermap.org/data/2.5/weather?id=88533
    City Name: Awjilah
    City ID: 88533
    ----------------------------------------------------------------------------
    City #86
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013918
    City Name: Ust-Maya
    City ID: 2013918
    ----------------------------------------------------------------------------
    City #87
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4267710
    City Name: Sitka
    City ID: 4267710
    ----------------------------------------------------------------------------
    City #88
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2173125
    City Name: Burnie
    City ID: 2173125
    ----------------------------------------------------------------------------
    City #89
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3883457
    City Name: Lebu
    City ID: 3883457
    ----------------------------------------------------------------------------
    City #90
    City URL: http://api.openweathermap.org/data/2.5/weather?id=344979
    City Name: Lebu
    City ID: 344979
    ----------------------------------------------------------------------------
    City #91
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2112802
    City Name: Hasaki
    City ID: 2112802
    ----------------------------------------------------------------------------
    City #92
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3652764
    City Name: Puerto Ayora
    City ID: 3652764
    ----------------------------------------------------------------------------
    City #93
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1806881
    City Name: Huicheng
    City ID: 1806881
    ----------------------------------------------------------------------------
    City #94
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2449893
    City Name: Tessalit
    City ID: 2449893
    ----------------------------------------------------------------------------
    City #95
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4020109
    City Name: Atuona
    City ID: 4020109
    ----------------------------------------------------------------------------
    City #96
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2022572
    City Name: Khatanga
    City ID: 2022572
    ----------------------------------------------------------------------------
    City #97
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3572640
    City Name: Clarence Town
    City ID: 3572640
    ----------------------------------------------------------------------------
    City #98
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2171465
    City Name: Clarence Town
    City ID: 2171465
    ----------------------------------------------------------------------------
    City #99
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2446796
    City Name: Bilma
    City ID: 2446796
    ----------------------------------------------------------------------------
    City #100
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013465
    City Name: Verkhoyansk
    City ID: 2013465
    ----------------------------------------------------------------------------
    City #101
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374210
    City Name: Sao Filipe
    City ID: 3374210
    ----------------------------------------------------------------------------
    City #102
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6690296
    City Name: Saint-Joseph
    City ID: 6690296
    ----------------------------------------------------------------------------
    City #103
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3037456
    City Name: Saint-Joseph
    City ID: 3037456
    ----------------------------------------------------------------------------
    City #104
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2155415
    City Name: New Norfolk
    City ID: 2155415
    ----------------------------------------------------------------------------
    City #105
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4231997
    City Name: Avera
    City ID: 4231997
    ----------------------------------------------------------------------------
    City #106
    City URL: http://api.openweathermap.org/data/2.5/weather?id=779554
    City Name: Honningsvag
    City ID: 779554
    ----------------------------------------------------------------------------
    City #107
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5983720
    City Name: Iqaluit
    City ID: 5983720
    ----------------------------------------------------------------------------
    City #108
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3837213
    City Name: San Juan
    City ID: 3837213
    ----------------------------------------------------------------------------
    City #109
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4568138
    City Name: San Juan
    City ID: 4568138
    ----------------------------------------------------------------------------
    City #110
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374346
    City Name: Ponta do Sol
    City ID: 3374346
    ----------------------------------------------------------------------------
    City #111
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3453439
    City Name: Ponta do Sol
    City ID: 3453439
    ----------------------------------------------------------------------------
    City #112
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1495626
    City Name: Pangody
    City ID: 1495626
    ----------------------------------------------------------------------------
    City #113
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1140026
    City Name: Herat
    City ID: 1140026
    ----------------------------------------------------------------------------
    City #114
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3865086
    City Name: Bahia Blanca
    City ID: 3865086
    ----------------------------------------------------------------------------
    City #115
    City URL: http://api.openweathermap.org/data/2.5/weather?id=98182
    City Name: Baghdad
    City ID: 98182
    ----------------------------------------------------------------------------
    City #116
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5397664
    City Name: South Lake Tahoe
    City ID: 5397664
    ----------------------------------------------------------------------------
    City #117
    City URL: http://api.openweathermap.org/data/2.5/weather?id=546105
    City Name: Nikolskoye
    City ID: 546105
    ----------------------------------------------------------------------------
    City #118
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2236967
    City Name: Soyo
    City ID: 2236967
    ----------------------------------------------------------------------------
    City #119
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2417988
    City Name: Macenta
    City ID: 2417988
    ----------------------------------------------------------------------------
    City #120
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3366880
    City Name: Hermanus
    City ID: 3366880
    ----------------------------------------------------------------------------
    City #121
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6111696
    City Name: Port-Cartier
    City ID: 6111696
    ----------------------------------------------------------------------------
    City #122
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4014109
    City Name: Choix
    City ID: 4014109
    ----------------------------------------------------------------------------
    City #123
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3466980
    City Name: Caravelas
    City ID: 3466980
    ----------------------------------------------------------------------------
    City #124
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3443061
    City Name: Chuy
    City ID: 3443061
    ----------------------------------------------------------------------------
    City #125
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3899695
    City Name: Ancud
    City ID: 3899695
    ----------------------------------------------------------------------------
    City #126
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3421765
    City Name: Nanortalik
    City ID: 3421765
    ----------------------------------------------------------------------------
    City #127
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4011743
    City Name: Constitucion
    City ID: 4011743
    ----------------------------------------------------------------------------
    City #128
    City URL: http://api.openweathermap.org/data/2.5/weather?id=468486
    City Name: Yazykovo
    City ID: 468486
    ----------------------------------------------------------------------------
    City #129
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4034188
    City Name: Moerai
    City ID: 4034188
    ----------------------------------------------------------------------------
    City #130
    City URL: http://api.openweathermap.org/data/2.5/weather?id=331259
    City Name: Mega
    City ID: 331259
    ----------------------------------------------------------------------------
    City #131
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2152668
    City Name: Portland
    City ID: 2152668
    ----------------------------------------------------------------------------
    City #132
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5746545
    City Name: Portland
    City ID: 5746545
    ----------------------------------------------------------------------------
    City #133
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5847411
    City Name: Kahului
    City ID: 5847411
    ----------------------------------------------------------------------------
    City #134
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2094342
    City Name: Kavieng
    City ID: 2094342
    ----------------------------------------------------------------------------
    City #135
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6138501
    City Name: Saint-Augustin
    City ID: 6138501
    ----------------------------------------------------------------------------
    City #136
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3031582
    City Name: Saint-Augustin
    City ID: 3031582
    ----------------------------------------------------------------------------
    City #137
    City URL: http://api.openweathermap.org/data/2.5/weather?id=493040
    City Name: Sigayevo
    City ID: 493040
    ----------------------------------------------------------------------------
    City #138
    City URL: http://api.openweathermap.org/data/2.5/weather?id=723559
    City Name: Snina
    City ID: 723559
    ----------------------------------------------------------------------------
    City #139
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2126199
    City Name: Cherskiy
    City ID: 2126199
    ----------------------------------------------------------------------------
    City #140
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2274275
    City Name: Robertsport
    City ID: 2274275
    ----------------------------------------------------------------------------
    City #141
    City URL: http://api.openweathermap.org/data/2.5/weather?id=964712
    City Name: Plettenberg Bay
    City ID: 964712
    ----------------------------------------------------------------------------
    City #142
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1282256
    City Name: Hithadhoo
    City ID: 1282256
    ----------------------------------------------------------------------------
    City #143
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2034615
    City Name: Tahe
    City ID: 2034615
    ----------------------------------------------------------------------------
    City #144
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5180119
    City Name: Berwick
    City ID: 5180119
    ----------------------------------------------------------------------------
    City #145
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2128975
    City Name: Nemuro
    City ID: 2128975
    ----------------------------------------------------------------------------
    City #146
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6165406
    City Name: Thompson
    City ID: 6165406
    ----------------------------------------------------------------------------
    City #147
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1861416
    City Name: Ishigaki
    City ID: 1861416
    ----------------------------------------------------------------------------
    City #148
    City URL: http://api.openweathermap.org/data/2.5/weather?id=884927
    City Name: Mutoko
    City ID: 884927
    ----------------------------------------------------------------------------
    City #149
    City URL: http://api.openweathermap.org/data/2.5/weather?id=133595
    City Name: Lar
    City ID: 133595
    ----------------------------------------------------------------------------
    City #150
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3985710
    City Name: Cabo San Lucas
    City ID: 3985710
    ----------------------------------------------------------------------------
    City #151
    City URL: http://api.openweathermap.org/data/2.5/weather?id=942511
    City Name: Vryburg
    City ID: 942511
    ----------------------------------------------------------------------------
    City #152
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3370903
    City Name: Jamestown
    City ID: 3370903
    ----------------------------------------------------------------------------
    City #153
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2069194
    City Name: Jamestown
    City ID: 2069194
    ----------------------------------------------------------------------------
    City #154
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1015776
    City Name: Bredasdorp
    City ID: 1015776
    ----------------------------------------------------------------------------
    City #155
    City URL: http://api.openweathermap.org/data/2.5/weather?id=715259
    City Name: Szikszo
    City ID: 715259
    ----------------------------------------------------------------------------
    City #156
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2065594
    City Name: Mount Isa
    City ID: 2065594
    ----------------------------------------------------------------------------
    City #157
    City URL: http://api.openweathermap.org/data/2.5/weather?id=964420
    City Name: Port Elizabeth
    City ID: 964420
    ----------------------------------------------------------------------------
    City #158
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4501427
    City Name: Port Elizabeth
    City ID: 4501427
    ----------------------------------------------------------------------------
    City #159
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6144312
    City Name: Sept-Iles
    City ID: 6144312
    ----------------------------------------------------------------------------
    City #160
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2121909
    City Name: Poronaysk
    City ID: 2121909
    ----------------------------------------------------------------------------
    City #161
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6255012
    City Name: Flinders
    City ID: 6255012
    ----------------------------------------------------------------------------
    City #162
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1516589
    City Name: Zhezkazgan
    City ID: 1516589
    ----------------------------------------------------------------------------
    City #163
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1732663
    City Name: Raub
    City ID: 1732663
    ----------------------------------------------------------------------------
    City #164
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4031637
    City Name: Lavrentiya
    City ID: 4031637
    ----------------------------------------------------------------------------
    City #165
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3435264
    City Name: Concepcion del Uruguay
    City ID: 3435264
    ----------------------------------------------------------------------------
    City #166
    City URL: http://api.openweathermap.org/data/2.5/weather?id=7671223
    City Name: Kloulklubed
    City ID: 7671223
    ----------------------------------------------------------------------------
    City #167
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3904666
    City Name: San Jose
    City ID: 3904666
    ----------------------------------------------------------------------------
    City #168
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1689431
    City Name: San Jose
    City ID: 1689431
    ----------------------------------------------------------------------------
    City #169
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3380290
    City Name: Sinnamary
    City ID: 3380290
    ----------------------------------------------------------------------------
    City #170
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3939761
    City Name: Hualmay
    City ID: 3939761
    ----------------------------------------------------------------------------
    City #171
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6170031
    City Name: Tuktoyaktuk
    City ID: 6170031
    ----------------------------------------------------------------------------
    City #172
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3359736
    City Name: Vredendal
    City ID: 3359736
    ----------------------------------------------------------------------------
    City #173
    City URL: http://api.openweathermap.org/data/2.5/weather?id=504717
    City Name: Filimonovo
    City ID: 504717
    ----------------------------------------------------------------------------
    City #174
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2092164
    City Name: Lorengau
    City ID: 2092164
    ----------------------------------------------------------------------------
    City #175
    City URL: http://api.openweathermap.org/data/2.5/weather?id=57000
    City Name: Hobyo
    City ID: 57000
    ----------------------------------------------------------------------------
    City #176
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4944903
    City Name: Nantucket
    City ID: 4944903
    ----------------------------------------------------------------------------
    City #177
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1728675
    City Name: Balabac
    City ID: 1728675
    ----------------------------------------------------------------------------
    City #178
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3573703
    City Name: Scarborough
    City ID: 3573703
    ----------------------------------------------------------------------------
    City #179
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2638419
    City Name: Scarborough
    City ID: 2638419
    ----------------------------------------------------------------------------
    City #180
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5894033
    City Name: Barraute
    City ID: 5894033
    ----------------------------------------------------------------------------
    City #181
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1637001
    City Name: Biak
    City ID: 1637001
    ----------------------------------------------------------------------------
    City #182
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1071296
    City Name: Antalaha
    City ID: 1071296
    ----------------------------------------------------------------------------
    City #183
    City URL: http://api.openweathermap.org/data/2.5/weather?id=933995
    City Name: Souillac
    City ID: 933995
    ----------------------------------------------------------------------------
    City #184
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3026644
    City Name: Souillac
    City ID: 3026644
    ----------------------------------------------------------------------------
    City #185
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4032243
    City Name: Vaini
    City ID: 4032243
    ----------------------------------------------------------------------------
    City #186
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1273574
    City Name: Vaini
    City ID: 1273574
    ----------------------------------------------------------------------------
    City #187
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2255564
    City Name: Ouesso
    City ID: 2255564
    ----------------------------------------------------------------------------
    City #188
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3183284
    City Name: Alghero
    City ID: 3183284
    ----------------------------------------------------------------------------
    City #189
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3448903
    City Name: Sao Joao da Barra
    City ID: 3448903
    ----------------------------------------------------------------------------
    City #190
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3359638
    City Name: Walvis Bay
    City ID: 3359638
    ----------------------------------------------------------------------------
    City #191
    City URL: http://api.openweathermap.org/data/2.5/weather?id=515873
    City Name: Oktyabrskiy
    City ID: 515873
    ----------------------------------------------------------------------------
    City #192
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3395458
    City Name: Maragogi
    City ID: 3395458
    ----------------------------------------------------------------------------
    City #193
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374333
    City Name: Praia
    City ID: 3374333
    ----------------------------------------------------------------------------
    City #194
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3460954
    City Name: Praia
    City ID: 3460954
    ----------------------------------------------------------------------------
    City #195
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3351663
    City Name: Benguela
    City ID: 3351663
    ----------------------------------------------------------------------------
    City #196
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2121385
    City Name: Severo-Kurilsk
    City ID: 2121385
    ----------------------------------------------------------------------------
    City #197
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122090
    City Name: Pevek
    City ID: 2122090
    ----------------------------------------------------------------------------
    City #198
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1267390
    City Name: Kavaratti
    City ID: 1267390
    ----------------------------------------------------------------------------
    City #199
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1514792
    City Name: Gazojak
    City ID: 1514792
    ----------------------------------------------------------------------------
    City #200
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122389
    City Name: Ossora
    City ID: 2122389
    ----------------------------------------------------------------------------
    City #201
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2141714
    City Name: Bourail
    City ID: 2141714
    ----------------------------------------------------------------------------
    City #202
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3416888
    City Name: Grindavik
    City ID: 3416888
    ----------------------------------------------------------------------------
    City #203
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013639
    City Name: Verkhnevilyuysk
    City ID: 2013639
    ----------------------------------------------------------------------------
    City #204
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2014624
    City Name: Udachnyy
    City ID: 2014624
    ----------------------------------------------------------------------------
    City #205
    City URL: http://api.openweathermap.org/data/2.5/weather?id=777019
    City Name: Vardo
    City ID: 777019
    ----------------------------------------------------------------------------
    City #206
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4372777
    City Name: Vardo
    City ID: 4372777
    ----------------------------------------------------------------------------
    City #207
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2136825
    City Name: Isangel
    City ID: 2136825
    ----------------------------------------------------------------------------
    City #208
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6355222
    City Name: Yulara
    City ID: 6355222
    ----------------------------------------------------------------------------
    City #209
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4034551
    City Name: Faanui
    City ID: 4034551
    ----------------------------------------------------------------------------
    City #210
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3520994
    City Name: Puerto Escondido
    City ID: 3520994
    ----------------------------------------------------------------------------
    City #211
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1651810
    City Name: Airai
    City ID: 1651810
    ----------------------------------------------------------------------------
    City #212
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3569907
    City Name: Saint-Pierre
    City ID: 3569907
    ----------------------------------------------------------------------------
    City #213
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2995603
    City Name: Saint-Pierre
    City ID: 2995603
    ----------------------------------------------------------------------------
    City #214
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3354077
    City Name: Opuwo
    City ID: 3354077
    ----------------------------------------------------------------------------
    City #215
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6111862
    City Name: Port Hardy
    City ID: 6111862
    ----------------------------------------------------------------------------
    City #216
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1698289
    City Name: Pundaguitan
    City ID: 1698289
    ----------------------------------------------------------------------------
    City #217
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2094027
    City Name: Kieta
    City ID: 2094027
    ----------------------------------------------------------------------------
    City #218
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3663503
    City Name: Manicore
    City ID: 3663503
    ----------------------------------------------------------------------------
    City #219
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5110292
    City Name: Brookhaven
    City ID: 5110292
    ----------------------------------------------------------------------------
    City #220
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374083
    City Name: Bathsheba
    City ID: 3374083
    ----------------------------------------------------------------------------
    City #221
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6148373
    City Name: Sioux Lookout
    City ID: 6148373
    ----------------------------------------------------------------------------
    City #222
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1268480
    City Name: Kalamnuri
    City ID: 1268480
    ----------------------------------------------------------------------------
    City #223
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4033557
    City Name: Tautira
    City ID: 4033557
    ----------------------------------------------------------------------------
    City #224
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3403687
    City Name: Camocim
    City ID: 3403687
    ----------------------------------------------------------------------------
    City #225
    City URL: http://api.openweathermap.org/data/2.5/weather?id=478757
    City Name: Uren
    City ID: 478757
    ----------------------------------------------------------------------------
    City #226
    City URL: http://api.openweathermap.org/data/2.5/weather?id=241131
    City Name: Victoria
    City ID: 241131
    ----------------------------------------------------------------------------
    City #227
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1733782
    City Name: Victoria
    City ID: 1733782
    ----------------------------------------------------------------------------
    City #228
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3430443
    City Name: Necochea
    City ID: 3430443
    ----------------------------------------------------------------------------
    City #229
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1638775
    City Name: Payo
    City ID: 1638775
    ----------------------------------------------------------------------------
    City #230
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3430709
    City Name: Mercedes
    City ID: 3430709
    ----------------------------------------------------------------------------
    City #231
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3441684
    City Name: Mercedes
    City ID: 3441684
    ----------------------------------------------------------------------------
    City #232
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1688687
    City Name: San Quintin
    City ID: 1688687
    ----------------------------------------------------------------------------
    City #233
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2180815
    City Name: Tuatapere
    City ID: 2180815
    ----------------------------------------------------------------------------
    City #234
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2270385
    City Name: Camacha
    City ID: 2270385
    ----------------------------------------------------------------------------
    City #235
    City URL: http://api.openweathermap.org/data/2.5/weather?id=547831
    City Name: Kizner
    City ID: 547831
    ----------------------------------------------------------------------------
    City #236
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3694256
    City Name: Olmos
    City ID: 3694256
    ----------------------------------------------------------------------------
    City #237
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5394329
    City Name: Selma
    City ID: 5394329
    ----------------------------------------------------------------------------
    City #238
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2315417
    City Name: Inongo
    City ID: 2315417
    ----------------------------------------------------------------------------
    City #239
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2240449
    City Name: Luanda
    City ID: 2240449
    ----------------------------------------------------------------------------
    City #240
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1277599
    City Name: Nilagiri
    City ID: 1277599
    ----------------------------------------------------------------------------
    City #241
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1501460
    City Name: Kulunda
    City ID: 1501460
    ----------------------------------------------------------------------------
    City #242
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2338711
    City Name: Igboho
    City ID: 2338711
    ----------------------------------------------------------------------------
    City #243
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2121025
    City Name: Srednekolymsk
    City ID: 2121025
    ----------------------------------------------------------------------------
    City #244
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5006233
    City Name: Port Huron
    City ID: 5006233
    ----------------------------------------------------------------------------
    City #245
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3839307
    City Name: Rawson
    City ID: 3839307
    ----------------------------------------------------------------------------
    City #246
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3863379
    City Name: Mar del Plata
    City ID: 3863379
    ----------------------------------------------------------------------------
    City #247
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1513990
    City Name: Gazli
    City ID: 1513990
    ----------------------------------------------------------------------------
    City #248
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2109528
    City Name: Buala
    City ID: 2109528
    ----------------------------------------------------------------------------
    City #249
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3461408
    City Name: Ilheus
    City ID: 3461408
    ----------------------------------------------------------------------------
    City #250
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3419842
    City Name: Sisimiut
    City ID: 3419842
    ----------------------------------------------------------------------------
    City #251
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2017155
    City Name: Saskylakh
    City ID: 2017155
    ----------------------------------------------------------------------------
    City #252
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3424607
    City Name: Tasiilaq
    City ID: 3424607
    ----------------------------------------------------------------------------
    City #253
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2124611
    City Name: Kholodnyy
    City ID: 2124611
    ----------------------------------------------------------------------------
    City #254
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2352110
    City Name: Okitipupa
    City ID: 2352110
    ----------------------------------------------------------------------------
    City #255
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1854774
    City Name: Oda
    City ID: 1854774
    ----------------------------------------------------------------------------
    City #256
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1806041
    City Name: Jiaocheng
    City ID: 1806041
    ----------------------------------------------------------------------------
    City #257
    City URL: http://api.openweathermap.org/data/2.5/weather?id=207596
    City Name: Mweka
    City ID: 207596
    ----------------------------------------------------------------------------
    City #258
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1855540
    City Name: Naze
    City ID: 1855540
    ----------------------------------------------------------------------------
    City #259
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2337542
    City Name: Naze
    City ID: 2337542
    ----------------------------------------------------------------------------
    City #260
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4016734
    City Name: Bucerias
    City ID: 4016734
    ----------------------------------------------------------------------------
    City #261
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2514651
    City Name: Los Llanos de Aridane
    City ID: 2514651
    ----------------------------------------------------------------------------
    City #262
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2058430
    City Name: Whyalla
    City ID: 2058430
    ----------------------------------------------------------------------------
    City #263
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1524298
    City Name: Aksu
    City ID: 1524298
    ----------------------------------------------------------------------------
    City #264
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2055868
    City Name: Yantal
    City ID: 2055868
    ----------------------------------------------------------------------------
    City #265
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3432043
    City Name: La Plata
    City ID: 3432043
    ----------------------------------------------------------------------------
    City #266
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1511846
    City Name: Aleksandrovskoye
    City ID: 1511846
    ----------------------------------------------------------------------------
    City #267
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3393922
    City Name: Nisia Floresta
    City ID: 3393922
    ----------------------------------------------------------------------------
    City #268
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2425791
    City Name: Sarh
    City ID: 2425791
    ----------------------------------------------------------------------------
    City #269
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2090021
    City Name: Namatanai
    City ID: 2090021
    ----------------------------------------------------------------------------
    City #270
    City URL: http://api.openweathermap.org/data/2.5/weather?id=534560
    City Name: Lodeynoye Pole
    City ID: 534560
    ----------------------------------------------------------------------------
    City #271
    City URL: http://api.openweathermap.org/data/2.5/weather?id=111453
    City Name: Zanjan
    City ID: 111453
    ----------------------------------------------------------------------------
    City #272
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374336
    City Name: Porto Novo
    City ID: 3374336
    ----------------------------------------------------------------------------
    City #273
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6322184
    City Name: Porto Novo
    City ID: 6322184
    ----------------------------------------------------------------------------
    City #274
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2322794
    City Name: Suleja
    City ID: 2322794
    ----------------------------------------------------------------------------
    City #275
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2660600
    City Name: Gland
    City ID: 2660600
    ----------------------------------------------------------------------------
    City #276
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3421193
    City Name: Paamiut
    City ID: 3421193
    ----------------------------------------------------------------------------
    City #277
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3838859
    City Name: Rio Gallegos
    City ID: 3838859
    ----------------------------------------------------------------------------
    City #278
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4252975
    City Name: Barrow
    City ID: 4252975
    ----------------------------------------------------------------------------
    City #279
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3833859
    City Name: Barrow
    City ID: 3833859
    ----------------------------------------------------------------------------
    City #280
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5768244
    City Name: Rapid Valley
    City ID: 5768244
    ----------------------------------------------------------------------------
    City #281
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5563397
    City Name: Eureka
    City ID: 5563397
    ----------------------------------------------------------------------------
    City #282
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3398428
    City Name: Humberto de Campos
    City ID: 3398428
    ----------------------------------------------------------------------------
    City #283
    City URL: http://api.openweathermap.org/data/2.5/weather?id=686137
    City Name: Armenis
    City ID: 686137
    ----------------------------------------------------------------------------
    City #284
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4004293
    City Name: Ixtapa
    City ID: 4004293
    ----------------------------------------------------------------------------
    City #285
    City URL: http://api.openweathermap.org/data/2.5/weather?id=502265
    City Name: Mirnyy
    City ID: 502265
    ----------------------------------------------------------------------------
    City #286
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3896218
    City Name: Castro
    City ID: 3896218
    ----------------------------------------------------------------------------
    City #287
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3054533
    City Name: Celldomolk
    City ID: 3054533
    ----------------------------------------------------------------------------
    City #288
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2242001
    City Name: Caxito
    City ID: 2242001
    ----------------------------------------------------------------------------
    City #289
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3451261
    City Name: Caxito
    City ID: 3451261
    ----------------------------------------------------------------------------
    City #290
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2070998
    City Name: Geraldton
    City ID: 2070998
    ----------------------------------------------------------------------------
    City #291
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5960603
    City Name: Geraldton
    City ID: 5960603
    ----------------------------------------------------------------------------
    City #292
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5830007
    City Name: Lander
    City ID: 5830007
    ----------------------------------------------------------------------------
    City #293
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3585480
    City Name: Intipuca
    City ID: 3585480
    ----------------------------------------------------------------------------
    City #294
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6144195
    City Name: Senneterre
    City ID: 6144195
    ----------------------------------------------------------------------------
    City #295
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2108502
    City Name: Honiara
    City ID: 2108502
    ----------------------------------------------------------------------------
    City #296
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2206900
    City Name: Westport
    City ID: 2206900
    ----------------------------------------------------------------------------
    City #297
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2960970
    City Name: Westport
    City ID: 2960970
    ----------------------------------------------------------------------------
    City #298
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3860443
    City Name: Comodoro Rivadavia
    City ID: 3860443
    ----------------------------------------------------------------------------
    City #299
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2071860
    City Name: Esperance
    City ID: 2071860
    ----------------------------------------------------------------------------
    City #300
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3573739
    City Name: Esperance
    City ID: 3573739
    ----------------------------------------------------------------------------
    City #301
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3571913
    City Name: Marsh Harbour
    City ID: 3571913
    ----------------------------------------------------------------------------
    City #302
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2264557
    City Name: Ponta do Sol
    City ID: 2264557
    ----------------------------------------------------------------------------
    City #303
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3573061
    City Name: Saint George
    City ID: 3573061
    ----------------------------------------------------------------------------
    City #304
    City URL: http://api.openweathermap.org/data/2.5/weather?id=262462
    City Name: Saint George
    City ID: 262462
    ----------------------------------------------------------------------------
    City #305
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2026023
    City Name: Bukachacha
    City ID: 2026023
    ----------------------------------------------------------------------------
    City #306
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5380437
    City Name: Pacific Grove
    City ID: 5380437
    ----------------------------------------------------------------------------
    City #307
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6050066
    City Name: La Ronge
    City ID: 6050066
    ----------------------------------------------------------------------------
    City #308
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3456160
    City Name: Olinda
    City ID: 3456160
    ----------------------------------------------------------------------------
    City #309
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3650121
    City Name: Olinda
    City ID: 3650121
    ----------------------------------------------------------------------------
    City #310
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3833062
    City Name: Venado Tuerto
    City ID: 3833062
    ----------------------------------------------------------------------------
    City #311
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1106643
    City Name: Quatre Cocos
    City ID: 1106643
    ----------------------------------------------------------------------------
    City #312
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1259385
    City Name: Port Blair
    City ID: 1259385
    ----------------------------------------------------------------------------
    City #313
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2508813
    City Name: Adrar
    City ID: 2508813
    ----------------------------------------------------------------------------
    City #314
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1635815
    City Name: Maumere
    City ID: 1635815
    ----------------------------------------------------------------------------
    City #315
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3868707
    City Name: Valdivia
    City ID: 3868707
    ----------------------------------------------------------------------------
    City #316
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2019199
    City Name: Nizhneangarsk
    City ID: 2019199
    ----------------------------------------------------------------------------
    City #317
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3402429
    City Name: Caucaia
    City ID: 3402429
    ----------------------------------------------------------------------------
    City #318
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3531368
    City Name: Celestun
    City ID: 3531368
    ----------------------------------------------------------------------------
    City #319
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1337618
    City Name: Manadhoo
    City ID: 1337618
    ----------------------------------------------------------------------------
    City #320
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1214488
    City Name: Meulaboh
    City ID: 1214488
    ----------------------------------------------------------------------------
    City #321
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1790840
    City Name: Wuzhou
    City ID: 1790840
    ----------------------------------------------------------------------------
    City #322
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3723779
    City Name: Jacmel
    City ID: 3723779
    ----------------------------------------------------------------------------
    City #323
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2037086
    City Name: Haicheng
    City ID: 2037086
    ----------------------------------------------------------------------------
    City #324
    City URL: http://api.openweathermap.org/data/2.5/weather?id=782061
    City Name: Peshkopi
    City ID: 782061
    ----------------------------------------------------------------------------
    City #325
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3347019
    City Name: Namibe
    City ID: 3347019
    ----------------------------------------------------------------------------
    City #326
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2334652
    City Name: Keffi
    City ID: 2334652
    ----------------------------------------------------------------------------
    City #327
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1690039
    City Name: Batasan
    City ID: 1690039
    ----------------------------------------------------------------------------
    City #328
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2242885
    City Name: Camabatela
    City ID: 2242885
    ----------------------------------------------------------------------------
    City #329
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1835848
    City Name: Seoul
    City ID: 1835848
    ----------------------------------------------------------------------------
    City #330
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1502100
    City Name: Krasnogvardeyskiy
    City ID: 1502100
    ----------------------------------------------------------------------------
    City #331
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2134814
    City Name: Sola
    City ID: 2134814
    ----------------------------------------------------------------------------
    City #332
    City URL: http://api.openweathermap.org/data/2.5/weather?id=643453
    City Name: Sola
    City ID: 643453
    ----------------------------------------------------------------------------
    City #333
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1626542
    City Name: Sorong
    City ID: 1626542
    ----------------------------------------------------------------------------
    City #334
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3682266
    City Name: Gachala
    City ID: 3682266
    ----------------------------------------------------------------------------
    City #335
    City URL: http://api.openweathermap.org/data/2.5/weather?id=605155
    City Name: Kiruna
    City ID: 605155
    ----------------------------------------------------------------------------
    City #336
    City URL: http://api.openweathermap.org/data/2.5/weather?id=899274
    City Name: Samfya
    City ID: 899274
    ----------------------------------------------------------------------------
    City #337
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2523352
    City Name: Santa Flavia
    City ID: 2523352
    ----------------------------------------------------------------------------
    City #338
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3832376
    City Name: Santa Flavia
    City ID: 3832376
    ----------------------------------------------------------------------------
    City #339
    City URL: http://api.openweathermap.org/data/2.5/weather?id=161974
    City Name: Gazanjyk
    City ID: 161974
    ----------------------------------------------------------------------------
    City #340
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5697939
    City Name: North Platte
    City ID: 5697939
    ----------------------------------------------------------------------------
    City #341
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2038067
    City Name: Chifeng
    City ID: 2038067
    ----------------------------------------------------------------------------
    City #342
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2027296
    City Name: Aykhal
    City ID: 2027296
    ----------------------------------------------------------------------------
    City #343
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3361934
    City Name: Saldanha
    City ID: 3361934
    ----------------------------------------------------------------------------
    City #344
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2737599
    City Name: Saldanha
    City ID: 2737599
    ----------------------------------------------------------------------------
    City #345
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4563064
    City Name: Camuy
    City ID: 4563064
    ----------------------------------------------------------------------------
    City #346
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2185329
    City Name: Waipawa
    City ID: 2185329
    ----------------------------------------------------------------------------
    City #347
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6112862
    City Name: Preeceville
    City ID: 6112862
    ----------------------------------------------------------------------------
    City #348
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5793822
    City Name: Enumclaw
    City ID: 5793822
    ----------------------------------------------------------------------------
    City #349
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3372760
    City Name: Praia da Vitoria
    City ID: 3372760
    ----------------------------------------------------------------------------
    City #350
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2022003
    City Name: Kizhinga
    City ID: 2022003
    ----------------------------------------------------------------------------
    City #351
    City URL: http://api.openweathermap.org/data/2.5/weather?id=108410
    City Name: Riyadh
    City ID: 108410
    ----------------------------------------------------------------------------
    City #352
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6185217
    City Name: Yarmouth
    City ID: 6185217
    ----------------------------------------------------------------------------
    City #353
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2633414
    City Name: Yarmouth
    City ID: 2633414
    ----------------------------------------------------------------------------
    City #354
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3421319
    City Name: Nuuk
    City ID: 3421319
    ----------------------------------------------------------------------------
    City #355
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3832899
    City Name: Viedma
    City ID: 3832899
    ----------------------------------------------------------------------------
    City #356
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2538474
    City Name: Rabat
    City ID: 2538474
    ----------------------------------------------------------------------------
    City #357
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1529376
    City Name: Korla
    City ID: 1529376
    ----------------------------------------------------------------------------
    City #358
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1636426
    City Name: Manggar
    City ID: 1636426
    ----------------------------------------------------------------------------
    City #359
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1529484
    City Name: Hami
    City ID: 1529484
    ----------------------------------------------------------------------------
    City #360
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1056899
    City Name: Sambava
    City ID: 1056899
    ----------------------------------------------------------------------------
    City #361
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5367788
    City Name: Lompoc
    City ID: 5367788
    ----------------------------------------------------------------------------
    City #362
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4033356
    City Name: Tiarei
    City ID: 4033356
    ----------------------------------------------------------------------------
    City #363
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1181022
    City Name: Chor
    City ID: 1181022
    ----------------------------------------------------------------------------
    City #364
    City URL: http://api.openweathermap.org/data/2.5/weather?id=477940
    City Name: Ust-Tsilma
    City ID: 477940
    ----------------------------------------------------------------------------
    City #365
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4151316
    City Name: Clearwater
    City ID: 4151316
    ----------------------------------------------------------------------------
    City #366
    City URL: http://api.openweathermap.org/data/2.5/weather?id=214974
    City Name: Kalemie
    City ID: 214974
    ----------------------------------------------------------------------------
    City #367
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1506938
    City Name: Erzin
    City ID: 1506938
    ----------------------------------------------------------------------------
    City #368
    City URL: http://api.openweathermap.org/data/2.5/weather?id=296852
    City Name: Erzin
    City ID: 296852
    ----------------------------------------------------------------------------
    City #369
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1259395
    City Name: Porbandar
    City ID: 1259395
    ----------------------------------------------------------------------------
    City #370
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2249901
    City Name: Gat
    City ID: 2249901
    ----------------------------------------------------------------------------
    City #371
    City URL: http://api.openweathermap.org/data/2.5/weather?id=325304
    City Name: Afsin
    City ID: 325304
    ----------------------------------------------------------------------------
    City #372
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2068110
    City Name: Kununurra
    City ID: 2068110
    ----------------------------------------------------------------------------
    City #373
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2991771
    City Name: Guerande
    City ID: 2991771
    ----------------------------------------------------------------------------
    City #374
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1494482
    City Name: Polunochnoye
    City ID: 1494482
    ----------------------------------------------------------------------------
    City #375
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1737185
    City Name: Kapit
    City ID: 1737185
    ----------------------------------------------------------------------------
    City #376
    City URL: http://api.openweathermap.org/data/2.5/weather?id=603570
    City Name: Pitea
    City ID: 603570
    ----------------------------------------------------------------------------
    City #377
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1793900
    City Name: Changli
    City ID: 1793900
    ----------------------------------------------------------------------------
    City #378
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2367164
    City Name: Dapaong
    City ID: 2367164
    ----------------------------------------------------------------------------
    City #379
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2644927
    City Name: Langholm
    City ID: 2644927
    ----------------------------------------------------------------------------
    City #380
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5456975
    City Name: Belen
    City ID: 5456975
    ----------------------------------------------------------------------------
    City #381
    City URL: http://api.openweathermap.org/data/2.5/weather?id=321572
    City Name: Belen
    City ID: 321572
    ----------------------------------------------------------------------------
    City #382
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1847947
    City Name: Shingu
    City ID: 1847947
    ----------------------------------------------------------------------------
    City #383
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6162949
    City Name: Terrace
    City ID: 6162949
    ----------------------------------------------------------------------------
    City #384
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2179825
    City Name: Waitati
    City ID: 2179825
    ----------------------------------------------------------------------------
    City #385
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2015306
    City Name: Tiksi
    City ID: 2015306
    ----------------------------------------------------------------------------
    City #386
    City URL: http://api.openweathermap.org/data/2.5/weather?id=978895
    City Name: Margate
    City ID: 978895
    ----------------------------------------------------------------------------
    City #387
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2158744
    City Name: Margate
    City ID: 2158744
    ----------------------------------------------------------------------------
    City #388
    City URL: http://api.openweathermap.org/data/2.5/weather?id=7626370
    City Name: Bud
    City ID: 7626370
    ----------------------------------------------------------------------------
    City #389
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374218
    City Name: Santa Maria
    City ID: 3374218
    ----------------------------------------------------------------------------
    City #390
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3450083
    City Name: Santa Maria
    City ID: 3450083
    ----------------------------------------------------------------------------
    City #391
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3141667
    City Name: Roald
    City ID: 3141667
    ----------------------------------------------------------------------------
    City #392
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5866063
    City Name: Kenai
    City ID: 5866063
    ----------------------------------------------------------------------------
    City #393
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3423146
    City Name: Ilulissat
    City ID: 3423146
    ----------------------------------------------------------------------------
    City #394
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1496073
    City Name: Orlik
    City ID: 1496073
    ----------------------------------------------------------------------------
    City #395
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2120591
    City Name: Tilichiki
    City ID: 2120591
    ----------------------------------------------------------------------------
    City #396
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1249931
    City Name: Beruwala
    City ID: 1249931
    ----------------------------------------------------------------------------
    City #397
    City URL: http://api.openweathermap.org/data/2.5/weather?id=286621
    City Name: Salalah
    City ID: 286621
    ----------------------------------------------------------------------------
    City #398
    City URL: http://api.openweathermap.org/data/2.5/weather?id=359792
    City Name: Aswan
    City ID: 359792
    ----------------------------------------------------------------------------
    City #399
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3530097
    City Name: Cristobal Obregon
    City ID: 3530097
    ----------------------------------------------------------------------------
    City #400
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1624987
    City Name: Indramayu
    City ID: 1624987
    ----------------------------------------------------------------------------
    City #401
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5972762
    City Name: Hay River
    City ID: 5972762
    ----------------------------------------------------------------------------
    City #402
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3064047
    City Name: Tremosna
    City ID: 3064047
    ----------------------------------------------------------------------------
    City #403
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5147097
    City Name: Berea
    City ID: 5147097
    ----------------------------------------------------------------------------
    City #404
    City URL: http://api.openweathermap.org/data/2.5/weather?id=727030
    City Name: Milkovo
    City ID: 727030
    ----------------------------------------------------------------------------
    City #405
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6096551
    City Name: Pangnirtung
    City ID: 6096551
    ----------------------------------------------------------------------------
    City #406
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2025256
    City Name: Chumikan
    City ID: 2025256
    ----------------------------------------------------------------------------
    City #407
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3382160
    City Name: Cayenne
    City ID: 3382160
    ----------------------------------------------------------------------------
    City #408
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5554428
    City Name: Ketchikan
    City ID: 5554428
    ----------------------------------------------------------------------------
    City #409
    City URL: http://api.openweathermap.org/data/2.5/weather?id=175499
    City Name: Nchelenge
    City ID: 175499
    ----------------------------------------------------------------------------
    City #410
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3056445
    City Name: Abda
    City ID: 3056445
    ----------------------------------------------------------------------------
    City #411
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1242110
    City Name: Kalmunai
    City ID: 1242110
    ----------------------------------------------------------------------------
    City #412
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3372472
    City Name: Vila Franca do Campo
    City ID: 3372472
    ----------------------------------------------------------------------------
    City #413
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1865309
    City Name: Katsuura
    City ID: 1865309
    ----------------------------------------------------------------------------
    City #414
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3386177
    City Name: Trairi
    City ID: 3386177
    ----------------------------------------------------------------------------
    City #415
    City URL: http://api.openweathermap.org/data/2.5/weather?id=110690
    City Name: Faya
    City ID: 110690
    ----------------------------------------------------------------------------
    City #416
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1850144
    City Name: Nishihara
    City ID: 1850144
    ----------------------------------------------------------------------------
    City #417
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1018725
    City Name: Bloemfontein
    City ID: 1018725
    ----------------------------------------------------------------------------
    City #418
    City URL: http://api.openweathermap.org/data/2.5/weather?id=751335
    City Name: Bafra
    City ID: 751335
    ----------------------------------------------------------------------------
    City #419
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2660076
    City Name: La Chaux-de-Fonds
    City ID: 2660076
    ----------------------------------------------------------------------------
    City #420
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3578441
    City Name: Saint-Francois
    City ID: 3578441
    ----------------------------------------------------------------------------
    City #421
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2980080
    City Name: Saint-Francois
    City ID: 2980080
    ----------------------------------------------------------------------------
    City #422
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3441702
    City Name: Melo
    City ID: 3441702
    ----------------------------------------------------------------------------
    City #423
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1258061
    City Name: Ron
    City ID: 1258061
    ----------------------------------------------------------------------------
    City #424
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1499158
    City Name: Mayna
    City ID: 1499158
    ----------------------------------------------------------------------------
    City #425
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2156643
    City Name: Mount Gambier
    City ID: 2156643
    ----------------------------------------------------------------------------
    City #426
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5962442
    City Name: Goderich
    City ID: 5962442
    ----------------------------------------------------------------------------
    City #427
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3137469
    City Name: Sorland
    City ID: 3137469
    ----------------------------------------------------------------------------
    City #428
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3529654
    City Name: Dzilam Gonzalez
    City ID: 3529654
    ----------------------------------------------------------------------------
    City #429
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2123814
    City Name: Leningradskiy
    City ID: 2123814
    ----------------------------------------------------------------------------
    City #430
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3846616
    City Name: Cordoba
    City ID: 3846616
    ----------------------------------------------------------------------------
    City #431
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3686513
    City Name: Cordoba
    City ID: 3686513
    ----------------------------------------------------------------------------
    City #432
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3894426
    City Name: Coihaique
    City ID: 3894426
    ----------------------------------------------------------------------------
    City #433
    City URL: http://api.openweathermap.org/data/2.5/weather?id=58933
    City Name: Garowe
    City ID: 58933
    ----------------------------------------------------------------------------
    City #434
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4021858
    City Name: Guerrero Negro
    City ID: 4021858
    ----------------------------------------------------------------------------
    City #435
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1684245
    City Name: Tagusao
    City ID: 1684245
    ----------------------------------------------------------------------------
    City #436
    City URL: http://api.openweathermap.org/data/2.5/weather?id=921786
    City Name: Mitsamiouli
    City ID: 921786
    ----------------------------------------------------------------------------
    City #437
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2729907
    City Name: Longyearbyen
    City ID: 2729907
    ----------------------------------------------------------------------------
    City #438
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5942911
    City Name: Dryden
    City ID: 5942911
    ----------------------------------------------------------------------------
    City #439
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4032369
    City Name: Pangai
    City ID: 4032369
    ----------------------------------------------------------------------------
    City #440
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1337610
    City Name: Thinadhoo
    City ID: 1337610
    ----------------------------------------------------------------------------
    City #441
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2065176
    City Name: Murray Bridge
    City ID: 2065176
    ----------------------------------------------------------------------------
    City #442
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1058381
    City Name: Morondava
    City ID: 1058381
    ----------------------------------------------------------------------------
    City #443
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3141310
    City Name: Rorvik
    City ID: 3141310
    ----------------------------------------------------------------------------
    City #444
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3938531
    City Name: Iberia
    City ID: 3938531
    ----------------------------------------------------------------------------
    City #445
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2269594
    City Name: Cascais
    City ID: 2269594
    ----------------------------------------------------------------------------
    City #446
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1173889
    City Name: Khipro
    City ID: 1173889
    ----------------------------------------------------------------------------
    City #447
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1794903
    City Name: Shiyan
    City ID: 1794903
    ----------------------------------------------------------------------------
    City #448
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4036284
    City Name: Alofi
    City ID: 4036284
    ----------------------------------------------------------------------------
    City #449
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2017215
    City Name: Sangar
    City ID: 2017215
    ----------------------------------------------------------------------------
    City #450
    City URL: http://api.openweathermap.org/data/2.5/weather?id=370481
    City Name: Marawi
    City ID: 370481
    ----------------------------------------------------------------------------
    City #451
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1701054
    City Name: Marawi
    City ID: 1701054
    ----------------------------------------------------------------------------
    City #452
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1800519
    City Name: Mingguang
    City ID: 1800519
    ----------------------------------------------------------------------------
    City #453
    City URL: http://api.openweathermap.org/data/2.5/weather?id=352628
    City Name: Matay
    City ID: 352628
    ----------------------------------------------------------------------------
    City #454
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3393692
    City Name: Itarema
    City ID: 3393692
    ----------------------------------------------------------------------------
    City #455
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3838874
    City Name: Rio Cuarto
    City ID: 3838874
    ----------------------------------------------------------------------------
    City #456
    City URL: http://api.openweathermap.org/data/2.5/weather?id=898947
    City Name: Senanga
    City ID: 898947
    ----------------------------------------------------------------------------
    City #457
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1510689
    City Name: Baykit
    City ID: 1510689
    ----------------------------------------------------------------------------
    City #458
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5924351
    City Name: Clyde River
    City ID: 5924351
    ----------------------------------------------------------------------------
    City #459
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1643920
    City Name: Jatiroto
    City ID: 1643920
    ----------------------------------------------------------------------------
    City #460
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3995652
    City Name: Mocorito
    City ID: 3995652
    ----------------------------------------------------------------------------
    City #461
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4145381
    City Name: Wilmington
    City ID: 4145381
    ----------------------------------------------------------------------------
    City #462
    City URL: http://api.openweathermap.org/data/2.5/weather?id=623760
    City Name: Pastavy
    City ID: 623760
    ----------------------------------------------------------------------------
    City #463
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2343252
    City Name: Epe
    City ID: 2343252
    ----------------------------------------------------------------------------
    City #464
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2756071
    City Name: Epe
    City ID: 2756071
    ----------------------------------------------------------------------------
    City #465
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2063042
    City Name: Port Hedland
    City ID: 2063042
    ----------------------------------------------------------------------------
    City #466
    City URL: http://api.openweathermap.org/data/2.5/weather?id=916095
    City Name: Kabwe
    City ID: 916095
    ----------------------------------------------------------------------------
    City #467
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2444995
    City Name: Filingue
    City ID: 2444995
    ----------------------------------------------------------------------------
    City #468
    City URL: http://api.openweathermap.org/data/2.5/weather?id=935616
    City Name: Le Port
    City ID: 935616
    ----------------------------------------------------------------------------
    City #469
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3036965
    City Name: Le Port
    City ID: 3036965
    ----------------------------------------------------------------------------
    City #470
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3665202
    City Name: Aripuana
    City ID: 3665202
    ----------------------------------------------------------------------------
    City #471
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5919850
    City Name: Chapais
    City ID: 5919850
    ----------------------------------------------------------------------------
    City #472
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2630299
    City Name: Hofn
    City ID: 2630299
    ----------------------------------------------------------------------------
    City #473
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4414001
    City Name: Wentzville
    City ID: 4414001
    ----------------------------------------------------------------------------
    City #474
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3412093
    City Name: Vestmannaeyjar
    City ID: 3412093
    ----------------------------------------------------------------------------
    City #475
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3406263
    City Name: Barras
    City ID: 3406263
    ----------------------------------------------------------------------------
    City #476
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5356012
    City Name: Healdsburg
    City ID: 5356012
    ----------------------------------------------------------------------------
    City #477
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2014833
    City Name: Tura
    City ID: 2014833
    ----------------------------------------------------------------------------
    City #478
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1254046
    City Name: Tura
    City ID: 1254046
    ----------------------------------------------------------------------------
    City #479
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5017822
    City Name: Bemidji
    City ID: 5017822
    ----------------------------------------------------------------------------
    City #480
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3373652
    City Name: Oistins
    City ID: 3373652
    ----------------------------------------------------------------------------
    City #481
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013727
    City Name: Vanavara
    City ID: 2013727
    ----------------------------------------------------------------------------
    City #482
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2126785
    City Name: Belaya Gora
    City ID: 2126785
    ----------------------------------------------------------------------------
    City #483
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5411479
    City Name: Alamosa
    City ID: 5411479
    ----------------------------------------------------------------------------
    City #484
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1283285
    City Name: Jumla
    City ID: 1283285
    ----------------------------------------------------------------------------
    City #485
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3691954
    City Name: Sechura
    City ID: 3691954
    ----------------------------------------------------------------------------
    City #486
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3840300
    City Name: Presidencia Roque Saenz Pena
    City ID: 3840300
    ----------------------------------------------------------------------------
    City #487
    City URL: http://api.openweathermap.org/data/2.5/weather?id=364933
    City Name: Umm Kaddadah
    City ID: 364933
    ----------------------------------------------------------------------------
    City #488
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2084442
    City Name: Vanimo
    City ID: 2084442
    ----------------------------------------------------------------------------
    City #489
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3683538
    City Name: Concepcion
    City ID: 3683538
    ----------------------------------------------------------------------------
    City #490
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1274881
    City Name: Chakulia
    City ID: 1274881
    ----------------------------------------------------------------------------
    City #491
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2108857
    City Name: Gizo
    City ID: 2108857
    ----------------------------------------------------------------------------
    City #492
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6693679
    City Name: Gizo
    City ID: 6693679
    ----------------------------------------------------------------------------
    City #493
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2075720
    City Name: Broome
    City ID: 2075720
    ----------------------------------------------------------------------------
    City #494
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2656067
    City Name: Broome
    City ID: 2656067
    ----------------------------------------------------------------------------
    City #495
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3386213
    City Name: Touros
    City ID: 3386213
    ----------------------------------------------------------------------------
    City #496
    City URL: http://api.openweathermap.org/data/2.5/weather?id=934649
    City Name: Cap Malheureux
    City ID: 934649
    ----------------------------------------------------------------------------
    City #497
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3390901
    City Name: Quixeramobim
    City ID: 3390901
    ----------------------------------------------------------------------------
    City #498
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3024440
    City Name: Cognac
    City ID: 3024440
    ----------------------------------------------------------------------------
    City #499
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6145890
    City Name: Shelburne
    City ID: 6145890
    ----------------------------------------------------------------------------
    City #500
    City URL: http://api.openweathermap.org/data/2.5/weather?id=935051
    City Name: Lavumisa
    City ID: 935051
    ----------------------------------------------------------------------------
    City #501
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2262963
    City Name: Vale da Amoreira
    City ID: 2262963
    ----------------------------------------------------------------------------
    City #502
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1791748
    City Name: Wanxian
    City ID: 1791748
    ----------------------------------------------------------------------------
    City #503
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2343943
    City Name: Oga
    City ID: 2343943
    ----------------------------------------------------------------------------
    City #504
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3448454
    City Name: Belmonte
    City ID: 3448454
    ----------------------------------------------------------------------------
    City #505
    City URL: http://api.openweathermap.org/data/2.5/weather?id=8010472
    City Name: Belmonte
    City ID: 8010472
    ----------------------------------------------------------------------------
    City #506
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3421719
    City Name: Narsaq
    City ID: 3421719
    ----------------------------------------------------------------------------
    City #507
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3464728
    City Name: Diamantina
    City ID: 3464728
    ----------------------------------------------------------------------------
    City #508
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2018735
    City Name: Nyurba
    City ID: 2018735
    ----------------------------------------------------------------------------
    City #509
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4272061
    City Name: Girard
    City ID: 4272061
    ----------------------------------------------------------------------------
    City #510
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5155755
    City Name: Girard
    City ID: 5155755
    ----------------------------------------------------------------------------
    City #511
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5058868
    City Name: Devils Lake
    City ID: 5058868
    ----------------------------------------------------------------------------
    City #512
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3115824
    City Name: Muros
    City ID: 3115824
    ----------------------------------------------------------------------------
    City #513
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2026861
    City Name: Berdigestyakh
    City ID: 2026861
    ----------------------------------------------------------------------------
    City #514
    City URL: http://api.openweathermap.org/data/2.5/weather?id=485639
    City Name: Svetogorsk
    City ID: 485639
    ----------------------------------------------------------------------------
    City #515
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3932145
    City Name: Pisco
    City ID: 3932145
    ----------------------------------------------------------------------------
    City #516
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6205099
    City Name: Waverley
    City ID: 6205099
    ----------------------------------------------------------------------------
    City #517
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2144319
    City Name: Waverley
    City ID: 2144319
    ----------------------------------------------------------------------------
    City #518
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1814934
    City Name: Chizhou
    City ID: 1814934
    ----------------------------------------------------------------------------
    City #519
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1632694
    City Name: Pangkalanbuun
    City ID: 1632694
    ----------------------------------------------------------------------------
    City #520
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3645532
    City Name: Ciudad Bolivar
    City ID: 3645532
    ----------------------------------------------------------------------------
    City #521
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1848976
    City Name: Wajima
    City ID: 1848976
    ----------------------------------------------------------------------------
    City #522
    City URL: http://api.openweathermap.org/data/2.5/weather?id=556268
    City Name: Ostrovnoy
    City ID: 556268
    ----------------------------------------------------------------------------
    City #523
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2132606
    City Name: Samarai
    City ID: 2132606
    ----------------------------------------------------------------------------
    City #524
    City URL: http://api.openweathermap.org/data/2.5/weather?id=215976
    City Name: Ilebo
    City ID: 215976
    ----------------------------------------------------------------------------
    City #525
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2172880
    City Name: Byron Bay
    City ID: 2172880
    ----------------------------------------------------------------------------
    City #526
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1254832
    City Name: Tawang
    City ID: 1254832
    ----------------------------------------------------------------------------
    City #527
    City URL: http://api.openweathermap.org/data/2.5/weather?id=80509
    City Name: Bardiyah
    City ID: 80509
    ----------------------------------------------------------------------------
    City #528
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2178753
    City Name: Kirakira
    City ID: 2178753
    ----------------------------------------------------------------------------
    City #529
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2180737
    City Name: Turangi
    City ID: 2180737
    ----------------------------------------------------------------------------
    City #530
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1628884
    City Name: Sampit
    City ID: 1628884
    ----------------------------------------------------------------------------
    City #531
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3893629
    City Name: Coquimbo
    City ID: 3893629
    ----------------------------------------------------------------------------
    City #532
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3652567
    City Name: San Cristobal
    City ID: 3652567
    ----------------------------------------------------------------------------
    City #533
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3652462
    City Name: San Cristobal
    City ID: 3652462
    ----------------------------------------------------------------------------
    City #534
    City URL: http://api.openweathermap.org/data/2.5/weather?id=962367
    City Name: Richards Bay
    City ID: 962367
    ----------------------------------------------------------------------------
    City #535
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2454268
    City Name: Koutiala
    City ID: 2454268
    ----------------------------------------------------------------------------
    City #536
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1260206
    City Name: Pasighat
    City ID: 1260206
    ----------------------------------------------------------------------------
    City #537
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3422683
    City Name: Kangaatsiaq
    City ID: 3422683
    ----------------------------------------------------------------------------
    City #538
    City URL: http://api.openweathermap.org/data/2.5/weather?id=893485
    City Name: Chiredzi
    City ID: 893485
    ----------------------------------------------------------------------------
    City #539
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2120530
    City Name: Cheremshanka
    City ID: 2120530
    ----------------------------------------------------------------------------
    City #540
    City URL: http://api.openweathermap.org/data/2.5/weather?id=692856
    City Name: Cheremshanka
    City ID: 692856
    ----------------------------------------------------------------------------
    City #541
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1253628
    City Name: Lata
    City ID: 1253628
    ----------------------------------------------------------------------------
    City #542
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2120048
    City Name: Ust-Nera
    City ID: 2120048
    ----------------------------------------------------------------------------
    City #543
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1856068
    City Name: Nago
    City ID: 1856068
    ----------------------------------------------------------------------------
    City #544
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3172402
    City Name: Nago
    City ID: 3172402
    ----------------------------------------------------------------------------
    City #545
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5742974
    City Name: North Bend
    City ID: 5742974
    ----------------------------------------------------------------------------
    City #546
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1275694
    City Name: Bijawar
    City ID: 1275694
    ----------------------------------------------------------------------------
    City #547
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1489853
    City Name: Tazovskiy
    City ID: 1489853
    ----------------------------------------------------------------------------
    City #548
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6068416
    City Name: Mayo
    City ID: 6068416
    ----------------------------------------------------------------------------
    City #549
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5779548
    City Name: Payson
    City ID: 5779548
    ----------------------------------------------------------------------------
    City #550
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1563281
    City Name: Tuy Hoa
    City ID: 1563281
    ----------------------------------------------------------------------------
    City #551
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3453150
    City Name: Ponta Pora
    City ID: 3453150
    ----------------------------------------------------------------------------
    City #552
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3456137
    City Name: Nova Olimpia
    City ID: 3456137
    ----------------------------------------------------------------------------
    City #553
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2158767
    City Name: Mareeba
    City ID: 2158767
    ----------------------------------------------------------------------------
    City #554
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1510350
    City Name: Leninskoye
    City ID: 1510350
    ----------------------------------------------------------------------------
    City #555
    City URL: http://api.openweathermap.org/data/2.5/weather?id=64013
    City Name: Bosaso
    City ID: 64013
    ----------------------------------------------------------------------------
    City #556
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2194098
    City Name: Ahipara
    City ID: 2194098
    ----------------------------------------------------------------------------
    City #557
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4148411
    City Name: Boca Raton
    City ID: 4148411
    ----------------------------------------------------------------------------
    City #558
    City URL: http://api.openweathermap.org/data/2.5/weather?id=525426
    City Name: Sobolevo
    City ID: 525426
    ----------------------------------------------------------------------------
    City #559
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4226552
    City Name: Tifton
    City ID: 4226552
    ----------------------------------------------------------------------------
    City #560
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1151528
    City Name: Pa Sang
    City ID: 1151528
    ----------------------------------------------------------------------------
    City #561
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2488835
    City Name: Medea
    City ID: 2488835
    ----------------------------------------------------------------------------
    City #562
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2027042
    City Name: Batagay-Alyta
    City ID: 2027042
    ----------------------------------------------------------------------------
    City #563
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5795906
    City Name: Graham
    City ID: 5795906
    ----------------------------------------------------------------------------
    City #564
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4468525
    City Name: Graham
    City ID: 4468525
    ----------------------------------------------------------------------------
    City #565
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6301965
    City Name: Palmerston
    City ID: 6301965
    ----------------------------------------------------------------------------
    City #566
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6096436
    City Name: Palmerston
    City ID: 6096436
    ----------------------------------------------------------------------------
    City #567
    City URL: http://api.openweathermap.org/data/2.5/weather?id=547677
    City Name: Kletskaya
    City ID: 547677
    ----------------------------------------------------------------------------
    City #568
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5605242
    City Name: Rexburg
    City ID: 5605242
    ----------------------------------------------------------------------------
    City #569
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2396518
    City Name: Port-Gentil
    City ID: 2396518
    ----------------------------------------------------------------------------
    City #570
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3465090
    City Name: Cruzeiro
    City ID: 3465090
    ----------------------------------------------------------------------------
    City #571
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1642773
    City Name: Japura
    City ID: 1642773
    ----------------------------------------------------------------------------
    City #572
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2269142
    City Name: Colares
    City ID: 2269142
    ----------------------------------------------------------------------------
    City #573
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2640377
    City Name: Penzance
    City ID: 2640377
    ----------------------------------------------------------------------------
    City #574
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2522857
    City Name: Tricase
    City ID: 2522857
    ----------------------------------------------------------------------------
    City #575
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1528998
    City Name: Yumen
    City ID: 1528998
    ----------------------------------------------------------------------------
    City #576
    City URL: http://api.openweathermap.org/data/2.5/weather?id=204953
    City Name: Tshikapa
    City ID: 204953
    ----------------------------------------------------------------------------
    City #577
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3467261
    City Name: Ipira
    City ID: 3467261
    ----------------------------------------------------------------------------
    City #578
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2246452
    City Name: Saint-Louis
    City ID: 2246452
    ----------------------------------------------------------------------------
    City #579
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2978742
    City Name: Saint-Louis
    City ID: 2978742
    ----------------------------------------------------------------------------
    City #580
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2137773
    City Name: Vao
    City ID: 2137773
    ----------------------------------------------------------------------------
    City #581
    City URL: http://api.openweathermap.org/data/2.5/weather?id=588365
    City Name: Vao
    City ID: 588365
    ----------------------------------------------------------------------------
    City #582
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2381334
    City Name: Atar
    City ID: 2381334
    ----------------------------------------------------------------------------
    City #583
    City URL: http://api.openweathermap.org/data/2.5/weather?id=468560
    City Name: Yayva
    City ID: 468560
    ----------------------------------------------------------------------------
    City #584
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6320062
    City Name: Vila Velha
    City ID: 6320062
    ----------------------------------------------------------------------------
    City #585
    City URL: http://api.openweathermap.org/data/2.5/weather?id=946257
    City Name: Ulundi
    City ID: 946257
    ----------------------------------------------------------------------------
    City #586
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2015913
    City Name: Suntar
    City ID: 2015913
    ----------------------------------------------------------------------------
    City #587
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3526536
    City Name: Tlacotepec
    City ID: 3526536
    ----------------------------------------------------------------------------
    City #588
    City URL: http://api.openweathermap.org/data/2.5/weather?id=535839
    City Name: Leshukonskoye
    City ID: 535839
    ----------------------------------------------------------------------------
    City #589
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2206894
    City Name: Hokitika
    City ID: 2206894
    ----------------------------------------------------------------------------
    City #590
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3354540
    City Name: Omaruru
    City ID: 3354540
    ----------------------------------------------------------------------------
    City #591
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2303611
    City Name: Axim
    City ID: 2303611
    ----------------------------------------------------------------------------
    City #592
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5431710
    City Name: Montrose
    City ID: 5431710
    ----------------------------------------------------------------------------
    City #593
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2157161
    City Name: Montrose
    City ID: 2157161
    ----------------------------------------------------------------------------
    City #594
    City URL: http://api.openweathermap.org/data/2.5/weather?id=824987
    City Name: Khokhlovo
    City ID: 824987
    ----------------------------------------------------------------------------
    City #595
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2160517
    City Name: Launceston
    City ID: 2160517
    ----------------------------------------------------------------------------
    City #596
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2377457
    City Name: Nouadhibou
    City ID: 2377457
    ----------------------------------------------------------------------------
    City #597
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1717787
    City Name: Catuday
    City ID: 1717787
    ----------------------------------------------------------------------------
    City #598
    City URL: http://api.openweathermap.org/data/2.5/weather?id=231250
    City Name: Kilembe
    City ID: 231250
    ----------------------------------------------------------------------------
    City #599
    City URL: http://api.openweathermap.org/data/2.5/weather?id=258175
    City Name: Lixourion
    City ID: 258175
    ----------------------------------------------------------------------------
    City #600
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1153035
    City Name: Kathu
    City ID: 1153035
    ----------------------------------------------------------------------------
    City #601
    City URL: http://api.openweathermap.org/data/2.5/weather?id=991664
    City Name: Kathu
    City ID: 991664
    ----------------------------------------------------------------------------
    City #602
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3397851
    City Name: Itupiranga
    City ID: 3397851
    ----------------------------------------------------------------------------
    City #603
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1270251
    City Name: Hasanpur
    City ID: 1270251
    ----------------------------------------------------------------------------
    City #604
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1278827
    City Name: Ambikapur
    City ID: 1278827
    ----------------------------------------------------------------------------
    City #605
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5363208
    City Name: King City
    City ID: 5363208
    ----------------------------------------------------------------------------
    City #606
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2016307
    City Name: Solnechnyy
    City ID: 2016307
    ----------------------------------------------------------------------------
    City #607
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3420768
    City Name: Qasigiannguit
    City ID: 3420768
    ----------------------------------------------------------------------------
    City #608
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1272674
    City Name: Dhupgari
    City ID: 1272674
    ----------------------------------------------------------------------------
    City #609
    City URL: http://api.openweathermap.org/data/2.5/weather?id=591475
    City Name: Kehtna
    City ID: 591475
    ----------------------------------------------------------------------------
    City #610
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3981460
    City Name: Coahuayana
    City ID: 3981460
    ----------------------------------------------------------------------------
    City #611
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1082243
    City Name: Ambilobe
    City ID: 1082243
    ----------------------------------------------------------------------------
    City #612
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6942803
    City Name: Caraquet
    City ID: 6942803
    ----------------------------------------------------------------------------
    City #613
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2276492
    City Name: Harper
    City ID: 2276492
    ----------------------------------------------------------------------------
    City #614
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4696310
    City Name: Harper
    City ID: 4696310
    ----------------------------------------------------------------------------
    City #615
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2470483
    City Name: Harqalah
    City ID: 2470483
    ----------------------------------------------------------------------------
    City #616
    City URL: http://api.openweathermap.org/data/2.5/weather?id=172955
    City Name: Harqalah
    City ID: 172955
    ----------------------------------------------------------------------------
    City #617
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2130741
    City Name: Abashiri
    City ID: 2130741
    ----------------------------------------------------------------------------
    City #618
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1152562
    City Name: Kui Buri
    City ID: 1152562
    ----------------------------------------------------------------------------
    City #619
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1525798
    City Name: Balkhash
    City ID: 1525798
    ----------------------------------------------------------------------------
    City #620
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1861108
    City Name: Minamata
    City ID: 1861108
    ----------------------------------------------------------------------------
    City #621
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1861280
    City Name: Itoman
    City ID: 1861280
    ----------------------------------------------------------------------------
    City #622
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3924679
    City Name: Vilhena
    City ID: 3924679
    ----------------------------------------------------------------------------
    City #623
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1502063
    City Name: Krasnoturansk
    City ID: 1502063
    ----------------------------------------------------------------------------
    City #624
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3598787
    City Name: Champerico
    City ID: 3598787
    ----------------------------------------------------------------------------
    City #625
    City URL: http://api.openweathermap.org/data/2.5/weather?id=965528
    City Name: Phalaborwa
    City ID: 965528
    ----------------------------------------------------------------------------
    City #626
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122850
    City Name: Nikolayevsk-na-amure
    City ID: 2122850
    ----------------------------------------------------------------------------
    City #627
    City URL: http://api.openweathermap.org/data/2.5/weather?id=899825
    City Name: Petauke
    City ID: 899825
    ----------------------------------------------------------------------------
    City #628
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1083724
    City Name: Ambanja
    City ID: 1083724
    ----------------------------------------------------------------------------
    City #629
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2172797
    City Name: Cairns
    City ID: 2172797
    ----------------------------------------------------------------------------
    City #630
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1524243
    City Name: Georgiyevka
    City ID: 1524243
    ----------------------------------------------------------------------------
    City #631
    City URL: http://api.openweathermap.org/data/2.5/weather?id=565857
    City Name: Georgiyevka
    City ID: 565857
    ----------------------------------------------------------------------------
    City #632
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2400547
    City Name: Gamba
    City ID: 2400547
    ----------------------------------------------------------------------------
    City #633
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1281256
    City Name: Gamba
    City ID: 1281256
    ----------------------------------------------------------------------------
    City #634
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3491355
    City Name: Black River
    City ID: 3491355
    ----------------------------------------------------------------------------
    City #635
    City URL: http://api.openweathermap.org/data/2.5/weather?id=490554
    City Name: Sorochinsk
    City ID: 490554
    ----------------------------------------------------------------------------
    City #636
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3901547
    City Name: Villamontes
    City ID: 3901547
    ----------------------------------------------------------------------------
    City #637
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3868626
    City Name: Valparaiso
    City ID: 3868626
    ----------------------------------------------------------------------------
    City #638
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4927537
    City Name: Valparaiso
    City ID: 4927537
    ----------------------------------------------------------------------------
    City #639
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2012530
    City Name: Zhigansk
    City ID: 2012530
    ----------------------------------------------------------------------------
    City #640
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4677008
    City Name: Bryan
    City ID: 4677008
    ----------------------------------------------------------------------------
    City #641
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1512019
    City Name: Aksarka
    City ID: 1512019
    ----------------------------------------------------------------------------
    City #642
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1673820
    City Name: Kaohsiung
    City ID: 1673820
    ----------------------------------------------------------------------------
    City #643
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5850511
    City Name: Makaha
    City ID: 5850511
    ----------------------------------------------------------------------------
    City #644
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1490256
    City Name: Talnakh
    City ID: 1490256
    ----------------------------------------------------------------------------
    City #645
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013258
    City Name: Vrangel
    City ID: 2013258
    ----------------------------------------------------------------------------
    City #646
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5789683
    City Name: Centralia
    City ID: 5789683
    ----------------------------------------------------------------------------
    City #647
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4380848
    City Name: Centralia
    City ID: 4380848
    ----------------------------------------------------------------------------
    City #648
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3533462
    City Name: Acapulco
    City ID: 3533462
    ----------------------------------------------------------------------------
    City #649
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2146219
    City Name: Hervey Bay
    City ID: 2146219
    ----------------------------------------------------------------------------
    City #650
    City URL: http://api.openweathermap.org/data/2.5/weather?id=779622
    City Name: Havoysund
    City ID: 779622
    ----------------------------------------------------------------------------
    City #651
    City URL: http://api.openweathermap.org/data/2.5/weather?id=454584
    City Name: Valdemarpils
    City ID: 454584
    ----------------------------------------------------------------------------
    City #652
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2267254
    City Name: Lagoa
    City ID: 2267254
    ----------------------------------------------------------------------------
    City #653
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1278969
    City Name: Along
    City ID: 1278969
    ----------------------------------------------------------------------------
    City #654
    City URL: http://api.openweathermap.org/data/2.5/weather?id=53157
    City Name: Qandala
    City ID: 53157
    ----------------------------------------------------------------------------
    City #655
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122605
    City Name: Okhotsk
    City ID: 2122605
    ----------------------------------------------------------------------------
    City #656
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2654970
    City Name: Brae
    City ID: 2654970
    ----------------------------------------------------------------------------
    City #657
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5488441
    City Name: Roswell
    City ID: 5488441
    ----------------------------------------------------------------------------
    City #658
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2986626
    City Name: Plouzane
    City ID: 2986626
    ----------------------------------------------------------------------------
    City #659
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1791779
    City Name: Wanning
    City ID: 1791779
    ----------------------------------------------------------------------------
    City #660
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3220813
    City Name: Wanning
    City ID: 3220813
    ----------------------------------------------------------------------------
    City #661
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2274895
    City Name: Monrovia
    City ID: 2274895
    ----------------------------------------------------------------------------
    City #662
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3146463
    City Name: Mandal
    City ID: 3146463
    ----------------------------------------------------------------------------
    City #663
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2031533
    City Name: Mandal
    City ID: 2031533
    ----------------------------------------------------------------------------
    City #664
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2029947
    City Name: Moron
    City ID: 2029947
    ----------------------------------------------------------------------------
    City #665
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3631878
    City Name: Moron
    City ID: 3631878
    ----------------------------------------------------------------------------
    City #666
    City URL: http://api.openweathermap.org/data/2.5/weather?id=107304
    City Name: Buraydah
    City ID: 107304
    ----------------------------------------------------------------------------
    City #667
    City URL: http://api.openweathermap.org/data/2.5/weather?id=578152
    City Name: Belaya Kholunitsa
    City ID: 578152
    ----------------------------------------------------------------------------
    City #668
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5012495
    City Name: Traverse City
    City ID: 5012495
    ----------------------------------------------------------------------------
    City #669
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2012646
    City Name: Zarubino
    City ID: 2012646
    ----------------------------------------------------------------------------
    City #670
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2437798
    City Name: Zinder
    City ID: 2437798
    ----------------------------------------------------------------------------
    City #671
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1257588
    City Name: Salumbar
    City ID: 1257588
    ----------------------------------------------------------------------------
    City #672
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2125693
    City Name: Evensk
    City ID: 2125693
    ----------------------------------------------------------------------------
    City #673
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122104
    City Name: Petropavlovsk-Kamchatskiy
    City ID: 2122104
    ----------------------------------------------------------------------------
    City #674
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1503037
    City Name: Kodinsk
    City ID: 1503037
    ----------------------------------------------------------------------------
    City #675
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2681825
    City Name: Ronneby
    City ID: 2681825
    ----------------------------------------------------------------------------
    City #676
    City URL: http://api.openweathermap.org/data/2.5/weather?id=986717
    City Name: Kruisfontein
    City ID: 986717
    ----------------------------------------------------------------------------
    City #677
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6050194
    City Name: La Sarre
    City ID: 6050194
    ----------------------------------------------------------------------------
    City #678
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3466165
    City Name: Cidreira
    City ID: 3466165
    ----------------------------------------------------------------------------
    City #679
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1805270
    City Name: Jishou
    City ID: 1805270
    ----------------------------------------------------------------------------
    City #680
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2610343
    City Name: Vestmanna
    City ID: 2610343
    ----------------------------------------------------------------------------
    City #681
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3996234
    City Name: Lazaro Cardenas
    City ID: 3996234
    ----------------------------------------------------------------------------
    City #682
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4589446
    City Name: North Myrtle Beach
    City ID: 4589446
    ----------------------------------------------------------------------------
    City #683
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3420846
    City Name: Qaqortoq
    City ID: 3420846
    ----------------------------------------------------------------------------
    City #684
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3392251
    City Name: Pesqueira
    City ID: 3392251
    ----------------------------------------------------------------------------
    City #685
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1283240
    City Name: Kathmandu
    City ID: 1283240
    ----------------------------------------------------------------------------
    City #686
    City URL: http://api.openweathermap.org/data/2.5/weather?id=73560
    City Name: Lahij
    City ID: 73560
    ----------------------------------------------------------------------------
    City #687
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2140558
    City Name: Koumac
    City ID: 2140558
    ----------------------------------------------------------------------------
    City #688
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6096672
    City Name: Papineauville
    City ID: 6096672
    ----------------------------------------------------------------------------
    City #689
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2013921
    City Name: Ust-Kuyga
    City ID: 2013921
    ----------------------------------------------------------------------------
    City #690
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1498919
    City Name: Lugovoy
    City ID: 1498919
    ----------------------------------------------------------------------------
    City #691
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1337619
    City Name: Ugoofaaru
    City ID: 1337619
    ----------------------------------------------------------------------------
    City #692
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1622318
    City Name: Waingapu
    City ID: 1622318
    ----------------------------------------------------------------------------
    City #693
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5517675
    City Name: Brownfield
    City ID: 5517675
    ----------------------------------------------------------------------------
    City #694
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3141548
    City Name: Rognan
    City ID: 3141548
    ----------------------------------------------------------------------------
    City #695
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1253237
    City Name: Veraval
    City ID: 1253237
    ----------------------------------------------------------------------------
    City #696
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3031871
    City Name: Veraval
    City ID: 3031871
    ----------------------------------------------------------------------------
    City #697
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6295855
    City Name: Saint-Georges
    City ID: 6295855
    ----------------------------------------------------------------------------
    City #698
    City URL: http://api.openweathermap.org/data/2.5/weather?id=174448
    City Name: Abu Kamal
    City ID: 174448
    ----------------------------------------------------------------------------
    City #699
    City URL: http://api.openweathermap.org/data/2.5/weather?id=145459
    City Name: Abadan
    City ID: 145459
    ----------------------------------------------------------------------------
    City #700
    City URL: http://api.openweathermap.org/data/2.5/weather?id=777682
    City Name: Skjervoy
    City ID: 777682
    ----------------------------------------------------------------------------
    City #701
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1651103
    City Name: Atambua
    City ID: 1651103
    ----------------------------------------------------------------------------
    City #702
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1278278
    City Name: Asind
    City ID: 1278278
    ----------------------------------------------------------------------------
    City #703
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1168700
    City Name: Ormara
    City ID: 1168700
    ----------------------------------------------------------------------------
    City #704
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1634266
    City Name: Negara
    City ID: 1634266
    ----------------------------------------------------------------------------
    City #705
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2160063
    City Name: Codrington
    City ID: 2160063
    ----------------------------------------------------------------------------
    City #706
    City URL: http://api.openweathermap.org/data/2.5/weather?id=581179
    City Name: Ardon
    City ID: 581179
    ----------------------------------------------------------------------------
    City #707
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1058080
    City Name: Nosy Varika
    City ID: 1058080
    ----------------------------------------------------------------------------
    City #708
    City URL: http://api.openweathermap.org/data/2.5/weather?id=501091
    City Name: Rovnoye
    City ID: 501091
    ----------------------------------------------------------------------------
    City #709
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5954718
    City Name: Flin Flon
    City ID: 5954718
    ----------------------------------------------------------------------------
    City #710
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1337613
    City Name: Kulhudhuffushi
    City ID: 1337613
    ----------------------------------------------------------------------------
    City #711
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3994469
    City Name: Ojinaga
    City ID: 3994469
    ----------------------------------------------------------------------------
    City #712
    City URL: http://api.openweathermap.org/data/2.5/weather?id=597596
    City Name: Lazdijai
    City ID: 597596
    ----------------------------------------------------------------------------
    City #713
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2455290
    City Name: Kidal
    City ID: 2455290
    ----------------------------------------------------------------------------
    City #714
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3194099
    City Name: Opatija
    City ID: 3194099
    ----------------------------------------------------------------------------
    City #715
    City URL: http://api.openweathermap.org/data/2.5/weather?id=339734
    City Name: Debre Birhan
    City ID: 339734
    ----------------------------------------------------------------------------
    City #716
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2022773
    City Name: Khandyga
    City ID: 2022773
    ----------------------------------------------------------------------------
    City #717
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2171722
    City Name: Charters Towers
    City ID: 2171722
    ----------------------------------------------------------------------------
    City #718
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2088122
    City Name: Port Moresby
    City ID: 2088122
    ----------------------------------------------------------------------------
    City #719
    City URL: http://api.openweathermap.org/data/2.5/weather?id=934479
    City Name: Grand Gaube
    City ID: 934479
    ----------------------------------------------------------------------------
    City #720
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6620339
    City Name: Karratha
    City ID: 6620339
    ----------------------------------------------------------------------------
    City #721
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5841207
    City Name: Torrington
    City ID: 5841207
    ----------------------------------------------------------------------------
    City #722
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3675504
    City Name: Manaure
    City ID: 3675504
    ----------------------------------------------------------------------------
    City #723
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1621395
    City Name: Kalianget
    City ID: 1621395
    ----------------------------------------------------------------------------
    City #724
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3035843
    City Name: Auxerre
    City ID: 3035843
    ----------------------------------------------------------------------------
    City #725
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2460546
    City Name: Banamba
    City ID: 2460546
    ----------------------------------------------------------------------------
    City #726
    City URL: http://api.openweathermap.org/data/2.5/weather?id=667306
    City Name: Sfantu Gheorghe
    City ID: 667306
    ----------------------------------------------------------------------------
    City #727
    City URL: http://api.openweathermap.org/data/2.5/weather?id=690820
    City Name: Uhlove
    City ID: 690820
    ----------------------------------------------------------------------------
    City #728
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1520281
    City Name: Oytal
    City ID: 1520281
    ----------------------------------------------------------------------------
    City #729
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3584003
    City Name: Puerto El Triunfo
    City ID: 3584003
    ----------------------------------------------------------------------------
    City #730
    City URL: http://api.openweathermap.org/data/2.5/weather?id=522260
    City Name: Nikel
    City ID: 522260
    ----------------------------------------------------------------------------
    City #731
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2294915
    City Name: Takoradi
    City ID: 2294915
    ----------------------------------------------------------------------------
    City #732
    City URL: http://api.openweathermap.org/data/2.5/weather?id=610298
    City Name: Beyneu
    City ID: 610298
    ----------------------------------------------------------------------------
    City #733
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1045114
    City Name: Inhambane
    City ID: 1045114
    ----------------------------------------------------------------------------
    City #734
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5745380
    City Name: Pendleton
    City ID: 5745380
    ----------------------------------------------------------------------------
    City #735
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4590762
    City Name: Pendleton
    City ID: 4590762
    ----------------------------------------------------------------------------
    City #736
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1636308
    City Name: Manokwari
    City ID: 1636308
    ----------------------------------------------------------------------------
    City #737
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2126682
    City Name: Bilibino
    City ID: 2126682
    ----------------------------------------------------------------------------
    City #738
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1123004
    City Name: Taloqan
    City ID: 1123004
    ----------------------------------------------------------------------------
    City #739
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1693840
    City Name: Dancalan
    City ID: 1693840
    ----------------------------------------------------------------------------
    City #740
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1634614
    City Name: Nabire
    City ID: 1634614
    ----------------------------------------------------------------------------
    City #741
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5193309
    City Name: Hermitage
    City ID: 5193309
    ----------------------------------------------------------------------------
    City #742
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3897347
    City Name: Calama
    City ID: 3897347
    ----------------------------------------------------------------------------
    City #743
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2122783
    City Name: Katangli
    City ID: 2122783
    ----------------------------------------------------------------------------
    City #744
    City URL: http://api.openweathermap.org/data/2.5/weather?id=186180
    City Name: Moyale
    City ID: 186180
    ----------------------------------------------------------------------------
    City #745
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2186363
    City Name: Muriwai Beach
    City ID: 2186363
    ----------------------------------------------------------------------------
    City #746
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2191562
    City Name: Dunedin
    City ID: 2191562
    ----------------------------------------------------------------------------
    City #747
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1337605
    City Name: Mahibadhoo
    City ID: 1337605
    ----------------------------------------------------------------------------
    City #748
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5606187
    City Name: Saint Anthony
    City ID: 5606187
    ----------------------------------------------------------------------------
    City #749
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3116224
    City Name: Monzon
    City ID: 3116224
    ----------------------------------------------------------------------------
    City #750
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3179493
    City Name: Monzon
    City ID: 3179493
    ----------------------------------------------------------------------------
    City #751
    City URL: http://api.openweathermap.org/data/2.5/weather?id=898912
    City Name: Serenje
    City ID: 898912
    ----------------------------------------------------------------------------
    City #752
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4720131
    City Name: Portland
    City ID: 4720131
    ----------------------------------------------------------------------------
    City #753
    City URL: http://api.openweathermap.org/data/2.5/weather?id=878281
    City Name: Lindi
    City ID: 878281
    ----------------------------------------------------------------------------
    City #754
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5039675
    City Name: Northfield
    City ID: 5039675
    ----------------------------------------------------------------------------
    City #755
    City URL: http://api.openweathermap.org/data/2.5/weather?id=151567
    City Name: Nguruka
    City ID: 151567
    ----------------------------------------------------------------------------
    City #756
    City URL: http://api.openweathermap.org/data/2.5/weather?id=248843
    City Name: Jawa
    City ID: 248843
    ----------------------------------------------------------------------------
    City #757
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2341656
    City Name: Jawa
    City ID: 2341656
    ----------------------------------------------------------------------------
    City #758
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3665924
    City Name: Villapinzon
    City ID: 3665924
    ----------------------------------------------------------------------------
    City #759
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2168305
    City Name: Dubbo
    City ID: 2168305
    ----------------------------------------------------------------------------
    City #760
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3471196
    City Name: Bage
    City ID: 3471196
    ----------------------------------------------------------------------------
    City #761
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2329562
    City Name: Bage
    City ID: 2329562
    ----------------------------------------------------------------------------
    City #762
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5859699
    City Name: College
    City ID: 5859699
    ----------------------------------------------------------------------------
    City #763
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3082734
    City Name: Wabrzezno
    City ID: 3082734
    ----------------------------------------------------------------------------
    City #764
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3395042
    City Name: Mazagao
    City ID: 3395042
    ----------------------------------------------------------------------------
    City #765
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2160735
    City Name: Lakes Entrance
    City ID: 2160735
    ----------------------------------------------------------------------------
    City #766
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3662489
    City Name: Santa Isabel do Rio Negro
    City ID: 3662489
    ----------------------------------------------------------------------------
    City #767
    City URL: http://api.openweathermap.org/data/2.5/weather?id=608271
    City Name: Shubarkuduk
    City ID: 608271
    ----------------------------------------------------------------------------
    City #768
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3372783
    City Name: Ponta Delgada
    City ID: 3372783
    ----------------------------------------------------------------------------
    City #769
    City URL: http://api.openweathermap.org/data/2.5/weather?id=520642
    City Name: Nizhniye Vyazovyye
    City ID: 520642
    ----------------------------------------------------------------------------
    City #770
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3461425
    City Name: Ilhabela
    City ID: 3461425
    ----------------------------------------------------------------------------
    City #771
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6058560
    City Name: London
    City ID: 6058560
    ----------------------------------------------------------------------------
    City #772
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2643743
    City Name: London
    City ID: 2643743
    ----------------------------------------------------------------------------
    City #773
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1244926
    City Name: Hambantota
    City ID: 1244926
    ----------------------------------------------------------------------------
    City #774
    City URL: http://api.openweathermap.org/data/2.5/weather?id=503401
    City Name: Pyshchug
    City ID: 503401
    ----------------------------------------------------------------------------
    City #775
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1814093
    City Name: Dali
    City ID: 1814093
    ----------------------------------------------------------------------------
    City #776
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1028918
    City Name: Pemba
    City ID: 1028918
    ----------------------------------------------------------------------------
    City #777
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6171633
    City Name: Ucluelet
    City ID: 6171633
    ----------------------------------------------------------------------------
    City #778
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5881688
    City Name: Fort Saint James
    City ID: 5881688
    ----------------------------------------------------------------------------
    City #779
    City URL: http://api.openweathermap.org/data/2.5/weather?id=778707
    City Name: Mehamn
    City ID: 778707
    ----------------------------------------------------------------------------
    City #780
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3897774
    City Name: Buin
    City ID: 3897774
    ----------------------------------------------------------------------------
    City #781
    City URL: http://api.openweathermap.org/data/2.5/weather?id=244878
    City Name: Biltine
    City ID: 244878
    ----------------------------------------------------------------------------
    City #782
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1498314
    City Name: Motygino
    City ID: 1498314
    ----------------------------------------------------------------------------
    City #783
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3572627
    City Name: Cockburn Town
    City ID: 3572627
    ----------------------------------------------------------------------------
    City #784
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3576994
    City Name: Cockburn Town
    City ID: 3576994
    ----------------------------------------------------------------------------
    City #785
    City URL: http://api.openweathermap.org/data/2.5/weather?id=214614
    City Name: Kamina
    City ID: 214614
    ----------------------------------------------------------------------------
    City #786
    City URL: http://api.openweathermap.org/data/2.5/weather?id=178443
    City Name: Wajir
    City ID: 178443
    ----------------------------------------------------------------------------
    City #787
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1328421
    City Name: Pathein
    City ID: 1328421
    ----------------------------------------------------------------------------
    City #788
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1215502
    City Name: Banda Aceh
    City ID: 1215502
    ----------------------------------------------------------------------------
    City #789
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2620786
    City Name: Hanstholm
    City ID: 2620786
    ----------------------------------------------------------------------------
    City #790
    City URL: http://api.openweathermap.org/data/2.5/weather?id=530196
    City Name: Malyye Derbety
    City ID: 530196
    ----------------------------------------------------------------------------
    City #791
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3450272
    City Name: Santa Cruz do Rio Pardo
    City ID: 3450272
    ----------------------------------------------------------------------------
    City #792
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1517637
    City Name: Ushtobe
    City ID: 1517637
    ----------------------------------------------------------------------------
    City #793
    City URL: http://api.openweathermap.org/data/2.5/weather?id=931865
    City Name: Balaka
    City ID: 931865
    ----------------------------------------------------------------------------
    City #794
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3156980
    City Name: Floro
    City ID: 3156980
    ----------------------------------------------------------------------------
    City #795
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3137405
    City Name: Sortland
    City ID: 3137405
    ----------------------------------------------------------------------------
    City #796
    City URL: http://api.openweathermap.org/data/2.5/weather?id=954161
    City Name: Somerset East
    City ID: 954161
    ----------------------------------------------------------------------------
    City #797
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3526756
    City Name: Isla Mujeres
    City ID: 3526756
    ----------------------------------------------------------------------------
    City #798
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2125906
    City Name: Dukat
    City ID: 2125906
    ----------------------------------------------------------------------------
    City #799
    City URL: http://api.openweathermap.org/data/2.5/weather?id=786562
    City Name: Dukat
    City ID: 786562
    ----------------------------------------------------------------------------
    City #800
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5972291
    City Name: Havre-Saint-Pierre
    City ID: 5972291
    ----------------------------------------------------------------------------
    City #801
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3466750
    City Name: Cassilandia
    City ID: 3466750
    ----------------------------------------------------------------------------
    City #802
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2019309
    City Name: Neryungri
    City ID: 2019309
    ----------------------------------------------------------------------------
    City #803
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2653941
    City Name: Cambridge
    City ID: 2653941
    ----------------------------------------------------------------------------
    City #804
    City URL: http://api.openweathermap.org/data/2.5/weather?id=53654
    City Name: Mogadishu
    City ID: 53654
    ----------------------------------------------------------------------------
    City #805
    City URL: http://api.openweathermap.org/data/2.5/weather?id=261814
    City Name: Pirgos
    City ID: 261814
    ----------------------------------------------------------------------------
    City #806
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3833883
    City Name: Trelew
    City ID: 3833883
    ----------------------------------------------------------------------------
    City #807
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2112444
    City Name: Kamaishi
    City ID: 2112444
    ----------------------------------------------------------------------------
    City #808
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2017824
    City Name: Pokrovsk
    City ID: 2017824
    ----------------------------------------------------------------------------
    City #809
    City URL: http://api.openweathermap.org/data/2.5/weather?id=704422
    City Name: Pokrovsk
    City ID: 704422
    ----------------------------------------------------------------------------
    City #810
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1648082
    City Name: Boyolangu
    City ID: 1648082
    ----------------------------------------------------------------------------
    City #811
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4597200
    City Name: Spartanburg
    City ID: 4597200
    ----------------------------------------------------------------------------
    City #812
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4111410
    City Name: Fort Smith
    City ID: 4111410
    ----------------------------------------------------------------------------
    City #813
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3383434
    City Name: Nieuw Amsterdam
    City ID: 3383434
    ----------------------------------------------------------------------------
    City #814
    City URL: http://api.openweathermap.org/data/2.5/weather?id=64435
    City Name: Berbera
    City ID: 64435
    ----------------------------------------------------------------------------
    City #815
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6174335
    City Name: Ville-Marie
    City ID: 6174335
    ----------------------------------------------------------------------------
    City #816
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2214433
    City Name: Nalut
    City ID: 2214433
    ----------------------------------------------------------------------------
    City #817
    City URL: http://api.openweathermap.org/data/2.5/weather?id=537541
    City Name: Kvarkeno
    City ID: 537541
    ----------------------------------------------------------------------------
    City #818
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2451185
    City Name: Sikasso
    City ID: 2451185
    ----------------------------------------------------------------------------
    City #819
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3861953
    City Name: Chacabuco
    City ID: 3861953
    ----------------------------------------------------------------------------
    City #820
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5393287
    City Name: Santa Rosa
    City ID: 5393287
    ----------------------------------------------------------------------------
    City #821
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3835994
    City Name: Santa Rosa
    City ID: 3835994
    ----------------------------------------------------------------------------
    City #822
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3899539
    City Name: Antofagasta
    City ID: 3899539
    ----------------------------------------------------------------------------
    City #823
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3640226
    City Name: Guanare
    City ID: 3640226
    ----------------------------------------------------------------------------
    City #824
    City URL: http://api.openweathermap.org/data/2.5/weather?id=595997
    City Name: Pasvalys
    City ID: 595997
    ----------------------------------------------------------------------------
    City #825
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3401845
    City Name: Conceicao do Araguaia
    City ID: 3401845
    ----------------------------------------------------------------------------
    City #826
    City URL: http://api.openweathermap.org/data/2.5/weather?id=496285
    City Name: Severodvinsk
    City ID: 496285
    ----------------------------------------------------------------------------
    City #827
    City URL: http://api.openweathermap.org/data/2.5/weather?id=155921
    City Name: Liwale
    City ID: 155921
    ----------------------------------------------------------------------------
    City #828
    City URL: http://api.openweathermap.org/data/2.5/weather?id=89113
    City Name: Ajdabiya
    City ID: 89113
    ----------------------------------------------------------------------------
    City #829
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2640006
    City Name: Portree
    City ID: 2640006
    ----------------------------------------------------------------------------
    City #830
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2163055
    City Name: Horsham
    City ID: 2163055
    ----------------------------------------------------------------------------
    City #831
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5975004
    City Name: High Level
    City ID: 5975004
    ----------------------------------------------------------------------------
    City #832
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2138285
    City Name: Tadine
    City ID: 2138285
    ----------------------------------------------------------------------------
    City #833
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3982292
    City Name: Tayoltita
    City ID: 3982292
    ----------------------------------------------------------------------------
    City #834
    City URL: http://api.openweathermap.org/data/2.5/weather?id=513051
    City Name: Palkino
    City ID: 513051
    ----------------------------------------------------------------------------
    City #835
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1485724
    City Name: Talaya
    City ID: 1485724
    ----------------------------------------------------------------------------
    City #836
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2422465
    City Name: Conakry
    City ID: 2422465
    ----------------------------------------------------------------------------
    City #837
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3471522
    City Name: Arinos
    City ID: 3471522
    ----------------------------------------------------------------------------
    City #838
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5847486
    City Name: Kailua
    City ID: 5847486
    ----------------------------------------------------------------------------
    City #839
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1263942
    City Name: Manavalakurichi
    City ID: 1263942
    ----------------------------------------------------------------------------
    City #840
    City URL: http://api.openweathermap.org/data/2.5/weather?id=606531
    City Name: Boden
    City ID: 606531
    ----------------------------------------------------------------------------
    City #841
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2374583
    City Name: Bubaque
    City ID: 2374583
    ----------------------------------------------------------------------------
    City #842
    City URL: http://api.openweathermap.org/data/2.5/weather?id=70979
    City Name: Sayyan
    City ID: 70979
    ----------------------------------------------------------------------------
    City #843
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1793199
    City Name: Encheng
    City ID: 1793199
    ----------------------------------------------------------------------------
    City #844
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2162737
    City Name: Ingham
    City ID: 2162737
    ----------------------------------------------------------------------------
    City #845
    City URL: http://api.openweathermap.org/data/2.5/weather?id=553725
    City Name: Kamenka
    City ID: 553725
    ----------------------------------------------------------------------------
    City #846
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2019935
    City Name: Mnogovershinnyy
    City ID: 2019935
    ----------------------------------------------------------------------------
    City #847
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2144168
    City Name: Wellington
    City ID: 2144168
    ----------------------------------------------------------------------------
    City #848
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2179537
    City Name: Wellington
    City ID: 2179537
    ----------------------------------------------------------------------------
    City #849
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3572189
    City Name: High Rock
    City ID: 3572189
    ----------------------------------------------------------------------------
    City #850
    City URL: http://api.openweathermap.org/data/2.5/weather?id=121801
    City Name: Orumiyeh
    City ID: 121801
    ----------------------------------------------------------------------------
    City #851
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3666102
    City Name: Versalles
    City ID: 3666102
    ----------------------------------------------------------------------------
    City #852
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3356832
    City Name: Henties Bay
    City ID: 3356832
    ----------------------------------------------------------------------------
    City #853
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3517241
    City Name: Santa Maria la Alta
    City ID: 3517241
    ----------------------------------------------------------------------------
    City #854
    City URL: http://api.openweathermap.org/data/2.5/weather?id=780643
    City Name: Bjornevatn
    City ID: 780643
    ----------------------------------------------------------------------------
    City #855
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2012956
    City Name: Yerbogachen
    City ID: 2012956
    ----------------------------------------------------------------------------
    City #856
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3893656
    City Name: Copiapo
    City ID: 3893656
    ----------------------------------------------------------------------------
    City #857
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3622716
    City Name: Nicoya
    City ID: 3622716
    ----------------------------------------------------------------------------
    City #858
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1651531
    City Name: Ambon
    City ID: 1651531
    ----------------------------------------------------------------------------
    City #859
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3037899
    City Name: Ambon
    City ID: 3037899
    ----------------------------------------------------------------------------
    City #860
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2181625
    City Name: Te Anau
    City ID: 2181625
    ----------------------------------------------------------------------------
    City #861
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1641899
    City Name: Labuhan
    City ID: 1641899
    ----------------------------------------------------------------------------
    City #862
    City URL: http://api.openweathermap.org/data/2.5/weather?id=780687
    City Name: Berlevag
    City ID: 780687
    ----------------------------------------------------------------------------
    City #863
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6180550
    City Name: Whitehorse
    City ID: 6180550
    ----------------------------------------------------------------------------
    City #864
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2271968
    City Name: Aljezur
    City ID: 2271968
    ----------------------------------------------------------------------------
    City #865
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5178040
    City Name: Wexford
    City ID: 5178040
    ----------------------------------------------------------------------------
    City #866
    City URL: http://api.openweathermap.org/data/2.5/weather?id=217562
    City Name: Butembo
    City ID: 217562
    ----------------------------------------------------------------------------
    City #867
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1899102
    City Name: Nagato
    City ID: 1899102
    ----------------------------------------------------------------------------
    City #868
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2028164
    City Name: Deputatskiy
    City ID: 2028164
    ----------------------------------------------------------------------------
    City #869
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3404558
    City Name: Cabedelo
    City ID: 3404558
    ----------------------------------------------------------------------------
    City #870
    City URL: http://api.openweathermap.org/data/2.5/weather?id=877384
    City Name: Tingi
    City ID: 877384
    ----------------------------------------------------------------------------
    City #871
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1831112
    City Name: Kampot
    City ID: 1831112
    ----------------------------------------------------------------------------
    City #872
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4031742
    City Name: Egvekinot
    City ID: 4031742
    ----------------------------------------------------------------------------
    City #873
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6089404
    City Name: North Battleford
    City ID: 6089404
    ----------------------------------------------------------------------------
    City #874
    City URL: http://api.openweathermap.org/data/2.5/weather?id=739636
    City Name: Sile
    City ID: 739636
    ----------------------------------------------------------------------------
    City #875
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5490385
    City Name: Sile
    City ID: 5490385
    ----------------------------------------------------------------------------
    City #876
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2267226
    City Name: Lagos
    City ID: 2267226
    ----------------------------------------------------------------------------
    City #877
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2332459
    City Name: Lagos
    City ID: 2332459
    ----------------------------------------------------------------------------
    City #878
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1848373
    City Name: Fukue
    City ID: 1848373
    ----------------------------------------------------------------------------
    City #879
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2021188
    City Name: Kurumkan
    City ID: 2021188
    ----------------------------------------------------------------------------
    City #880
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1214882
    City Name: Kisaran
    City ID: 1214882
    ----------------------------------------------------------------------------
    City #881
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2701680
    City Name: Karlstad
    City ID: 2701680
    ----------------------------------------------------------------------------
    City #882
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2093846
    City Name: Kiunga
    City ID: 2093846
    ----------------------------------------------------------------------------
    City #883
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5955902
    City Name: Fort Nelson
    City ID: 5955902
    ----------------------------------------------------------------------------
    City #884
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1507379
    City Name: Divnogorsk
    City ID: 1507379
    ----------------------------------------------------------------------------
    City #885
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4632595
    City Name: Jackson
    City ID: 4632595
    ----------------------------------------------------------------------------
    City #886
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1055059
    City Name: Tsaratanana
    City ID: 1055059
    ----------------------------------------------------------------------------
    City #887
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3523450
    City Name: Matias Romero
    City ID: 3523450
    ----------------------------------------------------------------------------
    City #888
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1174074
    City Name: Karak
    City ID: 1174074
    ----------------------------------------------------------------------------
    City #889
    City URL: http://api.openweathermap.org/data/2.5/weather?id=250625
    City Name: Karak
    City ID: 250625
    ----------------------------------------------------------------------------
    City #890
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1272307
    City Name: Dudhani
    City ID: 1272307
    ----------------------------------------------------------------------------
    City #891
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1168749
    City Name: Nushki
    City ID: 1168749
    ----------------------------------------------------------------------------
    City #892
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3361142
    City Name: Springbok
    City ID: 3361142
    ----------------------------------------------------------------------------
    City #893
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5955826
    City Name: Fort Frances
    City ID: 5955826
    ----------------------------------------------------------------------------
    City #894
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6126749
    City Name: Rocky Mountain House
    City ID: 6126749
    ----------------------------------------------------------------------------
    City #895
    City URL: http://api.openweathermap.org/data/2.5/weather?id=292968
    City Name: Abu Dhabi
    City ID: 292968
    ----------------------------------------------------------------------------
    City #896
    City URL: http://api.openweathermap.org/data/2.5/weather?id=236950
    City Name: Obo
    City ID: 236950
    ----------------------------------------------------------------------------
    City #897
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2945726
    City Name: Bovenden
    City ID: 2945726
    ----------------------------------------------------------------------------
    City #898
    City URL: http://api.openweathermap.org/data/2.5/weather?id=216281
    City Name: Goma
    City ID: 216281
    ----------------------------------------------------------------------------
    City #899
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2185763
    City Name: Okato
    City ID: 2185763
    ----------------------------------------------------------------------------
    City #900
    City URL: http://api.openweathermap.org/data/2.5/weather?id=640276
    City Name: Raahe
    City ID: 640276
    ----------------------------------------------------------------------------
    City #901
    City URL: http://api.openweathermap.org/data/2.5/weather?id=217745
    City Name: Bumba
    City ID: 217745
    ----------------------------------------------------------------------------
    City #902
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1784261
    City Name: Zhongxing
    City ID: 1784261
    ----------------------------------------------------------------------------
    City #903
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1790885
    City Name: Zhongxing
    City ID: 1790885
    ----------------------------------------------------------------------------
    City #904
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2629833
    City Name: Husavik
    City ID: 2629833
    ----------------------------------------------------------------------------
    City #905
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5961417
    City Name: Husavik
    City ID: 5961417
    ----------------------------------------------------------------------------
    City #906
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3870282
    City Name: Talcahuano
    City ID: 3870282
    ----------------------------------------------------------------------------
    City #907
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4647963
    City Name: Paris
    City ID: 4647963
    ----------------------------------------------------------------------------
    City #908
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2988507
    City Name: Paris
    City ID: 2988507
    ----------------------------------------------------------------------------
    City #909
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2126710
    City Name: Beringovskiy
    City ID: 2126710
    ----------------------------------------------------------------------------
    City #910
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2063056
    City Name: Port Augusta
    City ID: 2063056
    ----------------------------------------------------------------------------
    City #911
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1254709
    City Name: Tezu
    City ID: 1254709
    ----------------------------------------------------------------------------
    City #912
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1803782
    City Name: Lichuan
    City ID: 1803782
    ----------------------------------------------------------------------------
    City #913
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2138555
    City Name: Poum
    City ID: 2138555
    ----------------------------------------------------------------------------
    City #914
    City URL: http://api.openweathermap.org/data/2.5/weather?id=787487
    City Name: Poum
    City ID: 787487
    ----------------------------------------------------------------------------
    City #915
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3090170
    City Name: Olesnica
    City ID: 3090170
    ----------------------------------------------------------------------------
    City #916
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2038569
    City Name: Baicheng
    City ID: 2038569
    ----------------------------------------------------------------------------
    City #917
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2253354
    City Name: Dakar
    City ID: 2253354
    ----------------------------------------------------------------------------
    City #918
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5334223
    City Name: Carlsbad
    City ID: 5334223
    ----------------------------------------------------------------------------
    City #919
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3339539
    City Name: Carlsbad
    City ID: 3339539
    ----------------------------------------------------------------------------
    City #920
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1262230
    City Name: Nagar Karnul
    City ID: 1262230
    ----------------------------------------------------------------------------
    City #921
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5905616
    City Name: Bonnyville
    City ID: 5905616
    ----------------------------------------------------------------------------
    City #922
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1067565
    City Name: Beloha
    City ID: 1067565
    ----------------------------------------------------------------------------
    City #923
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5983607
    City Name: Inuvik
    City ID: 5983607
    ----------------------------------------------------------------------------
    City #924
    City URL: http://api.openweathermap.org/data/2.5/weather?id=146639
    City Name: Lasa
    City ID: 146639
    ----------------------------------------------------------------------------
    City #925
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1494745
    City Name: Podsineye
    City ID: 1494745
    ----------------------------------------------------------------------------
    City #926
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2255285
    City Name: Sibiti
    City ID: 2255285
    ----------------------------------------------------------------------------
    City #927
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3932502
    City Name: Perene
    City ID: 3932502
    ----------------------------------------------------------------------------
    City #928
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1172888
    City Name: Kot Samaba
    City ID: 1172888
    ----------------------------------------------------------------------------
    City #929
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2064550
    City Name: Northam
    City ID: 2064550
    ----------------------------------------------------------------------------
    City #930
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2641434
    City Name: Northam
    City ID: 2641434
    ----------------------------------------------------------------------------
    City #931
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3668605
    City Name: Santa Marta
    City ID: 3668605
    ----------------------------------------------------------------------------
    City #932
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3664980
    City Name: Boa Vista
    City ID: 3664980
    ----------------------------------------------------------------------------
    City #933
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1139085
    City Name: Jurm
    City ID: 1139085
    ----------------------------------------------------------------------------
    City #934
    City URL: http://api.openweathermap.org/data/2.5/weather?id=908913
    City Name: Luwingu
    City ID: 908913
    ----------------------------------------------------------------------------
    City #935
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2020871
    City Name: Lebedinyy
    City ID: 2020871
    ----------------------------------------------------------------------------
    City #936
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4218882
    City Name: Rincon
    City ID: 4218882
    ----------------------------------------------------------------------------
    City #937
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3441894
    City Name: Maldonado
    City ID: 3441894
    ----------------------------------------------------------------------------
    City #938
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3577154
    City Name: Oranjestad
    City ID: 3577154
    ----------------------------------------------------------------------------
    City #939
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3394023
    City Name: Natal
    City ID: 3394023
    ----------------------------------------------------------------------------
    City #940
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1851390
    City Name: Susaki
    City ID: 1851390
    ----------------------------------------------------------------------------
    City #941
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3427761
    City Name: Tigre
    City ID: 3427761
    ----------------------------------------------------------------------------
    City #942
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2156049
    City Name: Murwillumbah
    City ID: 2156049
    ----------------------------------------------------------------------------
    City #943
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3126369
    City Name: Carballo
    City ID: 3126369
    ----------------------------------------------------------------------------
    City #944
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2417833
    City Name: Mamou
    City ID: 2417833
    ----------------------------------------------------------------------------
    City #945
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3469058
    City Name: Taguatinga
    City ID: 3469058
    ----------------------------------------------------------------------------
    City #946
    City URL: http://api.openweathermap.org/data/2.5/weather?id=60019
    City Name: Eyl
    City ID: 60019
    ----------------------------------------------------------------------------
    City #947
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3577900
    City Name: Georgetown
    City ID: 3577900
    ----------------------------------------------------------------------------
    City #948
    City URL: http://api.openweathermap.org/data/2.5/weather?id=542374
    City Name: Krasnogorsk
    City ID: 542374
    ----------------------------------------------------------------------------
    City #949
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2413070
    City Name: Nioro
    City ID: 2413070
    ----------------------------------------------------------------------------
    City #950
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3667868
    City Name: Solano
    City ID: 3667868
    ----------------------------------------------------------------------------
    City #951
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1685876
    City Name: Solano
    City ID: 1685876
    ----------------------------------------------------------------------------
    City #952
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2720679
    City Name: Bollnas
    City ID: 2720679
    ----------------------------------------------------------------------------
    City #953
    City URL: http://api.openweathermap.org/data/2.5/weather?id=101628
    City Name: Tabuk
    City ID: 101628
    ----------------------------------------------------------------------------
    City #954
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1684803
    City Name: Tabuk
    City ID: 1684803
    ----------------------------------------------------------------------------
    City #955
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2294700
    City Name: Tema
    City ID: 2294700
    ----------------------------------------------------------------------------
    City #956
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3374120
    City Name: Vila do Maio
    City ID: 3374120
    ----------------------------------------------------------------------------
    City #957
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1779790
    City Name: Bentong
    City ID: 1779790
    ----------------------------------------------------------------------------
    City #958
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2311127
    City Name: Tshela
    City ID: 2311127
    ----------------------------------------------------------------------------
    City #959
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3663142
    City Name: Novo Aripuana
    City ID: 3663142
    ----------------------------------------------------------------------------
    City #960
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1524296
    City Name: Esil
    City ID: 1524296
    ----------------------------------------------------------------------------
    City #961
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3655185
    City Name: Nueva Loja
    City ID: 3655185
    ----------------------------------------------------------------------------
    City #962
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3421982
    City Name: Maniitsoq
    City ID: 3421982
    ----------------------------------------------------------------------------
    City #963
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3515600
    City Name: Tila
    City ID: 3515600
    ----------------------------------------------------------------------------
    City #964
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2249281
    City Name: Tila
    City ID: 2249281
    ----------------------------------------------------------------------------
    City #965
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2145875
    City Name: Tumut
    City ID: 2145875
    ----------------------------------------------------------------------------
    City #966
    City URL: http://api.openweathermap.org/data/2.5/weather?id=336454
    City Name: Ginir
    City ID: 336454
    ----------------------------------------------------------------------------
    City #967
    City URL: http://api.openweathermap.org/data/2.5/weather?id=333795
    City Name: Jijiga
    City ID: 333795
    ----------------------------------------------------------------------------
    City #968
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5368361
    City Name: Los Angeles
    City ID: 5368361
    ----------------------------------------------------------------------------
    City #969
    City URL: http://api.openweathermap.org/data/2.5/weather?id=876177
    City Name: Luau
    City ID: 876177
    ----------------------------------------------------------------------------
    City #970
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2964782
    City Name: Dingle
    City ID: 2964782
    ----------------------------------------------------------------------------
    City #971
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1714733
    City Name: Dingle
    City ID: 1714733
    ----------------------------------------------------------------------------
    City #972
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3628423
    City Name: San Felipe
    City ID: 3628423
    ----------------------------------------------------------------------------
    City #973
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3872255
    City Name: San Felipe
    City ID: 3872255
    ----------------------------------------------------------------------------
    City #974
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2127500
    City Name: Shibetsu
    City ID: 2127500
    ----------------------------------------------------------------------------
    City #975
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2177069
    City Name: Ballina
    City ID: 2177069
    ----------------------------------------------------------------------------
    City #976
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2966778
    City Name: Ballina
    City ID: 2966778
    ----------------------------------------------------------------------------
    City #977
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2189343
    City Name: Kaeo
    City ID: 2189343
    ----------------------------------------------------------------------------
    City #978
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2210554
    City Name: Surt
    City ID: 2210554
    ----------------------------------------------------------------------------
    City #979
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5991055
    City Name: Kenora
    City ID: 5991055
    ----------------------------------------------------------------------------
    City #980
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6113335
    City Name: Prince Albert
    City ID: 6113335
    ----------------------------------------------------------------------------
    City #981
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5261457
    City Name: Madison
    City ID: 5261457
    ----------------------------------------------------------------------------
    City #982
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3868633
    City Name: Vallenar
    City ID: 3868633
    ----------------------------------------------------------------------------
    City #983
    City URL: http://api.openweathermap.org/data/2.5/weather?id=209228
    City Name: Mbuji-Mayi
    City ID: 209228
    ----------------------------------------------------------------------------
    City #984
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1798490
    City Name: Pulandian
    City ID: 1798490
    ----------------------------------------------------------------------------
    City #985
    City URL: http://api.openweathermap.org/data/2.5/weather?id=5126209
    City Name: Mastic Beach
    City ID: 5126209
    ----------------------------------------------------------------------------
    City #986
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2347470
    City Name: Bauchi
    City ID: 2347470
    ----------------------------------------------------------------------------
    City #987
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2138522
    City Name: Poya
    City ID: 2138522
    ----------------------------------------------------------------------------
    City #988
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3395981
    City Name: Maceio
    City ID: 3395981
    ----------------------------------------------------------------------------
    City #989
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2015686
    City Name: Talakan
    City ID: 2015686
    ----------------------------------------------------------------------------
    City #990
    City URL: http://api.openweathermap.org/data/2.5/weather?id=509483
    City Name: Pinega
    City ID: 509483
    ----------------------------------------------------------------------------
    City #991
    City URL: http://api.openweathermap.org/data/2.5/weather?id=300058
    City Name: Susurluk
    City ID: 300058
    ----------------------------------------------------------------------------
    City #992
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1738050
    City Name: Miri
    City ID: 1738050
    ----------------------------------------------------------------------------
    City #993
    City URL: http://api.openweathermap.org/data/2.5/weather?id=6113828
    City Name: Provost
    City ID: 6113828
    ----------------------------------------------------------------------------
    City #994
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3391287
    City Name: Prainha
    City ID: 3391287
    ----------------------------------------------------------------------------
    City #995
    City URL: http://api.openweathermap.org/data/2.5/weather?id=2175819
    City Name: Biloela
    City ID: 2175819
    ----------------------------------------------------------------------------
    City #996
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3885974
    City Name: San Vicente
    City ID: 3885974
    ----------------------------------------------------------------------------
    City #997
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3583178
    City Name: San Vicente
    City ID: 3583178
    ----------------------------------------------------------------------------
    City #998
    City URL: http://api.openweathermap.org/data/2.5/weather?id=4852832
    City Name: Council Bluffs
    City ID: 4852832
    ----------------------------------------------------------------------------
    City #999
    City URL: http://api.openweathermap.org/data/2.5/weather?id=3394661
    City Name: Moju
    City ID: 3394661
    ----------------------------------------------------------------------------
    City #1000
    City URL: http://api.openweathermap.org/data/2.5/weather?id=1277008
    City Name: Barela
    City ID: 1277008
    ----------------------------------------------------------------------------



```python
# -----------------------------------------------------------------------------------
# Step 4: Create a pretty dataframe that we can reference because visual aids are
# the actual best thing ever and export a CSV we can hang onto
# -----------------------------------------------------------------------------------
cleanedWeather_df = pd.DataFrame(weatherData_list).set_index('ID')

# rearrange columns sensibly
cleanedWeather_df = cleanedWeather_df[['Name', 'Latitude', 'Temperature (Fahrenheit)',\
                                       'Humidity (%)', 'Wind Speed','Cloudiness']].sort_index(ascending=True)

# export the csv
cleanedWeather_df.to_csv("WeatherData.csv")

# eyeball our data
cleanedWeather_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
      <th>Latitude</th>
      <th>Temperature (Fahrenheit)</th>
      <th>Humidity (%)</th>
      <th>Wind Speed</th>
      <th>Cloudiness</th>
    </tr>
    <tr>
      <th>ID</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>53157</th>
      <td>Qandala</td>
      <td>11.47</td>
      <td>80.53</td>
      <td>59</td>
      <td>4.36</td>
      <td>0</td>
    </tr>
    <tr>
      <th>53654</th>
      <td>Mogadishu</td>
      <td>2.04</td>
      <td>87.80</td>
      <td>70</td>
      <td>14.99</td>
      <td>20</td>
    </tr>
    <tr>
      <th>57000</th>
      <td>Hobyo</td>
      <td>5.35</td>
      <td>84.04</td>
      <td>64</td>
      <td>12.64</td>
      <td>0</td>
    </tr>
    <tr>
      <th>58933</th>
      <td>Garowe</td>
      <td>8.41</td>
      <td>90.83</td>
      <td>36</td>
      <td>7.72</td>
      <td>0</td>
    </tr>
    <tr>
      <th>60019</th>
      <td>Eyl</td>
      <td>7.98</td>
      <td>82.51</td>
      <td>74</td>
      <td>11.97</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# -----------------------------------------------------------------------------------
# Step 5: Generate charts.
#  1) Temperature (F) vs. Latitude
#  2) Humidity (%) vs. Latitude
#  3) Cloudiness (%) vs. Latitude
#  4) Wind Speed (mph) vs. Latitude
# -----------------------------------------------------------------------------------
sns.set()

# Chart 1: Temperature vs Latitude
latVsTemp_plot = sns.lmplot(x='Latitude', y='Temperature (Fahrenheit)', data=cleanedWeather_df,\
                           fit_reg=False)
plt.title("Latitude vs Temperature (Fahrenheit)")
plt.savefig("latXtemp.png")
plt.show()
```


![png](output_6_0.png)



```python
# Chart 2: humidity vs Latitude
latVsTemp_plot = sns.lmplot(x='Latitude', y='Humidity (%)', data=cleanedWeather_df,\
                           fit_reg=False)
plt.title("Latitude vs Humidity (%)")
plt.savefig("latXhumid.png")
plt.show()
```


![png](output_7_0.png)


There is no relationship between latitude and humidity.


```python
# Chart 3: cloudiness vs Latitude
latVsTemp_plot = sns.lmplot(x='Latitude', y='Cloudiness', data=cleanedWeather_df,\
                           fit_reg=False)
plt.title("Latitude vs Cloudiness")
plt.savefig("latXcloud.png")
plt.show()
```


![png](output_9_0.png)


There is no relationship between latitude and cloudiness.


```python
# Chart 4: wind speed vs Latitude
latVsTemp_plot = sns.lmplot(x='Latitude', y='Wind Speed', data=cleanedWeather_df,\
                           fit_reg=False)
plt.title("Latitude vs Wind Speed")
plt.savefig("latXwind.png")
plt.show()
```


![png](output_11_0.png)


There is no apparent relationship between latitude and wind speed.
