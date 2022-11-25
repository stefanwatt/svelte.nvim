"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const tree_sitter_1 = __importDefault(require("tree-sitter"));
const tree_sitter_svelte_1 = __importDefault(require("tree-sitter-svelte"));
const promises_1 = require("fs/promises");
const exportComponent_1 = require("./exportComponent");
const nvim_1 = require("./nvim");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new tree_sitter_1.default();
    parser.setLanguage(tree_sitter_svelte_1.default);
    const sourceCode = yield (0, promises_1.readFile)('/home/stefan/Projects/svelte.nvim/src/test.svelte', 'utf8');
    const tree = parser.parse(sourceCode);
    // const query = new Query(Svelte, sourceCode)
    // console.log(query.predicates)
    // const matches = query.matches(tree.rootNode)
    const expressions = tree.rootNode.descendantsOfType('expression');
    const reference = expressions[0].descendantsOfType('raw_text_expr')[0];
    console.log(tree.rootNode.children[3].children[0].children[3]);
});
module.exports = (plugin) => {
    const nvim = new nvim_1.Nvim(plugin.nvim);
    plugin.registerCommand('SvelteExportComponent', exportComponent_1.exportComponent, { sync: false });
};
//# sourceMappingURL=index.js.map