export const asset = (path) => new URL(`../img/${path}`, import.meta.url).href;

export const pad = (number) => String(number).padStart(2, "0");

export const SKINS = 3;
export const BACKGROUNDS = 3;

export const PARTS = ["skin", "hair", "eyes", "nose", "mouth"];
export const AGES = ["child", "teen", "old"];

export const PART_LABELS = {
	skin: "color de piel",
	hair: "peinado",
	eyes: "ojos",
	nose: "nariz",
	mouth: "boca"
};

export const AGE_LABELS = {
	male: { old: "mayor", teen: "joven", child: "niño" },
	female: { old: "mayor", teen: "joven", child: "niña" }
};

export const CHARACTERS = {
	male: {
		old: { hair: 4, eyes: 4, nose: 3, mouth: 5 },
		teen: { hair: 3, eyes: 4, nose: 3, mouth: 5 },
		child: { hair: 3, eyes: 4, nose: 3, mouth: 5 }
	},
	female: {
		old: { hair: 9, eyes: 4, nose: 3, mouth: 5, tool: 1 },
		teen: { hair: 9, eyes: 4, nose: 3, mouth: 5 },
		child: { hair: 9, eyes: 4, nose: 3, mouth: 5 }
	}
};

export const EDITORS = [
	...Object.keys(CHARACTERS).flatMap((gender) => AGES.map((age) => ({ gender, age }))),
	{ gender: "pet", age: "child" }
];

// Layer offsets [left, top] inside the 350px wide avatar. Feet land at about y = 600 for everyone.
export const LAYOUT = {
	"male-old": { skin: [85, 82], hair: [92, 3], eyes: [114, 80], nose: [127, 104], mouth: [132, 135] },
	"male-teen": { skin: [85, 154], hair: [94, 85], eyes: [99, 145], nose: [123, 179], mouth: [132, 217] },
	"male-child": { skin: [90, 292], hair: [89, 224], eyes: [114, 301], nose: [128, 328], mouth: [138, 356] },
	"female-old": { skin: [85, 63], hair: [60, 10], eyes: [114, 67], nose: [125, 92], mouth: [134, 127], tool: [131, 196] },
	"female-teen": { skin: [85, 152], hair: [60, 94], eyes: [114, 151], nose: [125, 176], mouth: [134, 211] },
	"female-child": { skin: [95, 293], hair: [60, 232], eyes: [114, 289], nose: [125, 314], mouth: [134, 344] },
	"pet-child": { skin: [95, 288] }
};

// Square [centerX, centerY, size] around the face, used for the family panel thumbnails.
export const FACES = {
	"male-old": [177, 139, 190],
	"male-teen": [176, 208, 190],
	"male-child": [172, 332, 180],
	"female-old": [176, 122, 190],
	"female-teen": [176, 204, 190],
	"female-child": [177, 332, 180]
};

// Pets have very different shapes, so each one has its own square.
export const PET_FACES = {
	1: [169, 479, 80],
	2: [131, 460, 80],
	3: [146, 349, 128]
};
