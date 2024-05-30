import axios from 'axios'

export default async function (address: string) {
  const {
    data: { data },
  } = await axios.get(
    `https://farcaster-data.vercel.app/api/wallet-info?address=${address}`
  )
  return data as {
    farcaster?: {
      usernames?: string[]
    }
    primaryEns?: string
  }
}
