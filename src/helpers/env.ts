import { cleanEnv, str } from 'envalid'
import * as dotenv from 'dotenv'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })
export default cleanEnv(process.env, {
  NEYNAR_SIGNER_UUID: str(),
  NEYNAR_API_KEY: str(),
  RPC: str(),
  CONTRACT_ADDRESS: str(),
})
