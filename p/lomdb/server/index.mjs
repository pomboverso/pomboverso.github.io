import fetchSpreadsheets from './tasks/fetchSpreadsheets.mjs'

import genNavbar from './tasks/genNavbar.mjs'

import parseServers from './tasks/parseServers.mjs'
import parsePlayers from './tasks/parsePlayers.mjs'
import parseLatestMerge from './tasks/parseLatestMerge.mjs'
import parseTimeline from './tasks/parseTimeline.mjs'

import generateMergesData from './tasks/genMergesData.mjs'
import generatePlayersData from './tasks/genPlayersData.mjs'
import genLvData from './tasks/genLvData.mjs'
import generateAgeData from './tasks/genAgeData.mjs'
import generateTimelineData from './tasks/genTimelineData.mjs'
import parse3DData from './tasks/parse3DData.mjs'

import generateMountsData from './tasks/genItemMountsData.mjs'
import generateAviansData from './tasks/genItemAviansData.mjs'
import generateArtifactsData from './tasks/genItemArtifactsData.mjs'
import generateBacksData from './tasks/genItemBackAccesoriesData.mjs'
import generateParkingDecorationsData from './tasks/genItemParkingDecorationsData.mjs'
import generatePalsData from './tasks/genItemPalsData.mjs'
import generateGuardiansData from './tasks/genItemGuardiansData.mjs'
import generateStarArrayData from './tasks/genItemStarArrayData.mjs'

// import generateMergesBlocksData from './tasks/genMergesBlocksData.mjs'
// import generatePlayersDuplicationData from './tasks/genDuplicationsData.mjs'
// import generateMergeGapsData from './tasks/genGapsData.mjs'

export default async function runIndex() {
  try {
    const files = await fetchSpreadsheets()
    console.log('All sheets downloaded:', files)
    
    parseServers()
    parsePlayers()
    parseLatestMerge()
    parseTimeline()
    parse3DData()

    generateMergesData()
    generatePlayersData()
    genLvData()
    generateAgeData()
    generateTimelineData()
    
    generateMountsData()
    generateArtifactsData()
    generateAviansData()
    generateBacksData()
    generatePalsData()
    generateParkingDecorationsData()
    generateGuardiansData()
    generateStarArrayData()

    // generateMergesBlocksData()
    // generateMergeGapsData()
    // generatePlayersDuplicationData()

    genNavbar()
  } catch (err) {
    console.error('Failed to download sheets:', err)
    process.exit(1)
  }

}
