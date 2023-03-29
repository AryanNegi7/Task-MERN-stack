require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const Subscriber = require('./model/subsciber');

const bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;

db.then(()=>{
    app.get('/',async(req,res)=>{
        res.send('success');
    })
    app.post('/create-subscriber',async(req,res)=>{
        try{
            if (!(/^0x[a-fA-F0-9]{40}$/.test(req.body.ethereum_address)))
            {
                return res.status(400).send("Please enter valid Ethereum address");
            }
            const sub = new Subscriber(req.body);
            const result = await sub.save();
            return res.status(200).send({isSuccess: true});
        }
        catch(err)
        {
            return res.status(400).send(err.message);
        }
    })
    app.get('/get-subscribers',auth, async(req,res)=>{
        let sub = await Subscriber.find();
        let result = {
            nSubscriber : sub.length,
            subscriber : sub
        }
        res.status(200).send(result);
    })
    app.listen(PORT,()=>{
        console.log(`server running at http://localhost:${PORT}/`)
    })
})
