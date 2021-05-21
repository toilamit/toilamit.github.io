---
layout: post
title: DynamoDB CLI Commands and Query - DynamoDB Cheatsheet
categories: [AWS, DynamoDB]
date: 2021-01-15 09:00:00 +0700
description: 
img: aws-dynamodb.jpg
fig-caption: # Add figcaption (optional)
tags: [aws, dynamodb, dynamodb query, dynamodb cli]
---

## Table of Contents

- [Setting AWS CLI](#setup-aws-cli)
- [Important Environment Variables](#important-environment-variables)
- [Create Table](#create-table)
- [Delete Table](#delete-table)
- [Describe Table](#describe-table)
- [Backup Table](#backup-table)
- [Restore Table from Backup](#restore-table-from-backup)
- [Get All Items / Scan](#get-all-items-/-scan)
- [Get Item](#get-item)
- [Put Item](#put-item)
- [Delete Item](#delete-item)
- [Query Set of Items](#query-set-of-items)
- [Query with Sorting](#query-with-sorting)
- [Query Pagination](#query-pagination)
- [Update Item](#update-item)
- [Increment Item Attribute](#increment-item-attribute)
- [Export data to JSON](#export-data-to-json)


### Setup AWS CLI
If you're using macOS:

```
brew install awscli
```

Check aws version

```
aws --version
```

Verify credentials

```
aws sts get-caller-identity
```

Output will be:

```json
{
    "UserId": "AIDAYAJFARB7WPGZJ72GAGW",
    "Account": "386728500295",
    "Arn": "arn:aws:iam::386728500295:user/admin"
}
```

### Important Environment Variables

If you're using more than 1 regions or profiles. You can use special environment variables to use different profiles, regions and adjust its behavior Here's the list of them:

- `AWS_DEFAULT_REGION` - e.g. `us-east-1`, changes the region used for operation
- `AWS_PROFILE` - changes the profile used for the operation
- `AWS_DEFAULT_OUTPUT` - changes the format of the response. One of the following: `json`, `yaml`, `text`, `table`
- `AWS_CA_BUNDLE` - specifies the path to a certificate bundle to use for HTTPS certificate validation.
- `AWS_SHARED_CREDENTIALS_FILE` - specify the path to the location of the file where profiles information is contained, by default it's `~/.aws/credentials`

For example:

```
$ AWS_PROFILE=dev AWS_DEFAULT_OUTPUT=table AWS_DEFAULT_REGION=us-east-1 aws sts get-caller-identity

---------------------------------------------------------
|                   GetCallerIdentity                   |
+---------+---------------------------------------------+
|  Account|  386728500295                              |
|  Arn    |  arn:aws:iam::386728500295:user/admin      |
|  UserId |  AIDAYAJFARB7WPGZJ72GAGW                      |
+---------+---------------------------------------------+
```

### Create Table`

Shorthand syntax:

```
aws dynamodb create-table \
    --table-name MyTableName \
    --attribute-definitions AttributeName=id,AttributeType=S AttributeName=createdAt,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH AttributeName=createdAt,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```

As you see, primary key will be composite `id` and `createdAt`. In there, `id` is `Hash Key` and `createdAt` is `Range Key`.

`--provisioned-throughput`argument specifies that table will be created in provisioned capacity mode with just one Write Capacity Unit (WCU) and one Read Capacity Unit (RCU).

JSON format

```
aws dynamodb create-table \
    --table-name MyTableName \
    --attribute-definitions '[{"AttributeName":"id", "AttributeType":"S"}, {"AttributeName":"createdAt", "AttributeType":"S"}]' \
    --key-schema '[{"AttributeName":"id", "KeyType":"HASH"}, {"AttributeName":"createdAt", "KeyType":"RANGE"}]' \
    --provisioned-throughput '{"ReadCapacityUnits": 1, "WriteCapacityUnits": 1}'
```

### Delete Table
```
aws dynamodb delete-table \
    --table-name NameOfTheTableThatShouldBeDeleted
```

This operation will remove the table, data inside and related DynamoDB Streams, so double check before executing it.

Also, in order to delete a table, it must be in an ACTIVE state. After this command is executed, the table will not be removed instantly. Instead, it will transition into a DELETING state and will be ultimately be deleted after few minutes.

### Describe Table

```
aws dynamodb describe-table \
    --table-name NameOfTheTableThatShouldBeDeleted
```

It will return data about table key schema, capacity mode, provisioned WCU and RCU, count of the items, status, amount of bytes, and much more.

### Backup Table

To request a full, on-demand backup of DynamoDB table, use the following command:

```
aws dynamodb create-backup \
    --table-name NameOfTheTableThatShouldBeBackedUp
    --backup-name MyBackup
```

It will not only backup all the data but table key structure, LSIs and GSIs, Streams, and information about provisioned read and write capacity.

Backups are created asynchronously and without consuming any of the provisioned throughput.

### Restore Table from Backup

Create a new DynamoDB Table containing data from backup specified in backup-arn.

```
aws dynamodb restore-table-from-backup \
    --target-table-name NameOfTheTableThatShouldBeCreatedFromBackup
    --backup-arn ARNOfTheBackup
```

Restoring the table from backup will not set it's tags, autoscaling policies, stream settings, TTL settings, and CloudWatch Metrics.

### Get All Items / Scan

To fetch a collection of items, use this command:

```
aws dynamodb scan \
    --table-name NameOfTheTableToBeScanned
```

Single Scan operation can return up to a maximum of 1 MB of data. Results can be narrowed down using a combination of FilterExpressions and ExpressionAttributeValues. The following command will only return items where lastName attribute equals Doe.

```
aws dynamodb scan \
    --table-name NameOfTheTableToBeScanned
    --filter-expression "lastName = :name" \
    --expression-attribute-values '{":name":{"S":"Doe"}}'
```

If you want to prevent from creating huge and unreadable CLI commands, you can reference json files too:

```
aws dynamodb scan \
    --table-name NameOfTheTableToBeScanned \
    --filter-expression "lastName = :lastName" \
    --projection-expression "#AA, #BB" \
    --expression-attribute-names file://expression-attribute-names.json \
    --expression-attribute-values file://expression-attribute-values.json
```

where the contents of `expression-attribute-names.json` file look like this:

```json
{
    "#BB": "createdAt",
    "#AA":"deletedAt"
}
```

and the contents of `expression-attribute-values.json` file look like this:

```json
{
    ":lastName": "Doe"
}
```

### Get Item

If you know the table's Key Schema and want to get a particular item by its key or combination of keys (when using composite key), you can use GetItem operation:

```
aws dynamodb get-item \
    --table-name NameOfTheTable \
    --key '{"id": {"S": "123"}, "email": {"S": "john@doe.com"}}'
    --consistent-read # This is optional
```

### Put Item

Inserting a new record to DynamoDB can be done using put-item operation. You can reference the item that is to be inserted inline:

```
aws dynamodb put-item \
    --table-name NameOfTheTable \
    --item '{"id":"123"}'
```

or by referencing external JSON file:

```
aws dynamodb put-item \
    --table-name NameOfTheTable \
    --item file://item.json \
```

Keep in mind that if there's an existing item with the same primary key as the new item in the specified table, the new item completely replaces the existing item.

### Delete Item

Deleting an item can be only made using its primary key:

```
aws dynamodb delete-item \
    --table-name NameOfTheTable \
    --key '{"id": {"S": "123"}, "email": {"S": "john@doe.com"}}'
```

Deletes can also be made conditionally:

```
aws dynamodb delete-item \
    --table-name NameOfTheTable \
    --key '{"id": {"S": "123"}, "email": {"S": "john@doe.com"}}'
    --condition-expression 'attribute_not_exists(updatedAt)'
```

### Query Set of Items

The Query operation finds items based on primary key values. You can query any table or secondary index that has a composite primary key:

```
aws dynamodb query \
    --table-name NameOfTheTable \
    --key-condition-expression "id = :myId" \
    --expression-attribute-values '{":v1": {"S": "Fire Walk With Me"}}'
```

If you want to narrow down the query results on a non-index attribute, you can combine it with FilterExpression:

```
aws dynamodb query \
    --table-name NameOfTheTable \
    --key-condition-expression "id = :myId" \
    --expression-attribute-values '{":v1": {"S": "Fire Walk With Me"}}'
    --filter-expression 'attribute_not_exists(updatedAt)'
```

Keep in mind that FilterExpression is applied after the items have already been read; the process of filtering does not reduce consumed read capacity units.

### Query With Sorting

Sorting in DynamoDB can only be made on an attribute that is indexed as a sort key. To control the order of the query results, use scan-index-forward param:

```
aws dynamodb query \
    --table-name NameOfTheTable \
    --key-condition-expression "id = :myId" \
    --expression-attribute-values '{":v1": {"S": "Fire Walk With Me"}}'
    --filter-expression 'attribute_not_exists(updatedAt)'
    --scan-index-forward
```

### Query Pagination

Because DynamoDB Query results are limited to the 1MB of data, it's possible that the first Query operation will not return all the results you're aiming to fetch. To get all of the items matching query criteria, you must use "Pagination". In DynamoDB, pagination is consisting of two pieces:

NextToken - return value which tells when the Query operation last stopped
starting-token - parameter which tells where the next Query operation should start
Putting LastEvaluatedKey in the place of starting-token will allow you to get all the data matching Key conditions.

```
aws dynamodb query \
    --table-name NameOfTheTable \
    --key-condition-expression "id = :myId" \
    --expression-attribute-values '{":v1": {"S": "Fire Walk With Me"}}'
    --filter-expression 'attribute_not_exists(updatedAt)'
    --scan-index-forward
    --starting-token '<VALUE_OF_NEXT_TOKEN_FROM_PREV_OPERATION>'
```

### Update Item

To update an item, you must know its key and `update-expression` which tells CLI which attributes should be updated and what should happen with them:

```
aws dynamodb update-item \
    --table-name NameOfTheTable \
    --key '{"id":{"S":"John-123"}}' \
    --update-expression "SET HomeAddress = :h, DOB = :d" \
    --expression-attribute-values '{":h": { "S": "Menlo Park 1" },":d": { "S": "1234568990" }}' \
    --return-values ALL_NEW
```

If your `update-expression` contains one of the reserved keywords, you'll have to use the `expression-attribute-names`

### Increment Item Attribute

You might use `attribute-updates` shorthand:

```
aws dynamodb update-item \
    --table-name NameOfTheTable \
    --key '{"id":{"S":"John-123"}}' \
    --attribute-updates '{"version": {"Value": {"N": "1"},"Action": "ADD"}}' \
    --return-values ALL_NEW
```

### Export data to JSON

```
aws dynamodb scan \
    --table-name NameOfTheTable \
    --scan-filter '{
        "ID":{
            "AttributeValueList":[ {"S":"A8:15"} ],
            "ComparisonOperator": "CONTAINS"
        },
        "Date":{
            "AttributeValueList":[ {"S":"2020-12-23"} ],
            "ComparisonOperator": "EQ"
        },
        "JStatus":{
            "AttributeValueList":[ {"S":"Success"} ],
            "ComparisonOperator": "NOT_CONTAINS"
        }
    }' \
    --output json > path/to/file-name.json
```

### Ref
- <a href="https://dynobase.dev/dynamodb-cli-query-examples" target="_blank">Dynamodb CLI query examples</a>
- <a href="https://dynobase.dev/dynamodb-python-with-boto3/" target="_blank">DynamoDB Python with boto3</a>
- <a href="https://dynobase.dev/dynamodb-nodejs/" target="_blank">DynamoDB Nodejs</a>