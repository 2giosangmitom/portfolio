---
title: nightfall.nvim
description: A clean, eye-friendly colorscheme for Neovim, in three flavors.
kind: product
repo: 2giosangmitom/nightfall.nvim
stack: ["Lua", "Neovim"]
order: 2
cover: /images/projects/nightfall-nvim/nightfall.png
---

A violet-leaning take on the Dracula family, made for long sessions. It covers every highlight group Neovim documents through 0.12 and every Treesitter capture, so no language falls back to a default color. This site uses its palette for dark mode.

## Three flavors

::media{src="/images/projects/nightfall-nvim/nightfall.png" alt="The nightfall flavor"}
nightfall
::

::media{src="/images/projects/nightfall-nvim/deeper-night.png" alt="The deeper-night flavor"}
deeper-night
::

::media{src="/images/projects/nightfall-nvim/maron.png" alt="The maron flavor"}
maron
::

## Highlights

- **Thirty-four plugin integrations**, each one switchable.
- **LSP support:** diagnostics, virtual lines, inlay hints, code lenses, and semantic tokens.
- **Your colors:** override palette colors or highlight groups per flavor.
- **Fast startup:** highlights are compiled once and reused.
- **Readable:** every color is checked for contrast against its own background.
- **Beyond Neovim:** matching themes for Alacritty, lazygit, and yazi.

## Install

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
