const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(cors({ origin: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', {root: __dirname})
})

app.get ('/api/timestamp', (req, res) => {
  const defaultDate = new Date()
  res.json({ unix: defaultDate.valueOf(), utc: defaultDate.toUTCString() }) 
})

app.get ('/api/timestamp/:date', (req, res) => {
  
  if (req.params.date && (req.params.date).includes('-') || (req.params.date).includes('/') || (req.params.date).includes(',')) {
    const date_string = (req.params.date).replace(/[,/-]/g, '-')
    const date = new Date(date_string)
    
    if (date == 'Invalid Date' || date == NaN) {
        res.json({ error: 'Invalid Date' })
    }
    else {
        res.json({ unix: date.valueOf(), utc: date.toUTCString() })
    }
}

if (req.params.date && (req.params.date).includes('-') == false || (req.params.date).includes('/') == false ) {
    const date = new Date(parseInt(req.params.date))
    if (date == 'Invalid Date' || date == NaN) {
        res.json({ error: 'Invalid Date' })
    }
    else {
        res.json({ unix: date.valueOf(), utc: date.toUTCString() })
    }
}

else {
 const defaultDate = new Date()
 res.json({ unix: defaultDate.valueOf(), utc: defaultDate.toUTCString() }) 
}
})

// app.post('/api/timestamp/:date', (req, res) => {

//     if (req.body.timeStamp && (req.body.timeStamp).includes('-')) {
//             const date = new Date(req.body.timeStamp)
            
//             if (date == 'Invalid Date' || date == NaN) {
//                 res.json({ error: 'Invalid Date' })
//             }
//             else {
//                 res.json({ unix: date.valueOf(), utc: date.toUTCString() })
//             }
//         }

//     if (req.body.timeStamp && (req.body.timeStamp).includes('-') == false ) {
//             const date = new Date(parseInt(req.body.timeStamp))
//             if (date == 'Invalid Date' || date == NaN) {
//                 res.json({ error: 'Invalid Date' })
//             }
//             else {
//                 res.json({ unix: date.valueOf(), utc: date.toUTCString() })
//             }
//         }

//     else {
//          const defaultDate = new Date()
//          res.json({ unix: defaultDate.valueOf(), utc: defaultDate.toUTCString() }) 
//         }
// })

app.listen(PORT, console.log('Server started on PORT: '+ PORT + ' ...'))