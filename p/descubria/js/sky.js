// The sky changes with the time of day in Santo Domingo, like the original page.

// [first hour, last hour, page background]
const COLORS = [
  [0, 5, "#092647"],
  [6, 8, "#2899b5"],
  [9, 12, "#27A9E1"],
  [13, 17, "#FFB957"],
  [18, 20, "#40BA93"],
  [21, 23, "#7D69AE"],
];

const santoDomingoHour = () =>
  Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Santo_Domingo",
      hour: "2-digit",
      hourCycle: "h23",
    }).format(new Date())
  );

/** Add ?hora=22 to the address to preview another hour. */
export const currentTheme = () => {
  const preview = new URLSearchParams(location.search).get("hora");
  const hour = preview === null ? santoDomingoHour() : Number(preview);
  const [, , color] = COLORS.find(([from, to]) => hour >= from && hour <= to) ?? COLORS[2];

  return {
    apply(body) {
      body.style.backgroundColor = color;
      body.classList.toggle("is-night", hour > 19 || hour < 6); // starry layers
      body.classList.toggle("no-balloons", hour > 19 || hour <= 6); // sky_04 / sky_05
    },
  };
};
