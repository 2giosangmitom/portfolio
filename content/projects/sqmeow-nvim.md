---
title: sqmeow.nvim
description: Query your database from your favorite editor.
kind: product
repo: 2giosangmitom/sqmeow.nvim
stack: ["Rust", "Lua", "Neovim"]
order: 1
---

A database client for Neovim that I build and maintain. A Rust engine runs queries outside the editor and returns results one page at a time, so a large table never freezes Neovim.

::media{alt="sqmeow.nvim: schema drawer, scratchpad, and result window" hint="projects/sqmeow-nvim/overview.gif"}
The drawer, a scratchpad, and the result window.
::

## Highlights

- **Nine databases, one workflow:** PostgreSQL, MySQL, SQLite, DuckDB, ClickHouse, Redis, MongoDB, ScyllaDB, and SurrealDB.
- **Schema drawer:** browse schemas, tables, views, and columns with their types and keys.
- **Edit results in place:** change cells, add or delete rows, then review the staged changes before applying them.
- **Filter and sort on the database:** `WHERE` and `ORDER BY` bars that rerun the query on the whole table.
- **Query log and exports:** reopen any past result, and export to CSV, JSON, or SQL `INSERT`s.
- **Safe by default:** confirmations before destructive statements, read-only connections, and secrets read from env vars or commands.

::media{alt="Editing cells and reviewing staged changes" hint="projects/sqmeow-nvim/editing.gif"}
Edit, review, apply.
::

## Read more

- [Introducing sqmeow.nvim](/blog/introducing-sqmeow-nvim): a tour of every feature.
- [How I use Neovim as a database client](/blog/sqmeow-nvim): my setup, step by step.
