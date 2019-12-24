//init weather obj

const ui = new Ui();
const storage = new WeatherStorage();

//get stored location data

const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city,weatherLocation.state);
//get weather on dom load

document.addEventListener('DOMContentLoaded',getWeather);

//change location event
document.getElementById('w-change-btn').addEventListener('click',(e)=>{
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    //get weather and display weather
    weather.city = city;
    weather.state = state;
    storage.setLocationData();
    getWeather();
    $('#locModal').modal('hide');
    
})

function changeLocation(city,country) {
    weather.changeLocation(city, country);
   
}


function getWeather() {
    weather.getWeather().then(data => {
        ui.paint(data);
    }).catch(err => console.log(err));
}