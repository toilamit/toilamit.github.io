---
layout: post
title: Reset Migrations in Django
categories: [python, django]
date: 2021-01-18 09:00:00 +0700
description: Sometime you want to revert or clean-up your database, you should remove all migrations or specify some migrations you want to delete.
img: django-reset-migration.jpg
fig-caption: # Add figcaption (optional)
tags: [django, python, reset migration, remove migrations]
---

There're 2 scenarios you will face in real project. This article will show you them.

### Scenario 1:
The project is still in the development environment and you want to perform a full clean up. You don’t mind throwing the whole database away.

#### 1. Remove the all migrations files within your project
Note that, you should not delete `__init__.py` file.

Run following commands to remove all migrations files inside your project.

```
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
```

#### 2. Drop the current database, or delete the db.sqlite3 if it is your case.
#### 3. Create the initial migrations and generate the database schema:

```
python manage.py makemigrations
python manage.py migrate
```

And you are good to go.

### Scenario 2:
You want to clear all the migration history but you want to keep the existing database.

#### 1. Make sure your models fits the current database schema
The easiest way to do it is trying to create new migrations:

```
python manage.py makemigrations
```

If there are any pending migration, apply them first.

If you see the message:

```
No changes detected
```

You are good to go.

#### 2. Clear the migration history for each app
Now you will need to clear the migration history app by app.

First run the `showmigrations` command so we can keep track of what is going on:

```
$ python manage.py showmigrations
```

Output:

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
my_app
 [X] 0001_initial
 [X] 0002_remove_mymodel_i
 [X] 0003_mymodel_bio
sessions
 [X] 0001_initial
```

Clear the migration history:

```
$ python manage.py migrate --fake my_app zero
```

The result will be something like this:

```
Operations to perform:
  Unapply all migrations: my_app
Running migrations:
  Rendering model states... DONE
  Unapplying my_app.0003_mymodel_bio... FAKED
  Unapplying my_app.0002_remove_mymodel_i... FAKED
  Unapplying my_app.0001_initial... FAKED
```

Now run the command `showmigrations` again:

```
$ python manage.py showmigrations
```

Output:

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
my_app
 [ ] 0001_initial
 [ ] 0002_remove_mymodel_i
 [ ] 0003_mymodel_bio
sessions
 [X] 0001_initial
```

You must do that for all the apps you want to reset the migration history.

#### 3. Remove the actual migration files.
Run following commands to remove all migrations files inside your project.

```
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
```

Run the `showmigrations` again:

```
$ python manage.py showmigrations
```

Output:

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
my_app
 (no migrations)
sessions
 [X] 0001_initial
```

#### 4. Create the initial migrations

```
$ python manage.py makemigrations
```

Output:

```
Migrations for 'my_app':
  0001_initial.py:
    - Create model MyModel
```

#### 5. Fake the initial migration
In this case you won’t be able to apply the initial migration because the database table already exists. What we want to do is to fake this migration instead:

```
$ python manage.py migrate --fake-initial
```

Output:

```
Operations to perform:
  Apply all migrations: admin, my_app, contenttypes, auth, sessions
Running migrations:
  Rendering model states... DONE
  Applying my_app.0001_initial... FAKED
```

Run `showmigrations` again:

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
my_app
 [X] 0001_initial
sessions
 [X] 0001_initial
```

And we are all set up :-). Good luck!

### Refs
- <a target="_blank" href="https://simpleisbetterthancomplex.com/tutorial/2016/07/26/how-to-reset-migrations.html">Reset Migrations</a>