//server.js

const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
dotenv.config()
// Middleware to parse JSON requests
app.use(express.json());



async function getResponseFromChatGPT(req, res, next) {

    const prompt = req.body.text

    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(apiUrl, {
            model: 'gpt-3.5-turbo-0125', //can change models
            messages: [{ role: "system", content: prompt }],
            max_tokens: 500 // Adjust as needed
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return res.status(200).json({ success: true, message: 'Successfully generated response', data: response.data.choices[0].message.content });
    }
    catch (error) {
        // console.error('Error:', error.response);
        return res.status(500).json({ success: false, error: error })
    }
}



//route
app.post('/generate', getResponseFromChatGPT)



// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// ROSHAN = mesage 


// message = roshan