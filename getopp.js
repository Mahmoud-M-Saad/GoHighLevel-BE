const express = require('express');
const app = express();
const scope = [
    "contacts.readonly" , "contacts.write" 
]
app.get('/crm-webhook', (req, res) => {
        return res.redirect(`https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://geekyairgohighlevel.onrender.com/auth/test&client_id=65097ea78ef2c94808317db6-lmq7ce77&scope=${scope.join(' ')}`)  
    });
    app.get('auth/test',(req ,res)=>{
console.log(req.body);
res.json(req.body)
    })
    app.listen(3000, () => {
        console.log(`Server is listening on port 3000`);
    });