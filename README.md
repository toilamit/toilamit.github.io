# How to use
## Install dependencies

```
bundle install
```

## Update dependencies

```
bundle update [gemname]
```

## see where a bundled gem is installed

```
bundle info [gemname]
```

## Upgrade jekyll

```
bundle update jekyll
```

```
jekyll serve
```

```
jekyll build
```

## Jekyll cheat sheet
https://learn.cloudcannon.com/jekyll-cheat-sheet/


## Errors

```
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /Users/nguyentienviet/.rvm/gems/ruby-3.0.2/gems/eventmachine-1.2.7/ext
/Users/nguyentienviet/.rvm/rubies/ruby-3.0.2/bin/ruby -I /Users/nguyentienviet/.rvm/rubies/ruby-3.0.2/lib/ruby/3.0.0 -r ./siteconf20210813-88059-qjjqwq.rb
extconf.rb
checking for -lcrypto... yes
checking for -lssl... yes
checking for openssl/ssl.h... yes
checking for openssl/err.h... yes
checking for rb_trap_immediate in ruby.h,rubysig.h... no
checking for rb_thread_blocking_region()... no
checking for rb_thread_call_without_gvl() in ruby/thread.h... yes
checking for rb_thread_fd_select()... yes
checking for rb_fdset_t in ruby/intern.h... yes
checking for rb_wait_for_single_fd()... yes
checking for rb_enable_interrupt()... no
checking for rb_time_new()... yes
checking for inotify_init() in sys/inotify.h... no
checking for __NR_inotify_init in sys/syscall.h... no
checking for writev() in sys/uio.h... yes
checking for pipe2() in unistd.h... no
checking for accept4() in sys/socket.h... no
checking for SOCK_CLOEXEC in sys/socket.h... no
checking for sys/event.h... yes
checking for sys/queue.h... yes
checking for clock_gettime()... yes
checking for CLOCK_MONOTONIC_RAW in time.h... yes
checking for CLOCK_MONOTONIC in time.h... yes
CXXFLAGS= -Wall -Wextra -Wno-deprecated-declarations -Wno-ignored-qualifiers -Wno-unused-result -Wno-address
creating Makefile

current directory: /Users/nguyentienviet/.rvm/gems/ruby-3.0.2/gems/eventmachine-1.2.7/ext
make DESTDIR\= clean

current directory: /Users/nguyentienviet/.rvm/gems/ruby-3.0.2/gems/eventmachine-1.2.7/ext
make DESTDIR\=
compiling binder.cpp
In file included from binder.cpp:20:
./project.h:119:10: fatal error: 'openssl/ssl.h' file not found
#include <openssl/ssl.h>
         ^~~~~~~~~~~~~~~
1 error generated.
make: *** [binder.o] Error 1

make failed, exit code 2

Gem files will remain installed in /Users/nguyentienviet/.rvm/gems/ruby-3.0.2/gems/eventmachine-1.2.7 for inspection.
Results logged to /Users/nguyentienviet/.rvm/gems/ruby-3.0.2/extensions/x86_64-darwin-20/3.0.0/eventmachine-1.2.7/gem_make.out

An error occurred while installing eventmachine (1.2.7), and Bundler cannot continue.
Make sure that `gem install eventmachine -v '1.2.7' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  jekyll-sitemap was resolved to 1.4.0, which depends on
    jekyll was resolved to 4.2.0, which depends on
      em-websocket was resolved to 0.5.2, which depends on
        eventmachine
```