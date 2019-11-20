const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

let apiKey = 'a9da6dd423feb80b529614e938d9224a'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});

    // let city = req.body.city;
    // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
    // request(url, function(err, response, body){
    //     if(err){
    //         res.render('index', {weather: null, error: 'Error, please try again'});
    //     } else {
    //         let weather_json = JSON.parse(body)
    //         if(weather.main == undefined){
    //         res.render('index', {weather: null, error: 'Error, please try again'});
    //     } else {
    //         var weather = {
    //             city : city,
    //             temp : Math.round(weather_json.main.temp),
    //             description : weather_json.weather.description,
    //             icon : weather_json.weather.icon,
    //         }
    //         var weather_data = {weather : weather};
    //         res.render('index', {weather: weather_data, error: null})
    //     }
    // }
    // })
})


app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        console.log(weather)
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        let high = `${weather.main.temp_max}`
        res.render('index', {weather: weatherText,
                            high: high, 
                            error: null});
      }
    }
  });
})




app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
    }
)
