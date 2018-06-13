# -----------------------------------------------------------------------------------
# Create function that will return a scatter with the appropriate color and data
# for given inputs
# -----------------------------------------------------------------------------------
def generateScatterPoints(currDataframe, currContinent, xAxis, yAxis, palette):
    """
    Return a Plotly scatter based on the given inputs.
    
    Keyword arguments:
    currDataframe -- Pandas dataframe being processed
    currContinent -- name (string) of the continent that we are filtering by
    xAxis -- name (string) of the column we want on the x axis 
    yAxis -- name (string) of the column we want on the y axis
    palette -- takes in a dict of continent:hex code pairs
    """
    import plotly.graph_objs as go
    
    # create filtered dataframe
    continent_df = currDataframe[currDataframe['continent']==currContinent]
    
    scatter = go.Scatter(x = continent_df[xAxis],
                         y = continent_df[yAxis],
                         name = currContinent,
                         mode = 'markers',
                         marker = dict(
                                  size = 10,
                                  color = palette[currContinent]
                                  ),
                         text = continent_df['city'] + ", " + continent_df['country'],
                         hoverinfo = 'text'
                         )
    return scatter;


# -----------------------------------------------------------------------------------
# CONTINENT SORTER
# Takes in a country abbrevation and returns the country's continent.
# -----------------------------------------------------------------------------------

def continentFromCountry(countryAbbr):
    """
    Takes in a country name abbreviation and returns the continent that country is on.
    
    keyword arguments:
    countryAbbr - two-letter country abbreviation, string
    """
    # set up country>continent sets
    africa_set =('AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ', 
                 'DZ', 'EG', 'EH', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 
                 'KM', 'LR', 'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 
                 'NE', 'NG', 'RE', 'RW', 'SC', 'SD', 'SH', 'SL', 'SN', 'SO', 'SS', 'ST', 
                 'SZ', 'TD', 'TG', 'TN', 'TZ', 'UG', 'YT', 'ZA', 'ZM', 'ZW')
    antarctica_set = ('AQ', 'BV', 'GS', 'HM', 'TF')
    asia_set = ('AE', 'AF', 'AM', 'AZ', 'BD', 'BH', 'BN', 'BT', 'CC', 'CN', 'GE', 'HK', 
                'ID', 'IL', 'IN', 'IO', 'IQ', 'IR', 'JO', 'JP', 'KG', 'KH', 'KP', 'KR', 
                'KW', 'KZ', 'LA', 'LB', 'LK', 'MM', 'MN', 'MO', 'MV', 'MY', 'NP', 'OM', 
                'PH', 'PK', 'PS', 'QA', 'SA', 'SG', 'SY', 'TH', 'TJ', 'TM', 'TR', 'TW', 
                'UZ', 'VN', 'YE')
    europe_set = ('AD', 'AL', 'AT', 'AX', 'BA', 'BE', 'BG', 'BY', 'CH', 'CS', 'CY', 'CZ', 
                  'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR', 'GB', 'GG', 'GI', 'GR', 'HR', 
                  'HU', 'IE', 'IM', 'IS', 'IT', 'JE', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD',
                  'ME', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'RU', 'SE', 'SI', 
                  'SJ', 'SK', 'SM', 'UA', 'VA', 'XK')
    northAmerica_set = ('AG', 'AI', 'AN', 'AW', 'BB', 'BL', 'BM', 'BQ', 'BS', 'BZ', 'CA', 
                        'CR', 'CU', 'CW', 'DM', 'DO', 'GD', 'GL', 'GP', 'GT', 'HN', 'HT', 
                        'JM', 'KN', 'KY', 'LC', 'MF', 'MQ', 'MS', 'MX', 'NI', 'PA', 'PM', 
                        'PR', 'SV', 'SX', 'TC', 'TT', 'US', 'VC', 'VG', 'VI')
    oceania_set = ('AS', 'AU', 'CK', 'CX', 'FJ', 'FM', 'GU', 'KI', 'MH', 'MP', 'NC', 'NF', 
                   'NR', 'NU', 'NZ', 'PF', 'PG', 'PN', 'PW', 'SB', 'TK', 'TL', 'TO', 'TV', 
                   'UM', 'VU', 'WF', 'WS')
    southAmerica_set = ('AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PE', 'PY', 
                        'SR', 'UY', 'VE')
    
    # return appropriate continent
    if countryAbbr in africa_set:
        return "Africa";
    elif countryAbbr in antarctica_set:
        return "Antarctica";
    elif countryAbbr in asia_set:
        return "Asia";
    elif countryAbbr in europe_set:
        return "Europe";
    elif countryAbbr in northAmerica_set:
        return "North America";
    elif countryAbbr in oceania_set:
        return "Oceania";
    elif countryAbbr in southAmerica_set:
        return "South America";
    else:
        return "Unknown";
  
# -----------------------------------------------------------------------------------
# TEST FUNCTIONS
# These functions were used for testing API calls while developing scripts.
# -----------------------------------------------------------------------------------

# Used for testing 
def displayProcessingCity(i,response):
    print(f"City #{i+1}")
    print(f"City URL: http://api.openweathermap.org/data/2.5/weather?id={response['id']}")
    print(f"City Name: {response['name']}")
    print(f"City ID: {response['id']}")
    print("----------------------------------------------------------------------------")  

def displayFailedCity(i, city, country):
    print(f"City #{i+1}: FAILED")
    print(f"{city}, {country}")
    print("----------------------------------------------------------------------------")  
