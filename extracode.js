const scope = ["contacts.readonly","contacts.write","opportunities.readonly","opportunities.write","locations.write","locations.readonly"];
const clientId = "65097ea78ef2c94808317db6-lmrollec"
app.get('/sendredirect', (req, res) => {
    return res.redirect('https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://geekyairgohighlevel.onrender.com/auth/test&'+'client_id=65097ea78ef2c94808317db6-lmrollec&'+'scope=contacts.readonly+contacts.write+opportunities.readonly+opportunities.write+locations.write+locations.readonly');

});