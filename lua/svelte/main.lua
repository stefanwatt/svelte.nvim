local D = require("svelte.util.debug")

-- internal methods
local Svelte = {}

-- state
local S = {
    -- Boolean determining if the plugin is enabled or not.
    enabled = false,
}

---Toggle the plugin by calling the `enable`/`disable` methods respectively.
---@private
function Svelte.toggle()
    if S.enabled then
        return Svelte.disable()
    end

    return Svelte.enable()
end

---Initializes the plugin.
---@private
function Svelte.enable()
    if S.enabled then
        return S
    end

    S.enabled = true

    return S
end

---Disables the plugin and reset the internal state.
---@private
function Svelte.disable()
    if not S.enabled then
        return S
    end

    -- reset the state
    S = {
        enabled = false,
    }

    return S
end

return Svelte
