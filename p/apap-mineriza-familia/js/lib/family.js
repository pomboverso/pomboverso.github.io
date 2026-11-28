import { AGES, BACKGROUNDS, CHARACTERS, SKINS } from "../config.js";

const STORAGE_KEY = "mineriza-familia";

const inRange = (value, max) => Number.isInteger(value) && value >= 1 && value <= max;

// Saved data may be outdated or edited by hand, so only members that can be drawn are kept.
const isValid = (member) => {
	const { gender, age, parts } = member ?? {};
	const counts =
		gender === "pet"
			? { skin: SKINS }
			: AGES.includes(age) && Object.hasOwn(CHARACTERS, gender)
				? { skin: SKINS, ...CHARACTERS[gender][age] }
				: null;

	return (
		counts !== null &&
		(gender !== "pet" || age === "child") &&
		Object.entries(counts).every(([part, max]) => inRange(parts?.[part], max))
	);
};

// Storage can be unavailable (private modes, blocked site data); the app then works without saving.
const load = () => {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
	} catch {
		return {};
	}
};

// The family being built, saved in this browser after every change.
export class Family {
	#members = [];
	#nextId = 1;
	#background = 1;

	constructor() {
		const { members, background } = load();

		if (Array.isArray(members)) {
			this.#members = members
				.filter(isValid)
				.map(({ gender, age, parts }) => ({ id: this.#nextId++, gender, age, parts }));
		}

		if (inRange(background, BACKGROUNDS)) {
			this.#background = background;
		}
	}

	get members() {
		return [...this.#members];
	}

	get size() {
		return this.#members.length;
	}

	get background() {
		return this.#background;
	}

	set background(value) {
		this.#background = value;
		this.#save();
	}

	add({ gender, age, parts }) {
		this.#members.push({ id: this.#nextId++, gender, age, parts: { ...parts } });
		this.#save();
	}

	remove(id) {
		this.#members = this.#members.filter((member) => member.id !== id);
		this.#save();
	}

	#save() {
		const data = {
			background: this.#background,
			members: this.#members.map(({ gender, age, parts }) => ({ gender, age, parts }))
		};

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch (error) {
			console.warn("The family could not be saved", error);
		}
	}
}
