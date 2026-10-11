import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const width = 1920
  const height = 1080
  await page.setViewport({ width, height })

  await page.goto(`file://${path.resolve('./puppet.html')}`)

  const fps = 30
  const duration = 5 // seconds
  const totalFrames = fps * duration

  // Ensure the directory exists
  fs.mkdirSync('frames', { recursive: true })

  // Record the start time (in the page context)
  await page.evaluate(() => {
    window._startTime = performance.now()
  })

  for (let i = 0; i < totalFrames; i++) {
    const frameNumber = String(i).padStart(4, '0')
    await page.screenshot({
      path: `frames/frame${frameNumber}.png`,
    })

    // Wait until the next frame time in page context
    await page.evaluate(
      async (nextFrameMs) => {
        const target = window._startTime + nextFrameMs
        while (performance.now() < target) {
          await new Promise(requestAnimationFrame)
        }
      },
      (i + 1) * (1000 / fps)
    )
  }

  await browser.close()
})()
