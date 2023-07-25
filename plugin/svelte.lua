-- You can use this loaded variable to enable conditional parts of your plugin.
if _G.SvelteLoaded then
    return
end

_G.SvelteLoaded = true

vim.api.nvim_create_user_command("Svelte", function()
    require("svelte").toggle()
end, {})
