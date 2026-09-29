---
title: "Introducing sqmeow.nvim"
description: "A Rust-powered database client for Neovim with persistent scratchpads, paged results, in-grid editing, and support for SQL and NoSQL databases."
date: "2026-09-19"
updated: "2026-09-29"
cover: "/images/blog/introducing-sqmeow-nvim.jpg"
coverAlt: "A charcoal cat beside a database cylinder and terminal window."
tags: ["neovim", "database", "rust", "sqmeow"]
---

sqmeow.nvim is a database client that lives inside Neovim. You browse schemas, write queries, and read, filter, and edit results without leaving the editor. A separate Rust process runs the queries and returns paged results, while the Lua interface keeps the workflow inside the editor.

::media{src="/images/projects/sqmeow-nvim/overview.png" alt="Neovim with a PostgreSQL schema drawer, SQL scratchpad, and paged query results"}
The schema drawer, SQL scratchpad, and paged results in one editor.
::

It takes ideas from [vim-dadbod](https://github.com/tpope/vim-dadbod), [vim-dadbod-ui](https://github.com/kristijanhusak/vim-dadbod-ui), and [nvim-dbee](https://github.com/kndndrj/nvim-dbee), then adds a few things I missed. Here are the highlights.

## A Rust engine that never blocks the editor

Queries run in a separate Rust process, not in Neovim. Results come back one page at a time, so a query that returns 100,000 rows doesn't freeze your editor. Press `<C-c>` to cancel a slow query.

## One workflow across SQL and NoSQL

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
| Oracle Database          | SQL             |

## Persistent scratchpads and multiple connections

Keep several databases open at once and save query buffers as scratchpads. Press `u` on a connection to make it active, or use `:Sqmeow bind` to tie a buffer to a specific connection. Run the statement under the cursor, a visual selection, or the whole buffer. `EXPLAIN` output and query errors appear in the result window.

## A schema drawer

Browse schemas, tables, views, routines, and columns, with their types and keys. Press `p` on a table to preview its first page, `K` to see its structure, or `s` to yank a ready-made `SELECT`.

::media{src="/images/projects/sqmeow-nvim/table-structure.png" alt="Table structure showing PostgreSQL columns, indexes, and the CREATE TABLE definition"}
Inspect column types, keys, indexes, and the table definition.
::

## Edit results in place

Change a cell, add a row, or delete rows directly in the grid. Nothing touches the database until you review the staged changes with `gs` (or `<C-s>`) and press `<C-s>` again in the review window to apply them.

Editing requires a plain table column and that table's complete primary or unique key in the result. Joined results can update each table through its own key; new rows require a single-table result.

::media{src="/images/projects/sqmeow-nvim/inline-edit.png" alt="Staged row deletions and a cell update with generated SQL awaiting review"}
Review the generated SQL before applying staged edits.
::

## Filter and sort results

Press `gf` for a `WHERE` bar or `go` for an `ORDER BY` bar, or `=` to filter by the value under the cursor. SQL filters rerun the query on the database, and MongoDB accepts filter and sort documents. Redis, ScyllaDB, SurrealDB, and closed connections filter cached results in memory instead.

## A query log and exports

Results can be saved to a query log that survives restarts. `:Sqmeow log` reopens them. Press `x` to export a result, or selected rows, to CSV, JSON, or SQL `INSERT` statements, into a file or the clipboard. SQL exports support single or batched inserts and an optional `CREATE TABLE` statement.

## Safe by default

- **Confirmations.** sqmeow asks before a `DELETE` or `UPDATE` without `WHERE`, a `DROP`, or a `TRUNCATE`.
- **Read-only connections.** Tick **Read only** when adding a connection. PostgreSQL, MySQL, ClickHouse, SQLite, and DuckDB enforce it in the database session. Other drivers check commands against a list of reads; use a read-only database account when access control matters.
- **No passwords in dotfiles.** URLs can read secrets with `{{ env "VAR" }}`, `{{ exec "cmd" }}`, or `{{ file "path" }}`, and passwords are masked wherever a URL is shown.
- **SSH tunnels.** Reach a database behind a bastion with your own `ssh` setup.

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
  cmd = "Sqmeow",
}
```

Then run `:Sqmeow`. For a full setup with keymaps, connections, and SQL linting, read [How I use Neovim as a database client](/blog/sqmeow-nvim).

::note
sqmeow.nvim is open source under the MIT license. Bug reports, feature requests, and pull requests are welcome on [GitHub](https://github.com/2giosangmitom/sqmeow.nvim).
::
