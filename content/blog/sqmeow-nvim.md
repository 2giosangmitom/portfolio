---
title: "How I use Neovim as a database client"
description: "My sqmeow.nvim workflow: connect databases, write SQL in persistent scratchpads, inspect paged results, and review edits without leaving Neovim."
date: "2026-09-19"
updated: "2026-09-29"
cover: "/images/blog/sqmeow-nvim.jpg"
coverAlt: "A keyboard connected through a terminal to three databases."
tags: ["neovim", "database", "rust"]
---

I spend most of my day in Neovim, so opening a separate app just to run a query always felt slow. I used [vim-dadbod](https://github.com/tpope/vim-dadbod) and [nvim-dbee](https://github.com/kndndrj/nvim-dbee) for a while, and learned a lot from both. Then I built my own: [sqmeow.nvim](https://github.com/2giosangmitom/sqmeow.nvim).

This post shows how I set it up and use it every day.

::media{src="/images/projects/sqmeow-nvim/overview.png" alt="PostgreSQL schema drawer, SQL scratchpad, and paged results inside Neovim"}
My database workflow stays alongside the code.
::

## Why sqmeow

- **A Rust engine.** Queries run outside the editor, and results come back in pages. Paged results keep large queries from blocking the editor.
- **Many databases, one workflow.** PostgreSQL, MySQL, SQLite, DuckDB, Redis, MongoDB, ScyllaDB, SurrealDB, ClickHouse, and Oracle.
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
  cmd = "Sqmeow",
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

| Key       | Action                                |
| --------- | ------------------------------------- |
| `L` / `H` | Next / previous page                  |
| `K`       | Show the row under the cursor         |
| `gf`      | Filter with a `WHERE` clause          |
| `=`       | Filter by the value under the cursor  |
| `s`       | Sort by the column under the cursor   |
| `x`       | Export to CSV, JSON, or SQL `INSERT`s |

For SQL, filters and sorts rerun the query on the database, so they work beyond the visible page. MongoDB uses filter/sort documents; Redis, ScyllaDB, SurrealDB, and closed connections filter cached results in memory. Every result is saved in the query log, and `:Sqmeow log` reopens it, even after a restart.

## Review changes before applying them

Press `i` or `<CR>` to edit a cell, `o` to stage a new row, or `dd` to stage a deletion. Use `gs` to open the review window, inspect the generated SQL, then press `<C-s>` there to apply it. `u` undoes the last staged change; `U` discards them all.

A result needs the table's complete primary or unique key for its plain columns to be editable. Joined results can update each table through its own key; adding rows requires a single-table result.

::media{src="/images/projects/sqmeow-nvim/inline-edit.png" alt="Two staged deletions and one cell update with their SQL in the review window"}
Staged edits remain local until I review and apply them.
::

Press `gK` in the result window (or `K` on a table in the drawer) to inspect its columns and indexes.

::media{src="/images/projects/sqmeow-nvim/table-structure.png" alt="PostgreSQL table columns, indexes, and CREATE TABLE definition"}
Inspect the schema before writing the next query.
::

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
