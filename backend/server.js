require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 });
}));

// api routes
app.use('/accounts', require('./controllers/accounts.controller'));
app.use('/tournaments', require('./controllers/tournament.controller'));
app.use('/sponsor-logos', require('./controllers/sponsor-logos.controller'));
app.use('/scoreboards', require('./controllers/scoreboard.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
