const { chromium } = require('playwright')
const path = require('path')

const htmlFile = process.argv[2] || '夕阳智语_开发记录_第1期.html'
const outputFile = process.argv[3] || htmlFile.replace('.html', '.png')

;(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1080, height: 1920 })

  const htmlPath = path.resolve(__dirname, htmlFile)
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'))
  await page.waitForTimeout(500)

  const outputPath = path.resolve(__dirname, '..', '抖音记录', outputFile)
  await page.screenshot({ path: outputPath, fullPage: false })

  console.log('Done: ' + outputPath)
  await browser.close()
})()
