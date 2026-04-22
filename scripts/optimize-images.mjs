import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "app", "assets", "pumps");
const outputRoot = path.join(projectRoot, "public", "assets");
const manifestPath = path.join(projectRoot, "scripts", "image-manifest.json");

const imageMap = [
  {
    source: "Berlington-Pumps-Set.png",
    folder: "hero",
    output: "berlington-industrial-pumps-showcase-bangalore.webp",
    profile: "hero",
  },
  {
    source: "Pumps-heros.png",
    folder: "hero",
    output: "berlington-industrial-pumps-hero-bangalore.webp",
    profile: "hero",
  },
  {
    source: "factory-outlet.png",
    folder: "facility",
    output: "berlington-pumps-manufacturing-facility.webp",
    profile: "facility",
  },
  {
    source: "manufacture-process.png",
    folder: "facility",
    output: "berlington-pump-manufacturing-process.webp",
    profile: "facility",
  },
  {
    source: "cdl-cdlf.png",
    folder: "pumps",
    output: "berlington-cdl-cdlf-vertical-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "cdlf-cdh.png",
    folder: "pumps",
    output: "berlington-cdlf-cdh-high-pressure-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "cdlk-cdlkf.png",
    folder: "pumps",
    output: "berlington-cdlk-cdlkf-vertical-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "chl.png",
    folder: "pumps",
    output: "berlington-chl-horizontal-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "chlf-chlf-t.png",
    folder: "pumps",
    output: "berlington-chlf-chlf-t-horizontal-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "chm.png",
    folder: "pumps",
    output: "berlington-chm-horizontal-multistage-pump.webp",
    profile: "product",
  },
  {
    source: "wq.png",
    folder: "pumps",
    output: "berlington-wq-submersible-sewage-pump.webp",
    profile: "product",
  },
  {
    source: "hydro.png",
    folder: "pumps",
    output: "berlington-hydro-variable-speed-booster-pump.webp",
    profile: "product",
  },
  {
    source: "mini.png",
    folder: "pumps",
    output: "berlington-mini-single-booster-pump.webp",
    profile: "product",
  },
  {
    source: "bt.png",
    folder: "pumps",
    output: "berlington-bt-side-channel-blower.webp",
    profile: "product",
  },
  {
    source: "qy-b.png",
    folder: "pumps",
    output: "berlington-qy-b-self-priming-mixing-pump.webp",
    profile: "product",
  },
  {
    source: "sz.png",
    folder: "pumps",
    output: "berlington-sz-fluorine-chemical-pump.webp",
    profile: "product",
  },
  {
    source: "zs.png",
    folder: "pumps",
    output: "berlington-zs-single-stage-centrifugal-pump.webp",
    profile: "product",
  },
  {
    source: "stp.png",
    folder: "pumps",
    output: "berlington-stp-single-stage-pump.webp",
    profile: "product",
  },
  {
    source: "niso.png",
    folder: "pumps",
    output: "berlington-niso-end-suction-centrifugal-pump.webp",
    profile: "product",
  },
  {
    source: "ld.png",
    folder: "pumps",
    output: "berlington-ld-vertical-inline-circulation-pump.webp",
    profile: "product",
  },
];

const profiles = {
  hero: {
    quality: 74,
    effort: 6,
  },
  facility: {
    quality: 76,
    effort: 6,
  },
  product: {
    quality: 80,
    effort: 6,
  },
};

async function ensureDirectories() {
  const folders = ["hero", "facility", "pumps"];
  await Promise.all(
    folders.map((folder) =>
      fs.mkdir(path.join(outputRoot, folder), { recursive: true })
    )
  );
}

async function convertImage(entry) {
  const sourcePath = path.join(sourceDir, entry.source);
  const outputPath = path.join(outputRoot, entry.folder, entry.output);
  const profile = profiles[entry.profile];

  const inputBuffer = await fs.readFile(sourcePath);
  const metadata = await sharp(inputBuffer).metadata();

  await sharp(inputBuffer)
    .rotate()
    .webp({
      quality: profile.quality,
      effort: profile.effort,
    })
    .toFile(outputPath);

  const outputStats = await fs.stat(outputPath);

  return {
    source: `app/assets/pumps/${entry.source}`,
    output: `public/assets/${entry.folder}/${entry.output}`,
    publicPath: `/assets/${entry.folder}/${entry.output}`,
    profile: entry.profile,
    width: metadata.width ?? null,
    height: metadata.height ?? null,
    originalBytes: inputBuffer.byteLength,
    optimizedBytes: outputStats.size,
  };
}

async function main() {
  await ensureDirectories();

  const manifest = [];

  for (const entry of imageMap) {
    manifest.push(await convertImage(entry));
  }

  await fs.writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        assets: manifest,
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  const summary = manifest
    .map(
      (asset) =>
        `${asset.source} -> ${asset.output} (${asset.originalBytes} -> ${asset.optimizedBytes} bytes)`
    )
    .join("\n");

  console.log(summary);
  console.log(`\nManifest written to ${path.relative(projectRoot, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
