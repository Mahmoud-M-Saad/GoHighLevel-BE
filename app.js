const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios').default;
// Fixed Data
const locationId = "8KyubGi8XhoKHCpIvzGp";
// ---- Testing Client ---- const client_id =
// "65097ea78ef2c94808317db6-lmt7okly"; const client_secret =
// "4354e6ce-6dcd-4f4a-9f45-5a278177fbfe";
// ------------------------
const client_id = "650477d15e0035fbc8737c87-lmkrakx4";
const client_secret = "92867618-14e0-4392-961d-a5fbc4502780";
// ------------------------
const {URLSearchParams} = require('url');
app.use(bodyParser.json());
function readFile() {
    const fileContents = fs.readFileSync('DBTokens.json', 'utf-8');
    return fileContents;
}
let Tokens,
    ContactRes,
    OppRes,
    SearchOppRes,
    updateOppRes;
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
async function searchOpportunity(contactID) {
    Tokens = JSON.parse(readFile());
    try {
        const searchOppReq = await axios.request({
            method: 'GET',
            url: 'https://services.leadconnectorhq.com/opportunities/search',
            params: {
                location_id: locationId,
                contact_id: contactID
            },
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                Accept: 'application/json'
            }
        });
        SearchOppRes = searchOppReq.data;
    } catch (error) {
        console.error("Error From searchOpportunity function: ", error.data);
    }
};
async function updateAllOpp(oppId, NewPipLine, stageId, status) {
    Tokens = JSON.parse(readFile());
    try {
        const updateOppReq = await axios.request({
            method: 'PUT',
            url: `https://services.leadconnectorhq.com/opportunities/${oppId}`,
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                pipelineId: NewPipLine,
                pipelineStageId: stageId,
                status: status
            }
        });
        updateOppRes = updateOppReq.data;
    } catch (error) {
        console.error("Error From updateAllOpp function: ", error);
    }
};

app.post('/upsertContact', (req, res) => {
    console.log("The Data Reseved is: ");
    console.log(req.body);
    let pipelineId;
    switch (req.body.stage) {
        case "Lead":
        case "Lost":
            pipelineId = "Y6FEUB7ogzVp9NGqOEGp";
            break;
        case "Underwriting":
            pipelineId = "c0tkU2ao6U93GT84Sx4h";
            break;
        case "Not Workable":
            pipelineId = "Y6FEUB7ogzVp9NGqOEGp";
            break;
        case "Unable To Contact":
            pipelineId = "sTLqxN8vtNtbEC4qnHde";
            break;
        case "Servicing-Clarity":
        case "Servicing-Cordoba":
        case "Dropped Clients":
        case "Completed Client":
        case "Client":
        case "Cancelled":
            pipelineId = "S6QYGwROfr6i3C7Pld4S";
            break;
        default:
            pipelineId = null
    };
    let stageId;
    switch (req.body.status) {
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
        case "Docs Signed - Clarity":
            stageId = "7ced5021-bec6-4411-8dad-a82064ec7428";
            break;
        case "Resubmitted - Clarity":
            stageId = "d608948d-e29a-415b-8804-ef6d2d0c82f4";
            break;
        case "Docs Signed - Cordoba":
            stageId = "7ced5021-bec6-4411-8dad-a82064ec7428";
            break;
        case "Resubmitted - Cordoba":
            stageId = "d608948d-e29a-415b-8804-ef6d2d0c82f4";
            break;
        case "CA in Escrow":
            stageId = "70b940ff-dbdb-46a4-83e2-75fa37ec663c";
            break;
        case "QA Needed":
            stageId = "b7999315-27b7-47fe-ac91-fa78e4372de7";
            break;
        case "QA Rejected":
            stageId = "d6368fc8-a1e2-4eec-bee6-ad749b79aacd";
            break;
        case "Contract Needed":
            stageId = "e66e5c89-8c18-4da1-b942-f7f8dd4130f9";
            break;
        case "Returned":
            stageId = "a3277252-7381-4bb3-a1b9-2e99b63fb492";
            break;
        case "Low Debt":
        case "No Debt":
        case "Number Disconnected":
        case "Already Enrolled":
        case "Unemployed/Low Income":
        case "Bankruptcy":
        case "Bad State":
        case "Duplicate":
        case "Do Not Call":
            stageId = "b6addd21-1043-42c3-a9b9-bcc0c50a4a9d";
            break;
        case "Attempted Contact 2":
            stageId = "e2256b37-b8a5-4ff6-b10e-b8ea7313a932";
            break;
        case "Active - Clarity":
        case "Initial Draft Pending":
        case "Awaiting First Settlement":
        case "Term Settlement":
        case "Graduated":
        case "Final Payment - File Review":
            stageId = "64891462-caca-462f-adf7-3d8b709ea82d";
            break;
        case "Error Processing":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b7";
            break;
        case "1st Payment NSF 1":
        case "1st Payment NSF 2":
        case "NSF":
        case "NSF 1":
        case "NSF 2":
        case "Invalid Banking":
        case "Unable to Locate Account 2":
        case "Stopped Payment/Revoked":
        case "Drafts on Hold":
        case "Drafts on Hold - Cancel Pending":
        case "Paused / Hold":
        case "Banking Error":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b7";
            break;
        case "Pending Affiliate Cancellation":
            stageId = "b393dae2-d08f-4bd5-8f43-29888d347210";
            break;
        default:
            stageId = null;
            break;
    }
    let status;
    switch (req.body.status) {
        case "New Lead":
        case "New Lead - PL Data":
        case "Attempted Contact":
        case "Appointment Scheduled":
        case "Missed Appointment":
        case "Submitted":
        case "Docs Signed - Clarity":
        case "Resubmitted - Clarity":
        case "Docs Signed - Cordoba":
        case "Resubmitted - Cordoba":
        case "CA in Escrow":
        case "QA Needed":
        case "QA Rejected":
        case "Contract Needed":
        case "Error Processing":
            status = "open";
            break;
        case "Pitched":
        case "Loan Only":
        case "No PII":
        case "Not Interested":
        case "QA Failed":
        case "Cancelled":
            status = "lost";
            break;
        case "Low Debt":
        case "No Debt":
        case "Number Disconnected":
        case "Already Enrolled":
        case "Unemployed/Low Income":
        case "Bankruptcy":
        case "Bad State":
        case "Duplicate":
        case "Do Not Call":
        case "Attempted Contact 2":
        case "1st Payment NSF 1":
        case "1st Payment NSF 2":
        case "NSF 1":
        case "NSF 2":
        case "Invalid Banking":
        case "Unable to Locate Account 2":
        case "Stopped Payment/Revoked":
        case "Drafts on Hold":
        case "Drafts on Hold - Cancel Pending":
        case "NSF":
        case "Paused / Hold":
        case "Banking Error":
        case "Pending Affiliate Cancellation":
        case "Admin Pause":
            status = "abandon";
            break;
        case "Active - Clarity":
        case "Initial Draft Pending":
        case "Awaiting First Settlement":
        case "Term Settlement":
        case "Graduated":
        case "Waiting For First Payment":
        case "Active":
        case "Final Payment - File Review":
            status = "won";
            break;
        default:
            status = null;
            break;
    }
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
        if ((ContactRes.new === true)) {
            NewOpportunityData = {
                pipelineId: pipelineId,
                locationId: locationId,
                pipelineStageId: stageId,
                contactId: ContactRes.contact.id,
                status: status
            };
            await upsertOpportunity(NewOpportunityData);
            await createAccessTokenFromRefresh();
            if (OppRes) {
                res.json({msg: "Opportunity Created Successfully"});
            } else {
                res.json({msg: "Sorry, Something went wrong"});
            }
        } else if (ContactRes.new === false) {
            await searchOpportunity(ContactRes.contact.id);
            await createAccessTokenFromRefresh();
            if (SearchOppRes.opportunities) {
                console.log("OLD Pipline: " + SearchOppRes.opportunities[0].pipelineId);
                console.log("NEW Pipline: " + pipelineId);
                await updateAllOpp(
                    SearchOppRes.opportunities[0].id,
                    pipelineId,
                    stageId,
                    status
                );
                console.log(updateOppRes);
                await createAccessTokenFromRefresh();
                res.json({msg: "Opportunity Updated Successfully"});
            } else {
                NewOpportunityData = {
                    pipelineId: pipelineId,
                    locationId: locationId,
                    pipelineStageId: stageId,
                    contactId: ContactRes.contact.id,
                    status: status
                };
                await upsertOpportunity(NewOpportunityData);
                await createAccessTokenFromRefresh();
                if (OppRes) {
                    res.json({msg: "Opportunity Created Successfully"});
                } else {
                    res.json({msg: "Sorry, Something went wrong"});
                }
            }
        } else {
            res.json({msg: "Opportunity Already Exists"});
        }
        await createAccessTokenFromRefresh();
        console.log("ALL Operations Done Successfully");
    }
    runAsyncFunctionsInOrder();
});
app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});