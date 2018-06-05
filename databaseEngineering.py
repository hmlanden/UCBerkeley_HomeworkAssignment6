def createDatabase(weatherCSV):
    # ----------------------------------------------------------------------
    # Step 1: Import all necessary modules for database engineering and set
    # up SQLAlchemy base and engine
    # ----------------------------------------------------------------------
    import pandas as pd
    import os
    from sqlalchemy import Column, String, Integer, Float

    # set up sqlalchemy engine and connection
    from sqlalchemy import create_engine
    engine = create_engine('sqlite:///weather.sqlite')
    conn = engine.connect()

    # set up sqlalchemy base
    from sqlalchemy.ext.declarative import declarative_base
    Base = declarative_base()

    # ----------------------------------------------------------------------
    # Step 2: Create necessary classes for parsing/reading the data
    # ----------------------------------------------------------------------

    # class for the weather csv
    class Station(Base):
        __tablename__ = 'stations'
        id = Column(Integer, primary_key=True)
        date = Column()
        time = Column()
        cityID = Column(Integer())
        city = Column(String(50))
        country = Column(String(50))
        continent = Column(String(20))
        latitude = Column(Float())
        longitude = Column(Float())
        temperature = Column(Float())
        humidity = Column(Float())
        windSpeed = Column(Float())
        cloudiness = Column(Integer())

        def __repr__(self):
            return f"id={self.id}, station ID={self.cityID},\
                     station name={self.city}, {self.country},\
                     latitude={self.latitude}, longitude={self.longitude}"

    # add both tables to the database
    Base.metadata.create_all(engine)

    # ----------------------------------------------------------------------
    # Step 3: import both CSVs and change to dict::records. 
    # Note: Will reformat date as datetime object for ease of analysis
    # ----------------------------------------------------------------------

    # read in weather csv
    weather_df = pd.read_csv(os.path.join('csv', weatherCSV))
    weatger_dict = weather_df.to_dict(orient='records')

    # ----------------------------------------------------------------------
    # Step 4: Read all the data into the database
    # ----------------------------------------------------------------------
    conn.execute(Station.__table__.insert(), weather_dict)