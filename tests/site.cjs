// Start a static server, then run with PLAYWRIGHT_MODULE and optional PLAYWRIGHT_CHANNEL.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:8771';
(async()=>{
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
const errors=[];
const expected=JSON.parse(fs.readFileSync(path.join(__dirname,'life-keywords.json'),'utf8'));
for(const width of [1440,768,390]){
 const page=await browser.newPage({viewport:{width,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());
 await page.goto(base + '/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('iframe').count(),0);
 assert.deepEqual(await page.locator('.life-keywords li span').allTextContents(),expected);
 assert.equal(await page.locator('main > section').last().getAttribute('id'),'life');
 assert.equal(await page.locator('.life-keywords a,.life-keywords button').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:`/private/tmp/amitrathore-home-${width}.png`});
 await page.locator('#consciousness').scrollIntoViewIfNeeded();
 await page.screenshot({path:`/private/tmp/amitrathore-consciousness-${width}.png`});
 await page.locator('#life').scrollIntoViewIfNeeded();
 await page.screenshot({path:`/private/tmp/amitrathore-life-${width}.png`});
 await page.goto(base + '/#bio',{waitUntil:'networkidle'});
 assert.equal(await page.locator('#bio').getAttribute('open'),'');
 assert.ok((await page.locator('#bio').textContent()).includes('Awake Market'));
 assert.ok((await page.locator('#bio').textContent()).includes('Shoptype was spun out'));
 await page.goto(base + '/#amitgpt',{waitUntil:'networkidle'});
 assert.equal(await page.locator('#amitavatar a').getAttribute('href'),'https://amitavatar.com');
 await page.goto(base + '/#does-not-exist');
 assert.ok(await page.locator('h1').isVisible());
 await page.locator('#patents summary').click();
 assert.ok((await page.locator('#patents').textContent()).includes('Notice of allowance mailed June 2, 2026'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 console.log('PASS responsive essay, all 65 keywords, no iframe, legacy hashes, chronology and patent dates:',width);
 await page.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce'});
await nojs.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());
await nojs.goto(base + '/',{waitUntil:'networkidle'});
assert.ok(await nojs.locator('#making').isVisible());assert.ok(await nojs.locator('#life').isVisible());
await nojs.locator('#bio > summary').click();assert.equal(await nojs.locator('#bio').getAttribute('open'),'');
await nojs.close();
assert.deepEqual(errors,[]);await browser.close();console.log('PASS JavaScript-disabled reading; no page errors.');
})().catch(e=>{console.error(e);process.exit(1)});
