import { asset, pad } from "../config.js";
import { createCanvas, getAvatar, GROUND, loadImage } from "./avatar.js";

export const SCENE_WIDTH = 1920;
export const SCENE_HEIGHT = 1080;

const TALLEST = 585; // height of the tallest adult, in avatar pixels
// How far a row stands below the one behind it.
const STEP = 68;
const GAP = 6;

// Rows from back to front.
const ROWS = ["old", "teen", "child", "pet"];

// Pets are stored with an age too, so the gender is checked first.
const rowName = ({ gender, age }) => (gender === "pet" ? "pet" : age);

// Positions are horizontal offsets of each avatar's canvas from the middle of the picture.
const centered = (avatars) => {
	const width =
		avatars.reduce((total, { left, right }) => total + right - left, 0) + GAP * (avatars.length - 1);
	let edge = -width / 2;

	return avatars.map((avatar) => {
		const x = edge - avatar.left;

		edge += avatar.right - avatar.left + GAP;

		return { avatar, x };
	});
};

// Splits avatars to both sides of a group, leaving its heads uncovered.
const flanking = (avatars, group) => {
	const half = Math.ceil(avatars.length / 2);
	let leftEdge = Math.min(...group.map(({ avatar, x }) => x + avatar.headLeft)) - GAP;
	let rightEdge = Math.max(...group.map(({ avatar, x }) => x + avatar.headRight)) + GAP;

	// Each side is filled from the middle outwards. Heads set the distance to the group,
	// whole bodies the distance between the ones on the same side.
	const left = avatars.slice(0, half).map((avatar, index) => {
		const x = leftEdge - (index ? avatar.right : avatar.headRight);

		leftEdge = x + avatar.left - GAP;

		return { avatar, x };
	});
	const right = avatars.slice(half).map((avatar, index) => {
		const x = rightEdge - (index ? avatar.left : avatar.headLeft);

		rightEdge = x + avatar.right + GAP;

		return { avatar, x };
	});

	return [...left, ...right];
};

// Parts the adults in the middle to make room for one teenager's head between them.
const parted = (adults, teen) => {
	const x = -(teen.headLeft + teen.headRight) / 2;
	const half = Math.ceil(adults.length / 2);
	const left = centered(adults.slice(0, half));
	const right = centered(adults.slice(half));
	const leftShift =
		x + teen.headLeft - GAP - Math.max(...left.map(({ avatar, x }) => x + avatar.headRight));
	const rightShift =
		x + teen.headRight + GAP - Math.min(...right.map(({ avatar, x }) => x + avatar.headLeft));

	return {
		back: [
			...left.map((position) => ({ ...position, x: position.x + leftShift })),
			...right.map((position) => ({ ...position, x: position.x + rightShift }))
		],
		middle: { avatar: teen, x }
	};
};

// Takes one list of avatars per entry in ROWS.
export const arrange = ([adults, teens, children, pets]) => {
	const rows = [];
	let depth = 0;

	const add = (positions, step) => {
		depth += rows.length ? step : 0;
		rows.push({ positions, depth });
	};

	// With an odd number of teenagers, one goes between the parents.
	const between = adults.length > 1 && teens.length % 2 === 1;
	const { back, middle } = between
		? parted(adults, teens[0])
		: { back: adults.length ? centered(adults) : [] };

	if (adults.length) {
		add(back, 0);
	}

	if (teens.length) {
		const sides = between ? teens.slice(1) : teens;
		const positions = adults.length ? flanking(sides, back) : centered(teens);

		add(middle ? [...positions, middle] : positions, STEP);
	}

	// Pets share the front row with the children, one group on each side.
	const kids = centered(children);
	const companions = children.length ? flanking(pets, kids) : centered(pets);
	const front = [...kids, ...companions];

	if (front.length) {
		add(front, STEP);
	}

	// The middle of the picture stays on the middle of the adults, so fit the wider side.
	const reach = Math.max(
		...rows.flatMap(({ positions }) =>
			positions.map(({ avatar, x }) => Math.max(-(x + avatar.left), x + avatar.right))
		)
	);
	const scale = Math.min((SCENE_WIDTH * 0.47) / reach, (SCENE_HEIGHT * 0.86) / (TALLEST + depth));
	const floor = SCENE_HEIGHT * 0.97;

	// Back row first, so each row is painted over the ones behind it.
	return rows.flatMap((row) => {
		const y = floor - (depth - row.depth + GROUND) * scale;

		return row.positions.map(({ avatar, x }) => ({
			avatar,
			x: SCENE_WIDTH / 2 + x * scale,
			y,
			scale
		}));
	});
};

export const renderScene = async (family) => {
	const members = family.members;
	const [background, avatars] = await Promise.all([
		loadImage(asset(`background/bk_${pad(family.background)}.jxl`)),
		Promise.all(members.map(getAvatar))
	]);
	const canvas = createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
	const context = canvas.getContext("2d");

	context.imageSmoothingQuality = "high";
	context.drawImage(background, 0, 0, SCENE_WIDTH, SCENE_HEIGHT);

	const groups = ROWS.map((name) =>
		avatars.filter((_, index) => rowName(members[index]) === name)
	);

	for (const { avatar, x, y, scale } of arrange(groups)) {
		context.drawImage(avatar.canvas, x, y, avatar.canvas.width * scale, avatar.canvas.height * scale);
	}

	return canvas;
};

// Draws the scene into an on-screen canvas, ignoring results that arrive out of order.
const latest = new WeakMap();

export const showScene = async (target, family) => {
	const request = Symbol();
	latest.set(target, request);

	const scene = await renderScene(family);

	if (latest.get(target) !== request) {
		return null;
	}

	target.width = scene.width;
	target.height = scene.height;
	target.getContext("2d").drawImage(scene, 0, 0);

	return scene;
};
