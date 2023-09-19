const express = require('express');
const app = express();
app.get('/crm-webhook', (req, res) => {
        return res.redirect('https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000&client_id=65097ea78ef2c94808317db6-lmq7ce77&scope=contact.readonly')  
    });
    app.listen(3000, () => {
        console.log(`Server is listening on port 3000`);
    });