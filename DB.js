const responseOfContact =  {
    new: false,
    succeded: true,
    contact: {
      id: 'QSA54deIWplzVtZTkYSF',
      country: 'US',
      gender: 'male',
      city: 'Dolomite',
      timezone: 'America/Chihuahua',
      source: 'public api',
      type: 'lead',
      locationId: '8KyubGi8XhoKHCpIvzGp',
      lastNameLowerCase: 'deo',
      emailLowerCase: 'rosan@deos.com',
      state: 'AL',
      firstName: 'Rosan',
      email: 'rosan@deos.com',
      website: 'https://www.tesla.com',
      address1: '3535 1st St N',
      fullNameLowerCase: 'rosan deo',
      lastName: 'Deo',
      firstNameLowerCase: 'rosan',
      tags: [],
      dateAdded: '2023-09-21T10:48:33.080Z',
      phone: '+1 888-888-8888',
      companyName: 'DGS VolMAX',
      postalCode: '35061',
      dateUpdated: '2023-09-21T10:53:03.497Z',
      additionalPhones: [],
      customFields: [],
      additionalEmails: []
    },
    traceId: '801c8549-3752-4784-9ce5-71d7fb3ee9c3'
  }

const reqCont = {
    "firstName": "Rosan",
    "lastName": "Deo",
    "name": "Rosan Deo",
    "email": "rosan@deos.com",
    "locationId": "ve9EPM428h8vShlRW1KT",
    "gender": "male",
    "phone": "+1 888-888-8888",
    "address1": "3535 1st St N",
    "city": "Dolomite",
    "state": "AL",
    "postalCode": "35061",
    "website": "https://www.tesla.com",
    "timezone": "America/Chihuahua",
    "dnd": true,
    "dndSettings": {
      "Call": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "Email": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "SMS": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "WhatsApp": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "GMB": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "FB": {
        "status": "active",
        "message": "string",
        "code": "string"
      }
    },
    "inboundDndSettings": {
      "all": {
        "status": "active",
        "message": "string"
      }
    },
    "tags": [
      "nisi sint commodo amet",
      "consequat"
    ],
    "customFields": [
      {
        "id": "6dvNaf7VhkQ9snc5vnjJ",
        "key": "my_custom_field",
        "field_value": "9039160788"
      }
    ],
    "source": "public api",
    "country": "US",
    "companyName": "DGS VolMAX"
  }


  const pipelineId = {
    "pipelines": [
      {
        "stages": [
          {
            "id": "5bd4c19a-e0e8-4209-9691-11643c94abc4",
            "name": "Cancelled",
            "position": 0,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "b393dae2-d08f-4bd5-8f43-29888d347210",
            "name": "Cancellation Requested",
            "position": 1,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "21c7e720-e367-4c85-a91c-6ae3a2df39b7",
            "name": "Payment Issues",
            "position": 2,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "0c84c727-cbef-4abd-8f4e-30ce5c37d5d3",
            "name": "Waiting On First Payment",
            "position": 3,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "64891462-caca-462f-adf7-3d8b709ea82d",
            "name": "Active Clients",
            "position": 4,
            "showInFunnel": true,
            "showInPieChart": true
          }
        ],
        "dateAdded": "2023-07-13T03:23:40.708Z",
        "dateUpdated": "2023-09-15T23:54:29.115Z",
        "name": "Client",
        "showInFunnel": true,
        "showInPieChart": true,
        "id": "S6QYGwROfr6i3C7Pld4S"
      },
      {
        "stages": [
          {
            "id": "b4fc1b52-eec2-4650-a0ff-e167f8f0b9a5",
            "name": "New Lead",
            "position": 0,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "cb436af6-e427-455e-8612-5e7448b3a760",
            "name": "Not Qualified",
            "position": 1,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "0dd2afff-4631-49da-836a-b06149ebf5d0",
            "name": "Qualified Lead",
            "position": 2,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "636d2a0c-2f02-47a7-b1b0-5c670e4ecb3c",
            "name": "After Hours QL",
            "position": 3,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "b20b74fb-0a20-4e46-96b7-2edf9db14920",
            "name": "Call Requested",
            "position": 4,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "421cfa41-5319-4980-8ff2-1adc5fa4a2cf",
            "name": "Appointment Requested",
            "position": 5,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "693427a1-9b33-4da1-84dc-9fc638554ee4",
            "name": "Appointment Booked",
            "position": 6,
            "showInFunnel": true,
            "showInPieChart": true
          }
        ],
        "dateAdded": "2023-08-31T16:43:48.812Z",
        "dateUpdated": "2023-09-14T15:50:07.816Z",
        "name": "Lead Qualification",
        "showInFunnel": true,
        "showInPieChart": true,
        "id": "FD5dsMgfF109RZjtyPze"
      },
      {
        "stages": [
          {
            "id": "4846cdee-0231-406d-b0ac-0b83ce8ae384",
            "name": "New Lead",
            "position": 0,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "398ae3cc-40dd-4bca-8a1f-04cd9593c00e",
            "name": "Attempted Contact",
            "position": 1,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "08a45943-6274-4c10-bbf6-b7b7abf7aae1",
            "name": "Missed Appointment",
            "position": 2,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "57ac5ce2-a94e-49fe-83e6-e78b7a62d6a1",
            "name": "Appointment Scheduled",
            "position": 3,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "2d88ef07-e82c-421a-a406-aec6e933b8e7",
            "name": "Follow Up To Close",
            "position": 4,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "d03d421b-c220-4eba-b531-8c91838340c3",
            "name": "Pitched",
            "position": 5,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "e9809007-bb9f-4a6c-a152-de7147a56647",
            "name": "Loan Only",
            "position": 6,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "5d152d38-0756-40a4-9db3-cfc499dcde77",
            "name": "No PII",
            "position": 7,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "e200626f-2556-4820-b3a4-e9cacfa56b8e",
            "name": "Not Interested",
            "position": 8,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "b6addd21-1043-42c3-a9b9-bcc0c50a4a9d",
            "name": "Not Workable",
            "position": 9,
            "showInFunnel": false,
            "showInPieChart": true
          },
          {
            "id": "06b01a00-11c5-4b6d-b836-9f90564971c3",
            "name": "QA Failed",
            "position": 10,
            "showInFunnel": false,
            "showInPieChart": true
          }
        ],
        "dateAdded": "2023-07-11T20:03:01.340Z",
        "dateUpdated": "2023-09-15T23:58:47.959Z",
        "name": "Sales Pipeline",
        "showInFunnel": true,
        "showInPieChart": true,
        "id": "Y6FEUB7ogzVp9NGqOEGp"
      },
      {
        "stages": [
          {
            "id": "e2256b37-b8a5-4ff6-b10e-b8ea7313a932",
            "name": "New Unable To Contact",
            "position": 0,
            "showInFunnel": true,
            "showInPieChart": true
          }
        ],
        "dateAdded": "2023-09-15T16:27:13.881Z",
        "dateUpdated": "2023-09-15T16:27:13.881Z",
        "name": "Unable To Contact",
        "showInFunnel": true,
        "showInPieChart": true,
        "id": "sTLqxN8vtNtbEC4qnHde"
      },
      {
        "stages": [
          {
            "id": "7ced5021-bec6-4411-8dad-a82064ec7428",
            "name": "Docs Signed",
            "position": 0,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "63082e30-ce92-44ef-9e57-ababf51576cb",
            "name": "Submitted",
            "position": 1,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "d608948d-e29a-415b-8804-ef6d2d0c82f4",
            "name": "Resubmitted",
            "position": 2,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "b7999315-27b7-47fe-ac91-fa78e4372de7",
            "name": "QA Needed",
            "position": 3,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "d6368fc8-a1e2-4eec-bee6-ad749b79aacd",
            "name": "QA Rejected",
            "position": 4,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "70b940ff-dbdb-46a4-83e2-75fa37ec663c",
            "name": "CA in Escrow",
            "position": 5,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "e66e5c89-8c18-4da1-b942-f7f8dd4130f9",
            "name": "Contract Needed",
            "position": 6,
            "showInFunnel": true,
            "showInPieChart": true
          },
          {
            "id": "a3277252-7381-4bb3-a1b9-2e99b63fb492",
            "name": "Returned",
            "position": 7,
            "showInFunnel": true,
            "showInPieChart": true
          }
        ],
        "dateAdded": "2023-07-13T03:20:32.406Z",
        "dateUpdated": "2023-09-15T16:11:24.274Z",
        "name": "Underwriting",
        "showInFunnel": true,
        "showInPieChart": true,
        "id": "c0tkU2ao6U93GT84Sx4h"
      }
    ],
    "traceId": "1c1a71e8-aacf-4ff5-a078-1bd7458ed129"
  }




  const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'https://services.leadconnectorhq.com/opportunities/upsert',
  headers: {
    Authorization: `Bearer ${access_token}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: {
    pipelineId: 'bCkKGpDsyPP4peuKowkG',
    locationId: 'CLu7BaljjqrEjBGKTNNe',
    contactId: 'LiKJ2vnRg5ETM8Z19K7',
    name: 'opportunity name',
    status: 'open',
    pipelineStageId: '7915dedc-8f18-44d5-8bc3-77c04e994a10',
    monetaryValue: 220,
    assignedTo: '082goXVW3lIExEQPOnd3'
  }
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjUwOTdlYTc4ZWYyYzk0ODA4MzE3ZGI2LWxtcm9sbGVjIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNvbnRhY3RzLnJlYWRvbmx5Iiwib3Bwb3J0dW5pdGllcy5yZWFkb25seSIsImNvbnRhY3RzLndyaXRlIiwib3Bwb3J0dW5pdGllcy53cml0ZSIsImxvY2F0aW9ucy5yZWFkb25seSIsImxvY2F0aW9ucy53cml0ZSJdLCJjbGllbnQiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYiLCJjbGllbnRLZXkiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYtbG1yb2xsZWMifSwiaWF0IjoxNjk1Mjk3ODQ3LjExLCJleHAiOjE2OTUzODQyNDcuMTF9.e72NhtArUQrVqzWD43QSy97gG_lgOQxvxxzR4S06Usk

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjUwOTdlYTc4ZWYyYzk0ODA4MzE3ZGI2LWxtcm9sbGVjIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiOEt5dWJHaThYaG9LSENwSXZ6R3AiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNvbnRhY3RzLnJlYWRvbmx5Iiwib3Bwb3J0dW5pdGllcy5yZWFkb25seSIsImNvbnRhY3RzLndyaXRlIiwib3Bwb3J0dW5pdGllcy53cml0ZSIsImxvY2F0aW9ucy5yZWFkb25seSIsImxvY2F0aW9ucy53cml0ZSJdLCJjbGllbnQiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYiLCJjbGllbnRLZXkiOiI2NTA5N2VhNzhlZjJjOTQ4MDgzMTdkYjYtbG1yb2xsZWMifSwiaWF0IjoxNjk1Mjk3ODQ3LjExLCJleHAiOjE2OTUzODQyNDcuMTF9.e72NhtArUQrVqzWD43QSy97gG_lgOQxvxxzR4S06Usk




