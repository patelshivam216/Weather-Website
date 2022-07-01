const request = require('request');
const chalk = require('chalk');

const forecast = (data,callback)=>{

    const location=encodeURIComponent(data.latitude)+','+encodeURIComponent(data.longitude);
    const url = 'http://api.weatherstack.com/current?access_key=2bd3f25451ed1421a816ea1ba5d944fa&query='+location;

    request({url:url,json:true},(error,responce)=>{

        if(error){

            callback('Unable to connect with server!',undefined);

        }else if(responce.body.error){

            callback('Unable to fetch information!',undefined);

        }else{

            const weatherDes = responce.body.current.weather_descriptions[0];
            const temperature = responce.body.current.temperature;
            const precip = responce.body.current.precip;

            const info = responce.body.current.weather_descriptions[0] + ". It is currently tempreture " + 
            responce.body.current.temperature + " degree and it feels like "+responce.body.current.precip +"% possibility of rain."

            callback(undefined,info);

        }
    })

}

module.exports = forecast;