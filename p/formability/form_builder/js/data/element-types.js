export const T = {
  textField: 1, dateTimePicker: 2, textArea: 10,
  uploadFiles: 30, signature: 31, imageUpload: 32,
  dropdown: 50, checkboxGroup: 51, radioButtonGroup: 52,
  heading: 200, subheading: 201, paragraph: 300,
  stack: 400, grid: 401,
  pageBreak: 500, divider: 501, thirdParty: 502, USPSAddress: 503, validator: 504,
  lookupField: 701,
};

const def = (name, icon, control) => ({ name, icon, control });

export const TYPES = {
  [T.textField]: def("Input Field", "input", "text-field"),
  [T.textArea]: def("Text Area", "textarea", "text-area"),
  [T.dropdown]: def("Dropdown", "dropdown", "dropdown"),
  [T.checkboxGroup]: def("Checkboxes", "checkbox", "checkbox-group"),
  [T.radioButtonGroup]: def("Radio Buttons", "radio", "radio-button-group"),
  [T.dateTimePicker]: def("Date/Time Picker", "datepicker", "date-time-picker"),
  [T.uploadFiles]: def("File Uploader", "upload", "upload-files"),
  [T.imageUpload]: def("Image Upload", "image-upload", "image-upload"),
  [T.signature]: def("Signature", "signature", "signature"),
  [T.lookupField]: def("Lookup Field", "magnifier", "lookup-field"),
  [T.heading]: def("Heading", "heading", "heading"),
  [T.subheading]: def("Subheading", "subheading", "subheading"),
  [T.paragraph]: def("Text", "paragraph", "paragraph"),
  [T.stack]: def("Stack", "stack", "stack"),
  [T.grid]: def("Grid", "grid", "grid"),
  [T.pageBreak]: def("Page Break", "pagebreak", "page-break"),
  [T.divider]: def("Divider", "divider", "divider"),
  [T.validator]: def("Validator", "exclamation-circle", "validator"),
  [T.thirdParty]: def("Third Party Completer", "third-party", "third-party-completer"),
  [T.USPSAddress]: def("Address Validation", "location", "address-validation"),
};

export const CONTROL_GROUPS = [
  { title: "Basic Form Fields", controls: [T.textField, T.textArea, T.dropdown, T.checkboxGroup,
    T.radioButtonGroup, T.dateTimePicker, T.uploadFiles, T.imageUpload, T.signature, T.lookupField] },
  { title: "Layout", controls: [T.heading, T.subheading, T.paragraph, T.stack, T.grid,
    T.pageBreak, T.divider, T.validator] },
  { title: "Templates", controls: [T.thirdParty, T.USPSAddress] },
];

const INPUTS = [T.textField, T.dateTimePicker, T.textArea, T.dropdown, T.checkboxGroup, T.radioButtonGroup];

const CAN = {
  labelable: [...INPUTS, T.uploadFiles, T.imageUpload, T.signature, T.heading, T.subheading,
    T.thirdParty, T.lookupField, T.USPSAddress],
  placeholderable: [T.textField, T.dateTimePicker, T.textArea, T.signature, T.lookupField],
  requireable: [...INPUTS, T.uploadFiles, T.imageUpload, T.signature, T.lookupField],
  referenceable: [...INPUTS, T.thirdParty, T.uploadFiles, T.imageUpload, T.lookupField, T.USPSAddress],
  helpTextable: [...INPUTS, T.uploadFiles, T.imageUpload, T.signature, T.heading, T.subheading,
    T.paragraph, T.stack, T.grid, T.thirdParty, T.lookupField, T.USPSAddress],
  repeatable: [...INPUTS, T.stack, T.grid, T.thirdParty],
  defaultable: [T.textField, T.textArea],
  readonlyable: INPUTS,
  lengthable: [T.textField, T.textArea],
  formatable: [T.textField],
  dateMinMaxable: [T.dateTimePicker],
  layoutable: [T.grid],
  verticalAlign: [T.grid],
  columnable: [T.checkboxGroup, T.radioButtonGroup],
  sizeableFont: [T.heading, T.subheading],
  fileMode: [T.uploadFiles],
  resizable: [T.imageUpload],
};

export const can = (element, capability) => CAN[capability].includes(element.type);
export const hasOptions = (type) => [T.dropdown, T.checkboxGroup, T.radioButtonGroup].includes(type);
export const isContainer = (type) => type === T.stack || type === T.grid;
export const canNest = (type) => !isContainer(type) && type !== T.pageBreak;

export const GRID_LAYOUTS = {
  "6-6": [6, 6], "4-4-4": [4, 4, 4], "3-3-3-3": [3, 3, 3, 3], "4-8": [4, 8], "8-4": [8, 4],
};
export const INPUT_FORMATS = { text: "Any text", email: "Email", number: "Number", tel: "Phone", url: "Web address" };
export const DATE_MODES = { date: "Date", "datetime-local": "Date and time", time: "Time" };
