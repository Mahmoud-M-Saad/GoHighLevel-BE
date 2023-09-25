const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios').default;
const locationId = "8KyubGi8XhoKHCpIvzGp";
// ---- Testing Client ----
// const client_id = "65097ea78ef2c94808317db6-lmt7okly";
// const client_secret = "4354e6ce-6dcd-4f4a-9f45-5a278177fbfe";
// ------------------------
const client_id = "650477d15e0035fbc8737c87-lmkrakx4";
const client_secret = "92867618-14e0-4392-961d-a5fbc4502780";
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
                    console.log("Tokens Created successfully");
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
app.post('/upsertContact', (req, res) => {
    let pipelineId;
    switch (req.body.stage) {
        case "testing":
            pipelineId = "S6QYGwROfr6i3C7Pld4S";
            break;
        case "lead":
        case "Lost":
            pipelineId = "Y6FEUB7ogzVp9NGqOEGp";
            break;
        case "Underwriting":
            pipelineId = "c0tkU2ao6U93GT84Sx4h";
            break;
        case "Client":
        case "Dropped Clients":
            pipelineId = "S6QYGwROfr6i3C7Pld4S";
            break;
        default:
            pipelineId = null
    };
    let stageId;
    switch (req.body.status) {
        case "testing":
            stageId = "5bd4c19a-e0e8-4209-9691-11643c94abc4";
            break;
        case "New Lead":
            stageId = "4846cdee-0231-406d-b0ac-0b83ce8ae384";
            break;
        case "Attempted Contact":
            stageId = "398ae3cc-40dd-4bca-8a1f-04cd9593c00e";
            break;
        case "Appointment Scheduled":
            stageId = "57ac5ce2-a94e-49fe-83e6-e78b7a62d6a1";
            break;
        case "Missed Appointment":
            stageId = "08a45943-6274-4c10-bbf6-b7b7abf7aae1";
            break;
        case "Follow Up To Close":
            stageId = "2d88ef07-e82c-421a-a406-aec6e933b8e7";
            break;
        case "Pitched":
            stageId = "d03d421b-c220-4eba-b531-8c91838340c3";
            break;
        case "Loan Only":
            stageId = "e9809007-bb9f-4a6c-a152-de7147a56647";
            break;
        case "No PII":
            stageId = "5d152d38-0756-40a4-9db3-cfc499dcde77";
            break;
        case "Not Interested":
            stageId = "e200626f-2556-4820-b3a4-e9cacfa56b8e";
            break;
        case "QA Failed":
            stageId = "06b01a00-11c5-4b6d-b836-9f90564971c3";
            break;
        case "Submitted":
            stageId = "63082e30-ce92-44ef-9e57-ababf51576cb";
            break;
        case "QA Needed":
            stageId = "b7999315-27b7-47fe-ac91-fa78e4372de7";
            break;
        case "QA Rejected":
            stageId = "d6368fc8-a1e2-4eec-bee6-ad749b79aacd";
            break;
        case "Multiple Cases: No Debt, Low Debt, Already Enrolled, Unemployed/Low Income, Ba" +
                    "nkruptcy, Bad State, Duplicate, Do Not Call":
            stageId = "b6addd21-1043-42c3-a9b9-bcc0c50a4a9d";
            break;
        case "Error Processing":
            stageId = "1186c171-1e20-4357-9b04-24e4b5a1d4bf";
            break;
        case "Initial Draft Pending":
            stageId = "18473515-732d-4a6b-ad46-2ee0aba8ad99";
            break;
        case "1st Payment NSF 1":
            stageId = "09c40a5c-9b0b-4aa3-a95b-58f0ea320cb8";
            break;
        case "1st Payment NSF 2":
            stageId = "a8c6496f-0e4d-4be8-8fe7-460ccf5a34eb";
            break;
        case "NSF 1":
            stageId = "00e79e0a-5aaf-467e-8183-4a069c000617";
            break;
        case "NSF 2":
            stageId = "54033b83-014b-4f18-92d6-0de8887a0fdb";
            break;
        case "Invalid Banking":
            stageId = "f773de8d-60ff-4485-ba2f-fa997e7c79fa";
            break;
        case "Unable to Locate Account 2":
            stageId = "0c84c727-cbef-4abd-8f4e-30ce5c37d5d3";
            break;
        case "Stopped Payment/Revoked":
            stageId = "b5b6fb97-7c20-41ee-b4b7-aab7700acf25";
            break;
        case "Drafts on Hold":
            stageId = "702eef4d-a907-43d5-bfc3-58403c914117";
            break;
        case "Drafts on Hold - Cancel Pending":
            stageId = "c015bf90-fa0a-498b-ab16-d16663a06b27";
            break;
        case "Awaiting First Settlement":
            stageId = "e9e0d718-2dc2-404c-bc5f-5239e43c1812";
            break;
        case "Active":
            stageId = "274f7516-3d9d-4d14-8251-3d1d6e135fd6";
            break;
        case "Term Settlement":
            stageId = "a10afede-dca1-4c6f-a444-f10e23ed6791";
            break;
        case "NSF":
            stageId = "ad96d361-16c3-4c23-b99b-bb313fe13f31";
            break;
        case "Paused / Hold":
            stageId = "f4f67a73-c91a-4307-bffa-322364476a90";
            break;
        case "Banking Error":
            stageId = "8b8715c8-df44-4c9a-b829-b0a6028f2136";
            break;
        case "Cancellation Requested":
            stageId = "c580cc4b-9561-4fc0-aeab-d60aeed8bdbf";
            break;
        case "Graduated":
            stageId = "693278db-7ab1-4f6e-927d-4a5d9946bf47";
            break;
        case "Cancelled":
            stageId = "1c1fc885-d810-4836-a96a-80c0e250bed5";
            break;
        default:
            stageId = "Case Name not found";
    }
    let newdata = JSON.parse(JSON.stringify(req.body));
    newdata.locationId = locationId;
    delete newdata.status;
    delete newdata.zip;
    delete newdata.sub_date;
    delete newdata.return_date;
    delete newdata.enrolled_date;
    delete newdata.first_pay;
    delete newdata.enrolled_debt;
    delete newdata.campaign;
    delete newdata.created_date;
    delete newdata.assigned_to;
    delete newdata.dob;
    delete newdata.last_credit_date;
    console.log("Getting the data Successfully");
    // console.log(req.body); console.log(newdata);
    fs.readFile("./DBTokens.json", (err, data) => {
        access_token = JSON
            .parse(data)
            .access_token;
        refresh_token = JSON
            .parse(data)
            .refresh_token;
        // For any problems
        // async function createAccessTokenReq() {
        //     const encodedParamsForAccess = new URLSearchParams();
        //     encodedParamsForAccess.set('client_id', client_id);
        //     encodedParamsForAccess.set('client_secret', client_secret);
        //     encodedParamsForAccess.set('grant_type', 'refresh_token');
        //     encodedParamsForAccess.set('refresh_token', refresh_token);
        //     const newTokens = await axios.request({
        //         method: 'POST',
        //         url: 'https://services.leadconnectorhq.com/oauth/token',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             Accept: 'application/json'
        //         },
        //         data: encodedParamsForAccess
        //     });
        //     token = {
        //         "refresh_token": newTokens.data.refresh_token,
        //         "access_token": newTokens.data.access_token
        //     };
        //     if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
        //         console.log("New Tokens form Contact Created Successfully");
        //         fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
        //     }
        //     await callingUpsertContact();
        // }
        // createAccessTokenReq();
        // async function callingUpsertContact() {
            async function upsertcontact() {
                try {
                    const upsertContactReq = await axios.request({
                        method: 'POST',
                        url: 'https://services.leadconnectorhq.com/contacts/upsert',
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            Version: '2021-07-28',
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        data: newdata
                    });
                    console.log("Contact upserted Successfully", upsertContactReq.data);
                    async function createAccessTokenFromRefresh() {
                        const encodedParamsForAccess = new URLSearchParams();
                        encodedParamsForAccess.set('client_id', client_id);
                        encodedParamsForAccess.set('client_secret', client_secret);
                        encodedParamsForAccess.set('grant_type', 'refresh_token');
                        encodedParamsForAccess.set('refresh_token', refresh_token);
                        try {
                            const newTokens = await axios.request({
                                method: 'POST',
                                url: 'https://services.leadconnectorhq.com/oauth/token',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    Accept: 'application/json'
                                },
                                data: encodedParamsForAccess
                            });
                            token = {
                                "refresh_token": newTokens.data.refresh_token,
                                "access_token": newTokens.data.access_token
                            };
                            fs.readFile("./DBTokens.json", (err, data) => {
                                access_token = JSON
                                    .parse(data)
                                    .access_token;
                                refresh_token = JSON
                                    .parse(data)
                                    .refresh_token;
                                if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
                                    console.log("New Tokens form Contact Created Successfully");
                                    fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
                                }
                                if (upsertContactReq.data.new === false) {
                                    res.json({msg: "Contact Already Exists So updated Successfully"})
                                    console.log("Contact Already Exists So updated Successfully");
                                } else {
                                    res.json({msg: "Contact Added Successfully"})
                                    console.log("Contact Added Successfully");
                                }
                            });
                            let Issucceded;
                            if ((upsertContactReq.data.succeded === true) || (upsertContactReq.data.new === true)) {
                                Issucceded = true;
                                console.log("Issucceded  Inner: " + Issucceded);
                            }
                            console.log("Issucceded: " + Issucceded);
                            await upsertOpportunities(Issucceded, upsertContactReq.data.contact.id);
                        } catch (error) {
                            console.error("Error From createAccessTokenFromRefresh function :", error);
                        }
                    }
                    createAccessTokenFromRefresh();
                } catch (error) {
                    console.error("Error From upsertContact function :", error);
                }
            }
            upsertcontact();
        // }
    });
    async function upsertOpportunities(Issucceded, contactID) {
        fs.readFile("./DBTokens.json", (err, data) => {
            access_token = JSON
                .parse(data)
                .access_token;
            refresh_token = JSON
                .parse(data)
                .refresh_token;
            console.log("Issucceded: " + Issucceded);
            console.log("contactID: " + contactID);
            if (Issucceded) {
                const NewOpportunityData = {
                    pipelineId: pipelineId,
                    locationId: locationId,
                    contactId: contactID,
                    pipelineStageId: stageId,
                };
                async function upsertOpportunitiesReq() {
                    const upsertOppReq = await axios.request({
                        method: 'POST',
                        url: 'https://services.leadconnectorhq.com/opportunities/upsert',
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            Version: '2021-07-28',
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        data: NewOpportunityData
                    });
                    console.log("OPP upserted Successfully", upsertOppReq.data);
                    console.log("new", upsertOppReq.data.new);
                    if (upsertOppReq.data.new === false) {
                        res.json({msg: "Opportunity Already Exists So updated Successfully"})
                    } else {
                        res.json({msg: "Opportunity Added Successfully"})
                    }
                }
                upsertOpportunitiesReq();
                async function createAccessTokenFromRefreshsec() {
                    const encodedParamsForAccess = new URLSearchParams();
                    encodedParamsForAccess.set('client_id', client_id);
                    encodedParamsForAccess.set('client_secret', client_secret);
                    encodedParamsForAccess.set('grant_type', 'refresh_token');
                    encodedParamsForAccess.set('refresh_token', refresh_token);
                    try {
                        const newTokens = await axios.request({
                            method: 'POST',
                            url: 'https://services.leadconnectorhq.com/oauth/token',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                Accept: 'application/json'
                            },
                            data: encodedParamsForAccess
                        });
                        token = {
                            "refresh_token": newTokens.data.refresh_token,
                            "access_token": newTokens.data.access_token
                        };
                        fs.readFile("./DBTokens.json", (err, data) => {
                            access_token = JSON
                                .parse(data)
                                .access_token;
                            refresh_token = JSON
                                .parse(data)
                                .refresh_token;
                            if (!(access_token === token.access_token) && !(refresh_token === token.refresh_token)) {
                                console.log("New Tokens from Opp Created Successfully");
                                fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
                            }
                        });
                    } catch (error) {
                        console.error("Error From createAccessTokenFromRefreshsec function :", error);
                    }
                }
                createAccessTokenFromRefreshsec();
            } else {
                console.log("Contact Not Found");
                res.status(400).json({msg: "Contact Not Found"});
            }
        });
    }
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
