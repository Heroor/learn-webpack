const express = require('express')
const app = express()

app.get('/app1', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  res.json('server1')
})

app.get('/app2', (req, res) => {
  res.send('server2')
})

app.listen(8092, () => {
  console.log('running in 8092...')
})
