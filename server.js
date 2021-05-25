const express = require('express')
const mongoose = require('mongoose')
const server = express()
const ejs = require('ejs')
const {Schema} = require("mongoose");
require('dotenv').config();

server.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, (err) =>{
    console.log('mongo db connected', err);
});

var querySchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, required: true},
        query : {type: String, required: true},
        result : {type: String, required: true},
    },
    {collection: 'query'}
);

const queryModel = mongoose.model("Query", querySchema);

server.get('/', (req, res) => {
    queryModel.find({}, function (err, queries) {
        console.log(queries)
        res.render('index', {
           queryList: queries
        })
    })
})

server.listen(4000, function () {
    console.log('server is running');
})