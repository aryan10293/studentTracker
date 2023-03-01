const express = require('express')
const MongoClient = require('mongodb').MongoClient
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const app = express()
const PORT = process.env.PORT || 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'roster'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        const lebron = db.collection('laker-roster')

        app.get('/', (req,res) => {
            const cursor = db.collection('laker-roster').find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', {list: results})
            })
            .catch(err => console.error(err))
        })

        app.get('/app-player', (req,res) => {
            res.render('form.ejs', {})
        })
        app.get('/editPlayer/:id', (req,res) => {
            lebron.findOne({_id: new ObjectId(`${req.params.id}`)})
            .then(results => {
                console.log(results)
                res.render('edit.ejs', {list: results})
            })
        })


        app.post('/addplayer', (req,res) => {
            db.collection('laker-roster').insertOne({name: req.body.name, position: req.body.position, height: req.body.height, weight: req.body.weight})
                    .then(result => {
                        console.log(result)
                        res.redirect('/')
                    })
                    .catch(err => console.error(err))
        })

        app.put('/editPlayer/edit', (req,res) => {
            console.log(req.body)
            db.collection('laker-roster').updateOne({name: req.body.nameS, position: req.body.positionS, height: req.body.heightS, weight: req.body.weightS}, {
                $set: {
                    //taskItem: req.body.update,
                    name: req.body.nameUp,
                    position: req.body.positionUp,
                    height: req.body.heightUp,
                    weight: req.body.weightUp,
                    
                    // 'nameS': name,
                    // 'positionS': position,
                    // 'heightS': height,
                    // 'weightS': weight,
                    // 'nameUp': nameUp,
                    // 'positionUp': positionUp,
                    // 'heightUp': heightUp,
                    // 'weightUp': weightUp,
                }
            }, {
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('updated player')
                res.json('player changed')
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })

        app.delete('/delete', (req, res) => {
            console.log(req.body)
            db.collection('laker-roster').deleteOne({name: req.body.name})
            .then(result => {
                console.log('Player Deleted')
                res.json('Player Deleted')
            })
            .catch(error => console.error(error))
        
        })
    })

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
