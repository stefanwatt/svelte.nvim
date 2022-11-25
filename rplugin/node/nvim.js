"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateCurrentBuf = exports.hSplit = exports.print = exports.setBufText = exports.getBufText = exports.getBuf = exports.initNvim = exports.autoCmdOptions = void 0;
const Path = __importStar(require("path"));
const linesToString = (lines) => (lines.length === 1
    ? lines[0]
    : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
let nvim;
exports.autoCmdOptions = { pattern: '*' };
const initNvim = (_nvim) => {
    nvim = _nvim;
};
exports.initNvim = initNvim;
const getBuf = () => __awaiter(void 0, void 0, void 0, function* () { return yield nvim.buffer; });
exports.getBuf = getBuf;
const getBufText = (_buf) => __awaiter(void 0, void 0, void 0, function* () {
    const buf = _buf || (yield nvim.buffer);
    const lines = yield buf.lines;
    const bufText = linesToString(lines);
    return bufText;
});
exports.getBufText = getBufText;
const setBufText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    yield nvim.outWrite(text);
});
exports.setBufText = setBufText;
const print = (text) => __awaiter(void 0, void 0, void 0, function* () {
    yield nvim.lua(`print('${text}')`);
});
exports.print = print;
const hSplit = () => __awaiter(void 0, void 0, void 0, function* () {
    yield nvim.command('sp');
});
exports.hSplit = hSplit;
const duplicateCurrentBuf = () => __awaiter(void 0, void 0, void 0, function* () {
    const { dir, name, ext } = Path.parse(yield getBufFilepath());
    yield (0, exports.hSplit)();
    yield nvim.command(`e ${dir}/typing_test_${name}.${ext}`);
});
exports.duplicateCurrentBuf = duplicateCurrentBuf;
const getBufFilepath = () => __awaiter(void 0, void 0, void 0, function* () {
    const getFilepathCmd = 'lua print(vim.api.nvim_buf_get_name(0))';
    const filepath = yield nvim.commandOutput(getFilepathCmd);
    return filepath;
});
//# sourceMappingURL=nvim.js.map