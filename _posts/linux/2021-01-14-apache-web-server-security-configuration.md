---
layout: post
title: Apache Web Server Security Configuration
categories: [Linux, Apache]
date: 2021-01-14 09:00:00 +0700
description: In order to protect your Apache Web Sever you need to config something such as hide server info, limit request size, etc ...
img: apache-security.png
fig-caption: # Add figcaption (optional)
tags: [security, apache, linux]
---

Some Apache basic info you need to know:

- Document root Directory: `/var/www/html` or `/var/www`
- Configuration file: `/etc/httpd/conf/httpd.conf` (RHEL/CentOS/Fedora) and `/etc/apache/apache2.conf` (Debian/Ubuntu).
- Default HTTP port: 80 TCP
- Default HTTPS port: 443 TCP
- Check out configuration file by command: `httpd -t`
- Access log: `/var/log/httpd/access_log`
- Error log: `/var/log/httpd/error_log`
- Restart Apache: `service httpd restart`
- Edit `httpd.conf` by installed editor you have on your system such as: `vi`, `vim`, ...

### Hide Apache version and OS when 404

Add these lines into `httpd.conf`

```bash
ServerSignature Off
ServerTokens Prod
```

And then reload Apache: `service httpd reload`

### Disable list files

Add directive Options as bellow:

```bash
<Directory /var/www/html>
    Options -Indexes
</Directory>
```

Reload Apache: `service httpd reload`

### Update Apache frequently
Check out Apache version: `httpd -v`

Result will be shown as bellow:

```bash
Server version: Apache/2.2.15 (Unix)
Server built:   Aug 13 2013 17:29:28
```

Update Apache by command: 

```
yum update httpd
``` 

or 

```
apt-get install apache2
```

### Disable unused modules
Checkout modules are using:

```
grep LoadModule /etc/httpd/conf/httpd.conf
```

If you want to disable modules, you just add `#` before module and restart Apache

### Restrict access

Add this content into `httpd.conf`

```bash
<Directory />
   Options None
   Order deny,allow
   Deny from all
</Directory>
```

- **Options "None"** – Not allow user setups configuration again (Ex: setup via `.htaccess`)
- **Order deny, allow** – Order to read settings: `deny` first and then `allow`
- **Deny from all** – Nobody is allowed access root folder

### Limit request size

As default, Apache doesn't limit request size. It means that Request size can be 1GB or lager.

In order setting as bellow, assume we limit file with 500KB

```bash
<Directory "/var/www/my_web/user_uploads">
   LimitRequestBody 512000
</Directory>
```

## Refs
- https://www.atmarkit.co.jp/ait/articles/0707/19/news141_2.html