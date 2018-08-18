const express = require('express', 4.16)
const app = express()

app.get('/', (req, res) => res.send("Hello world!"))

app.listen(3000, () => console.log('API listening on port 3000!'))
