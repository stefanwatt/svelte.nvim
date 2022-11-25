"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nvim = void 0;
class Nvim {
    constructor(nvim) {
        this.nvim = nvim;
    }
    async print(text) {
        await this.nvim.lua(`print('${text}')`);
    }
    async getBufText(_buf) {
        const buf = _buf || (await this.nvim.buffer);
        const lines = await buf.lines;
        const bufText = this.linesToString(lines);
        return bufText;
    }
    async setBufText(text) {
        await this.nvim.outWrite(text);
    }
    linesToString(lines) {
        return (lines.length === 1
            ? lines[0]
            : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
    }
}
exports.Nvim = Nvim;
