const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");


// Gemini

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// Groq

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



// Gemini Function

const askGemini = async(prompt)=>{


const response = await gemini.models.generateContent({

model:"gemini-2.0-flash",

contents:prompt,

});


return response.text;

};



// Groq Llama Function

const askLlama = async(prompt)=>{


const completion =
await groq.chat.completions.create({

model:
"llama-3.3-70b-versatile",


messages:[

{
role:"user",
content:prompt
}

],


});


return completion.choices[0].message.content;


};




// Main AI Function

const askAI = async(message,products)=>{


const prompt = `

You are an AI shopping assistant
for a handmade marketplace.


Customer:

${message}


Products:

${JSON.stringify(products)}


Recommend products only from the list.
Keep answers short and friendly.

`;



// Try Gemini first

try{

console.log("Trying Gemini...");

return await askGemini(prompt);


}

catch(error){


console.log(
"Gemini failed, switching to Llama..."
);


}



// Fallback to Llama

try{


console.log("Using Groq Llama...");


return await askLlama(prompt);


}

catch(error){


console.log(
"Llama also failed"
);


throw error;


}


};



module.exports={
askAI
};