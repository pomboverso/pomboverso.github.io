angular.module("css_app").value("CSS_PROPERTIES", [
/* -------------------------------- CSS 1 -------------------------------- */
{
	name : "background-attachment",
	initial : "scroll",
	values :
	[
		"scroll",
		"fixed"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement:
	[
		"top",
		"right",
		"bottom",
		"left"
	],
	version : "1"
},{
	name : "background-color",
	initial : "transparent",
	values :
	[
		"transparent",
		"(color)"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "background-image",
	initial : "none",
	values : ["(url)", "none"],
	description : "Define the image that will be in the background of the object",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "background-position",
	initial : "0% 0%",
	values :
	[
		"(percentage)",
		"(length)",
		"top",
		"right",
		"bottom",
		"left",
		"center"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "background-repeat",
	initial : "repeat",
	values : ["repeat", "repeat-x", "repeat-y", "no-repeat"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "background",
	initial : "not defined",
	values :
	[
		"background-color",
		"background-image",
		"background-repeat",
		"background-attachment",
		"background-position"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "letter-spacing",
	initial : "normal",
	values : ["normal", "(length)"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "line-height",
	initial : "0",
	values : ["normal", "(number)", "(length)", "(percentage)"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "list-style-image",
	initial : "none",
	values : ["(url)", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "Elements with \"display: list-item\"",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "list-style-position",
	initial : "outside",
	values : ["inside", "outside"],
	description : "",
	inherit : "Yes",
	applyTo : "Elements with \"display: list-item\"",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "list-style-type",
	initial : "disc",
	values :
	[
		"disc",
		"circle",
		"square",
		"decimal",
		"lower-roman",
		"upper-roman",
		"lower-alpha",
		"upper-alpha",
		"none"
	],
	description : "",
	inherit : "Yes",
	applyTo : "Elements with \"display: list-item\"",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "list-style",
	initial : "not defined",
	values : ["list-style-type", "list-style-position", "list-style-image"],
	description : "",
	inherit : "Yes",
	applyTo : "Elements with \"display: list-item\"",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "margin",
	initial : "0",
	values : ["(length)", "(percentage)", "auto"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements except elements with table display types other than table-caption, table and inline-table",
	dependency : "",
	complement: ["(none)", "top", "right", "bottom", "left"],
	version : "1"
},{
	name : "padding",
	initial : "0",
	values : ["(length)", "(percentage)"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements except table-row-group, table-header-group, table-footer-group, table-row, table-column-group and table-column",
	dependency : "",
	complement: ["(none)", "top", "right", "bottom", "left"],
	version : "1"
},{
	name : "text-align",
	initial : "determined by browser",
	values : ["left", "right", "center", "justify"],
	description : "",
	inherit : "Yes",
	applyTo : "block containers",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "text-decoration",
	initial : "none",
	values : ["none", "underline", "overline", "line-through", "blink"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "text-indent",
	initial : "0",
	values : ["(length)", "(percentage)"],
	description : "",
	inherit : "Yes",
	applyTo : "block containers",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "text-transform",
	initial : "none",
	values : ["capitalize", "uppercase", "lowercase", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "vertical-align",
	initial : "baseline",
	values :
	[
		"baseline",
		"sub",
		"super",
		"top",
		"text-top",
		"middle",
		"bottom",
		"text-bottom",
		"(percentage)",
		"(length)"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "white-space",
	initial : "normal",
	values : ["normal", "pre", "nowrap"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "width",
	initial : "auto",
	values : ["(length)", "(percentage)", "auto"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "word-spacing",
	initial : "normal",
	values : ["normal", "(length)"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "border-style",
	initial : "none",
	values :
	[
		"none",
		"dotted",
		"dashed",
		"solid",
		"double",
		"groove",
		"ridge",
		"inset",
		"outset"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "border-width",
	initial : "medium",
	values : ["thin", "medium", "thick", "(length)"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: ["(none)", "top", "right", "bottom", "left"],
	version : "1"
},{
	name : "border-color",
	initial : "not defined",
	values : ["(color)"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "border",
	initial : "not defined",
	values : ["border-width", "border-style", "border-color"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: ["(none)", "top", "right", "bottom", "left"],
	version : "1"
},{
	name : "clear",
	initial : "none",
	values : ["none", "left", "right", "both"],
	description : "",
	inherit : "No",
	applyTo : "block-level elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "color",
	initial : "determined by browser",
	values : ["(color)"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "display",
	initial : "block",
	values : ["block", "inline", "list-item", "none"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "float",
	initial : "none",
	values : ["left", "right", "none"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font-family",
	initial : "determined by browser",
	values :
	[
		"serif",
		"sans-serif",
		"cursive",
		"fantasy",
		"monospace",
		"(family-name)"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font-size",
	initial : "medium",
	values :
	[
		"xx-small",
		"x-small",
		"small",
		"medium",
		"large",
		"x-large",
		"xx-large",
		"(relative-size)",
		"larger",
		"smaller",
		"(length)",
		"(percentage)"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font-style",
	initial : "normal",
	values : ["normal", "italic", "oblique"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font-weight",
	initial : "normal",
	values :
	[
		"normal",
		"bold",
		"bolder",
		"lighter",
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font",
	initial : "not defined",
	values :
	[
		"font-style",
		"font-variant",
		"font-weight",
		"font-size",
		"line-height",
		"font-family"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "height",
	initial : "auto",
	values : ["(length)", "(percentage)", "auto"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},{
	name : "font-variant",
	initial : "normal",
	values : ["normal", "small-caps", "inherit"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "1"
},

/* -------------------------------- CSS 2 -------------------------------- */

{
	name : "border-collapse",
	initial : "separate",
	values : ["collapse", "separate"],
	description : "",
	inherit : "Yes",
	applyTo : "\"table\" and \"inline-table\" elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "border-color",
	initial : "not defined",
	values : ["(color)", "transparent"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "border-spacing",
	initial : "0",
	values : ["(length)"],
	description : "",
	inherit : "Yes",
	applyTo : "\"table\" and \"inline-table\" elements ",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "top, right, bottom, left",
	initial : "auto",
	values : ["(length)", "(percentage)", "auto"],
	description : "",
	inherit : "No",
	applyTo : "Positioned elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "caption-side",
	initial : "top",
	values : ["top", "bottom", "inherit"],
	description : "",
	inherit : "Yes",
	applyTo : "\"table-caption\" elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "clear",
	initial : "none",
	values : ["none", "left", "right", "both"],
	description : "",
	inherit : "No",
	applyTo : "block-level elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "clip",
	initial : "auto",
	values : ["(shape)", "auto"],
	description : "",
	inherit : "No",
	applyTo : "absolutely positioned elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "content",
	initial : "auto",
	values :
	[
		"normal",
		"none",
		"(string)",
		"(uri)",
		"(counter)",
		"attr(identifier)",
		"open-quote",
		"close-quote",
		"no-open-quote",
		"no-close-quote"
	],
	description : "",
	inherit : "No",
	applyTo : "\":before\" and \":after\" pseudo-elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "counter-increment",
	initial : "none",
	values : ["(identifier)", "(number)", "none"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "counter-reset",
	initial : "none",
	values : ["(identifier)", "(number)", "none"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "cursor",
	initial : "auto",
	values :
	[
		"(uri)",
		"auto",
		"crosshair",
		"default",
		"pointer",
		"move",
		"e-resize",
		"ne-resize",
		"nw-resize",
		"n-resize",
		"se-resize",
		"sw-resize",
		"s-resize",
		"w-resize",
		"text",
		"wait",
		"help",
		"progress"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "direction",
	initial : "ltr",
	values : ["ltr", "rtl"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "display",
	initial : "inline",
	values :
	[
		"inline",
		"block",
		"list-item",
		"inline-block",
		"table",
		"inline-table",
		"table-row-group",
		"table-header-group",
		"table-footer-group",
		"table-row",
		"table-column-group",
		"table-column",
		"table-cell",
		"table-caption",
		"none"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "empty-cells",
	initial : "show",
	values : ["show", "hide"],
	description : "",
	inherit : "Yes",
	applyTo : "\"table-cell\" elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "font",
	initial : "not defined",
	values :
	[
		"font-style",
		"font-variant",
		"font-weight",
		"font-size",
		"line-height",
		"font-family",
		"caption",
		"icon",
		"menu",
		"message-box",
		"small-caption",
		"status-bar"
	],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "list-style-type",
	initial : "disc",
	values :
	[
		"disc",
		"circle",
		"square",
		"decimal",
		"decimal-leading-zero",
		"lower-roman",
		"upper-roman",
		"lower-greek",
		"lower-latin",
		"upper-latin",
		"armenian",
		"georgian",
		"lower-alpha",
		"upper-alpha",
		"none"
	],
	description : "",
	inherit : "Yes",
	applyTo : "Elements with \"display: list-item\"",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "max-height",
	initial : "none",
	values : ["(length)", "(percentage)", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements but non-replaced inline elements, table columns, and column groups",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "max-width",
	initial : "none",
	values : ["(length)", "(percentage)", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements but non-replaced inline elements, table rows, and row groups",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "min-height",
	initial : "0",
	values : ["(length)", "(percentage)", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements but non-replaced inline elements, table columns, and column groups",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "min-width",
	initial : "0",
	values : ["(length)", "(percentage)", "none"],
	description : "",
	inherit : "Yes",
	applyTo : "all HTML elements but non-replaced inline elements, table rows, and row groups",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "orphans",
	initial : "2",
	values : ["(number)"],
	description : "specifies the minimum number of lines in a block container that must be left at the bottom of a page",
	inherit : "Yes",
	applyTo : "Block container elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "outline-color",
	initial : "invert",
	values : ["(color)", "invert"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "outline-style",
	initial : "none",
	values :
	[
		"none",
		"dotted",
		"dashed",
		"solid",
		"double",
		"groove",
		"ridge",
		"inset",
		"outset"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "outline-width",
	initial : "medium",
	values : ["thin", "medium", "thick", "(length)"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "outline",
	initial : "determined by browser",
	values : ["outline-color", "outline-style", "outline-width"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "overflow",
	initial : "visible",
	values : ["visible", "hidden", "scroll", "auto"],
	description : "",
	inherit : "No",
	applyTo : "Block containers",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "position",
	initial : "static",
	values : ["static", "relative", "absolute", "fixed"],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "quotes",
	initial : "determined by browser",
	values : ["(string)", "none"],
	description : "specifies quotation marks for any number of embedded quotations",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "table-layout",
	initial : "auto",
	values : ["auto", "fixed"],
	description : "specifies quotation marks for any number of embedded quotations",
	inherit : "Yes",
	applyTo : "\"table\" and \"inline-table\" elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "unicode-bidi",
	initial : "normal",
	values : ["normal", "embed", "bidi-override"],
	description : "specifies quotation marks for any number of embedded quotations",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "visibility",
	initial : "visible",
	values : ["visible", "hidden", "collapse"],
	description : "Specifies quotation marks for any number of embedded quotations",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "white-space",
	initial : "normal",
	values : ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
	description : "Specifies how white-space inside an element is handled",
	inherit : "Yes",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "widows",
	initial : "2",
	values : ["(number)"],
	description : "specifies the minimum number of lines in a block container that must be left at the top of a page",
	inherit : "Yes",
	applyTo : "Block container elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "z-index",
	initial : "auto",
	values : ["auto", "(number)"],
	description : "",
	inherit : "Yes",
	applyTo : "Positioned elements",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "page-break-after",
	initial : "auto",
	values : ["auto", "always", "avoid", "left", "right", "inherit"],
	description : "",
	inherit : "no",
	applyTo : "block-level elements (but see text)",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "page-break-before",
	initial : "auto",
	values : ["auto", "always", "avoid", "left", "right", "inherit"],
	description : "",
	inherit : "no",
	applyTo : "block-level elements (but see text)",
	dependency : "",
	complement: [],
	version : "2.1"
},{
	name : "page-break-inside",
	initial : "auto",
	values : ["auto", "avoid", "inherit"],
	description : "",
	inherit : "no",
	applyTo : "block-level elements (but see text)",
	dependency : "",
	complement: [],
	version : "2.1"
},

/* -------------------------------- CSS 3 -------------------------------- */

{
	name : "align-content",
	initial : "stretch",
	values : [
		"stretch",
		"center",
		"flex-start",
		"flex-end",
		"space-between",
		"space-around",
		"initial",
		"inherit"
	],
	description : "Aligns the flexible container's items when the items do not use all available space on the cross-axis (vertically)",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "align-items",
	initial : "stretch",
	values : [
		"stretch",
		"center",
		"flex-start",
		"flex-end",
		"baseline",
		"initial",
		"inherit"
	],
	description : "Specifies the default alignment for items inside the flexible container",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "align-self",
	initial : "auto",
	values :
	[
		"auto",
		"stretch",
		"center",
		"flex-start",
		"flex-end",
		"baseline",
		"initial",
		"inherit"
	],
	description : "Specifies the alignment for the selected item inside the flexible container",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation",
	initial : "none 0 ease 0 1 normal none running",
	values :
	[
		"animation-name",
		"animation-duration",
		"animation-timing-function",
		"animation-delay",
		"animation-iteration-count",
		"animation-direction"
	],
	description : "",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-delay",
	initial : "0",
	values : ["(time)", "initial", "inherit"],
	description : "Specifies a delay for the start of an animation",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-direction",
	initial : "normal",
	values :
	[
		"normal",
		"reverse",
		"alternate",
		"alternate-reverse",
		"initial",
		"inherit"
	],
	description : "Defines whether an animation should play in reverse direction or in alternate cycles",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-duration",
	initial : "0",
	values : ["(time)", "initial", "inherit"],
	description : "Defines how many seconds or milliseconds an animation takes to complete one cycle",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-fill-mode",
	initial : "none",
	values :
	[
		"none",
		"forwards",
		"backwards",
		"both",
		"initial",
		"inherit"
	],
	description : "Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-iteration-count",
	initial : "1",
	values :
	[
		"(number)",
		"infinite",
		"initial",
		"inherit"
	],
	description : "Specifies the number of times an animation should be played",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-name",
	initial : "none",
	values :
	[
		"keyframename",
		"none",
		"initial",
		"inherit"
	],
	description : "Specifies a name for the @keyframes animation",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-play-state",
	initial : "running",
	values :
	[
		"paused",
		"running",
		"initial",
		"inherit"
	],
	description : "Specifies whether the animation is running or paused",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "animation-timing-function",
	initial : "ease",
	values :
	[
		"linear",
		"ease",
		"ease-in",
		"ease-out",
		"cubic-bezier(n,n,n,n)",
		"initial",
		"inherit"
	],
	description : "Specifies the speed curve of an animation",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "appearance",
	initial : "",
	values :
	[
		"normal",
		"icon",
		"window",
		"button",
		"menu",
		"field"
	],
	description : "The appearance property allows you to make an element look like a standard user interface element",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "backface-visibility",
	initial : "visible",
	values :
	[
		"visible",
		"hidden",
		"initial",
		"inherit"
	],
	description : "The backface-visibility property defines whether or not an element should be visible when not facing the screen. \nThis property is useful when an element is rotated, and you do not want to see its backside",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "background-blend-mode",
	initial : "normal",
	values :
	[
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	],
	description : "Determine how layers are blended into each other",
	inherit : "",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "background-clip",
	initial : "border-box",
	values :
	[
		"border-box",
		"padding-box",
		"content-box",
		"initial",
		"inherit"
	],
	description : "Specifies the painting area of the background",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "background-origin",
	initial : "padding-box",
	values :
	[
		"padding-box",
		"border-box",
		"content-box",
		"initial",
		"inherit"
	],
	description : "Specifies where the background image is positioned. \nNote: If the background-attachment property is set to \"fixed\", this property has no effect",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "background-size",
	initial : "auto",
	values :
	[
		"auto",
		"length",
		"cover",
		"contain",
		"initial",
		"inherit"
	],
	description : "Specifies the size of the background images",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image",
	initial : "none 100% 1 0 stretch",
	values :
	[
		"source",
		"slice",
		"width",
		"outset",
		"repeat",
		"initial",
		"inherit"
	],
	description : "The border-image property is a shorthand property for setting the border-image-source, border-image-slice, border-image-width, border-image-outset and border-image-repeat properties",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image-outset",
	initial : "0",
	values : ["(length)", "(number)", "initial", "inherit"],
	description : "Specifies the amount by which the border image area extends beyond the border box",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image-repeat",
	initial : "stretch",
	values : ["stretch", "repeat", "round", "initial", "inherit"],
	description : "Specifies whether the image-border should be repeated, rounded or stretched",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image-slice",
	initial : "100%",
	values : ["(number)", "(percentage)", "fill", "initial", "inherit"],
	description : "Specifies the inward offsets of the image-border",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image-source",
	initial : "none",
	values : ["none", "(number)", "initial", "inherit"],
	description : "Specifies an image to be used, instead of the border styles given by the border-style properties",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-image-width",
	initial : "1",
	values : ["(number)", "(percentage)", "auto", "initial", "inherit"],
	description : "Specifies the widths of the image-border",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "border-radius",
	initial : "0",
	values : ["(length)", "(percentage)", "initial", "inherit"],
	description : "Is a shorthand property for setting the four border-*-radius properties",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "box-shadow",
	initial : "none",
	values : ["none", "h-shadow", "v-shadow", "blur", "spread", "color", "inset", "initial", "inherit"],
	description : "Attaches one or more shadows to an element",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "box-sizing",
	initial : "content-box",
	values : ["content-box", "border-box", "initial", "inherit"],
	description : "Tell the browser what the sizing properties (width and height) should include",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "linear-gradient",
	initial : "",
	values : ["direction, color-stop1, color-stop2, .."],
	description : "To create a linear gradient you must define at least two color stops. Color stops are the colors you want to render smooth transitions among. You can also set a starting point and a direction (or an angle) along with the gradient effect",
	inherit : "no",
	applyTo : "",
	dependency : "background:",
	complement: [],
	version : "3"
},{
	name : "radial-gradient",
	initial : "",
	values : ["shape size at position, start-color, ..., last-color"],
	description : "By default, shape is ellipse, size is farthest-corner, and position is center",
	inherit : "no",
	applyTo : "",
	dependency : "background:",
	complement: [],
	version : "3"
},{
	name : "repeating-linear-gradient",
	initial : "",
	values : [],
	description : "Used to repeat linear gradients",
	inherit : "no",
	applyTo : "",
	dependency : "background:",
	complement: [],
	version : "3"
},{
	name : "hanging-punctuation",
	initial : "none",
	values : ["none", "first", "last", "allow-end", "force-end", "initial", "inherit"],
	description : "Specifies whether a punctuation mark may be placed outside the line box at the start or at the end of a full line of text",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "text-align-last",
	initial : "auto",
	values : ["auto", "left", "right", "center", "justify", "start", "end", "initial", "inherit"],
	description : "Specifies how to align the last line of a text",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "text-justify",
	initial : "auto",
	values :
	[
		"auto",
		"inter-word",
		"inter-ideograph",
		"inter-cluster",
		"distribute",
		"kashida",
		"trim",
		"initial",
		"inherit"
	],
	description : "Specifies the justification method to use when text-align is set to 'justify'",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "text-overflow",
	initial : "clip",
	values : ["clip", "ellipsis", "string", "initial", "inherit"],
	description : "Specifies how overflowed content that is not displayed should be signaled to the user",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "text-shadow",
	initial : "none",
	values : ["h-shadow", "v-shadow", "blur-radius", "color", "none", "initial", "inherit"],
	description : "Adds shadow to text",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "word-break",
	initial : "normal",
	values : ["normal", "break-all", "keep-all", "initial", "inherit"],
	description : "Specifies line breaking rules for non-CJK scripts",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "word-wrap",
	initial : "normal",
	values : ["normal", "break-word", "initial", "inherit"],
	description : "Allows long words to be able to be broken and wrap onto the next line",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transform",
	initial : "none",
	values : [
		"translate((number), (number))",
		"translateX(number)",
		"translateY(number)",
		"translateZ(number)",
		"rotate(deg)",
		"rotate3d(x, y, z, deg)",
		"rotateX(deg)",
		"rotateY(deg)",
		"rotateZ(deg)",
		"scale((number), (number))",
		"scaleX(number)",
		"scaleY(number)",
		"scaleZ(number)",
		"skew(deg, deg)",
		"skewX(deg)",
		"skewY(deg)",
		"perspective(number)",
		"matrix((number), (number), (number), (number), (number), (number))"
	],
	description : "",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transform-origin",
	initial : "50% 50% 0",
	values : ["(X-axis)", "(Y-axis)", "(Z-axis)", "initial", "inherit"],
	description : "Allows you to change the position of transformed elements",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transform-style",
	initial : "flat",
	values : ["flat", "preserve-3d", "initial", "inherit"],
	description : "Specifies how nested elements are rendered in 3D space",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "perspective",
	initial : "none",
	values : ["(length)", "none", "initial", "inherit"],
	description : "Defines how many pixels a 3D element is placed from the view. This property allows you to change the perspective on how 3D elements are viewed. When defining the perspective property for an element, it is the CHILD elements that get the perspective view, NOT the element itself",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "perspective-origin",
	initial : "50% 50%",
	values : ["(X-axis)", "(Y-axis)", "initial", "inherit"],
	description : "Defines where a 3D element is based in the x- and the y-axis. This property allows you to change the bottom position of 3D elements. When defining the perspective-origin property for an element, it is the CHILD elements that are positioned, NOT the element itself",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transition",
	initial : "all 0 ease 0",
	values :
	[
		"transition-property",
		"transition-duration",
		"transition-timing-function",
		"transition-delay"
	],
	description : "Is a shorthand property for the four transition properties: transition-property, transition-duration, transition-timing-function, and transition-delay",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transition-timing-function",
	initial : "ease",
	values : ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
	description : "Specifies the speed curve of the transition effect",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transition-delay",
	initial : "0",
	values : ["(time)", "initial", "inherit"],
	description : "Specifies when the transition effect will start. The transition-delay value is defined in seconds (s) or milliseconds (ms).",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transition-property",
	initial : "all",
	values : ["none", "all", "property", "initial", "inherit"],
	description : "Specifies the name of the CSS property the transition effect is for (the transition effect will start when the specified CSS property changes)",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "transition-duration",
	initial : "0",
	values : ["time", "initial", "inherit"],
	description : "Specifies how many seconds (s) or milliseconds (ms) a transition effect takes to complete",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-count",
	initial : "auto",
	values : ["(number)", "auto", "initial", "inherit"],
	description : "Specifies the number of columns an element should be divided into",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-fill",
	initial : "balance",
	values : ["balance", "auto", "initial", "inherit"],
	description : "Specifies how to fill columns, balanced or not",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-gap",
	initial : "normal",
	values : ["(length)", "normal", "initial", "inherit"],
	description : "Specifies the gap between the columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-rule",
	initial : "medium none color",
	values : ["column-rule-width", "column-rule-style", "column-rule-color", "initial", "inherit"],
	description : "Is a shorthand property for setting the width, style, and color of the rule between columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-rule-color",
	initial : "(The current color of the element)",
	values : ["(color)", "initial", "inherit"],
	description : "Specifies the color of the rule between columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-rule-style",
	initial : "none",
	values : ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "initial", "inherit"],
	description : "Specifies the style of the rule between columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-rule-width",
	initial : "medium",
	values : ["medium", "thin", "thick", "length", "initial", "inherit"],
	description : "Specifies the width of the rule between columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-span",
	initial : "1",
	values : ["1", "all", "initial", "inherit"],
	description : "Specifies how many columns an element should span across",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "column-width",
	initial : "auto",
	values : ["auto", "(length)", "initial", "inherit"],
	description : "Specifies a suggested, optimal width for the columns",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "columns",
	initial : "auto auto",
	values : ["auto", "column-width column-count", "initial", "inherit"],
	description : "Is a shorthand property for setting column-width and column-count",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "display",
	initial : "inline",
	values :
	[
		"inline",
		"block",
		"flex",
		"inline-block",
		"inline-table",
		"list-item",
		"run-in",
		"table",
		"table-caption",
		"table-column-group",
		"table-header-group",
		"table-footer-group",
		"table-row-group",
		"table-cell",
		"table-column",
		"table-row",
		"none",
		"initial",
		"inherit"
	],
	description : "",
	inherit : "No",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "nav",
	initial : "auto",
	values : ["auto", "(id)", "target-name", "initial", "inherit"],
	description : "Specifies where to navigate when using the arrow navigation key",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: ["top", "right", "down", "left"],
	version : "3"
},{
	name : "nav-index",
	initial : "auto",
	values : ["auto", "(number)", "initial", "inherit"],
	description : "specifies the sequential navigation order (tabbing order) for an element",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "outline-offset",
	initial : "0",
	values : ["(length)", "initial", "inherit"],
	description : "Adds space between an outline and the edge or border of an element. Outlines differ from borders in two ways: (1) An outline is a line drawn around elements, outside the border edge. (2) A outline do not take up space. (3) An outline may be non-rectangular.",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "resize",
	initial : "none",
	values : ["none", "both", "horizontal", "vertical", "initial", "inherit"],
	description : "Applies to elements whose computed overflow value is something other than 'visible'",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "opacity",
	initial : "1",
	values : ["(number)", "initial", "inherit"],
	description : "Sets the opacity level for an element. The opacity-level describes the transparency-level, where 1 is not transparant at all, 0.5 is 50% see-through, and 0 is completely transparent",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex",
	initial : "0 1 auto",
	values : ["flex-grow", "flex-shrink", "flex-basis", "auto", "initial", "inherit"],
	description : "Specifies the length of the item, relative to the rest of the flexible items inside the same container. The flex property is a shorthand for the flex-grow, flex-shrink, and the flex-basis properties",
	inherit : "no",
	applyTo : "flexible item",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-basis",
	initial : "auto",
	values : ["(number)", "auto", "initial", "inherit"],
	description : "Specifies the initial length of a flexible item",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-direction",
	initial : "row",
	values : ["row", "row-reverse", "column", "column-reverse", "initial", "inherit"],
	description : "Specifies the direction of the flexible items",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-flow",
	initial : "row nowrap",
	values : ["flex-direction", "flex-wrap", "initial", "inherit"],
	description : "Is a shorthand property for the flex-direction and the flex-wrap properties. The flex-direction property specifies the direction of the flexible items. The flex-wrap property specifies whether the flexible items should wrap or not",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-grow",
	initial : "0",
	values : ["(number)", "initial", "inherit"],
	description : "Specifies how much the item will grow relative to the rest of the flexible items inside the same container",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-shrink",
	initial : "1",
	values : ["(number)", "initial", "inherit"],
	description : "Specifies how the item will shrink relative to the rest of the flexible items inside the same container",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "flex-wrap",
	initial : "nowrap",
	values : ["nowrap", "wrap", "wrap-reverse", "initial", "inherit"],
	description : "Specifies whether the flexible items should wrap or not",
	inherit : "no",
	applyTo : "flexible items",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "font-size-adjust",
	initial : "none",
	values : ["(number)", "none", "initial", "inherit"],
	description : "gives you better control of the font size when the first selected font is not available. When a font is not available, the browser uses the second specified font. This could result in a big change for the font size. To prevent this, use the font-size-adjust property. All fonts have an 'aspect value' which is the size-difference between the lowercase letter 'x' and the uppercase letter 'X'. When the browser knows the 'aspect value' for the first selected font, the browser can figure out what font-size to use when displaying text with the second choice font",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "font-stretch",
	initial : "normal",
	values :
	[
		"ultra-condensed",
		"extra-condensed",
		"condensed",
		"semi-condensed",
		"normal",
		"semi-expanded",
		"expanded",
		"extra-expanded",
		"ultra-expanded",
		"initial",
		"inherit"
	],
	description : "Allows you to make text wider or narrower",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "justify-content",
	initial : "flex-start",
	values : ["flex-start", "flex-end", "center", "space-between", "space-around", "initial", "inherit"],
	description : "Aligns the flexible container's items when the items do not use all available space on the main-axis (horizontally)",
	inherit : "flex-start",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "order",
	initial : "0",
	values : ["(number)", "initial", "inherit"],
	description : "Specifies the order of a flexible item relative to the rest of the flexible items inside the same container",
	inherit : "no",
	applyTo : "flexible item",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "overflow-x",
	initial : "visible",
	values : ["visible", "hidden", "scroll", "auto", "initial", "inherit"],
	description : "Specifies what to do with the left/right edges of the content - if it overflows the element's content area",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "overflow-y",
	initial : "visible",
	values : ["visible", "hidden", "scroll", "auto", "initial", "inherit"],
	description : "Specifies what to do with the top/bottom edges of the content - if it overflows the element's content area",
	inherit : "no",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "tab-size",
	initial : "8",
	values : ["(number)", "length", "initial", "inherit"],
	description : "Specifies the length of the space used for the tab character",
	inherit : "Yes",
	applyTo : "",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "mix-blend-mode",
	initial : "normal",
	values :
	[
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity",
		"inherit",
		"unset"
	],
	description : "",
	inherit : "no",
	applyTo : "all HTML elements",
	dependency : "",
	complement: [],
	version : "3"
},{
	name : "perspective()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a perspective view for a 3D transformed element",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "translate()",
	initial : "none",
	values : ["(X-axis), (Y-axis)"],
	description : "Defines a 2D translation",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "translate3d()",
	initial : "none",
	values : ["(X-axis), (Y-axis), (Z-axis)"],
	description : "Defines a 3D translation",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "translateX()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a translation, using only the value for the X-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "translateY()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a translation, using only the value for the Y-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "translateZ()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a 3D translation, using only the value for the Z-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "rotate()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 2D rotation, the angle is specified in the parameter",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "rotate3d()",
	initial : "none",
	values : ["(X-axis), (Y-axis), (Z-axis), (deg)"],
	description : "Defines a 3D rotation",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "rotateX()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 3D rotation along the X-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "rotateY()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 3D rotation along the Y-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "rotateZ()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 3D rotation along the Z-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "scale()",
	initial : "none",
	values : ["(X-axis), (Y-axis)"],
	description : "Defines a 2D scale transformation",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "scale3d()",
	initial : "none",
	values : ["(X-axis), (Y-axis), (Z-axis)"],
	description : "Defines a 3D scale transformation",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "scaleX()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a scale transformation by giving a value for the X-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "scaleY()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a scale transformation by giving a value for the Y-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "scaleZ()",
	initial : "none",
	values : ["(number)"],
	description : "Defines a 3D scale transformation by giving a value for the Z-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "skew()",
	initial : "none",
	values : ["(X-angle), (Y-angle)"],
	description : "Defines a 2D skew transformation along the X- and the Y-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "skewX()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 2D skew transformation along the X-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "skewY()",
	initial : "none",
	values : ["(deg)"],
	description : "Defines a 2D skew transformation along the Y-axis",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "matrix()",
	initial : "none",
	values : ["(number), (number), (number), (number), (number), (number)"],
	description : "Defines a 2D transformation, using a matrix of six values",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
},{
	name : "matrix3d()",
	initial : "none",
	values : ["(number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number), (number)"],
	description : "Defines a 3D transformation, using a 4x4 matrix of 16 values",
	inherit : "no",
	applyTo : "",
	dependency : "transform:",
	complement: [],
	version : "3"
}
])

.value("MAIN_VAR",
{
    "all" : { color: "rgb(0, 197, 137)", text: "*" },
    "1" : { color: "#5D5D5D", text: "1" },
    "2.1" : { color: "#8cc63f", text: "2.1" },
    "3" : { color: "#00a99d", text: "3" }
});