---
layout: post
title: Tmux - basic command and cheatsheet
categories: [linux]
date: 2021-03-15 09:00:00 +0700
description: Tmux will help you save time when managing multiple server or when getting the trouble on server. Tmux will manage session and can be attached, detached and reusable.
img: tmux-tips.png
fig-caption: # Add figcaption (optional)
tags: [linux, macos, tmux, tmux terminal]
---

### What is Tmux?

```
$ whatis tmux
tmux (1)             - terminal multiplexer
```

### Installing Tmux
#### Mac OSX:

```
$ brew install tmux
```

#### Ubuntu:

```
$ sudo apt-get install tmux
```

#### Centos or Amazon Linux

```
$ sudo yum install tmux
```

### Tmux Cheat Sheet

**Special note**: `<prefix>` in Tmux will be `CTRL + B`

#### Session

##### Create new session
- Without name

```
tmux
```

- With name

```
tmux new -s SESSION_NAME
```

##### Attach a channel

```
tmux attach #
```

##### Attach a session to existed Tmux

```
tmux attach -t SESSION_NAME
```

##### List Tmux session

```
tmux ls
```

##### Exit Tmux

```
exit
```

or 

```
Ctrl + D
```

##### Delete a session

```
tmux kill-session -t session_name
```

#### Windows management
- New windows: `<prefix> + c`
- List windows: `<prefix> + w`
- Next windows: `<prefix> + n`
- Previous windows: `<prefix> + p`
- Find windows: `<prefix> + f`
- Create, edit a windows name: `<prefix> + ,`
- Close windows: `<prefix> + &`
- Detach a session: `<prefix> + d`

#### Panes management
- Separate panes vertically: `<prefix> + %`
- Separate panes horizontally: `<prefix> + "`
- Show panes number: `<prefix> + q`
- Switch panes: `<prefix> + arrow key` or `<prefix> + o`
- Delete panes: `<prefix> + x`

### Customize Tmux

In case you don't want to use default setting. You can customize it.

You can create file named `$HOME/.tmux.conf` and write any you want.

For example, you want to change `Ctrl + c` to `Ctrl + c`. You can add below content into Tmux config file.

```
unbind C-b
set -g prefix C-a
```

Apply new change:

```
tmux source-file .tmux.conf
```

### Refs
- <a href="https://www.youtube.com/watch?v=BHhA_ZKjyxo" target="_blank">https://www.youtube.com/watch?v=BHhA_ZKjyxo</a>