import fetch from 'node-fetch'
import env from '@/helpers/env'

const url = 'https://api.neynar.com/v2/farcaster/cast'

export default function castText(text: string) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      text,
      signer_uuid: env.NEYNAR_SIGNER_UUID,
      channel_id: 'castles',
    }),
  }

  return fetch(url, options).then((res) => res.json())
}
