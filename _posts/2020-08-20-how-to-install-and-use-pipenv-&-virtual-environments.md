---
layout: post
title: How to install and use Pipenv & Virtual Environments
categories: [Python]
date: 2020-08-20 09:00:00 +0700
description: 
img: python-venv-pipenv.jpg
fig-caption: Pipenv & Virtual Environments
tags: [python, venv, pipenv]
---

"You are brains in your head and feet in your shoes,
you can steer yourself in any direction you choose!"
                                        -- Dr. Seuss

## Check python and pip version
```
python3 --version
```

```
pip3 --version
```

## Installing Pipenv

`pipenv` là dependency manager cho các Python project.

Nó tương tự `npm` của Node.js hoặc `bundler` của Ruby

`pip` có thể cài các Python packages, `pipenv` ở level cao hơn làm đơn giản hóa dependency management cho các trường hợp chung.

Cài Pipenv:

```
$ pip install --user pipenv
```

## Installing packages for your project
Pipenv quản lý dependencies trên mỗi project

```
$ cd myproject
$ pipenv install requests
```

Pipenv sẽ cài thư viện `requests` và tạo file `Pipfile` ở thư mục của project.

`Pipfile` dùng để track các dependencies cần có của project, và sử dụng trong trường hợp re-install hoặc chia sẻ project với người khác.

Output tương tự như dưới:

```console
Creating a virtualenv for this project…
Pipfile: /Users/vietnt/Documents/VietNT/httvhutceoscop/serverless-python-packaging/numpy-test/Pipfile
Using /usr/local/bin/python3 (3.7.7) to create virtualenv…
⠋ Creating virtual environment...created virtual environment CPython3.7.7.final.0-64 in 688ms
  creator CPython3Posix(dest=/Users/vietnt/.local/share/virtualenvs/numpy-test-vhxHNUNc, clear=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/vietnt/Library/Application Support/virtualenv)
    added seed packages: pip==20.2.2, setuptools==49.6.0, wheel==0.35.1
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator

✔ Successfully created virtual environment! 
Virtualenv location: /Users/vietnt/.local/share/virtualenvs/numpy-test-vhxHNUNc
Creating a Pipfile for this project…
Installing requests…
Adding requests to Pipfile's [packages]…
✔ Installation Succeeded 
Pipfile.lock not found, creating…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (444a6d)!
Installing dependencies from Pipfile.lock (444a6d)…
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 0/0 — 00:00:00
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
```

## Using installed packages
Tạo file `main.py`:

```python
import requests

response = requests.get('https://httpbin.org/ip')

print('Your IP is {0}'.format(response.json()['origin']))
```

Chạy đoạn mã trên:

```
$ pipenv run python main.py
```

Kết quả tương tự:

```
Your IP is 8.8.8.8
```

Sử dụng `pipenv run` đảm bảo các installed packages có sẵn với script của bạn.

Nó cũng có thể spawn một shell mới để chắc chắn là tất cả commands truy cập tới các installed packages với `pipenv shell`.

## Lower level: virtualenv

`virtualenv` được sử dụng standalone, thay cho Pipenv

Cài đặt

```
$ pip install virtualenv
```

Kiểm tra

```
$ virtualenv --version
```

## Using
#### Tạo môi trường ảo

```
$ cd my_project_folder
$ virtualenv venv
```

`virtualenv venv` sẽ tạo ra 1 folder tại thư mục hiện tại mà chứa Python executable files, và 1 bản sao của thư viện `pip` dùng để cài đặt các packages khác. Tên của virtual environment (trường hợp này là `venv`) có thể là bất kể gì; nếu bỏ qua tên thì sẽ đặt các files trong thư mục hiện tại.

Chú ý: `venv` là quy ước chung sử dụng toàn cầu. Vì nó sẵn có trong các file ignore (ví dụ: .gitignore)

Lệnh này tạo một bản sao của Python ở bất kì thư mục nào đã chạy lệnh, đặt trong một folder tên `venv`

Ví dụ ở đây là `python2.7`

```
$ virtualenv -p /usr/bin/python2.7 venv
```

Lưu biến môi trường sẽ được vào `~/.bashrc`

```
$ export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python2.7
```

#### Kích hoạt môi trường ảo để sử dụng

```
$ source venv/bin/activate
```

Tên của virtual environment hiện tại sẽ xuất hiện ở bên trái của dấu nhắc (ví dụ: `(venv)Your-Computer:your_project UserName$)`) cho biết là nó đã active. Từ giờ khi cài đặt package sẽ được lưu tại folder `venv`, được tách biệt với global Python installation.

Ví dụ có thể cài đặt package `requests`:

```
$ pip install requests
```

#### Khi làm việc xong trong môi trường ảo thì có thể tắt nó
```
$ deactivate
```

Khi deactivate thì sẽ thoát môi trường ảo và sử dụng Python hiện có trên hệ thống

Để xóa môi trường ảo, chỉ cần xóa thư mục. Ví dụ chạy lệnh: `rm -rf my_project`

Chú ý khi sử dụng môi trường ảo, bạn sẽ có thể quên và tạo thành rác trên hệ thống. Vì vậy hãy xóa đi khi không sử dụng.

Chú ý: từ phiên bản 3.3, Python đã bao gồm module <a href="https://docs.python.org/3/library/venv.html" target="_blank">`venv`</a>.

## Refs
- https://python-guide-pt-br.readthedocs.io/pt_BR/latest/dev/virtualenvs.html