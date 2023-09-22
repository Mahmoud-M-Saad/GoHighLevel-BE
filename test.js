const express = require('express');
const app = express();
const location_Id = "8KyubGi8XhoKHCpIvzGp";

// 
const axios = require('axios').default;
const { URLSearchParams } = require('url');

const encodedParams = new URLSearchParams();
encodedParams.set('client_id', '65097ea78ef2c94808317db6-lmrollec');
encodedParams.set('client_secret', 'e1fcc9b1-909a-42cd-8914-c776798583e4');
encodedParams.set('grant_type', 'refresh_token');
encodedParams.set('refresh_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjUwOTdlYTc4ZWYyYzk0ODA4MzE3ZGI2LWxtcm9sbGVjIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNvbnRhY3RzLnJlYWRvbmx5Iiwib3Bwb3J0dW5pdGllcy5yZWFkb25seSIsImNvbnRhY3RzLndyaXRlIiwib3Bwb3J0dW5pdGllcy53cml0ZSIsImxvY2F0aW9ucy5yZWFkb25seSIsImxvY2F0aW9ucy53cml0ZSJdLCJjbGllbnQiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYiLCJjbGllbnRLZXkiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYtbG1yb2xsZWMifSwiaWF0IjoxNjk1MjE0NjU5LjA0MSwiZXhwIjoxNzI2NzUwNjU5LjA0MSwidW5pcXVlSWQiOiIyYzM0Nzk0NS0yMTQ4LTQ5ODctYTQ2ZC1jYmY0YTNmOWZkNzUifQ.FrcZbALaXu0XAJ7gPLFYYbmTLTS1xkPlhnhUeKYPUXw');

const options = {
  method: 'POST',
  url: 'https://services.leadconnectorhq.com/oauth/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  },
  data: encodedParams,
};

try {
  const  data = axios.request(options);
  console.log("data: "+data);
} catch (error) {
  console.error("err: "+error.data);
}

// const {URLSearchParams} = require('url');
// const client_id = "65097ea78ef2c94808317db6-lmrollec"
// const client_secret = "e1fcc9b1-909a-42cd-8914-c776798583e4"
// const code = "cc189df2ff8bb2f7379742112011dc63e865b04a"

// const encodedParams = new URLSearchParams();
// encodedParams.set('client_id', client_id);
// encodedParams.set('client_secret', client_secret);
// encodedParams.set('grant_type', 'authorization_code');
// encodedParams.set('code', code);

// const options = {
//     method: 'POST',
//     url: 'https://services.leadconnectorhq.com/oauth/token',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Accept: 'application/json'
//     },
//     data: encodedParams
// };

// try {
//     const data = axios.request(options);
//     console.log("data: "+data.Promise);
// } catch (error) {
//     console.error(error.data);
// }

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});














"state":State,

"stage":Stage,
"status":Status,
"enrolled_debt":Enrolled Debt,
"campaign":Campaign,
"data_source":Data Source,
"created_date":Created,
"customer_id":Customer ID,
"assigned_to":Assigned To,
"dob":Date Of Birth,
"last_credit_date":Last Credit Pulled Date}


{
"first_name":"First Name",
"last_name":"Last Name",
"phone":Home Phone,
"email":Email,
"address":Address 1,
"city":City,
"state":State,
"zip":Zip,
"sub_date":Submitted Date,
"return_date":Returned Date,
"enrolled_date":Enrolled_Date,
"first_pay":cdr_pay1,
"stage":Stage,
"status":Status,
"enrolled_debt":Enrolled Debt,
"campaign":Campaign,
"data_source":Data Source,
"created_date":Created,
"customer_id":Customer ID,
"assigned_to":Assigned To,
"dob":Date Of Birth,
"last_credit_date":Last Credit Pulled Date}
const data = 
{
"first_name" : "Mahmoud",
"last_name":"saad",
"phone":"0100",
"email":"m@mail.com",
"address":"miami",

"city":"alex",
"state":"New Lead",
"stage":"lead",
"status":"New Lead"
}


  data: {
    firstName: 'Rosan',
    lastName: 'Deo',
    name: 'Rosan Deo',
    email: 'rosan@deos.com',
    locationId: 've9EPM428h8vShlRW1KT',
    gender: 'male',
    phone: '+1 888-888-8888',
    address1: '3535 1st St N',
    city: 'Dolomite',
    state: 'AL',
    postalCode: '35061',

 
    
};



pipelineId ==> DPP Stage
Stage Key==> DPP Status 

pipelineId
locationId
contactId

firstName: 'Rosan',
    lastName: 'Deo',
    name: 'Rosan Deo',
    email: 'rosan@deos.com',
    locationId: 've9EPM428h8vShlRW1KT',
    gender: 'male',
    phone: '+1 888-888-8888',
    address1: '3535 1st St N',
    city: 'Dolomite',
    state: 'AL',
    postalCode: '35061',
    website: 'https://www.tesla.com',
    timezone: 'America/Chihuahua',
