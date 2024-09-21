import axios from 'axios'

export default function translateText(text, targetLang) {
  try {
    const response = axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text'
    })
    return response.data.translatedText

  } catch (error) {
    
    console.error('Error translating text:', error);

  }
}