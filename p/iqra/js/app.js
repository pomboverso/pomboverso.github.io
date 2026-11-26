// the demo API: it must come first, and removing this line brings back the real backend
import "./mock/server.js";

import "./components/pb_app.js";

import { APP } from "./constants/app.js";
import { initTheme } from "./theme.js";

document.title = APP.name;
initTheme();
