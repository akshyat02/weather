// Active internet connection initial
console.log('Intially' + (window.navigator.onLine ? ' on' : ' off') + 'line');
window.onload = function(){
    document.querySelector('#preloader').style.display = "none";
}

var city = document.getElementById('cityInput');
var sub = document.querySelector('.location-button');
var dayname = document.querySelector('.date-dayname');
var date = document.querySelector('.date-day');
var loc = document.querySelector('.location')
var country = document.getElementById('country');
var icon = document.querySelector('.icon');
var temp = document.querySelector('.weather-temp');
var desc = document.querySelector('.weather-desc');
var precip = document.getElementById('precip');
var humid = document.getElementById('humid');
var wind = document.getElementById('wind');

// Forecasting days variables
var ficon0 = document.querySelector('.ficon0');
var ficon1 = document.querySelector('.ficon1');
var ficon2 = document.querySelector('.ficon2');
var fname0 = document.querySelector('.fname0');
var fname1 = document.querySelector('.fname1');
var fname2 = document.querySelector('.fname2');
var ftemp0 = document.querySelector('.ftemp0');
var ftemp1 = document.querySelector('.ftemp1');
var ftemp2 = document.querySelector('.ftemp2');

var footer = document.querySelector('.footer');

var re = document.getElementById('result');
var cityDefault = 'Delhi';
var akshyat02key = "7a24805f9f824220861163345221103";
var url = 'https://api.weatherapi.com/v1/current.json?key=7a24805f9f824220861163345221103&q=city&days=7&aqi=yes&alerts=yes';
sub.addEventListener('click', () => {
    if (city.value != '') {
        cityDefault = city.value;
    }
    getData();
})
city.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (city.value != '') {
            cityDefault = city.value;
        }
        getData();
    }
})

var datenet, y, m, d, timenet, iconid;
function getData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${akshyat02key}&q=${cityDefault}&days=7&aqi=yes&alerts=yes`)
        .then(response => { return response.json(); })
        .then(data => {
            // console.log(data);
            
            datenet = data.location.localtime;
            y = parseInt(datenet.substr(0,4));
            m = parseInt(datenet.substr(5,2));
            d = parseInt(datenet.substr(8,2));
            timenet = datenet.substr(11);
            date.innerHTML = `${d} ${getMonth(m)} ${y} / ${timenet}`;
            iconid = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = `./weather/64x64/${iconid}`;

            dayname.innerHTML = `${getweekday(d,m,y)}`;
            loc.innerHTML = data.location.name + ', ' + data.location.region;
            country.innerHTML = data.location.country;
            temp.innerHTML = data.current.temp_c + '°C';
            desc.innerHTML = data.current.condition.text;
            precip.innerHTML = data.current.precip_mm + ' %';
            humid.innerHTML = data.current.humidity + ' %';
            wind.innerHTML = data.current.wind_kph + ' km/h ' + data.current.wind_dir;

            // For forecasting days
            iconid = data.forecast.forecastday[0].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            ficon0.src = `./weather/64x64/${iconid}`;
            fname0.innerHTML = (`${getweekday(d,m,y)}`).substr(0,3);
            ftemp0.innerHTML = data.forecast.forecastday[0].day.avgtemp_c + '°C';
            
            iconid = data.forecast.forecastday[1].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            ficon1.src = `./weather/64x64/${iconid}`;
            datenet = data.forecast.forecastday[1].date;
            fname1.innerHTML = (`${getweekday(parseInt(datenet.substr(8,2)),parseInt(datenet.substr(5,2)),parseInt(datenet.substr(0,4)))}`).substr(0,3);
            ftemp1.innerHTML = data.forecast.forecastday[1].day.avgtemp_c + '°C';

            iconid = data.forecast.forecastday[2].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            ficon2.src = `./weather/64x64/${iconid}`;
            datenet = data.forecast.forecastday[2].date;
            fname2.innerHTML = (`${getweekday(parseInt(datenet.substr(8,2)),parseInt(datenet.substr(5,2)),parseInt(datenet.substr(0,4)))}`).substr(0,3);
            ftemp2.innerHTML = data.forecast.forecastday[2].day.avgtemp_c + '°C';


        })
        .catch(()=>{
            alert('City not found, please try again');
        })
    city.value = '';
}

function getweekday(d,m,y){
    var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${y},${m},${d}`).getDay()];
}
function getMonth(m){
    var month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    return month[m];
}
// Active internet connection reminder
if(window.navigator.onLine == false){
    footer.style.visibility = 'visible';
}
window.addEventListener('offline',()=>{
    console.log("Became offline");
    footer.style.visibility = 'visible';
})
window.addEventListener('online',()=>{
    console.log("Became online");
    footer.style.visibility = 'hidden';
})