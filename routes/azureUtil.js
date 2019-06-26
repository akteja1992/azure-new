let express = require('express');
const router = express.Router();
let url = require('url');
let azureUtilService= require('../services').azureUtilService;

const home = (request, response) => {
  console.log(azureUtilService);
  response.status(227).send({
    url: azureUtilService.getAuthUrl()
  });
};
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/login', home);
module.exports=router;
