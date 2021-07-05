---
layout: post
title: How to use arrays in Bash
categories: [bash-programming]
date: 2021-07-05 16:30:00 +0700
description: Array is the most important data type in programming. Array is used to store a sets of data, and it allows you access, get, update data and so on.
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [linux, bash, bash programming, arrays]
---

Bash is different with other standard programming languages. It doesn't require to define any data type for declaring variable.

In particular array, there are only two types of array can be declared. Numeric array and associative array.

An array is called numeric array if its index is numeric and it is called associative array if its index is string.

In this article, we will show you how to declare an numeric array or associative array and iterate them using for loop by examples.

### Example-1: Numeric Array:

```bash
#!/bin/bash

# the default index is numeric, all values are taken as string value
# array with 5 elements
numeric_array=(HTML Javascript CSS JQuery Bootstrap)

# Print 5 values individually

echo "----------Print 5 values individually---------------"
echo ${numeric_array[0]}
echo ${numeric_array[1]}
echo ${numeric_array[2]}
echo ${numeric_array[3]}
echo ${numeric_array[4]}

#Print all values by using *
echo "-----------------Print all values-------------------"
echo ${numeric_array[*]}

```

Output:

```console
----------Print 5 values individually---------------
HTML
Javascript
CSS
JQuery
Bootstrap
-----------------Print all values-------------------
HTML Javascript CSS JQuery Bootstrap
```

### Example-2: Associative Array

```bash
#!/bin/bash

# Associative array declaration
declare -A new_array

# Each index needs to be declared separately. Index is string and value is numeric
new_array=([mark]=79 [john]=93 [ella]=87 [mira]=83)

# Print values
echo ${new_array[mark]}
echo ${new_array[john]}
echo ${new_array[ella]}
echo ${new_array[mira]}

# Print only indexes by using `!` and `@` symbol.
echo ${!new_array[@]}

```

### Example-3: Using for loop reading Array values

In the following example, you will get total number of elements by using `#` and `*` symbol. Read values and indexes separately by using for loop.

```bash
#!/bin/bash

# Associative array declaration
declare -A new_array

# Value Initialization
new_array=([os]=Windows [web]=PHP [db]=Oracle)

echo "Total number of elements=${#new_array[*]}"

echo "Array values are"

for value in ${new_array[@]}; do
  echo $value
done

echo "Array indexes are"

for key in ${!new_array[@]}; do
  echo $key
done

echo "Array values and indexes:"
for key in ${!new_array[*]}; do
  echo "$key => ${new_array[$key]}"
done

```

Hope these examples will help you're familiar with arrays in bash programming.

Leave a comment if you have. 

Thank you 🥰
