const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000
let ID = undefined

const products = [
    {
        id: 1,
        productName: 'Iphone 13',
        brandName: "Apple",
        price: 1800,
        stockCount: 20,
        isDiscounted: true
    }
    // {
    //     id: 2,
    //     productName: 'Xiaomi 11T',
    //     brandName: "Xiaomi",
    //     price: 1500,
    //     stockCount: 15,
    //     isDiscounted: true
    // },
    // {
    //     id: 3,
    //     productName: 'Samsung Galaxy S22',
    //     brandName: "Samsung",
    //     price: 2000,
    //     stockCount: 25,
    //     isDiscounted: true
    // },
    // {
    //     id: 4,
    //     productName: 'Iphone 11',
    //     brandName: "Apple",
    //     price: 1100,
    //     stockCount: 10,
    //     isDiscounted: false
    // },
    // {
    //     id: 5,
    //     productName: 'Honor 10 Lite',
    //     brandName: "Honor",
    //     price: 1250,
    //     stockCount: 24,
    //     isDiscounted: true
    // },
    // {
    //     id: 6,
    //     productName: 'Xiaomi Redmi Note 11',
    //     brandName: "Xiaomi",
    //     price: 1500,
    //     stockCount: 45,
    //     isDiscounted: false
    // }
];
if (products.length==0) {
    ID=1
}
else{
    let maxID=products.sort((a,b)=>b.id-a.id)[0].id
    ID=++maxID
}


//get all products
app.get('/products', (req, res) => {
    if (products.length === 0) {
        res.status(204).send('error204')
        return;
    }
    else {
        res.status(200).send(products)
        return;

    }
})


//get  product by id
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const findData = products.find((data) => data.id === parseInt(id))
    if (findData === undefined) {
        res.status(404).send('data not found 404')
    }
    else {
        res.status(200).send(findData)

    }
})

//delete product by id
app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    const data = products.find((data) => data.id === parseInt(id))
    const idx = products.indexOf(data)
    if (data === undefined) {
        res.send("Error 404-bele bir product yoxdu")
        return
    }
    else {
        products.splice(idx, 1)
        res.status(202).send("product delted")
        return
    }
})
//post product
app.post('/products', (req, res) => {
    const addProducts = {
        // id: req.body.id,
        id: ID,
        productName: req.body.productName,
        brandName: req.body.brandName,
        price: req.body.price,
        stockCount: req.body.stockCount,
        isDiscounted: req.body.isDiscounted,

    }
    ID++;
    products.push(addProducts);
    res.status(201).send('new product added');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})