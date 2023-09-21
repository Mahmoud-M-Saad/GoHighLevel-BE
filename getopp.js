const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./DBTokens.json');
const app = express();
const axios = require('axios').default;
const client_id = "650477d15e0035fbc8737c87-lmkrakx4";
const client_secret = "92867618-14e0-4392-961d-a5fbc4502780"
const {URLSearchParams} = require('url');
let access_token;
let refresh_token;
let code;
app.use(bodyParser.json());

app.get('/gettingCode', (req, res) => {
    code = req.query.code;
    console.log("Getting the code Successfully, the code is:" + code);
    // Getting refresh Token
    async function createRefreshToken() {
        const encodedParamsForRefresh = new URLSearchParams();
        encodedParamsForRefresh.set('client_id', client_id);
        encodedParamsForRefresh.set('client_secret', client_secret);
        encodedParamsForRefresh.set('grant_type', 'authorization_code');
        encodedParamsForRefresh.set('code', code);
        try {
            const data = await axios.request({
                method: 'POST',
                url: 'https://services.leadconnectorhq.com/oauth/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json'
                },
                data: encodedParamsForRefresh
            });
            let token = {
                "refresh_token": data.data.refresh_token,
                "access_token": data.data.access_token
            };
            fs.readFile("./DBTokens.json", (err, data) => {
                access_token = JSON
                    .parse(data)
                    .access_token;
                refresh_token = JSON
                    .parse(data)
                    .refresh_token;
                if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
                    // console.log("Tokens Created successfully");
                    fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
                }
            });
            res
                .status(200)
                .json({msg: "Tokens Created successfully"});
            return data;
        } catch (error) {
            console.error("Error From createRefreshToken function :", error);
        }
    }
    createRefreshToken();
});
// ----------------------------------------------------
app.post('/upsertContact', (req, res) => {
    console.log(req.body);

})
// app.post('/upsertContact', (req, res) => {
    // const newdata = req.body.contact;
    // console.log("Getting the data Successfully");
    // fs.readFile("./DBTokens.json", (err, data) => {
    //     access_token = JSON
    //         .parse(data)
    //         .access_token;
    //     refresh_token = JSON
    //         .parse(data)
    //         .refresh_token;
    //         let contactId = JSON
    //                 .parse(data)
    //                 .contactId;
    //             let locationId = JSON
    //                 .parse(data)
    //                 .locationId;

    //     // ------------------------------------------
    //     async function upsertcontact() {
    //         try {
    //             const upsertContactReq = await axios.request({
    //                 method: 'POST',
    //                 url: 'https://services.leadconnectorhq.com/contacts/upsert',
    //                 headers: {
    //                     Authorization: `Bearer ${access_token}`,
    //                     Version: '2021-07-28',
    //                     'Content-Type': 'application/json',
    //                     Accept: 'application/json'
    //                 },
    //                 data: newdata
    //             });
    //             console.log("Contact upserted Successfully", upsertContactReq.data);
    //             // ----Create new token----
    //             async function createAccessTokenFromRefresh() {
    //                 const encodedParamsForAccess = new URLSearchParams();
    //                 encodedParamsForAccess.set('client_id', client_id);
    //                 encodedParamsForAccess.set('client_secret', client_secret);
    //                 encodedParamsForAccess.set('grant_type', 'refresh_token');
    //                 encodedParamsForAccess.set('refresh_token', refresh_token);
    //                 try {
    //                     const newTokens = await axios.request({
    //                         method: 'POST',
    //                         url: 'https://services.leadconnectorhq.com/oauth/token',
    //                         headers: {
    //                             'Content-Type': 'application/x-www-form-urlencoded',
    //                             Accept: 'application/json'
    //                         },
    //                         data: encodedParamsForAccess
    //                     });
    //                     token = {
    //                         "refresh_token": newTokens.data.refresh_token,
    //                         "access_token": newTokens.data.access_token,
    //                         "contactId": upsertContactReq.data.contact.id,
    //                         "locationId": upsertContactReq.data.contact.locationId
    //                     };
    //                     fs.readFile("./DBTokens.json", (err, data) => {
    //                         access_token = JSON
    //                             .parse(data)
    //                             .access_token;
    //                         refresh_token = JSON
    //                             .parse(data)
    //                             .refresh_token;
    //                         if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
    //                             console.log("New Tokens form Contact Created Successfully");
    //                             fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
    //                         }
    //                         res
    //                             .status(200)
    //                             .json({msg: "Contact upserted Successfully"});
    //                         // -----------------------
    //                     });
    //                 } catch (error) {
    //                     console.error("Error From createAccessTokenFromRefresh function :", error);
    //                 }
    //             }
    //             createAccessTokenFromRefresh();
    //         } catch (error) {
    //             console.error("Error From upsertContact function :", error);
    //         }
    //     }
    //     upsertcontact();
    //     console.log("Contact upserted Successfully");
    //     // -----------------------------
     
        

    // });
    // fs.readFile("./DBTokens.json", (err, data) => {
    //     access_token = JSON
    //         .parse(data)
    //         .access_token;
    //     refresh_token = JSON
    //         .parse(data)
    //         .refresh_token;
    //     let contactId = JSON
    //         .parse(data)
    //         .contactId;
    //     let locationId = JSON
    //         .parse(data)
    //         .locationId;
    //     async function upsertOpportunities() {
    //         const NewOpportunityData = {
    //             pipelineId: req.body.opp.pipelineId,
    //             locationId: locationId || "8KyubGi8XhoKHCpIvzGp",
    //             name: req.body.opp.OpportunityName,
    //             pipelineStageId: req.body.opp.pipelineStageId,
    //             status: req.body.opp.Opportunitystatus,
    //             contactId: contactId,
    //             monetaryValue: 220,
    //             assignedTo: client_id,
    //             customFields: []
    //         };
    //         console.log(NewOpportunityData);
    //         try {
    //             const OppData = await axios.request({
    //                 method: 'POST',
    //                 url: 'https://services.leadconnectorhq.com/opportunities/upsert',
    //                 headers: {
    //                     Authorization: `Bearer ${access_token}`,
    //                     Version: '2021-07-28',
    //                     'Content-Type': 'application/json',
    //                     Accept: 'application/json'
    //                 },
    //                 data: NewOpportunityData
    //             });
    //             console.log("Opportunities upserted Successfully", OppData.data);
    //             res
    //                 .status(200)
    //                 .json({msg: "Opportunities upserted Successfully"});
    //         } catch (error) {
    //             console.error("Error From upsertOpportunities function :", error);
    //         }
    //     }
    //     upsertOpportunities();
    //     async function createAccessTokenFromRefreshsec() {
    //         const encodedParamsForAccess = new URLSearchParams();
    //         encodedParamsForAccess.set('client_id', client_id);
    //         encodedParamsForAccess.set('client_secret', client_secret);
    //         encodedParamsForAccess.set('grant_type', 'refresh_token');
    //         encodedParamsForAccess.set('refresh_token', refresh_token);
    //         try {
    //             const newTokens = await axios.request({
    //                 method: 'POST',
    //                 url: 'https://services.leadconnectorhq.com/oauth/token',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                     Accept: 'application/json'
    //                 },
    //                 data: encodedParamsForAccess
    //             });

    //             token = {
    //                 "refresh_token": newTokens.data.refresh_token,
    //                 "access_token": newTokens.data.access_token,
    //                 "contactId": contactId,
    //                 "locationId": locationId
    //             };
    //             fs.readFile("./DBTokens.json", (err, data) => {
    //                 access_token = JSON
    //                     .parse(data)
    //                     .access_token;
    //                 refresh_token = JSON
    //                     .parse(data)
    //                     .refresh_token;
    //                 if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
    //                     console.log("New Tokens from Opp Created Successfully");
    //                     fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
    //                 }
    //             });
    //         } catch (error) {
    //             console.error("Error From createAccessTokenFromRefreshsec function :", error);
    //         }
    //     }
    //     createAccessTokenFromRefreshsec();
        
    // });
// });
// app.post('/upsertopp', (req, res) => {
//     const newdata = req.body;
//     fs.readFile("./DBTokens.json", (err, data) => {
//         access_token = JSON
//             .parse(data)
//             .access_token;
//         refresh_token = JSON
//             .parse(data)
//             .refresh_token;
//         let contactId = JSON
//             .parse(data)
//             .contactId;
//         let locationId = JSON
//             .parse(data)
//             .locationId;
//         async function upsertOpportunities() {
//             const NewOpportunityData = {
//                 pipelineId: req.body.opp.pipelineId,
//                 locationId: locationId || "8KyubGi8XhoKHCpIvzGp",
//                 name: req.body.opp.OpportunityName,
//                 pipelineStageId: req.body.opp.pipelineStageId,
//                 status: req.body.opp.Opportunitystatus,
//                 contactId: contactId,
//                 monetaryValue: 220,
//                 assignedTo: client_id,
//                 customFields: []
//             };
//             console.log(NewOpportunityData);
//             try {
//                 const OppData = await axios.request({
//                     method: 'POST',
//                     url: 'https://services.leadconnectorhq.com/opportunities/upsert',
//                     headers: {
//                         Authorization: `Bearer ${access_token}`,
//                         Version: '2021-07-28',
//                         'Content-Type': 'application/json',
//                         Accept: 'application/json'
//                     },
//                     data: NewOpportunityData
//                 });
//                 console.log("Opportunities upserted Successfully", OppData.data);
//                 res
//                     .status(200)
//                     .json({msg: "Opportunities upserted Successfully"});
//             } catch (error) {
//                 console.error("Error From upsertOpportunities function :", error);
//             }
//         }
//         upsertOpportunities();
//         async function createAccessTokenFromRefreshsec() {
//             const encodedParamsForAccess = new URLSearchParams();
//             encodedParamsForAccess.set('client_id', client_id);
//             encodedParamsForAccess.set('client_secret', client_secret);
//             encodedParamsForAccess.set('grant_type', 'refresh_token');
//             encodedParamsForAccess.set('refresh_token', refresh_token);
//             try {
//                 const newTokens = await axios.request({
//                     method: 'POST',
//                     url: 'https://services.leadconnectorhq.com/oauth/token',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         Accept: 'application/json'
//                     },
//                     data: encodedParamsForAccess
//                 });

//                 token = {
//                     "refresh_token": newTokens.data.refresh_token,
//                     "access_token": newTokens.data.access_token,
//                     "contactId": contactId,
//                     "locationId": locationId
//                 };
//                 fs.readFile("./DBTokens.json", (err, data) => {
//                     access_token = JSON
//                         .parse(data)
//                         .access_token;
//                     refresh_token = JSON
//                         .parse(data)
//                         .refresh_token;
//                     if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
//                         console.log("New Tokens from Opp Created Successfully");
//                         fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
//                     }
//                 });
//             } catch (error) {
//                 console.error("Error From createAccessTokenFromRefreshsec function :", error);
//             }
//         }
//         createAccessTokenFromRefreshsec();
        
//     });
// //     //  -------------------------------------------

// });
app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
