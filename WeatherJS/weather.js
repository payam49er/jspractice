class Weather {
    constructor(city,country) {
        this.apiKey = "c0cb8d21dfa1fbda166cdf34fe650ea0";
        this.city = city;
        this.country = country;
    }

    async getWeather(){
        return  (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.apiKey}`)).json();
    }

    changeLocation(city,country){
        this.city = city;
        this.country = country;
    }
}