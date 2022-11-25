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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nvim = void 0;
class Nvim {
    constructor(nvim) {
        this.nvim = nvim;
    }
    print(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nvim.lua(`print('${text}')`);
        });
    }
    getBufText(_buf) {
        return __awaiter(this, void 0, void 0, function* () {
            const buf = _buf || (yield this.nvim.buffer);
            const lines = yield buf.lines;
            const bufText = this.linesToString(lines);
            return bufText;
        });
    }
    setBufText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nvim.outWrite(text);
        });
    }
    linesToString(lines) {
        return (lines.length === 1
            ? lines[0]
            : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
    }
}
exports.Nvim = Nvim;
//# sourceMappingURL=nvim.js.map