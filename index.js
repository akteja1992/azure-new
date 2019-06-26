let express = require('express');
let Parser = require('body-parser');
let Boom= require('express-boom');
let fs= require('fs');
require('dotenv').config();


class NodeAzureService{
  constructor() {
    this.app = express();
    this.app.use(Parser.json({
      limit: '50mb'
    }));
    this.port = process.env.PORT || 3000;
  }
 async init(){
  this.app.use(Boom());
  this.app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
  });

  // Add The Routes
  require('./routes')(this.app);
  this.server = this.app.listen(this.port, '0.0.0.0', err => {
    if (err) {
      console.error('Health', err);
    } else {
      console.info(`Server started on ${process.env.PORT}`);
    }
  });
 }
}

const serviceObj= new NodeAzureService();
serviceObj.init();

module.exports=serviceObj.app;



