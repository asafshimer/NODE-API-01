//set app
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');//import productModel
const app = express();


//set middlewear
app.use(express.json());//allow app to read json

//set routes
app.get('/', (req, res) => {
    res.send('hello root');
})
//-----
app.get('/blogs', (req, res) => {
    res.send('hello blogs');
})
//-----
//get all products
app.get('/products', async(req, res) => {
    try {

        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        console.log(err.message);
        res.status(500).json({messgae: error.message});
    }
})
//-----
//get a product by id
app.get('/products/:id', async(req, res) => {
    try {
        
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//-----
//update a product
app.put('/products/:id', async(req, res) => {
    try {

        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `${id} does not exist`});
        }//in case id does not exist
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//-----
app.delete('/products/:id', async(req, res) => {
    try {

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `${id} not found`});
        }
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//-----
app.post('/products', async(req, res) => {
    try{

        const product = await Product.create(req.body);
        res.status(200).json(product);//200 - success

    } catch(error){
        console.log(err.message);
        res.status(500).json({message: error.message});//500 - internal server error
    }
})//allow user to post a product request and save data in mongo
//-----


//connections
mongoose
.connect('mongodb+srv://shimerasaf:nisadi13579@cluster0.xhpyglx.mongodb.net/NODE-API-01?retryWrites=true&w=majority')
.then(() => {

    console.log('connected to mongoDB');//first conect to mongodb
    
    app.listen(3000, () => {
        console.log('running on port 3000');//second listen for routes
    });

})
.catch((err) => {
    console.log(err);
})