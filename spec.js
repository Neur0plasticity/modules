"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const alg = main_1.modules;
console.log(alg);
console.warn(`
    * loads source code into live executable code
    * apply's uniformable wrapper to modules
    // * apply's customizable wrappers to modules
`);
const module_list = ["./main.js"];
const m = alg(module_list, function () { });
console.log(`* loads source code into live executable code`);
typeof m === "object" || (() => { throw new Error(); })();
m.hasOwnProperty("modules") || (() => { throw new Error(); })();
m.hasOwnProperty("classes") || (() => { throw new Error(); })();
m.hasOwnProperty("funcs") || (() => { throw new Error(); })();
m.hasOwnProperty("arrs") || (() => { throw new Error(); })();
m.hasOwnProperty("misc") || (() => { throw new Error(); })();
m["modules"].hasOwnProperty("./main.js") || (() => { throw new Error(); })();
m["misc"].includes("./main.js") || (() => { throw new Error(); })();
console.log(`* apply's uniformable wrapper to modules`);
const n = alg(module_list, function (v) {
    return [v];
});
typeof n === "object" || (() => { throw new Error(); })();
n.hasOwnProperty("modules") || (() => { throw new Error(); })();
n.hasOwnProperty("classes") || (() => { throw new Error(); })();
n.hasOwnProperty("funcs") || (() => { throw new Error(); })();
n.hasOwnProperty("arrs") || (() => { throw new Error(); })();
n.hasOwnProperty("misc") || (() => { throw new Error(); })();
n["modules"].hasOwnProperty("./main.js") || (() => { throw new Error(); })();
n["misc"].includes("./main.js") || (() => { throw new Error(); })();
console.log(n["modules"]["./main.js"]);
Array.isArray(n["modules"]["./main.js"]) || (() => { throw new Error(); })();
