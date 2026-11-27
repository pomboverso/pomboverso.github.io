import { T } from "./element-types.js";

export const SAMPLE_TITLE = "Event Registration";

export const SAMPLE_ELEMENTS = [
  { type: T.heading, label: "Register for the event", fontSize: "large" },
  { type: T.paragraph, text: "Fill in your details to save a seat. Fields marked with * are required." },
  { type: T.grid, layout: "6-6", cells: [
    { type: T.textField, label: "First name", placeholder: "Jane", required: true },
    { type: T.textField, label: "Last name", placeholder: "Doe", required: true },
  ] },
  { type: T.textField, label: "Email", placeholder: "name@example.com", format: "email", required: true,
    help: "We only use it to confirm your seat." },
  { type: T.dropdown, label: "Ticket type", placeholder: "Select one...",
    options: ["General admission", "Student", "VIP"] },
  { type: T.checkboxGroup, label: "Workshops", columns: 2,
    options: ["Design", "Development", "Marketing", "Product"] },
  { type: T.pageBreak, endOf: "Your details", startOf: "Extras" },
  { type: T.radioButtonGroup, label: "Meal preference", columns: 3, options: ["No preference", "Vegetarian", "Vegan"] },
  { type: T.textArea, label: "Anything else?", placeholder: "Tell us about it" },
  { type: T.signature, label: "Signature", placeholder: "Sign here" },
];

export const LOOKUP_VALUES = ["Aurora Labs", "Blue Harbor", "Cedar & Co.", "Delta Works", "Evergreen Studio"];
