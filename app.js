const express = require('express');
const axios = require('axios');
const app = new express();
const img = require('fs').readFileSync('./public/images/404.jpg');

app.listen(process.env.PORT || 3000);
app.use(express.static(process.cwd() + '/public'))
app.get('/', (req, res) => res.sendFile('./public/index.html'));

app.get('*', (req, res) => {
    let url = req.originalUrl.replace('/', '');
    axios.get(url, {
        responseType: 'arraybuffer'
    })
        .then(response => {

                res.set('Content-Type', response.headers['content-type']);

                if(typeof response.data === 'object') res.send(response.data);
                res.send(Buffer.from(response.data, 'binary'));
            
            
        })
        .catch(err => {
            // console.log(err.message);
            res.set('Content-Type', 'image/jpg');
            res.send(errimg);
        })
});

