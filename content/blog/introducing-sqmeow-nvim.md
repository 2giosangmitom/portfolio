---
title: "Introducing sqmeow.nvim"
description: "A fast, keyboard-driven database client for Neovim, powered by Rust. Here's what it does."
date: "2026-09-19"
tags: ["neovim", "database", "rust", "sqmeow"]
---

sqmeow.nvim is a database client that lives inside Neovim. You browse schemas, write queries, and read, filter, and edit results without leaving the editor. It's built on a Rust engine, and it reached **v2.1.0** on September 15, 2026.

::media{alt="sqmeow.nvim overview: schema drawer, scratchpad, and result window" hint="blog/sqmeow/overview.gif · full workflow, ~15s"}
Drawer on the left, scratchpad in the middle, results below.
::

It takes ideas from [vim-dadbod](https://github.com/tpope/vim-dadbod), [vim-dadbod-ui](https://github.com/kristijanhusak/vim-dadbod-ui), and [nvim-dbee](https://github.com/kndndrj/nvim-dbee), then adds a few things I missed. Here are the highlights.

## A Rust engine that never blocks the editor

Queries run in a separate Rust process, not in Neovim. Results come back one page at a time, so a query that returns 100,000 rows doesn't freeze your editor. Press `<C-c>` to cancel a slow query.

::media{alt="Paging through a large result set with L and H" hint="blog/sqmeow/paging.gif"}
Paging through a large table with `L` and `H`.
::

## One workflow for nine databases

The same drawer, scratchpad, and result window work across SQL and NoSQL databases:

| Database                 | Query language  |
| ------------------------ | --------------- |
| PostgreSQL, CockroachDB  | SQL             |
| MySQL, MariaDB           | SQL             |
| SQLite                   | SQL             |
| DuckDB                   | SQL             |
| ClickHouse               | SQL (read-only) |
| Redis, Valkey, Dragonfly | Redis commands  |
| MongoDB                  | Extended JSON   |
| ScyllaDB, Cassandra      | CQL             |
| SurrealDB                | SurrealQL       |

::media{alt="Browsing Redis keys grouped by type in the drawer" hint="blog/sqmeow/redis.png"}
Redis keys, grouped by type.
::

## A schema drawer

Browse schemas, tables, views, routines, and columns, with their types and keys. Press `p` on a table to preview its first page, `K` to see its structure, or `s` to yank a ready-made `SELECT`.

::media{alt="Schema drawer showing tables, columns, types, and keys" hint="blog/sqmeow/drawer.png"}
::

## Edit results in place

Change a cell, add a row, or delete rows directly in the grid. Nothing touches the database until you review the staged changes with `gs` and apply them with `<C-s>`. Editing even works on joined results: each table is updated through its own key.

::media{alt="Editing cells, then reviewing staged changes before applying them" hint="blog/sqmeow/editing.gif"}
Edit, review, apply.
::

## Filter and sort on the database

Press `gf` for a `WHERE` bar or `go` for an `ORDER BY` bar, or `=` to filter by the value under the cursor. The query reruns on the database, so filters apply to the whole table, not just the page on screen.

::media{alt="Filtering a result with the WHERE bar" hint="blog/sqmeow/filter.gif"}
::

## A query log and exports

Every result is saved to a log that survives restarts. `:Sqmeow log` reopens any of them. Press `x` to export a result, or only selected rows, to CSV, JSON, or SQL `INSERT` statements, into a file or the clipboard.

::media{alt="Exporting selected rows to SQL INSERT statements" hint="blog/sqmeow/export.png"}
::

## Safe by default

- **Confirmations.** sqmeow asks before a `DELETE` or `UPDATE` without `WHERE`, a `DROP`, or a `TRUNCATE`.
- **Read-only connections.** Tick **Read only** when adding a connection. PostgreSQL, MySQL, ClickHouse, SQLite, and DuckDB enforce it in the database session.
- **No passwords in dotfiles.** URLs can read secrets with `{{ env "VAR" }}`, `{{ exec "cmd" }}`, or `{{ file "path" }}`, and passwords are masked wherever a URL is shown.
- **SSH tunnels.** Reach a database behind a bastion with your own `ssh` setup.

::media{alt="Confirmation prompt before running DELETE without WHERE" hint="blog/sqmeow/confirm.png"}
::

## Try it

Install it with lazy.nvim:

```lua [lua/plugins/sqmeow.lua]
return {
  "2giosangmitom/sqmeow.nvim",
  dependencies = { "MunifTanjim/nui.nvim" },
  version = "*",
  build = function()
    require("sqmeow").install()
  end,
  opts = {},
}
```

Then run `:Sqmeow`. For a full setup with keymaps, connections, and SQL linting, read [How I use Neovim as a database client](/blog/sqmeow-nvim).

::note
sqmeow.nvim is open source under the MIT license. Bug reports, feature requests, and pull requests are welcome on [GitHub](https://github.com/2giosangmitom/sqmeow.nvim).
::
