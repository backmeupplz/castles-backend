import 'module-alias/register'
import 'source-map-support/register'

import castlesContract from '@/helpers/castlesContract'
import { formatEther } from 'ethers'
import getUsername from '@/helpers/getUsername'
import castText from '@/helpers/castText'

void (async () => {
  console.log('Starting the listener...')
  castlesContract.on(castlesContract.filters.RoundStarted, async (roundId) => {
    const castString = `Round #${Number(roundId)} has begun! Will you support north or south?\n\nHelp defend the castles at castles.lol ⚔️`
    try {
      console.log('Casting:', castString)
      await castText(castString)
      console.log('Casted!')
    } catch (err) {
      console.error(
        `Failed to cast text for round ${Number(roundId)}:`,
        err instanceof Error ? err.message : err
      )
    }
  })
  castlesContract.on(
    castlesContract.filters.Withdrawn,
    async (roundId, defender, amount) => {
      let username = defender
      try {
        const user = await getUsername(defender)
        username =
          (!!user.farcaster?.usernames?.[0] &&
            `@${user.farcaster?.usernames?.[0]}`) ||
          user.primaryEns ||
          defender
      } catch (error) {
        console.error(
          `Failed to get username for ${defender}:`,
          error instanceof Error ? error.message : error
        )
      }
      const castString = `${username} withdrawn ${formatEther(amount)} ETH for round #${roundId}! Congrats on the booty 🌰\n\nHelp defend the castles at castles.lol in the next round ⚔️`
      console.log('Casting:', castString)
      try {
        await castText(castString)
        console.log('Casted!')
      } catch (error) {
        console.error(
          'Failed to cast text:',
          error instanceof Error ? error.message : error
        )
      }
    }
  )
  castlesContract.on(
    castlesContract.filters.Defended,
    async (roundId, defender, amount, castle) => {
      const ethString = formatEther(amount)
      const castleString = castle === 0n ? 'north' : 'south'

      const { northBalance, southBalance } =
        await castlesContract.getRound(roundId)

      let username = defender
      try {
        const user = await getUsername(defender)
        username =
          (!!user.farcaster?.usernames?.[0] &&
            `@${user.farcaster?.usernames?.[0]}`) ||
          user.primaryEns ||
          defender
      } catch (error) {
        console.error(
          `Failed to get username for ${defender}:`,
          error instanceof Error ? error.message : error
        )
      }

      const castString = `${username} defended ${castleString} castle with ${ethString} ETH in round #${roundId}. ${northBalance > southBalance ? 'North' : southBalance > northBalance ? 'South' : 'No'} castle is winning!\n\nHelp defend the castles at castles.lol ⚔️`
      console.log('Casting:', castString)
      try {
        await castText(castString)
        console.log('Casted!')
      } catch (error) {
        console.error(
          'Failed to cast text:',
          error instanceof Error ? error.message : error
        )
      }
    }
  )
  console.log('Listener started!')
})()
