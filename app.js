
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000


app.use(express.static('.'))

app.get('/restaurants/:id', (request, response) => {
    response.sendFile(__dirname + '/restaurants.html')
})
app.get('/bars/:id', (request, response) => {
    response.sendFile(__dirname + '/bars.html')
})
app.post('/api/:id',async (req, res)=>{
    let restDoc = await fs.redfile(`./api/${req.params.id}.json`)
//choose input field in html
    restDoc.comments.push(req.body.comment) 
    await fs.writefile()
})




app.listen(port, function () { console.log(`listening on port: ${port}`) })