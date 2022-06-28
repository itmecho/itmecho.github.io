---
layout: '@layouts/BlogPostLayout.astro'
title: Adding hooks to your lua neovim plugin using user events
postDate: 2022-06-28
description: Short post about how to add hooks to your lua neovim lua by firing user events at key points.
---

I recently got [this github issue](https://github.com/itmecho/neoterm.nvim/issues/2) on my [neovim terminal plugin](https://github.com/) repo asking if I could add some specific behaviour at the point the user exist terminal mode. I could've just added a configuration option but I think that's a good way to end up with functions that take way too many parameters. Instead, I opted to add a hook so that the user could implement whatever logic they wanted on that specific event.

## What is neoterm.nvim

`neoterm.nvim` is a neovim plugin written in lua which manages a terminal buffer in a window. It's useful for when you just want to run a quick command and navigate the output as a vim buffer. I find this particularly useful when running tests as I can use `gF` to jump straight to the file with the failing test.

It also has a few different display modes: horizontal, vertical, or fullscreen. This changes the size and position of the floating terminal window to hopefully fit different use cases. `neoterm.nvim` also exposes a few commands to enable you to script sending commands to the terminal, `NeotermRun` and `NeotermRerun`. You could create a mapping for the `NeotermRerun` command as `nnoremap <leader>tr <cmd>NeotermRerun<cr>` which would allow you to run your test command once (example: `NeotermRun go test .`) and then use the rerun mapping to run them again.

<figure>
	![Screenshot of neoterm showing the vertical layout.](/img/blog/neoterm-screenshot.png)
	<figcaption>Screenshot of neoterm showing the vertical layout.</figcaption>
</figure>

<figure>
	![Screenshot of neoterm showing the NeotermRun command.](/img/blog/neoterm-screenshot.png)
	<figcaption>Screenshot of neoterm showing the NeotermRun command.</figcaption>
</figure>

## User events
User events allow users of your plugin to configure autocommands that trigger when your plugin does something. This is a much more flexible approach than adding yet another configuration parameter with custom behaviour as it allow user's to implement what ever they need to fit their work flow without restricting them to a certain way of doing things. To emit a User event, you can either use the vimscript `doautocmd` command

```vim
doautocmd User <event-name>
```

or the lua `vim.api.nvim_exec_autocmds` API function

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

In summary, I think that adding User events is a more flexible approach to allowing specific behaviour to your plugin without having to implement and maintain additional logic and configuration options. It allows users much more control over the behaviour which lets them more effectively build the workflow they want!
