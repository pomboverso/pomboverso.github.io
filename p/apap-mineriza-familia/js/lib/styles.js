const base = new URL("../../css/", import.meta.url);
const sheets = new Map();

const fetchSheet = async (name) => {
	const response = await fetch(new URL(`${name}.css`, base));

	if (!response.ok) {
		throw new Error(`Could not load ${name}.css (${response.status})`);
	}

	return new CSSStyleSheet().replace(await response.text());
};

export const loadStyles = (...names) =>
	Promise.all(
		names.map((name) => {
			if (!sheets.has(name)) {
				sheets.set(name, fetchSheet(name));
			}

			return sheets.get(name);
		})
	);
