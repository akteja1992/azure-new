const fs = require('fs');


var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

function routes(app) {
  fs.readdirSync(__dirname + '/')
    .filter(file => file.match(/\.js$/))
    .forEach(file => {
      if (file !== 'index.js') {
        let sp = file.split('.');
        console.log(sp);
        app.use('/' + sp[0], require('./' + sp[0]));
        app.use(allowCrossDomain);
      }
    });
}

module.exports=routes;
