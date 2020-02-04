"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFunc = (v) => {
    return (typeof v === "function") && (v.toString().trim().slice(0, 5) !== "class");
};
const isClass = (v) => {
    return (typeof v === "function") && (v.toString().trim().slice(0, 5) === "class");
};
const isArray = (v) => { return Array.isArray(v); };
exports.modules = function (list, options) {
    // switch (typeof options) {
    //     case "object":      break;
    //     case "function":    break;
    //     default:            break;
    // }
    options = isFunc(options) ? options : function (v) { return v; };
    let modules = {};
    let funcs = [];
    let classes = [];
    let arrs = [];
    let misc = [];
    let errors = [];
    let m;
    list.forEach((e, i) => {
        try {
            m = require(e);
            !modules.hasOwnProperty(e) || (() => { throw new Error('duplicate module found'); })();
            if (isClass(e))
                classes.push(e);
            else if (isFunc(e))
                funcs.push(e);
            else if (isArray(e))
                arrs.push(e);
            else
                misc.push(e);
            modules[e] = options(m);
        }
        catch (error) {
            errors.push(`module failed to load: ${i} ${e} .... ${error}`);
        }
    });
    if (errors.length) {
        throw new Error(errors);
    }
    return {
        modules,
        funcs,
        classes,
        arrs,
        misc
    };
};
