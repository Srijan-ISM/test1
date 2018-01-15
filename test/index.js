require('babel-register');

global.config = require('./config.json');

require('./fixtures');
require('./controllers');
