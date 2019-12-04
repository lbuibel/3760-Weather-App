const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})


app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a9da6dd423feb80b529614e938d9224a`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        console.log(weather)
        let weatherText = `${Math.round(weather.main.temp)} degrees in ${weather.name}`;
        let city = `${weather.name}`
        let high = `${Math.round(weather.main.temp_max)}`
        let low = `${Math.round(weather.main.temp_min)}`
        let icon = weather.weather[0].icon
        let description = ` with ${weather.weather[0].description}`
        res.render('index', {weather: weatherText,
          high: high, 
          low: low,
          icon: icon,
          description: description,
          error: null});
      }
    }
  });
})

var port = process.env.PORT
if (port == null || port == ""){
  port = 5000
}
// app.listen(PORT, function () {
//   console.log('listening on port 3100')
//     }
// 

app.listen(port)


