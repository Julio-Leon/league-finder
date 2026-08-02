const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY
const OPENAI_MODEL = process.env.REACT_APP_OPENAI_MODEL || 'gpt-5.4-mini'

function buildAnalysisPrompt(analysisData) {
  return [
    'You are a League of Legends analyst.',
    'Turn the provided match analysis data into a clear, accurate, human-readable summary.',
    'Focus on the most important signals, explain what they mean, and avoid inventing facts that are not in the data.',
    'If the data is incomplete, state that plainly instead of guessing.',
    '',
    'Return the analysis in this structure:',
    '1. Overall assessment',
    '2. Key strengths',
    '3. Key weaknesses',
    '4. Actionable advice',
    '',
    'Analysis data:',
    JSON.stringify(analysisData, null, 2),
  ].join('\n')
}

function buildChatPrompt(analysisData, analysisText, conversation, userMessage) {
  const conversationText = Array.isArray(conversation)
    ? conversation
        .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
        .join('\n')
    : ''

  return [
    'You are a helpful League of Legends analyst continuing a conversation about a single match.',
    'Use the provided analysis context, the original raw match analysis data, and the prior conversation.',
    'Do not invent details that are not supported by the data or the previous messages.',
    'If the user asks something the data cannot answer, say that clearly.',
    'Keep the response human readable, practical, and concise.',
    '',
    'Existing human-readable analysis:',
    analysisText || '(none yet)',
    '',
    'Raw analysis data:',
    JSON.stringify(analysisData, null, 2),
    '',
    'Conversation so far:',
    conversationText || '(none)',
    '',
    'Latest user message:',
    userMessage,
  ].join('\n')
}

function extractOpenAIText(responseJson) {
  if (typeof responseJson?.output_text === 'string' && responseJson.output_text.trim()) {
    return responseJson.output_text.trim()
  }

  if (Array.isArray(responseJson?.output)) {
    const textChunks = []

    responseJson.output.forEach((item) => {
      if (!Array.isArray(item?.content)) {
        return
      }

      item.content.forEach((contentPart) => {
        if (typeof contentPart?.text === 'string') {
          textChunks.push(contentPart.text)
        }
      })
    })

    const combinedText = textChunks.join('\n').trim()
    if (combinedText) {
      return combinedText
    }
  }

  if (typeof responseJson?.choices?.[0]?.message?.content === 'string') {
    return responseJson.choices[0].message.content.trim()
  }

  return ''
}

export async function generateMatchAnalysis(analysisData, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key. Set REACT_APP_OPENAI_API_KEY before calling generateMatchAnalysis().')
  }

  if (!analysisData) {
    throw new Error('Missing analysis data.')
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || OPENAI_MODEL,
      input: buildAnalysisPrompt(analysisData),
      temperature: options.temperature ?? 0.2,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`OpenAI request failed with status ${response.status}: ${errorBody}`)
  }

  const responseJson = await response.json()
  const analysisText = extractOpenAIText(responseJson)

  if (!analysisText) {
    throw new Error('OpenAI returned an empty analysis response.')
  }

  return analysisText
}

export async function generateMatchAnalysisReply(analysisData, analysisText, conversation, userMessage, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key. Set REACT_APP_OPENAI_API_KEY before calling generateMatchAnalysisReply().')
  }

  if (!analysisData) {
    throw new Error('Missing analysis data.')
  }

  if (!userMessage || !userMessage.trim()) {
    throw new Error('Missing chat message.')
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || OPENAI_MODEL,
      input: buildChatPrompt(analysisData, analysisText, conversation, userMessage.trim()),
      temperature: options.temperature ?? 0.3,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`OpenAI request failed with status ${response.status}: ${errorBody}`)
  }

  const responseJson = await response.json()
  const replyText = extractOpenAIText(responseJson)

  if (!replyText) {
    throw new Error('OpenAI returned an empty chat response.')
  }

  return replyText
}

export { buildAnalysisPrompt, buildChatPrompt, extractOpenAIText }