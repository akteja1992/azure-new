let oauth2Instance = require('simple-oauth2');

const REDIRECT_URL_HOST = process.env.REDIRECT_URL_HOST;
const REDIRECT_URL_PATH = process.env.REDIRECT_URL_PATH;
const AUTHORIZATION_API_HOST = process.env.AUTHORIZATION_API_HOST;
const AUTHORIZE_PATH = process.env.AUTHORIZE_PATH;
const TOKEN_PATH = process.env.TOKEN_PATH;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET_KEY = process.env.CLIENT_SECRET_KEY;


class Util {
  constructor(

    config = {
      client: {
        id: CLIENT_ID,
        secret: CLIENT_SECRET_KEY
      },
      auth: {
        tokenHost: AUTHORIZATION_API_HOST,
        authorizePath: AUTHORIZE_PATH,
        tokenPath: TOKEN_PATH
      }
    },
    redirectURLHost = REDIRECT_URL_HOST || '',
    redirectURLPath = REDIRECT_URL_PATH || '',
    scopes = [
      'openid',
      'offline_access',
      'User.Read',
      'Mail.readwrite',
      'Mail.Send',
      'Calendars.Read',
      'Contacts.Read'
    ],
    oauth2 = oauth2Instance) {
    this.config = config;
    this.oauth2 = oauth2.create(this.config);
    this.scopes = scopes;
    this.redirectURL = `${redirectURLHost}${redirectURLPath}`;
  }
  getAuthUrl(oauth2 = this.oauth2) {
    let url = oauth2.authorizationCode.authorizeURL({
      redirect_uri: this.redirectURL,
      scope: this.scopes.join(' ')
    });
    console.info('Generated auth url: ', url);
    return url;
  }
}

module.exports=new Util();


