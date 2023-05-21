//set app
const express = require('express');
const app = express();


//set routes
app.get('/', (req, res) => {
    res.send('hello all');
})

//set listen
app.listen(3000, () => {
    console.log('running on port 3000');
})