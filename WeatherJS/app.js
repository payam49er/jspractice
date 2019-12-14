//init weather obj
const weather = new Weather('Boston','US');

//get weather on dom load

document.addEventListener('DOMContentLoaded',getWeather);

function changeLocation(city,country) {
    weather.changeLocation(city, country);
}


function getWeather() {
    weather.getWeather().then(data => {
        ui.paint(data);
    }).catch(err => console.log(err));
}