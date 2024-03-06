import { CohereClient } from 'cohere-ai'

import { config } from 'dotenv'
config({ path: '.env' })

const cohere = new CohereClient({
  token: process.env.API_TOKEN_COHERE // This is your trial API key
})

export async function ColorAI () {
  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: 'create a 5 color palette for a ui, just give me the result in a json, without explanation just give me the colors,\nthe colors are a little light in tone, not including #FFFFFF and #000000\nGive me the result in this structure:\n [\n    "here goes the color in hex",\n    "here goes the color in hex",\n    "here goes the color in hex",\n    "here goes the color in hex",\n    "here goes the color in hex"\n]',
      maxTokens: 300,
      temperature: 0.9,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE'
    })

    const colors = await simplifyColor(response.generations[0].text)
    console.log(colors)
    return { error: false, message: 'successful request', colors }
  } catch (error) {
    console.log(error)
    return { error: true, message: 'There was a problem with the server.', colors: null }
  }
}

function simplifyColor (responseIA) {
  const colors = responseIA.split(/\n/).join().split('"').join().split(',,').slice(1, 10).join().split(',,')
  return colors
}
