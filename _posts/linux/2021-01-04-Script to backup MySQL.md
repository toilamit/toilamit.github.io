---
layout: post
title: Script to backup MySQl
categories: [Linux]
date: 2021-01-04 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql backup, backup, mysql]
---

Tạo file `/usr/local/sbin/autobackupsql.sh` với nội dung như bên dưới

```bash
#!/bin/bash

# Saved in /usr/local/sbin
# Basic configuration: datestamp e.g. YYYYMMDD

DATE=$(date +"%Y%m%d")

# Location of your backups (create the directory first!)

BACKUP_DIR="/var/backup/mysql"

# MySQL login details

MYSQL_USER="root"
MYSQL_PASSWORD="v8x-=yvV+43vKCZ["

# MySQL executable locations (no need to change this)

MYSQL=/usr/bin/mysql
MYSQLDUMP=/usr/bin/mysqldump

# MySQL databases you wish to skip
EXCLUDE_DB="|#mysql50#.rocksdb"
SKIPDATABASES="Database|information_schema|performance_schema|mysql$EXCLUDE_DB"

# Number of days to keep the directories (older than X days will be removed)

RETENTION=7

# ---- DO NOT CHANGE BELOW THIS LINE ------------------------------------------
#
# Create a new directory into backup directory location for this date

mkdir -p $BACKUP_DIR/$DATE

# Retrieve a list of all databases

databases=`$MYSQL -u$MYSQL_USER -p$MYSQL_PASSWORD -e "SHOW DATABASES;" | grep -Ev "($SKIPDATABASES)"`

# Dumb the databases in seperate names and gzip the .sql file

for db in $databases; do
echo `date +"%b %d, %Y %H:%M:%S $db"`
$MYSQLDUMP --force --opt --user=$MYSQL_USER -p$MYSQL_PASSWORD --skip-lock-tables --events --databases $db | gzip > "$BACKUP_DIR/$DATE/$db.sql.gz"
done

# Remove files older than X days

find $BACKUP_DIR/* -mtime +$RETENTION -delete
```

Tạo crontab chạy vào 1h sáng hàng ngày

```bash
0 1 * * * sh /usr/local/sbin/autobackupsql.sh >> /var/log/autobackupsql.log 2>&1
```