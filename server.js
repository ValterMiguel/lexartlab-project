const express = require('express');
const servestatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(servestatic(__dirname + '/dist'));
app.use(history);

app.listen(process.env.PORT || 5000);