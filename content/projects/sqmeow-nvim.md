---
title: sqmeow.nvim
description: A keyboard-driven database client for Neovim. Browse schemas, query SQL and NoSQL databases, and review in-grid edits through a separate Rust engine.
kind: product
repo: 2giosangmitom/sqmeow.nvim
stack: ["Rust", "Lua", "Neovim"]
cover: /images/projects/sqmeow-nvim/overview.png
order: 1
---

I build and maintain sqmeow.nvim to keep database work inside Neovim. The Lua interface brings together a schema drawer, persistent query scratchpads, and a result grid. A separate Rust process executes queries and returns results in pages, keeping the editor responsive while I work.

## From a connection to a result

Keep several connections open, browse schemas and tables, then run the statement under the cursor, a visual selection, or an entire buffer. Scratchpads and query history persist across restarts. Query plans from `EXPLAIN` and errors appear alongside results.

The same interface supports PostgreSQL and CockroachDB, MySQL and MariaDB, SQLite, DuckDB, ClickHouse, Redis-compatible servers, MongoDB, ScyllaDB and Cassandra, SurrealDB, and Oracle Database. ClickHouse results are read-only.

::media{src="/images/projects/sqmeow-nvim/table-structure.png" alt="PostgreSQL columns, indexes, and table definition displayed inside Neovim"}
Inspect types, keys, indexes, and the table definition without opening another tool.
::

## Edit, review, apply

Edit a cell, stage a new row, or mark rows for deletion in the result grid. Open the review window to inspect the generated SQL before applying changes. Editing requires the source table's full primary or unique key; joined results can update each table through its own key, while adding rows requires a single-table result.

::media{src="/images/projects/sqmeow-nvim/inline-edit.png" alt="Staged deletions and a cell update with generated SQL in the review window"}
The review window shows exactly which statements will run.
::

## Everyday database tools

- **Filter and sort:** SQL queries rerun on the database; MongoDB uses filter and sort documents. Redis, ScyllaDB, SurrealDB, and closed connections filter cached results in memory.
- **History and export:** reopen saved results and export to CSV, JSON, or SQL `INSERT` statements, to a file or the clipboard.
- **Connections and secrets:** use SSH tunnels and read credentials from environment variables, files, or commands. Passwords are masked in displayed URLs.
- **Destructive-query checks:** confirmations precede operations such as an unqualified `DELETE` or `UPDATE`, `DROP`, and `TRUNCATE`. Read-only connections add protection; for drivers that check commands rather than enforce a database session, use a read-only database account.

## Get started

Requires Neovim 0.10+ and nui.nvim. Install with lazy.nvim, run `:checkhealth sqmeow`, then open `:Sqmeow` and add a connection. The [repository README](https://github.com/2giosangmitom/sqmeow.nvim#readme) contains the installation snippet, supported connection URLs, and keymap reference.

- [Introducing sqmeow.nvim](/blog/introducing-sqmeow-nvim): a closer look at the features.
- [How I use Neovim as a database client](/blog/sqmeow-nvim): my setup and daily workflow.
