const express = require('express')
const app = express()

const path = require('path')

const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'dist', 'index.html'))

    })
}


app.listen(port, (err) => {
    if (err) return console.log(err)
    console.log(`server is listening on ${port}`)
})