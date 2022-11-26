"use strict";
const exportComponent_1 = require("./exportComponent");
const nvim_1 = require("./nvim");
module.exports = (plugin) => {
    const nvim = new nvim_1.Nvim(plugin.nvim);
    plugin.registerCommand('SvelteExportComponent', (0, exportComponent_1.exportComponent)(nvim), {
        sync: false,
    });
};
