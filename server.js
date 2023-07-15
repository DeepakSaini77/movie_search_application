const express = require('express');
const fetch = require('cross-fetch');
const app = express();
const port = 3000;
const apiKey = "26ffe7cfa741c0f83f76f80a0aab0780";


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('public'));

app.get('/search', (req, res) => {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred while fetching search results.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
