---
layout: post
title: How to backup sql and upload to AWS S3
categories: [AWS]
date: 2021-05-12 09:00:00 +0700
description: Upload local file to S3 using aws cli and run by bash script.
img: aws-upload-file-to-s3.png
fig-caption: # Add figcaption (optional)
tags: [aws, aws cli, bash script, aws s3, s3 cli]
---

## Prerequisite
- [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- mysqldump

## Create IAM and grant permission
- Access [AWS IAM console](https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/users$new?step=details) and create new user named: `dev_user` (any name you want)
- While creating new user, you should store in secret place the `Access Key Id` and `Secret Access Key` to configure aws profile later.
- Set permission: `AmazonS3FullAccess`

## Create S3 Bucket
- Login to [aws console](https://ap-northeast-1.console.aws.amazon.com/console/home?region=ap-northeast-1#)
- Access [link](https://s3.console.aws.amazon.com/s3/bucket/create?region=ap-northeast-1) to create new S3 Bucket named `backup` for example.

## Setup cronjob
### SSH to EC2
There are several ways to ssh to EC2 using pem key or username, password.

Here i'm using pemkey so i run cmd:

```
ssh -i /path/to/pemkey ec2-user@IP_ADDRESS
```

Switch to `root` user

```
sudo su
```

### Configure aws profile
- Check aws profile

```
aws configure list
```

- Create new profile

```
aws configure
```

Prompt will require AWS Access Key Id and AWS Secret Access Key what you get above when create new IAM.

### Create bash script
- Create a script

```
touch /usr/local/bin/backup_script.sh
```

- Edit script and input below content: `vi /usr/local/bin/backup_script.sh`

```bash
#!/bin/bash
# Saved in /usr/local/bin
# Basic configuration: datestamp e.g. YYYYMMDD
DATE=$(date +"%Y%m%d%H%M%S")

# Location of your backups (create the directory first!)
TMP_BACKUP_DIR="/tmp/backup"
BACKUP_DIR="${TMP_BACKUP_DIR}/${DATE}"

# Create a new directory into backup directory location for this date
mkdir -p $BACKUP_DIR

# ------------------------------
# ---- BEGIN BACKING UP SQL ----
# ------------------------------
SQL_DIR="sql"
mkdir -p $BACKUP_DIR/$SQL_DIR

# MySQL login details
MYSQL_USER=""
MYSQL_PASSWORD=""

# MySQL executable locations (no need to change this)
MYSQL=/usr/bin/mysql
MYSQLDUMP=/usr/bin/mysqldump

# MySQL databases you wish to skip
EXCLUDE_DB="|#mysql50#.rocksdb"
SKIPDATABASES="Database|information_schema|performance_schema|mysql$EXCLUDE_DB"

# ---- DO NOT CHANGE BELOW THIS LINE ------------------------------------------

# Retrieve a list of all databases
databases=$($MYSQL -u$MYSQL_USER -p$MYSQL_PASSWORD -e "SHOW DATABASES;" | grep -Ev "($SKIPDATABASES)")

# Dumb the databases in seperate names and gzip the .sql file
for db in $databases; do
    echo $(date +"%b %d, %Y %H:%M:%S Begin backing up $db")
    $MYSQLDUMP --force --opt --user=$MYSQL_USER -p$MYSQL_PASSWORD --skip-lock-tables --events --databases $db | gzip >"${BACKUP_DIR}/${SQL_DIR}/$db.sql.gz"
    echo $(date +"%b %d, %Y %H:%M:%S End backing up $db")
done

# ----------------------------
# ---- BACKUP UPLOADS DIR ----
# ----------------------------
DOC_DIR="documentation"
mkdir -p $BACKUP_DIR/$DOC_DIR

UPLOAD_DIR="/var/www/html/wp-content/uploads"

# Gzip folder /var/www/html/wp-content/uploads
echo $(date +"%b %d, %Y %H:%M:%S Begin zipping $UPLOAD_DIR")
cd 
tar czf "${BACKUP_DIR}/${DOC_DIR}/uploads.tar.gz" -P  $UPLOAD_DIR
echo $(date +"%b %d, %Y %H:%M:%S End zipping $UPLOAD_DIR")

# -------------------------------
# ---- BEGIN UPLOADING TO S3 ----
# -------------------------------
BACKUP_FILE="${TMP_BACKUP_DIR}/${DATE}.tar.gz"
tar czf $BACKUP_FILE -P $BACKUP_DIR

S3_BUCKET="s3://YOUR_S3_BUCKET_NAME/"

echo $(date +"%b %d, %Y %H:%M:%S Begin uploading $BACKUP_FILE to $S3_BUCKET")
aws s3 cp $BACKUP_FILE $S3_BUCKET
echo $(date +"%b %d, %Y %H:%M:%S End uploading to S3")

# Remove backup files after uploading to S3
echo $(date +"%b %d, %Y %H:%M:%S Remove $TMP_BACKUP_DIR after uploading to S3")
rm -rf $TMP_BACKUP_DIR

# --------------------------------------
# ---- DELETE OLD BACKUP FILE IN S3 ----
# --------------------------------------
flist=($(aws s3 ls ${S3_BUCKET} | awk '{print $4}'))
len=${#flist[@]}

# Loop to delete all files and keep 2 latest files
for ((i = 0; i < $((len-2)); i++)); do
    ele0="${S3_BUCKET}${flist[$i]}"
    echo $(date +"%b %d, %Y %H:%M:%S Remove ${ele0}")
    aws s3 rm ${ele0}
done

```

### Setup crontab
- Show cronjob list

```
crontab -l
```

- Edit cronjob

```
crontab -e
```

Vim editor will be appeared and you can edit it.

Refer to [crontab online](https://crontab.guru) to create cronjob you want

Here i will run script at 00:00 every Sunday and write log into file. So i input below content:

```
0 0 * * 7 /usr/bin/sh /usr/local/bin/backup_script.sh >> /var/log/backup_script.log 2>&1
```

- Restart crontab

```
service crond restar
```
