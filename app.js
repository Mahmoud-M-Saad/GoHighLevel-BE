const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios').default;
// Fixed Data
const locationId = "8KyubGi8XhoKHCpIvzGp";
// --------------------------------------------
const client_id = "65097ea78ef2c94808317db6-lmt7okly";
const client_secret = "4354e6ce-6dcd-4f4a-9f45-5a278177fbfe";
// --------------------------------------------
// const client_id = "650477d15e0035fbc8737c87-lmkrakx4";
// const client_secret = "92867618-14e0-4392-961d-a5fbc4502780";
// ------------------------
const {URLSearchParams} = require('url');
app.use(bodyParser.json());
function readFile() {
    const fileContents = fs.readFileSync('DBTokens.json', 'utf-8');
    return fileContents;
}
let Tokens,
    updateContactRes,
    createContactRes,
    OppRes,
    SearchOppRes,
    updateOppRes,
    SearchContact;
let ContactIDFromCU = false;
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
async function searchContact(contactNumber, contactEmail) {
    Tokens = JSON.parse(readFile());
    try {
        const searchContact = await axios.request({
            method: 'GET',
            url: 'https://services.leadconnectorhq.com/contacts/search/duplicate',
            params: {
                locationId: locationId,
                number: contactNumber,
                email: contactEmail
            },
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                Accept: 'application/json'
            }
        });
        SearchContact = searchContact.data.contact;
    } catch (error) {
        console.error("Error From searchContact function: ", error.data);
    }
};
async function createContact(NewContactData) {
    Tokens = JSON.parse(readFile());
    try {
        const createContactRequest = await axios.request({
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/contacts/',
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: NewContactData
        });
        createContactRes = createContactRequest.data;
    } catch (error) {
        console.error("Error From createContact function: ", error);
    }
};
async function updateContact(ContactData, contactId) {
    Tokens = JSON.parse(readFile());
    try {
        const updateContactRequest = await axios.request({
            method: 'PUT',
            url: `https://services.leadconnectorhq.com/contacts/${contactId}`,
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: ContactData
        });
        updateContactRes = updateContactRequest.data;
    } catch (error) {
        console.error("Error From updateContactRequest function: ", error);
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
async function createOpportunity(NewOpportunityData) {
    Tokens = JSON.parse(readFile());
    try {
        const createOppRequest = await axios.request({
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/opportunities/',
            headers: {
                Authorization: `Bearer ${Tokens.access_token}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: NewOpportunityData
        });
        OppRes = createOppRequest.data;
    } catch (error) {
        console.error("Error From createOpportunity function: ", error);
    }
};
async function updateOpp(NewOpportunityData,oppId) {
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
            data: NewOpportunityData
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
        case "Not Workable":
        case "Sales Pipeline":
            pipelineId = "Y6FEUB7ogzVp9NGqOEGp";
            break;
        case "Underwriting":
            pipelineId = "c0tkU2ao6U93GT84Sx4h";
            break;
        case "Lead Qualification":
            pipelineId = "FclsD5dsMgfF109RZjtyPze";
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
        case "New Lead - PL Data":
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
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b8";
            break;
        case "1st Payment NSF 2":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b9";
            break;
        case "NSF 1":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b10";
            break;
        case "NSF 2":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b11";
            break;
        case "NSF":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b7";
            break;
        case "Invalid Banking":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b12";
            break;
        case "Unable to Locate Account 2":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b13";
            break;
        case "Stopped Payment/Revoked":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b14";
            break;
        case "Drafts on Hold":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b15";
            break;
        case "Drafts on Hold - Cancel Pending":
            stageId = "b393dae2-d08f-4bd5-8f43-29888d347210";
            break;
        case "Paused / Hold":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b8";
            break;
        case "Banking Error":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b9";
            break;
        case "Cancellation Requested":
            stageId = "b393dae2-d08f-4bd5-8f43-29888d347210";
            break;
        case "Pending Affiliate Cancellation":
            stageId = "b393dae2-d08f-4bd5-8f43-29888d347210";
            break;
        case "Waiting For First Payment":
            stageId = "0c84c727-cbef-4abd-8f4e-30ce5c37d5d3";
            break;
        case "Active":
            stageId = "64891462-caca-462f-adf7-3d8b709ea82d";
            break;
        case "On Hold - NSF":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b7";
            break;
        case "Admin Pause":
            stageId = "21c7e720-e367-4c85-a91c-6ae3a2df39b7";
            break;
        case "Final Payment - File Review":
            stageId = "64891462-caca-462f-adf7-3d8b709ea82d";
            break;
        case "Cancelled":
            stageId = "5bd4c19a-e0e8-4209-9691-11643c94abc4";
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
        case "Follow Up To Close":
        case "Submitted":
        case "Docs Signed - Clarity":
        case "Resubmitted - Clarity":
        case "Docs Signed - Cordoba":
        case "Resubmitted - Cordoba":
        case "CA in Escrow":
        case "QA Needed":
        case "QA Rejected":
        case "Contract Needed":
        case "Returned":
        case "Error Processing":
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
        case "Cancellation Requested":
        case "On Hold - NSF":
        case "Pending Affiliate Cancellation":
        case "Admin Pause":
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
            status = "abandoned";
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
    };
    let NewContactData = {
        "firstName": req.body.first_name,
        "lastName": req.body.last_name,
        "name": req.body.first_name + " " + req.body.last_name,
        "email": req.body.email,
        "locationId": locationId,
        "phone": req.body.phone,
        "address1": req.body.address1,
        "city": req.body.city,
        "state": req.body.state,
        "postalCode": req.body.zip,
        "website": req.body.website || null,
        "timezone": req.body.timezone || null,
        "dateOfBirth": req.body.dob,
        "customFields": [
            {
                "id": "r6MLzyK11mGr9yeqzeET",
                "key": "contact.submission_date",
                "field_value": req.body.sub_date
            },
            //  {
            //     "id": "UexXb4dUmBFilIedw5sl",
            //     "key": "contact.returned_date",
            //     "field_value": req.body.return_date
            // },
            //  {
            //     "id": "3vuPBvMDIbhJTUWwjRSv",
            //     "key": "contact.enrolled_date",
            //     "field_value": req.body.enrolled_date
            // },
             {
                "id": "aJ1AaaTeblIcbJalrRhu",
                "key": "contact.first_pay_date",
                "field_value": req.body.first_pay
            }, {
                "id": "ztxX3gIgfeMqgFCM8nmt",
                "key": "contact.enrolled_debt",
                "field_value": req.body.enrolled_debt
            }, {
                "id": "jAMguF0Fidj60mtdBD8M",
                "key": "contact.forth_id",
                "field_value": req.body.customer_id
            },
            //  {
            //     "id": "t78ZnIO9ypY4LYT2ETFk",
            //     "key": "contact.last_credit_pulled_date",
            //     "field_value": req.body.last_credit_date
            // }
        ],
        "source": req.body.data_source,
        "country": req.body.contry || null,
        "companyName": req.body.company_name || null
    };
    let NewOpportunityData = {
        "pipelineId": pipelineId,
        "locationId": locationId,
        "name": "Opportunity",
        "pipelineStageId": stageId,
        "status": status,
        "monetaryValue": parseInt(req.body.enrolled_debt),
        // "assignedTo": req.body.assigned_to
    };
    if(!(req.body.enrolled_debt)){delete NewContactData.monetaryValue}
    async function runAsyncFunctionsInOrder() {
        await createAccessTokenFromRefresh();
        await searchContact(req.body.phone, req.body.email);
        if (SearchContact === null) {
            console.log("Contact Not exsits");
            await createContact(NewContactData);
            await createAccessTokenFromRefresh();
            console.log(createContactRes);
            if(createContactRes){
                if (createContactRes.contact.id) {
                    console.log("Contact Created Successfully");
                    console.log(createContactRes);
                    console.log(createContactRes.contact.customFields);
                    ContactIDFromCU = createContactRes.contact.id;
                    await RunOpp(createContactRes.contact.id);
                }} else {
                    console.log("Contact Not Created, Somthing went wrong!");
                }
            
        } else {
            console.log("Contact Founded");
            delete NewContactData.locationId;
            await updateContact(NewContactData, SearchContact.id);
            await createAccessTokenFromRefresh();
            if(updateContactRes){
                if (updateContactRes.succeded) {
                    console.log("Contact Updated Successfully");
                    console.log(updateContactRes);
                    console.log(updateContactRes.contact.customFields);
                    ContactIDFromCU = updateContactRes.contact.id;
                    await RunOpp(updateContactRes.contact.id);
                }} else {
                    console.log("Contact Not Updated, Somthing went wrong!");
                }           
        };
        async function RunOpp(ContactIDFromCU) {
            if (ContactIDFromCU) {
                await searchOpportunity(ContactIDFromCU);
                await createAccessTokenFromRefresh();
                if(SearchOppRes){
                    if (SearchOppRes.opportunities.length === 0) {
                        console.log("Opportunity Not Found");
                        NewOpportunityData.contactId = ContactIDFromCU;
                        await createOpportunity(NewOpportunityData);
                        await createAccessTokenFromRefresh();
                        if (OppRes) {
                            console.log("Opportunity Created Successfully");
                            console.log(OppRes);
                            res.json({msg: "Opportunity Created Successfully"});
                        } else {
                            console.log("Opportunity Not Created, Somthing went wrong!");
                            res.json({msg: "Opportunity Not Created, Somthing went wrong!"});
                        }
                    } else if (SearchOppRes.opportunities[0].id) {
                        console.log("Opportunity Found");
                        console.log("OLD Pipline: " + SearchOppRes.opportunities[0].pipelineId);
                        console.log("NEW Pipline: " + pipelineId);
                        delete NewOpportunityData.locationId;
                        await updateOpp(NewOpportunityData,SearchOppRes.opportunities[0].id);
                        await createAccessTokenFromRefresh();
                        if (updateOppRes) {
                            console.log("Opportunity Updated Successfully");
                            console.log(updateOppRes);
                            res.json({msg: "Opportunity Updated Successfully"});
                        } else {
                            console.log("Opportunity Not Updated, Somthing went wrong!");
                            res.json({msg: "Opportunity Not Updated, Somthing went wrong!"});
                        }
                    }
                }else{
                    console.log("SearchOppRes no exists");
                }
            }
        };
        await createAccessTokenFromRefresh();
        console.log("ALL Operations Done Successfully");
    }
    runAsyncFunctionsInOrder();
});
app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});