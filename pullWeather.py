# -----------------------------------------------------------------------------------
#
# PART 1:
# Pull the data and create a CSV with it.
#
# -----------------------------------------------------------------------------------
from weatherApi import refreshWeatherData;
filename = refreshWeatherData()

# -----------------------------------------------------------------------------------
#
# PART 2:
# Generate a database from the data.
#
# -----------------------------------------------------------------------------------
from databaseEngineering import createDatabase;
createDatabase(filename)