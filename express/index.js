const express = require('express');

const app = express();

app.get('/sources', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.send(require('./data/sources.json'));
});

app.get('/top-headlines', (req, res) => {
  const {sources} = req.query;
  const json = require('./data/top-headlines.json');
  json.articles = json.articles.filter(article => article.source.id === sources);
  json.totalResults = json.articles.length;
  res.header("Content-Type", 'application/json');
  res.send(json);
});

app.listen(4201);

module.exports = app;
