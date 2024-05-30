import { Castles__factory } from 'castles-contract'
import env from '@/helpers/env'
import provider from '@/helpers/provider'

export default Castles__factory.connect(env.CONTRACT_ADDRESS, provider)
