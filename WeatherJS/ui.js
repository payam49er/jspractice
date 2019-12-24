class Ui {

    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.windSpeed = document.getElementById('w-windSpeed');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.tempreture = document.getElementById('w-temp');
    }

    paint(weatherData){
        this.location.textContent = `${weatherData.name},${weatherData.sys.country}`;
        this.desc.textContent = weatherData.weather[0].description;
        let gust = '';
        if(weatherData.wind.gust){
               gust = `, Gust: ${weatherData.wind.gust}`;
        }
        this.windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed} ${gust}`;
        this.feelsLike.textContent = `Feels like ${this.__convertKelvinToF(weatherData.main.feels_like)}`;
        this.humidity.textContent = `Humdity: ${weatherData.main.humidity}`;
        this.tempreture.textContent = `Tempreture: ${this.__convertKelvinToF(weatherData.main.temp)}`;
    }

    __convertKelvinToF(kelvinTemp){
        const f = (kelvinTemp-273.15)*(9/5)+32;
        return Math.round(f).toFixed(2);
    }
}