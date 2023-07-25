local M = require("svelte.main")
local Svelte = {}

-- Toggle the plugin by calling the `enable`/`disable` methods respectively.
function Svelte.toggle()
    -- when the config is not set to the global object, we set it
    if _G.Svelte.config == nil then
        _G.Svelte.config = require("svelte.config").options
    end

    _G.Svelte.state = M.toggle()
end

-- starts Svelte and set internal functions and state.
function Svelte.enable()
    if _G.Svelte.config == nil then
        _G.Svelte.config = require("svelte.config").options
    end

    local state = M.enable()

    if state ~= nil then
        _G.Svelte.state = state
    end

    return state
end

-- disables Svelte and reset internal functions and state.
function Svelte.disable()
    _G.Svelte.state = M.disable()
end

-- setup Svelte options and merge them with user provided ones.
function Svelte.setup(opts)
    _G.Svelte.config = require("svelte.config").setup(opts)
end

_G.Svelte = Svelte

return _G.Svelte
