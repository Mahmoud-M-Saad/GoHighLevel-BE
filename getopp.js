const express = require('express');
const app = express();
app.get('/gettingCode', (req, res) => {
    let code = req.query.code;
    console.log("Getting the code Successfully, the code is:"+code);
    res.status(200).json({msg: "Getting the code Successfully"});
});
app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});