---
layout: post
title: How to compare strings in Bash
categories: [bash-programming]
date: 2021-01-01 14:30:00 +0700
description: This article will show you how to compare two strings in Bash. There are a lot of ways to compare two strings value in Bash. Let's learn how to compare two strings in bash.
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [linux, bash, bash programming]
---

Of course, in any programming language, you have to compare some values in code such as `strings` or `integer`. From this article, you can check the equality and inequality of two strings by using if statement with "==" is to check equality and "!=" is to check inequality.

### Example-1: Using "=="

Bash has not the built-in function to compare two strings. Thus we have to declare 2 variables and using the "==" operator to compare.

```bash
#!/bin/bash

name1="Maria"
name2="John"

#Check equality two string variables
if [ $name1 == $name2 ]; then
  echo "Strings are equal"
else
  echo "Strings are not equal"
fi

#Check equality of a variable with a string value
if [ $name1 == "Maria" ]; then
  echo "Name: Maria"
else
  echo "Name: John"
fi
```

As above code, output will show first comparison is not equal and second comparison is equal.

### Example-2: Using "!="

The `"!="` operator will check the inequality of two string variables.

So, if condition will be true and "You are not Maria" will print.

```bash
#!/bin/bash

name="John"

#Check equality of a variable with a string value
if [ $name != "Maria" ]; then
  echo "You are not Maria"
else
  echo "You are John"
fi
```

### Example-3: Partial String Comparison
Sometime you want to check if the word is in the string. You can compare partial value by using wild card character.

Char `*` will be used as wild card character for partial matching. 

Note that, this comparison is case sensitive, which means uppercase and lowercase is different.

```bash
#!/bin/bash

str_val="We are learning bash programming"

if [[ $str_val == *learning* ]];
then
  echo "Partially Match"
else
  echo "No Match"
fi

# ==> "Partially Match"

if [[ $str_val == *Learning* ]];
then
  echo "Partially Match"
else
  echo "No Match"
fi

# ==> "No Match"
```

### Example-4: Compare string with user input value

This example will take the value from user input and then compare the inequality of the data with a fixed value. If the condition is true then it will print “No Record Found”, otherwise it will print “Record Found”.

```bash
#!/bin/bash

echo "Enter Your Name"
read input

if [ $input != "kysuIT" ];
then
  echo "No Record Found"
else
  echo "Record Found"
fi
```