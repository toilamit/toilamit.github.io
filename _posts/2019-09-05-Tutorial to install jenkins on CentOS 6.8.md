---
layout: post
title: Tutorial to install jenkins on CentOS 6.8
categories: [Linux, CentOS]
date: 2019-09-05 17:02:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [jenkins, CentOS]
---

## Cài đặt các gói phụ thuộc của jenkins

### B1: Cập nhật hệ thống

```
sudo yum install epel-release

sudo yum update
```

### B2: Cài đặt JAVA

```
sudo yum install java-1.8.0-openjdk.x86_64
```

Kiểm tra version

```
java -version
```

Cần phải set 2 biến môi trường là:

- JAVA_HOME
- JRE_HOME

Cần backup file profile trước:

```
sudo cp /etc/profile /etc/profile.bak
```

Cài đặt biến môi trường:

```
echo 'export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk' | sudo tee -a /etc/profile

echo 'export JRE_HOME=/usr/lib/jvm/jre' | sudo tee -a /etc/profile
```

Áp dụng các biết môi trường đã cài đặt:

```
source /etc/profile
```

Kiểm tra lại 2 biến môi trường:

```
echo $JAVA_HOME
echo $JRE_HOME
```

![Jenkin environment variables](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Environment-variables.jpg)

## Cài đặt Jenkin trên CentOS 6.8

### Download jenkins repo

```
cd ~
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
```

![Jenkin repo](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Download-repo.jpg)

### Thêm jenkins.io.key

Nó là 1 dạng public key

```
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

### Cài đặt

```
yum install jenkins
```

![Jenkin installing](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Installing.jpg)

### Khởi động jenkins

```
sudo chkconfig jenkins on

sudo service jenkins start
```

![Jenkin start](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Running.jpg)

## Stop và check status jenkin

```
sudo service jenkins stop

sudo service jenkins status
```

![Jenkin status](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Start.jpg)

Bởi vì jenkins mặc định sử dụng port `8080` nên cần kiểm tra running port

```
netstat -ntpl
```

![Jenkin check port](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-check-port.jpg)

Sau khi khởi động jenkin thì chạy trên trình duyệt: http://<IP Address>:8080

Màn hình lần đầu truy cập:

![Jenkin unlock](https://toilamit.com/wp-content/uploads/2019/09/Jenkins-Unlock.jpg)

Copy password và paste

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

All done!
