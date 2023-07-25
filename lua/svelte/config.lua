local Svelte = {}

--- Your plugin configuration with its default values.
---
--- Default values:
---@eval return MiniDoc.afterlines_to_code(MiniDoc.current.eval_section)
Svelte.options = {
    -- Prints useful logs about what event are triggered, and reasons actions are executed.
    debug = false,
}

--- Define your svelte setup.
---
---@param options table Module config table. See |Svelte.options|.
---
---@usage `require("svelte").setup()` (add `{}` with your |Svelte.options| table)
function Svelte.setup(options)
    options = options or {}

    Svelte.options = vim.tbl_deep_extend("keep", options, Svelte.options)

    return Svelte.options
end

return Svelte
