
// global.js - shared variables storaged at local storage.
let global = {};

global.settings = {};
global.settings.languageId = "en";
global.settings.languageName = "English";

const saveGlobal = function() {
    storage.save(settings.APP_ID + "-global-vars", global);
}

const loadGlobal = function() {
    global = storage.load(settings.APP_ID + "-global-vars") || global;
}