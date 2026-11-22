/**
 * Builds coded concept screenshots and composites them onto photographic scenes.
 *
 * Run: node scripts/build-concept-assets.mjs
 * Optional ONLY=big-beerah-collection,amzlat-world-of-beauty rebuilds those ids only.
 *
 * Scene masters already live in src/assets/concepts/<id>/scene-cover.jpg and scene-detail.jpg.
 * Those files are the photographic sources. cover.webp and detail-hero.webp are composites,
 * not native-resolution photographs.
 *
 * Set SCENE_DIR only when importing a new set of scene masters. It must contain
 * <prefix>-cover-scene.jpg and <prefix>-detail-scene.jpg (see sceneName below).
 * Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH when Playwright's downloaded browser is not on the default path.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sceneDir = process.env.SCENE_DIR || '';
const previewDir = path.join(root, 'scripts/concept-previews');
const outRoot = path.join(root, 'src/assets/concepts');

const shell = (css, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  *{box-sizing:border-box}html,body{margin:0;height:100%;overflow:hidden}
  body{font-family:"Segoe UI",Inter,sans-serif;color:#1c1916}
  button{font:inherit}button:disabled{cursor:not-allowed}
  img{max-width:100%}
  ${css}
</style></head><body>${body}</body></html>`;

const screens = {
  'maison-vale-studios': shell(
    `
    body{background:#f6f1e8;color:#2c241c}
    header,main{padding:0 48px}
    header{display:flex;justify-content:space-between;align-items:center;height:84px}
    .brand{font-family:Georgia,serif;font-size:22px}
    nav{display:flex;gap:22px;font-size:14px}
    .hero{display:grid;grid-template-columns:1.1fr .9fr;gap:36px;align-items:center;height:calc(100% - 84px)}
    h1{font-family:Georgia,serif;font-weight:500;font-size:64px;line-height:.95;margin:0 0 16px}
    p{font-size:18px;line-height:1.5;max-width:36rem;margin:0}
    .rooms{display:grid;gap:12px}
    .room{border-radius:18px;min-height:150px;padding:18px;color:#f6f1e8;display:flex;align-items:flex-end;font-family:Georgia,serif;font-size:22px}
    .a{background:linear-gradient(160deg,#cbb89a,#6b4a32)}
    .b{background:linear-gradient(160deg,#8d947c,#3e4634)}
    .c{background:linear-gradient(160deg,#d9cfc2,#5c5348)}
    @media(max-width:700px){
      header,main{padding:0 20px}
      header{height:68px}
      nav{display:none}
      .hero{grid-template-columns:1fr;gap:18px;align-content:start;padding-top:12px}
      h1{font-size:40px}
      p{font-size:16px}
      .room{min-height:92px}
    }`,
    `<header><div class="brand">Maison Vale Studios</div><nav><span>Projects</span><span>Materials</span><span>Enquire</span></nav></header>
     <main class="hero"><div><h1>Thoughtful interior spaces</h1><p>Residential, hospitality and commercial studies. A concept website for a fictional studio.</p></div>
     <div class="rooms"><div class="room a">Residential</div><div class="room b">Hospitality</div><div class="room c">Commercial</div></div></main>`,
  ),
  'aura-clothing': shell(
    `
    body{background:#111;color:#f7f3ee}
    header{display:flex;justify-content:space-between;align-items:center;height:80px;padding:0 40px;letter-spacing:.18em}
    .brand{font-size:20px}
    .hero{padding:10px 40px 32px;height:calc(100% - 80px);display:grid;grid-template-rows:auto 1fr;gap:24px}
    h1{font-weight:500;font-size:72px;line-height:.9;margin:0}
    .cats{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:12px}
    .cat{border:1px solid #3a342c;border-radius:20px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;background:#191714}
    .cat strong{font-size:28px;font-weight:500}
    .cat span{color:#cdb89a}
    .wide{background:linear-gradient(180deg,#2a241c,#111)}
    @media(max-width:700px){
      header{padding:0 18px}
      .hero{padding:8px 18px 18px}
      h1{font-size:42px}
      .cats{grid-template-columns:1fr;gap:10px}
      .cat{min-height:110px}
    }`,
    `<header><div class="brand">AURA</div><div>CLOTHING</div></header>
     <main class="hero"><h1>The edit, not the pile.</h1>
     <div class="cats"><article class="cat wide"><span>01</span><strong>Tailoring</strong></article><article class="cat"><span>02</span><strong>Ready to wear</strong></article><article class="cat"><span>03</span><strong>Accessories</strong></article></div></main>`,
  ),
  'flowdesk-os': shell(
    `
    body{background:#f4f7fb;color:#1c2430;display:grid;grid-template-columns:220px 1fr}
    aside{background:#1c2430;color:#f4f7fb;padding:28px 20px}
    aside b{display:block;margin-bottom:28px}
    aside div{padding:10px 0;color:#b7c4d4}
    aside .on{color:#fff}
    main{padding:28px}
    h1{margin:0 0 6px;font-size:28px}
    .note{color:#5c6b7c;margin:0 0 18px}
    .cols{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;height:calc(100% - 90px)}
    .col{background:#fff;border-radius:16px;padding:14px;border:1px solid #e1e8f0}
    .col h2{font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 12px;color:#3e7c78}
    .card{background:#f4f7fb;border-radius:12px;padding:12px;margin-bottom:8px}
    @media(max-width:700px){
      body{grid-template-columns:1fr}
      aside{display:flex;gap:14px;align-items:center;padding:16px}
      aside b{margin:0}
      main{padding:16px}
      .cols{grid-template-columns:1fr;height:auto}
    }`,
    `<aside><b>FlowDesk OS</b><div class="on">Board</div><div>Notes</div><div>Sample only</div></aside>
     <main><h1>Work in order</h1><p class="note">Sample tasks. No revenue, customers or live records.</p>
     <div class="cols"><section class="col"><h2>Now</h2><div class="card">Draft the scope note</div><div class="card">Review the layout</div></section>
     <section class="col"><h2>Next</h2><div class="card">Confirm the fields</div></section>
     <section class="col"><h2>Later</h2><div class="card">Write the handover</div></section></div></main>`,
  ),
  'campusone-portal': shell(
    `
    body{background:#f4f7fb;color:#12315c}
    header{height:72px;display:flex;justify-content:space-between;align-items:center;padding:0 36px;background:#12315c;color:#f4f7fb}
    main{padding:28px 36px}
    .banner{background:#12315c;color:#f4f7fb;border-radius:20px;padding:28px;display:flex;justify-content:space-between;gap:20px}
    h1{margin:0 0 8px;font-size:36px}
    .mods{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
    .mod{background:#fff;border-radius:16px;padding:18px;border-top:4px solid #c4a15a}
    .fine{font-size:13px;color:#5d7190}
    @media(max-width:700px){
      header{padding:0 16px}
      main{padding:16px}
      .banner{display:block}
      h1{font-size:30px}
      .mods{grid-template-columns:1fr}
    }`,
    `<header><strong>CampusOne Portal</strong><span>Sample home</span></header>
     <main><section class="banner"><div><p class="fine">SAMPLE MODULE · NOT A REAL INSTITUTION</p><h1>Studio practice</h1><p>Open the next reading. Nothing here is an enrolment record.</p></div></section>
     <div class="mods"><article class="mod"><h2>Writing</h2><p class="fine">Sample area</p></article><article class="mod"><h2>Systems</h2><p class="fine">Sample area</p></article><article class="mod"><h2>Seminar</h2><p class="fine">Sample area</p></article></div></main>`,
  ),
  'bloom-wellness-studio': shell(
    `
    body{background:#f7f3ec;color:#3e5c45}
    header{height:76px;display:flex;justify-content:space-between;align-items:center;padding:0 36px}
    .brand{font-family:Georgia,serif;font-size:24px}
    main{padding:8px 36px 28px;display:grid;grid-template-columns:1.1fr .9fr;gap:28px}
    h1{font-family:Georgia,serif;font-weight:500;font-size:54px;line-height:.95;margin:0 0 12px}
    .visits{display:grid;gap:10px}
    .visit{background:#fff;border-radius:16px;padding:16px 18px;display:flex;justify-content:space-between}
    button{background:#8c5a45;color:#fff;border:0;border-radius:999px;padding:14px 18px}
    .warn{font-size:13px;color:#6d5348}
    @media(max-width:700px){
      header,main{padding-left:16px;padding-right:16px}
      main{grid-template-columns:1fr;gap:16px}
      h1{font-size:38px}
    }`,
    `<header><div class="brand">Bloom Wellness Studio</div><span>Concept</span></header>
     <main><div><h1>Ask for a time. Nothing is booked.</h1><p>Movement, rest and recovery, described for a fictional studio.</p><p class="warn">This control does not create an appointment.</p><button type="button" disabled>Request a time</button></div>
     <div class="visits"><article class="visit"><strong>Movement</strong><span>Studio visit</span></article><article class="visit"><strong>Rest</strong><span>Quiet room</span></article><article class="visit"><strong>Recovery</strong><span>Follow-up visit</span></article></div></main>`,
  ),
  'routepilot-logistics': shell(
    `
    body{background:#e8eef2;color:#1c2b3a}
    header{height:72px;background:#1c2b3a;color:#e8eef2;display:flex;justify-content:space-between;align-items:center;padding:0 28px}
    main{padding:22px 28px}
    h1{margin:0 0 4px}
    .note{margin:0 0 16px;color:#4d5d6c}
    table{width:100%;border-collapse:collapse;background:#fff;border-radius:16px;overflow:hidden}
    th,td{text-align:left;padding:14px 16px;border-bottom:1px solid #e8eef2}
    .amber{color:#9a6414;font-weight:700}
    @media(max-width:700px){
      header{padding:0 14px}
      main{padding:14px}
      th:nth-child(3),td:nth-child(3){display:none}
    }`,
    `<header><strong>RoutePilot</strong><span>Sample board</span></header>
     <main><h1>Lanes</h1><p class="note">Illustrative lanes. Not live shipments and not a delivery promise.</p>
     <table><thead><tr><th>Lane</th><th>Status</th><th>Note</th></tr></thead><tbody>
     <tr><td>North</td><td class="amber">Preparing</td><td>Sample only</td></tr>
     <tr><td>East</td><td>Moving</td><td>Sample only</td></tr>
     <tr><td>Yard</td><td>Arrived</td><td>Sample only</td></tr>
     </tbody></table></main>`,
  ),
  'big-beerah-collection': shell(
    `
    body{background:#fbf6f2;color:#6e2438}
    header{height:78px;display:flex;justify-content:space-between;align-items:center;padding:0 32px}
    .brand{font-family:Georgia,serif;font-size:26px}
    main{padding:8px 32px 24px}
    h1{font-family:Georgia,serif;font-weight:500;font-size:48px;margin:0 0 8px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px}
    .item{background:#fff;border-radius:18px;min-height:150px;padding:16px;display:flex;align-items:flex-end;border-bottom:4px solid #c4a265}
    .item:nth-child(odd){background:#f4d6d8}
    @media(max-width:700px){
      header{padding:0 16px}
      main{padding:8px 16px}
      h1{font-size:34px}
      .grid{grid-template-columns:1fr 1fr;gap:8px}
      .item{min-height:96px}
    }`,
    `<header><div class="brand">Big Beerah Collection</div><span>Shop by category</span></header>
     <main><h1>Modest fashion and accessories.</h1><p>Hijabs, abayas, scarves, fabrics and accessories for everyday elegance.</p>
     <div class="grid"><article class="item">Hijabs</article><article class="item">Abayas</article><article class="item">Jersey scarves</article><article class="item">Necklaces</article><article class="item">Fabrics</article><article class="item">Ready to wear</article><article class="item">Gift boxes</article><article class="item">Everyday essentials</article></div></main>`,
  ),
  'amzlat-world-of-beauty': shell(
    `
    body{background:#fff8f3;color:#161616}
    header{height:76px;display:flex;justify-content:space-between;align-items:center;padding:0 32px;background:#161616;color:#fff8f3}
    main{padding:28px 32px;display:grid;grid-template-columns:1fr 1fr;gap:18px;height:calc(100% - 76px)}
    h1{font-size:46px;line-height:.95;margin:0 0 10px}
    .gold{color:#c6a15b}
    .tiles{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
    .tile{border-radius:18px;min-height:150px;padding:16px;display:flex;align-items:flex-end;font-size:18px}
    .p{background:#f3d5e0}.c{background:#fff;border:1px solid #f3d5e0}.b{background:#161616;color:#fff8f3}.g{background:#c6a15b}.s{background:#f7e7ef}.n{background:#2a2420;color:#fff8f3}
    @media(max-width:700px){
      header{padding:0 16px;height:auto;min-height:64px}
      main{padding:16px;grid-template-columns:1fr;height:auto}
      h1{font-size:34px}
      .tile{min-height:88px}
    }`,
    `<header><strong>Amzlat World of Beauty</strong><span class="gold">Concept project</span></header>
     <main><div><h1>Beauty, hair and fashion.</h1><p>Uncommissioned concept. No prices, addresses or contact details.</p></div>
     <div class="tiles"><div class="tile p">Makeup</div><div class="tile c">Skincare</div><div class="tile b">Hair</div><div class="tile g">Fashion</div><div class="tile s">Body care</div><div class="tile n">Manicure and pedicure</div></div></main>`,
  ),
  'opeyemi-phones-gadgets': shell(
    `
    body{background:#fff;color:#101b3a;display:flex;flex-direction:column}
    .bar{background:#0a215f;color:#fff;font-size:12px;text-align:center;padding:8px 12px}
    header{height:74px;display:flex;justify-content:space-between;align-items:center;padding:0 28px;border-bottom:1px solid #dde5f6}
    .logo{display:flex;gap:10px;align-items:center;font-weight:800}
    .mark{width:36px;height:36px;border:3px solid #123cc9;color:#123cc9;border-radius:50%;display:grid;place-items:center;font-family:Georgia,serif}
    .wa{background:#079344;color:#fff;border:0;border-radius:999px;padding:12px 16px;opacity:.55}
    .hero{background:linear-gradient(110deg,#072eaf,#0d2b79);color:#fff;padding:28px;display:grid;grid-template-columns:1fr;gap:16px}
    .benefits{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:16px 28px;background:#f5f7fc}
    .benefit{background:#fff;border:1px solid #dde5f6;border-radius:14px;padding:12px;font-size:13px}
    .swap{background:#092975;color:#fff;display:flex;justify-content:space-between;gap:16px;align-items:center;padding:22px 28px}
    .swap p{margin:6px 0 0;color:#d5e2ff}
    h1{font-size:48px;line-height:1;margin:8px 0}
    .chip{font-size:13px}
    .devices{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .d{background:#e8eefc;color:#101b3a;border-radius:16px;padding:16px;min-height:140px}
    @media(max-width:700px){
      header{padding:0 14px}
      .hero{grid-template-columns:1fr;padding:22px 14px}
      h1{font-size:34px}
      .devices{grid-template-columns:1fr}
      .d{min-height:72px}
      .benefits{grid-template-columns:1fr 1fr}
      .swap{display:block;padding:16px}
    }`,
    `<div class="bar">CONCEPT PROJECT · Illustrative devices · Not a live store</div>
     <header><div class="logo"><span class="mark">G</span><span>Opeyemi<br>Phones &amp; Gadgets</span></div><button class="wa" type="button" disabled>WhatsApp enquiry</button></header>
     <section class="hero"><div><div class="chip">Phones · MacBooks · Watches</div><h1>Quality gadgets. Simple shopping.</h1><p>Browse device types, then ask. Buy, sell and swap stay as enquiries. No price and no warranty is shown.</p></div>
     <div class="devices"><article class="d"><strong>iPhones</strong><p>Sample phone category</p></article><article class="d"><strong>MacBooks</strong><p>Sample laptop category</p></article><article class="d"><strong>Apple Watches</strong><p>Sample watch category</p></article></div></section>
     <section class="benefits"><article class="benefit"><strong>Clear details</strong><p>Compare type and condition. No live stock.</p></article><article class="benefit"><strong>Enquire first</strong><p>No checkout in this concept.</p></article><article class="benefit"><strong>Buy, sell, swap</strong><p>Separate paths. No valuation.</p></article><article class="benefit"><strong>WhatsApp</strong><p>The green control is disabled.</p></article></section>
     <section class="swap"><div><strong>Buy, sell and swap</strong><p>Describe a device. No valuation and no transaction happens in this concept.</p></div><span>01 Current device · 02 Condition · 03 Enquiry</span></section>`,
  ),
  'corporate-digital-modernization': shell(
    `
    body{background:#f3f1ec;color:#1e2421}
    header{height:76px;display:flex;justify-content:space-between;align-items:center;padding:0 36px}
    main{display:grid;grid-template-columns:1.15fr .85fr;min-height:calc(100% - 76px)}
    .copy{padding:36px}
    h1{font-size:46px;line-height:1;margin:0 0 12px}
    .panel{background:#1f4d3a;color:#f3f1ec;padding:36px;display:grid;align-content:end;gap:14px}
    .step{border-top:1px solid #8fbfa8;padding-top:10px}
    @media(max-width:700px){
      header{padding:0 16px}
      main{grid-template-columns:1fr}
      .copy,.panel{padding:18px}
      h1{font-size:32px}
    }`,
    `<header><strong>Organisation</strong><span>Concept company site</span></header>
     <main><div class="copy"><p>CORPORATE WEBSITE</p><h1>A clearer site for a modern organisation.</h1><p>Review what the current site fails to explain. Redesign the path. Support it after launch when support is agreed. No awards and no performance figures.</p></div>
     <div class="panel"><div class="step"><strong>01 Review</strong><p>What the current site makes difficult.</p></div><div class="step"><strong>02 Redesign</strong><p>Pages people can use on a phone.</p></div><div class="step"><strong>03 Support</strong><p>Only when a support scope is agreed.</p></div></div></main>`,
  ),
};

function svgRound(w, h, r) {
  return Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
}

async function deviceFrame(uiPath, innerW, innerH, bezel, radius) {
  const inner = await sharp(uiPath)
    .resize(innerW, innerH, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();
  const w = innerW + bezel * 2;
  const h = innerH + bezel * 2;
  const plate = await sharp({
    create: { width: w, height: h, channels: 4, background: { r: 22, g: 22, b: 24, alpha: 1 } },
  })
    .composite([{ input: inner, left: bezel, top: bezel }])
    .png()
    .toBuffer();
  const masked = await sharp(plate)
    .composite([{ input: svgRound(w, h, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { buffer: masked, width: w, height: h };
}

async function compose(scenePath, frame, width, height, left, top, dest) {
  const background = await sharp(scenePath)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.92 })
    .png()
    .toBuffer();
  await sharp(background)
    .composite([{ input: frame.buffer, left, top }])
    .webp({ quality: 82 })
    .toFile(dest);
}

const sceneName = {
  'maison-vale-studios': 'maison-vale',
  'aura-clothing': 'aura',
  'flowdesk-os': 'flowdesk',
  'campusone-portal': 'campusone',
  'bloom-wellness-studio': 'bloom',
  'routepilot-logistics': 'routepilot',
  'big-beerah-collection': 'big-beerah',
  'amzlat-world-of-beauty': 'amzlat',
  'opeyemi-phones-gadgets': 'opeyemi',
  'corporate-digital-modernization': 'corporate',
};

const only = new Set(
  (process.env.ONLY ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean),
);
const ids = Object.keys(screens).filter((id) => only.size === 0 || only.has(id));
if (ids.length === 0) throw new Error('ONLY did not match any concept id.');

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
const page = await browser.newPage({ deviceScaleFactor: 1 });
await mkdir(previewDir, { recursive: true });

for (const id of ids) {
  const htmlPath = path.join(previewDir, `${id}.html`);
  await writeFile(htmlPath, screens[id]);
  const dir = path.join(outRoot, id);
  await mkdir(dir, { recursive: true });
  const localCover = path.join(dir, 'scene-cover.jpg');
  const localDetail = path.join(dir, 'scene-detail.jpg');
  if (sceneDir) {
    const prefix = sceneName[id];
    await copyFile(path.join(sceneDir, `${prefix}-cover-scene.jpg`), localCover);
    await copyFile(path.join(sceneDir, `${prefix}-detail-scene.jpg`), localDetail);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pathToFileURL(htmlPath).href);
  const desktop = path.join(dir, 'desktop-ui.png');
  await page.screenshot({ path: desktop });
  await sharp(desktop).webp({ quality: 82 }).toFile(path.join(dir, 'desktop-ui.webp'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(pathToFileURL(htmlPath).href);
  const mobile = path.join(dir, 'mobile-ui.png');
  await page.screenshot({ path: mobile });
  await sharp(mobile).webp({ quality: 82 }).toFile(path.join(dir, 'mobile-ui.webp'));

  const desk = await deviceFrame(desktop, 860, 538, 16, 18);
  await compose(
    localCover,
    desk,
    1600,
    1067,
    1600 - desk.width - 72,
    Math.round((1067 - desk.height) / 2),
    path.join(dir, 'cover.webp'),
  );
  const phone = await deviceFrame(mobile, 280, 520, 12, 28);
  await compose(
    localDetail,
    phone,
    1920,
    1080,
    1920 - phone.width - 96,
    Math.round((1080 - phone.height) / 2),
    path.join(dir, 'detail-hero.webp'),
  );
}

await browser.close();

if (only.size === 0) {
  const og = path.join(root, 'public/assets/work-og.jpg');
  await sharp(path.join(outRoot, 'corporate-digital-modernization/scene-cover.jpg'))
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(og);
  console.log(`Wrote concept assets for ${ids.length} projects and ${og}`);
} else {
  console.log(`Updated concept assets for ${ids.join(', ')}`);
}
