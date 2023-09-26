const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios').default;
// Fixed Data
const locationId = "8KyubGi8XhoKHCpIvzGp";
// ---- Testing Client ----
// const client_id = "65097ea78ef2c94808317db6-lmt7okly";
// const client_secret = "4354e6ce-6dcd-4f4a-9f45-5a278177fbfe";
// ------------------------
const client_id = "650477d15e0035fbc8737c87-lmkrakx4";
const client_secret = "92867618-14e0-4392-961d-a5fbc4502780";
const {URLSearchParams} = require('url');
app.use(bodyParser.json());
function readFile() {
    const fileContents = fs.readFileSync('DBTokens.json', 'utf-8');
    return fileContents;
}
let Tokens, ContactRes, OppRes;
app.get('/gettingCode', (req, res) => {
    let code = req.query.code;
    console.log("Getting the code Successfully, the code is:" + code);
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
            Tokens = JSON.parse(readFile());
            if (!(Tokens.access_token === token.access_token) && !(Tokens.refresh_token === token.refresh_token)) {
                console.log("Tokens Created successfully");
                fs.writeFileSync('./DBTokens.json', JSON.stringify(token));
            }
            res
                .status(200)
                .json({msg: "Tokens Created successfully"});
        } catch (error) {
            console.error("Error From createRefreshToken function :", error);
        }
    }
    createRefreshToken();
});
async function createAccessTokenFromRefresh() {
    Tokens = JSON.parse(readFile());
    const encodedParamsForAccess = new URLSearchParams();
    encodedParamsForAccess.set('client_id', client_id);
    encodedParamsForAccess.set('client_secret', client_secret);
    encodedParamsForAccess.set('grant_type', 'refresh_token');
    encodedParamsForAccess.set('refresh_token', Tokens.refresh_token);
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
        let NewTokens = {
            "refresh_token": newTokens.data.refresh_token,
            "access_token": newTokens.data.access_token
        };
        if (!(Tokens.access_token === NewTokens.access_token) && !(Tokens.refresh_token === NewTokens.refresh_token)) {
            console.log("Access Token Created Successfully");
            fs.writeFileSync('./DBTokens.json', JSON.stringify(NewTokens));
        }
    } catch (error) {
        console.error("Error From createAccessTokenFromRefresh function :", error);
    }
};
async function upsertContact(NewContactData) {
    Tokens = JSON.parse(readFile());
    try {
        const upsertContactReq = await axios.request({
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/contacts/upsert',
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: NewContactData
        });
        if (upsertContactReq.data.new === false) {
            console.log("Contact Already Exists So updated Successfully");
        } else {
            console.log("Contact Added Successfully");
        }
        console.log("Contact upserted Successfully", upsertContactReq.data);
        ContactRes = upsertContactReq.data;
    } catch (error) {
        console.error("Error From upsertContact function: ", error);
    }
};
async function upsertOpportunity(NewOpportunityData) {
    Tokens = JSON.parse(readFile());
    try {
        const upsertOppReq = await axios.request({
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/opportunities/upsert',
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: NewOpportunityData
        });
        if (upsertOppReq.data.new === false) {
            console.log("Opportunity Already Exists So updated Successfully");
        } else {
            console.log("Opportunity Added Successfully");
        }
        console.log("Opportunity upserted Successfully", upsertOppReq.data);
        OppRes = upsertOppReq.data;
    } catch (error) {
        console.error("Error From upsertOpportunity function: ", error);
    }
};
app.post('/upsertContact', (req, res) => {
    console.log("The Data Reseved is: ");
    console.log(req.body);
    let pipelineId;
    switch (req.body.stage) {
        case "testing":
            pipelineId = "S6QYGwROfr6i3C7Pld4S";
            break;
        case "testing2":
            pipelineId = "FD5dsMgfF109RZjtyPze";
            break;
        case "Lead":
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
            stageId = "cb436af6-e427-455e-8612-5e7448b3a760";
            break;
        case "testing2":
            stageId = "b6addd21-1043-42c3-a9b9-bcc0c50a4a9d";
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
    };
    let NewContactData = {
        "firstName": req.body.first_name,
        "lastName": req.body.last_name,
        "name": req.body.first_name + " " + req.body.last_name,
        "email": req.body.email,
        "locationId": locationId,
        "phone": req.body.phone,
        "address1": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "postalCode": req.body.zip,
        "website": req.body.website || null,
        "timezone": req.body.timezone || null,
        // "dnd": true,
            // "dndSettings": {
            //   "Call": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   },
            //   "Email": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   },
            //   "SMS": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   },
            //   "WhatsApp": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   },
            //   "GMB": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   },
            //   "FB": {
            //     "status": "active",
            //     "message": "string",
            //     "code": "string"
            //   }
            // },
            // "inboundDndSettings": {
            //   "all": {
            //     "status": "active",
            //     "message": "string"
            //   }
            // },
            // "tags": [
            //   "nisi sint commodo amet",
            //   "consequat"
            // ],
        "customFields": [
            {
                "sub_date": req.body.sub_date,
                "return_date": req.body.return_date,
                "enrolled_date": req.body.enrolled_date,
                "first_pay": req.body.first_pay,
                "enrolled_debt": req.body.enrolled_debt,
                "campaign": req.body.campaign,
                "created_date": req.body.created_date,
                "customer_id": req.body.customer_id,
                "assigned_to": req.body.assigned_to,
                "dob": req.body.dob,
                "last_credit_date": req.body.last_credit_date
            }
        ],
        "source": req.body.data_source,
        "country": req.body.contry || null,
        "companyName": req.body.company_name || null
    };
    let NewOpportunityData = null;
    async function runAsyncFunctionsInOrder() {
        await createAccessTokenFromRefresh();
        await upsertContact(NewContactData);
        if ((ContactRes.new === true) || ContactRes.succeded) {
            NewOpportunityData = {
                pipelineId: pipelineId,
                locationId: locationId,
                pipelineStageId: stageId,
                contactId: ContactRes.contact.id
            };
        }
        await createAccessTokenFromRefresh();
        await upsertOpportunity(NewOpportunityData);
        if(OppRes){
            if (OppRes.new === false) {
                res.json({msg: "Opportunity Already Exists So updated Successfully"});
            } else if (OppRes.new === true) {
                res.json({msg: "Opportunity Added Successfully"});
            }
        }else{
            res.json({msg: "Sorry, Something went wrong!"});
        }
        await createAccessTokenFromRefresh();
        console.log("ALL Operations Done Successfully");
    }
    runAsyncFunctionsInOrder();
});
app.listen(3000, () => {console.log(`Server is listening on port 3000`);});