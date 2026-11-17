const source = (file) => new URL(`../../fonts/${file}`, import.meta.url).href;

const font = new FontFace(
	"icomoon",
	`url(${source("icomoon.woff")}) format("woff"), url(${source("icomoon.ttf")}) format("truetype")`,
	{ style: "normal", weight: "normal" }
);

document.fonts.add(font);

export const iconsReady = font.load().catch(() => {});
