# express-nextjs-webapp

\-> This web app shows countries and allows us to filter by regions and search for countries among them

\-> It uses "https://restcountries.eu/" API for getting initial data and then caches it on the MongoDB database.

\-> It caches the country's data for 24hr and then resends the request to "https://restcountries.eu/".

\-> A middleware is set up to check whether data is expired or not, and in case it is expired, it will send a request to "https://restcountries.eu/" and gets the data.

## Installation

Docker must be installed.

```bash
1) docker-compose build

2) docker-compose up
```

## Usage

```python
Backend APIs
1) Get the list of all the countries
http://127.0.0.1:8000/api/country/

2) Get the list of countries based on region
http://127.0.0.1:8000/api/country/region/Asia

3) Get the list of countries based on country code
http://127.0.0.1:8000/api/country/IND

4) Search for countries by their name and filter by region
http://127.0.0.1:8000/api/country/search/ind?region=Asia

5) Search for countries by their name
http://127.0.0.1:8000/api/country/search/ind


frontend page
1) http://localhost:3000/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
