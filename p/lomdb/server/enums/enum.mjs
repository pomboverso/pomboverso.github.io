export default class Enum {
  constructor(labels) {
    labels.forEach((label, index) => {
      this[label] = index;
      this[index] = label;
    });
  }

  toString() {
    return JSON.stringify(this);
  }

  valueOf() {
    return Object.values(this);
  }
}