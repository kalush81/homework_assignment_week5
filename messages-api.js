const express = require("express");
const bodyParser =  require('body-parser');

const app = express();
const port = 3000;

const jsonParser = bodyParser.json()
app.use(jsonParser)

app.listen(port, () => console.log(`listening on ${port}`));

app.get("/", (req, res) => {
  res.send("test");
});

app.post('/messages', (req, res) => {

    if (req.body.text) {
        console.log(req.body.text)
        return res.status(200).json({message: 'message received loud and clear'})
    } else {
        return res.status(400).send('something went wrong').end()
    }
})
