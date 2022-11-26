"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportComponent = void 0;
const svelteSample_1 = require("./svelteSample");
const treesitter_1 = require("./treesitter");
const exportComponent = (nvim) => async () => {
    const treesitter = new treesitter_1.Treesitter();
    treesitter.parse(svelteSample_1.sourceCode);
    nvim.print(treesitter.raw_text_expr);
};
exports.exportComponent = exportComponent;
