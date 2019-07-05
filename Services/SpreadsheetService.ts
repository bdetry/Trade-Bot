import { GoogleSheetsCred } from "../Models/GoogleSheetsCred";
import * as fs from 'fs';
import { google } from 'googleapis'; 
import * as readline from 'readline';
import { content } from "googleapis/build/src/apis/content";
import * as creds from './../credentials.json';
import * as token from './../token.json';

class SpreadsheetService {

    private SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; 

    private creds: GoogleSheetsCred; 
    sheet: any;

    private auth: any;

    constructor() {

    }

    /**
     * Get acces tokens
     * */
    Init() {
        this.Authorize(creds, console.log)
    }

    //Google auth setter
    public SetAuth(auth) {
        this.auth = auth
    }


    public GetSpreadSheet(string: string ) {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: string,
            range: 'Sheet1!A:Z',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;


                console.log()
        });
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    Authorize(credentials: GoogleSheetsCred, callback) {
 

        let client_secret = credentials.installed.client_secret as string;
        let client_id = credentials.installed.client_id as string;
        let redirect_uris = credentials.installed.redirect_uris as string[];


        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile('./token.json', (err, t) => {
            if (err) return this.GetNewToken(oAuth2Client, callback);
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
                if (err) return console.error('Error while trying to retrieve access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile('./token.json', JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', './token.json');
                });
                callback(oAuth2Client);
            });
        });
    }

} 

export = SpreadsheetService