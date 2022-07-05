---
setup: |
  import Link from '@components/Link.astro';
layout: '@layouts/BlogPostLayout.astro'
title: Adding hooks to your neovim lua plugin using user events
description: Short post about how to add hooks to your lua neovim lua by firing user events at key points.
date: 2022-06-28
tags: ['neovim']
---

I recently had a <Link external href="https://github.com/itmecho/neoterm.nvim/issues/4">github issue</Link> raised on my <Link external href="https://github.com/itmecho/neoterm.nvim">neovim terminal plugin</Link> repo asking if I could add some specific behaviour at the point the user exits terminal mode. I could have just added a configuration option to control this but I think that's a good way to end up with functions that take way too many parameters. Instead, I opted to add a User event so that the user could implement whatever logic they wanted on that specific event.

## What is neoterm?

<Link external href="https://github.com/itmecho/neoterm.nvim">`neoterm.nvim`</Link> is a neovim plugin written in lua which manages a terminal buffer in a window. It's useful for when you just want to run a quick command and navigate the output as a vim buffer. I find this particularly useful when running tests as I can use `gF` to jump straight to the file with the failing test.

It also has a few different display modes: horizontal, vertical, or fullscreen. This changes the size and position of the floating terminal window to hopefully fit different use cases. `neoterm.nvim` also exposes a few commands to enable you to script sending commands to the terminal, `NeotermRun` and `NeotermRerun`. You could create a mapping for the `NeotermRerun` command as `nnoremap <leader>tr <cmd>NeotermRerun<cr>` which would allow you to run your test command once (example: `NeotermRun go test .`) and then use the rerun mapping to run them again.

<figure>
	![Screenshot of neoterm showing the NeotermRun command.](/img/blog/neoterm-run-screenshot.png)
	<figcaption>Screenshot of neoterm showing the NeotermRun command.</figcaption>
</figure>

## User events
User events allow users of your plugin to configure autocommands that trigger when your plugin does something. This is a much more flexible approach than adding yet another configuration parameter with custom behaviour as it allow users to implement what ever they need to fit their work flow without restricting them to a certain way of doing things. To emit a User event, you can either use the vimscript <Link external href="https://neovim.io/doc/user/autocmd.html#:doautocmd">`doautocmd` command</Link>

```vim
doautocmd User <event-name>
```

or the <Link external href="https://neovim.io/doc/user/api.html#nvim_exec_autocmds()">lua `vim.api.nvim_exec_autocmds` API function</Link>

```lua
vim.api.nvim_exec_autocmds("User", { pattern = "<event-name>" })
```

As an example, to allow the behaviour the user that opened the issue was after, I added a User event named `NeotermTermLeave` that fires when the user exits terminal mode in the neoterm buffer. This allowed them to add an autocommand that listened for this event and call the `NeotermClose` command to close the terminal window.

```vim
autocmd User NeotermTermLeave NeotermClose
```

or in lua

```lua
vim.api.nvim_create_autocmd("User", {
  pattern = "NeotermTermLeave",
  callback = require('neoterm').close,
})
```

To learn more about events, you can either run `:h events` inside neovim or visit their <Link external href="https://neovim.io/doc/user/autocmd.html#events">online documentation</Link>.

## Closing thoughts
In summary, I think that adding User events is a more flexible approach to allowing specific behaviour to your plugin without having to implement and maintain additional logic and configuration options. It allows users much more control over the behaviour which lets them more effectively build the workflow they want!
