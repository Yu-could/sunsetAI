const { chromium } = require('playwright')
const path = require('path')

;(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1080, height: 1920 })

  const htmlPath = path.resolve(__dirname, '夕阳智语_开发记录_第1期.html')
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'))

  await page.waitForTimeout(500)

  const outputPath = path.resolve(__dirname, '..', '抖音记录', '夕阳智语_开发记录_第1期.png')
  await page.screenshot({ path: outputPath, fullPage: false })

  console.log('Done: ' + outputPath)
  await browser.close()
})()
