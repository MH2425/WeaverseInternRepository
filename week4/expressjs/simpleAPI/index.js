const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('/get', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
  res.json({status: 'OK'});
});

app.post('/greet', (req, res) => {
  const name = req.body.name;
  res.send(`Nice to meet you, ${name}!`);
});

app.put('/put', (req, res) => {
  res.send(`You want me to PUT?`);
});

app.delete('/delete', (req, res) => {
  res.send(`I don't want to be deleted!`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})