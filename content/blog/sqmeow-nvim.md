---
title: "How I use Neovim as a database client"
description: "Query PostgreSQL, MySQL, SQLite, Redis, and more without leaving Neovim, using sqmeow.nvim, the plugin I maintain."
date: "2026-09-19"
tags: ["neovim", "database", "rust"]
---

I spend most of my day in Neovim, so opening a separate app just to run a query always felt slow. I used [vim-dadbod](https://github.com/tpope/vim-dadbod) and [nvim-dbee](https://github.com/kndndrj/nvim-dbee) for a while, and learned a lot from both. Then I built my own: [sqmeow.nvim](https://github.com/2giosangmitom/sqmeow.nvim).

This post shows how I set it up and use it every day.

## Why sqmeow

- **A Rust engine.** Queries run outside the editor, and results come back in pages. A million-row table doesn't freeze Neovim.
- **Many databases, one workflow.** PostgreSQL, MySQL, SQLite, DuckDB, Redis, MongoDB, ScyllaDB, SurrealDB, and ClickHouse.
- **A schema drawer.** Browse schemas, tables, views, and columns with their types and keys.
- **Edit results in place.** Change cells, add or delete rows, and review the staged changes before they're applied.
- **Safe by default.** It asks before a `DELETE` without `WHERE`, a `DROP`, or a `TRUNCATE`, and connections can be read-only.

## Install

You need Neovim 0.10+ and [nui.nvim](https://github.com/MunifTanjim/nui.nvim). With [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua [lua/plugins/sqmeow.lua]
return {
  "2giosangmitom/sqmeow.nvim",
  dependencies = { "MunifTanjim/nui.nvim" },
  version = "*",
  build = function()
    -- Downloads the release binary that matches your platform.
    require("sqmeow").install()
  end,
  opts = {},
  keys = {
    { "<leader>Dd", "<cmd>Sqmeow toggle<cr>", desc = "Toggle" },
    { "<leader>Da", "<cmd>Sqmeow add<cr>", desc = "Add Connection" },
    { "<leader>Ds", "<cmd>Sqmeow scratch<cr>", desc = "New Scratchpad" },
    { "<leader>Dc", "<cmd>Sqmeow cancel<cr>", desc = "Cancel" },
  },
}
```

Run `:checkhealth sqmeow` to confirm the engine is installed.

## Run your first query

1. Run `:Sqmeow` to open the drawer and the result window.
2. Press `A` in the drawer to add a connection, for example `postgres://postgres:postgres@localhost:5432/app`.
3. Press `<CR>` on the connection to connect, then `a` to create a scratchpad.
4. Write a query and press `<CR>` to run the statement under the cursor. Select lines in visual mode to run only those, or press `<leader>E` to run the whole buffer.

Press `?` in the drawer or the result window to see every keymap.

## Working with results

A few result-window keys I use constantly:

| Key         | Action                                |
| ----------- | ------------------------------------- |
| `L` / `H`   | Next / previous page                  |
| `K`         | Show the row under the cursor         |
| `gf`        | Filter with a `WHERE` clause          |
| `=`         | Filter by the value under the cursor  |
| `s`         | Sort by the column under the cursor   |
| `x`         | Export to CSV, JSON, or SQL `INSERT`s |

Filters and sorts run on the database, so they work on the full table, not just the page you see. Every result is saved in the query log, and `:Sqmeow log` reopens it, even after a restart.

## Keep passwords out of your config

Connection URLs can read secrets at connect time, so nothing sensitive lands in a dotfile:

```sh [~/.zshrc]
export SQMEOW_CONNECTIONS='[{"name": "dev", "url": "postgres://app:{{ env \"PGPASSWORD\" }}@localhost/dev"}]'
```

Besides `env`, you can use `{{ exec "cmd" }}` to ask a password manager, or `{{ file "path" }}` to read a file. For production databases, tick **Read only** when you add the connection.

## Bonus: SQL linting and formatting with sqruff

[sqruff](https://github.com/quarylabs/sqruff) is a fast SQL linter and formatter written in Rust. I added it to [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/pull/3723), [mason-registry](https://github.com/mason-org/mason-registry/pull/9589), and [conform.nvim](https://github.com/stevearc/conform.nvim/pull/736), so setup is short.

Install it with `:MasonInstall sqruff`, then enable the language server. On Neovim 0.11+ with nvim-lspconfig installed:

```lua [init.lua]
vim.lsp.enable("sqruff")
```

For format-on-save through conform.nvim:

```lua [lua/plugins/conform.lua]
return {
  "stevearc/conform.nvim",
  opts = {
    formatters_by_ft = {
      sql = { "sqruff" },
    },
  },
}
```

Now your scratchpads get diagnostics as you type and formatting on save.

::note
sqmeow.nvim is young and moving fast. If something breaks or a database you need is missing, [open an issue](https://github.com/2giosangmitom/sqmeow.nvim/issues). Contributions are welcome too.
::
