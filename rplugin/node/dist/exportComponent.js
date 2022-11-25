"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportComponent = void 0;
const exportComponent = (nvim) => () => {
    nvim.print("exporting svelte component...");
};
exports.exportComponent = exportComponent;
