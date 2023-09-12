const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var axios = require("axios");
const pipelineId = "Y6FEUB7ogzVp9NGqOEGp";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IjhLeXViR2k4WGhvS0hDc" +
        "El2ekdwIiwiY29tcGFueV9pZCI6Im95cTFPeVYzRHl3bDlnMm4xa295IiwidmVyc2lvbiI6MSwiaWF" +
        "0IjoxNjg4NzUxMzYyNTk4LCJzdWIiOiJvQTk4WmhnWEM4TXhyUXlEZFh0aCJ9.UyI5r6qVVXpWLPq4" +
        "r29q0sbcupJdi8IfqTuaQwtFabw";

app.use(bodyParser.json());
//Getting the new opportunities
// var newOpportunitie = {
//     "id": "t2mhIf51FAvzjGq06DxB",
//     "name": "Aracelis Rodriguez",
//     "monetaryValue": 34957,
//     "pipelineId": "Y6FEUB7ogzVp9NGqOEGp",
//     "pipelineStageId": "4846cdee-0231-406d-b0ac-0b83ce8ae384",
//     "pipelineStageUId": "4846cdee-0231-406d-b0ac-0b83ce8ae384",
//     "assignedTo": "y8TthByJTTmXpNtdw9UM",
//     "status": "open",
//     "source": "LS ACL - C1",
//     "lastStatusChangeAt": "2023-07-28T21:02:35.352Z",
//     "createdAt": "2023-07-28T21:02:35.352Z",
//     "updatedAt": "2023-07-28T21:02:35.966Z",
//     "contact": {
//         "id": "4YxiaxhtyesF6KdWUaqz",
//         "name": "Aracelis Rodriguez",
//         "email": "aracelis12rodriguez@gmail.com",
//         "phone": "+12672588857",
//         "tags": []
//     }
// };

app.post('/crm-webhook', (req, res) => {
    const newOpportunitie = req.body; // CRM webhook data

    // Process the CRM webhook newOpportunitie here
    console.log('Received CRM webhook:', newOpportunitie);

    // Getting All Oppertunities & loop on all pages
    let existingOpportunities = [];
    async function getExistingOpportunities() {
        let pageurl = 'https://rest.gohighlevel.com/v1/pipelines/Y6FEUB7ogzVp9NGqOEGp/opportunities';
        while (true) {
            const data = await axios({
                method: "get",
                maxBodyLength: Infinity,
                url: pageurl,
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
            const opportunities = data.data.opportunities;
            existingOpportunities = existingOpportunities.concat(opportunities);
            if (!data.data.meta.nextPageUrl) {
                break;
            }
            pageurl = data.data.meta.nextPageUrl;
        }
        return existingOpportunities;
    }
    // Storing all opportunities in existingOpportunities then compare new with all
    // this if not found create new
    async function main(req, res) {
        try {
            await getExistingOpportunities();
            const IsExist = existingOpportunities.find((opportunitie) => {
                return opportunitie.name === newOpportunitie.name;
            });
            if (IsExist) {
                console.log("This opportunities is already Exist");
                return res
                    .status(422)
                    .json({msg: "This opportunities is already Exist"});
            } else {
                await axios({
                    method: "post",
                    maxBodyLength: Infinity,
                    url: `https://rest.gohighlevel.com/v1/pipelines/Y6FEUB7ogzVp9NGqOEGp/opportunities`,
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    },
                    data: newOpportunitie
                });
                console.log("Opportunity Created");
                return res.status(200).json({msg: "Opportunity Created", opportunitie: newOpportunitie});
            }
        } catch (error) {
            // console.error('Error:', error.code);
            return res.status(404).json({msg: "Somothing went wrong!", error});
        }
    }
    main();
    res.status(200).json({msg:'CRM webhook received successfully' });
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});