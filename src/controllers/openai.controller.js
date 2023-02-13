
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
})
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  
  try {
    let response = await openai.createImage({
      prompt: 'user webpage avatar image',
      n: 1,
      size: '256x256'
    })
    let imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl
    })    
  } catch (error) {    
    res.status(400).json({
      success: false,
      msg: 'The image could not be generated'
    })    
  }

}

module.exports = { generateImage }