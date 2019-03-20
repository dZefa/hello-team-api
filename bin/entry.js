switch (process.argv[2]) {
  case 'dev':
    const path = require('path');
    require('dotenv').config({ path: path.resolve(__dirname, `../env/dev.env`) });
    break;
  case 'production':
    process.env.NODE_ENV = 'production';
    break;
  default:
    break;
}

require('../dist/');
