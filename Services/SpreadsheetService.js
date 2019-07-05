"use strict";
const fs = require("fs");
const googleapis_1 = require("googleapis");
const readline = require("readline");
const creds = require("./../credentials.json");
const token = require("./../token.json");
class SpreadsheetService {
    constructor() {
        this.SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    }
    /**
     * Get acces tokens
     * */
    Init() {
        this.Authorize(creds, console.log);
    }
    //Google auth setter
    SetAuth(auth) {
        this.auth = auth;
    }
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    Authorize(credentials, callback) {
        let client_secret = credentials.installed.client_secret;
        let client_id = credentials.installed.client_id;
        let redirect_uris = credentials.installed.redirect_uris;
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        // Check if we have previously stored a token.
        fs.readFile('./token.json', (err, t) => {
            if (err)
                return this.GetNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(token);
            callback(oAuth2Client);
        });
    }
    /**
    * Get and store new token after prompting for user authorization, and then
    * execute the given callback with the authorized OAuth2 client.
    * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
    * @param {getEventsCallback} callback The callback for the authorized client.
    */
    GetNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err)
                    return console.error('Error while trying to retrieve access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile('./token.json', JSON.stringify(token), (err) => {
                    if (err)
                        return console.error(err);
                    console.log('Token stored to', './token.json');
                });
                callback(oAuth2Client);
            });
        });
    }
}
module.exports = SpreadsheetService;
//# sourceMappingURL=SpreadsheetService.js.map