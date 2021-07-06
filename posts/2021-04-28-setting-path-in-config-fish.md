---
title: 'Setting PATH in config.fish'
date: '2021-04-28'
---

I moved to `fish` from `zsh` about a year ago and I'm really glad I did. Combined with `starship`, it gives me everything I want out of the box. I can just run `paru -S fish starship-bin` and I get a shell with syntax highlighting, auto completion, and the prompt I want.

My problem came when I wanted to set my `PATH` using other environment variables like `$HOME`. I want my dotfiles to work on both mac and linux as I have to use mac for work and I don't want to clutter my `PATH` with duplicated paths in diffferent home folders. I tried using the `fish_add_path` command but it exits with an error when I try using an environment variable as part of the path entry.

```
$ fish_add_path '$HOME/.local/bin'
$ echo $status
1
```

This means that I need set the path each time fish starts up and it took me a while to find a solution that worked. After trying various `set` commands for `PATH` and `fish_user_paths`, I found that explicitly setting my `fish_user_paths` with global scope in my `config.fish` works how I need it to.

```
set -g fish_user_paths $HOME/.local/bin $GOPATH/bin
```

Now everytime I open a new terminal/`fish` session, this command gets run for the current session. That means any open sessions are unaffected but the new session shows any changes I made to my `config.fish`. For example:

1. Open a terminal and print the path

```
$ echo $PATH
/home/iain/.local/bin /home/iain/src/go/bin /usr/bin ...
```

2. Edit `config.fish` and add another path

```
set -g fish_user_paths $HOME/.local/bin $GOPATH/bin $HOME/.cargo/bin
```

3. Open another terminal and print the path

```
$ echo $PATH
/home/iain/.local/bin /home/iain/src/go/bin /home/iain/.cargo/bin /usr/bin ...
```

4. Check the path is unchanged in the first terminal

```
$ echo $PATH
/home/iain/.local/bin /home/iain/src/go/bin /usr/bin ...
```

Now I have a fish shell where I can set the `PATH` and have it behave like `zsh` used to which means it works on both mac and linux with the same config!
