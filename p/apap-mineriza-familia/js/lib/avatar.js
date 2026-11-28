import { asset, FACES, LAYOUT, pad, PET_FACES } from "../config.js";

export const AVATAR_WIDTH = 350;
export const AVATAR_HEIGHT = 620;
export const GROUND = 600;

// Painting order, back to front.
const ORDER = ["skin", "hair", "eyes", "nose", "mouth", "tool"];

const images = new Map();
const avatars = new WeakMap();

export const layerSource = ({ gender, age }, part, number) =>
	asset(
		gender === "pet"
			? `characters/pet/skin_${pad(number)}.png`
			: `characters/${gender}/${age}/${part}_${pad(number)}.png`
	);

export const loadImage = (source) => {
	if (!images.has(source)) {
		const image = new Image();

		image.crossOrigin = "anonymous";
		image.src = source;

		const ready = image.decode().then(() => image);

		// Forget failures so a later attempt can retry.
		ready.catch(() => images.delete(source));
		images.set(source, ready);
	}

	return images.get(source);
};

export const createCanvas = (width, height) =>
	Object.assign(document.createElement("canvas"), { width, height });

const HEAD_HEIGHT = 150;

// Horizontal and top limits of the visible pixels, plus the horizontal limits of the head.
const measure = (canvas) => {
	const { width, height } = canvas;
	const { data } = canvas.getContext("2d").getImageData(0, 0, width, height);
	let left = width;
	let right = 0;
	let top = height;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (data[(y * width + x) * 4 + 3] > 20) {
				left = Math.min(left, x);
				right = Math.max(right, x + 1);
				top = Math.min(top, y);
			}
		}
	}

	let headLeft = width;
	let headRight = 0;

	for (let y = top; y < Math.min(top + HEAD_HEIGHT, height); y++) {
		for (let x = left; x < right; x++) {
			if (data[(y * width + x) * 4 + 3] > 20) {
				headLeft = Math.min(headLeft, x);
				headRight = Math.max(headRight, x + 1);
			}
		}
	}

	return { left, right, top, headLeft, headRight };
};

const compose = async (member) => {
	const parts = ORDER.filter((part) => member.parts[part]);
	const layers = await Promise.all(
		parts.map((part) => loadImage(layerSource(member, part, member.parts[part])))
	);
	const canvas = createCanvas(AVATAR_WIDTH, AVATAR_HEIGHT);
	const context = canvas.getContext("2d", { willReadFrequently: true });
	const offsets = LAYOUT[`${member.gender}-${member.age}`];

	layers.forEach((image, index) => context.drawImage(image, ...offsets[parts[index]]));

	return { canvas, ...measure(canvas) };
};

export const getAvatar = (member) => {
	if (!avatars.has(member)) {
		const avatar = compose(member);

		avatar.catch(() => avatars.delete(member));
		avatars.set(member, avatar);
	}

	return avatars.get(member);
};

export const drawFace = async (target, member) => {
	const { canvas } = await getAvatar(member);
	const [x, y, size] =
		member.gender === "pet"
			? PET_FACES[member.parts.skin]
			: FACES[`${member.gender}-${member.age}`];
	const context = target.getContext("2d");

	context.clearRect(0, 0, target.width, target.height);
	context.imageSmoothingQuality = "high";
	context.drawImage(canvas, x - size / 2, y - size / 2, size, size, 0, 0, target.width, target.height);
};
