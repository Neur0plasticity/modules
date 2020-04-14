interface modules {
    (list:string[],modifierCB:Function): {
        modules:    {[index:string]:any},
        funcs:      Function[],
        classes:    Function[],
        arrs:       any[],
        misc:       any[]
    }
};
const isFunc  = v => ((typeof v === "function") && (v.toString().trim().slice(0,5) !== "class"));
const isClass = v => ((typeof v === "function") && (v.toString().trim().slice(0,5) === "class"));
const isArray = v => (Array.isArray(v));
export const modules:modules = function(list,modifierCB) {
    // switch (typeof modifierCB) {
    //     case "object":      break;
    //     case "function":    break;
    //     default:            break;
    // }
    modifierCB = isFunc(modifierCB)?modifierCB:function(v){return v;};
    let modules={},funcs=[],classes=[],arrs=[],misc=[],errors=[];
    let m;
    list.forEach((e,i)=>{
        try {
            m = require(e);  
            !modules.hasOwnProperty(e) || (()=>{throw new Error('duplicate module found');})()
            if      (isClass(e))                    classes .push(e);
            else if (isFunc(e))                     funcs   .push(e);
            else if (isArray(e))                    arrs    .push(e);
            else                                    misc    .push(e);
            modules[e] = modifierCB(m);
        } catch (error) {   errors.push(`module failed to load: ${i} ${e} .... ${error}`);  }
    });
    if (errors.length) {throw new Error(errors);}
    return {
        modules,
        classes,
        funcs,
        arrs,
        misc
    };
};