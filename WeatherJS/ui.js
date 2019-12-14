class Ui {

    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelslike = document.getElementById('w-feels-like');
    }

    paint(weather){
        this.location.textContent = `${weather.name},${weather.sys.country}`;
        this.desc.textContent = weather.weather[0].description;
    }
}