const axios = require('axios').default;
const newdata = req.body;
const options = {
  method: 'POST',
  url: 'https://services.leadconnectorhq.com/contacts/upsert',
  headers: {
    Authorization: `Bearer ${}  `,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: newdata
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}



const data = {

    "id": "jf4xWreG28DLQM6jvSyw",
        "locationId": "8KyubGi8XhoKHCpIvzGp",
        "contactName": "brenda smith",
        "firstName": "brenda",
        "lastName": "smith",
        "companyName": null,
        "email": "brendasmith071759@gmail.com",
        "phone": "+12602069703",
        "dnd": false,
        "type": "lead",
        "source": "facebook form lead",
        "assignedTo": null,
        "city": null,
        "state": null,
        "postalCode": null,
        "address1": null,
        "dateAdded": "2023-09-20T11:15:28.144Z",
        "dateUpdated": "2023-09-20T11:18:33.744Z",
        "dateOfBirth": null,
        "businessId": null,
        "tags": [],
        "country": "US",
        "additionalEmails": [],
        "attributions": [
          {
            "utmSessionSource": "Paid Social",
            "utmCampaign": "Instant Form  Campaign",
            "utmMedium": "Instant Form  Ad set",
            "utmCampaignId": "23858220349250527",
            "isFirst": true,
            "medium": "facebook",
            "mediumId": "822471972662770",
            "utmContent": "#2 IF"
          },
          {
            "utmSessionSource": "Paid Social",
            "isLast": true,
            "utmCampaign": "Instant Form  Campaign",
            "utmMedium": "Instant Form  Ad set",
            "utmCampaignId": "23858220349250527",
            "medium": "facebook",
            "mediumId": "822471972662770",
            "utmContent": "#2 IF"
          }
        ],
        "customFields": []
}