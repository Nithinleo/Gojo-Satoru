//require('dotenv').config()
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const removebgAPI = 'CUdjce7whoNi7XwjMkFBpH4q';
module.exports.getRemoveBg = async (Path) => {
    const inputPath = `./${Path}`;
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
    await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
            ...formData.getHeaders(),
            'X-Api-Key': removebgAPI,
        },
        encoding: null
    }).then((response) => {
        if (response.status != 200) return console.log("error");
        fs.writeFileSync("./bg.png", response.data);
        console.log("DONE");
    }).catch((error) => {
        return console.log("Error change api key");
    });
}
