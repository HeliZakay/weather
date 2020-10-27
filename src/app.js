const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Heli Zakay"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Heli Zakay"
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        contactMessage: "You are welcome to email me at helizakay2@gmail.com :) .",
        title: "Contact",
        name: "Heli Zakay"
    })
})

app.get("/weather", (req, res) => {
    const city = req.query.city
    if (!city) {
        return res.send({
            error: "Must provide city"
        })
    }
    
    forecast(city, (error, data, icon) => {
        if(error) {
            return res.send({
                error
            })
        } 
        res.send({
            data,
            city,
            icon
        })
    })
})

// app.get("/help/*", (req, res) => {
//     res.render('pagenotfound', {
//         errorText: "Help article not found",
//         title: "404",
//         name: "Heli Zakay"
//     })
// })

app.get("*", (req, res) => {
    res.render('pagenotfound', {
        errorText: "Page not found",
        title: "404",
        name: "Heli Zakay"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})