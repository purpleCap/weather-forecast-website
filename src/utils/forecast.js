const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=faa2337177ea731702026d54e83224e9&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(
              undefined,
              body.current.weather_descriptions[0] +
                ". It is currently " +
                body.current.temperature +
                ` degress out but feels like ${body.current.feelslike} degrees out. There is ` +
                body.current.precip +
                "% chance of rain."
            );
        }
    })
}

module.exports = forecast