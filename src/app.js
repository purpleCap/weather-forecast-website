const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup 'handlebars' and 'views' path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dirctory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather-App',
    name: "Pratik S."
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Pratik S.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpfulText: 'This is some helpful text indeed!',
    title: 'Help',
    name: 'Pratik S.'
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/product", (req, res) => {
  // console.log(req.query.search);
  if(!req.query.search){
    res.send({
      error: 'you must provide some search query'
    })
  } else {
    res.send({
      product: [],
    });
  }
  
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Pratik S.',
    errorMsg: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Pratik S.',
    errorMsg: 'Page not found'
  })
})



// app.get('', (req, res) => {
//   res.send("<h1>Weather</h1>")
// })

// app.get('/help', (req, res) => {
//   res.send({
//     name: "pratik",
//     age: 25
//   });
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })


app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})