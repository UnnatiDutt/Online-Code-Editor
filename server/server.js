const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;
 
app.use(cors());
app.use(express.json());

function addBackslashBeforeQuotes(inputString) {
    // Use the replace() method with a regular expression to add the backslash before each double quotation mark
    const modifiedString = inputString.replace(/"/g, '\"');
    return modifiedString;
  }
 
app.post("/compile", (req, res) => {
    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;
 
    if (language === "python") {
        language = "python3";
      }
      if (language === "cpp") {
        language = "cpp17";
      }
      var program = {
        script : addBackslashBeforeQuotes(code),
        stdin : input,
        language: language,
        versionIndex: "0",
        clientId: "15e2d946bd4f3f28118bb006c8d6e609",
        clientSecret:"1af6be7be2f4a9a57c076ad4d4161a28c50cfe09cb203f7911752e77693263e1"
      };
    let config = {
        method: 'post',
        url: 'https://api.jdoodle.com/v1/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        json: program,
        data: program
    };
    //calling the code compilation API
    Axios(config)
        .then((response) => {
            res.send(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});