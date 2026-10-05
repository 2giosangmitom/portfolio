---
title: nightfall.nvim
description: A Dracula-inspired colorscheme for Neovim, in four flavors.
kind: product
repo: 2giosangmitom/nightfall.nvim
stack: ["Lua", "Neovim"]
order: 2
---

A Dracula-inspired colorscheme for Neovim, made for long sessions. This site uses its palette for dark mode.

## Flavors

::media{src="/images/projects/nightfall-nvim/nightfall.png" alt="The nightfall flavor"}
nightfall
::

::media{src="/images/projects/nightfall-nvim/deeper-night.png" alt="The deeper-night flavor"}
deeper-night
::

::media{src="/images/projects/nightfall-nvim/maron.png" alt="The maron flavor"}
maron
::

A fourth flavor, Winter, ships in the repo for light backgrounds.

## Highlights

- **Plugin integrations**, each one switchable. Telescope, Treesitter, Flash, and native LSP ship with their own options.
- **LSP support:** diagnostics, virtual lines, inlay hints, code lenses, and semantic tokens.
- **Your colors:** override palette colors or highlight groups per flavor.
- **Fast startup:** highlights are compiled once and reused.
- **Readable:** every color is checked for contrast against its own background.
- **Beyond Neovim:** matching themes for Alacritty, lazygit, and yazi, plus lualine themes.

## Install

`setup()` is optional. Call it before `:colorscheme` when you use it:

```lua [lua/plugins/nightfall.lua]
return {
  "2giosangmitom/nightfall.nvim",
  lazy = false,
  priority = 1000,
  opts = {},
  config = function(_, opts)
    require("nightfall").setup(opts)
    vim.cmd.colorscheme("nightfall") -- nightfall, deeper-night, maron
  end,
}
```
