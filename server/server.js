// import express and instantiate a server
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// import and use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// this is will add the client in deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});