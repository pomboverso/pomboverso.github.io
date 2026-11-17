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
