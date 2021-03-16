---
layout: post
title: Conventional Commits - Why?????
categories: [git]
date: 2021-03-16 09:00:00 +0700
description: A specification for adding human and machine readable meaning to commit messages
img: git-conventional-commits.png
fig-caption: # Add figcaption (optional)
tags: [git, git commit, commit message, conventional commits]
---

## Overviews

A good commit messages is alway better than a bad one.
A good commit messages has a clear description by keywords such as: features, fixes, or breaking changes made and so on.

### Why Use Conventional Commits

1. Automatically generating CHANGELOGs.
2. Automatically determining a semantic version bump (based on the types of commits landed).
3. Communicating the nature of changes to teammates, the public, and other stakeholders.
4. Triggering build and publish processes.
5. Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

### Commit message construction

The commit message should be structured as follows:

-----

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

-----

The commit contains the following structural elements:

1. **fix**: type `fix` which patches a bug in your codebase.
2. **feat**: type `feat` which introduces a new feature to the codebase.
3. **BREAKING CHANGE**: a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change. A BREAKING CHANGE can be part of commits of any type.
4. *types* can be `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
5. *footers* other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

A scope is optional and only provides additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

### Examples

#### Commit message with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

#### Commit message with `!` to draw attention to breaking change

```
refactor!: drop support for Node 6
```

#### Commit message with both `!` and `BREAKING CHANGE` footer

```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

#### Commit message with no body

```
docs: correct spelling of CHANGELOG
```

#### Commit message with scope

```
feat(lang): add polish language
```

#### Commit message with multi-paragraph body and multiple footers

```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```

### Specification

1. Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
2. The type `feat` MUST be used when a commit adds a new feature to your application or library.
3. The type `fix` MUST be used when a commit represents a bug fix for your application.
4. A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., *`fix(parser):`*
5. A description MUST immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., *`fix: array parsing issue when multiple spaces were contained in string`*.
6. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
7. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
8. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
9. A footer’s token MUST use `-` in place of whitespace characters, e.g., *`Acked-by`* (this helps differentiate the footer section from a multi-paragraph body). An exception is made for `BREAKING CHANGE`, which MAY also be used as a token.
10. A footer’s value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer token/separator pair is observed.
11. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.
12. If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g., `BREAKING CHANGE: environment variables now take precedence over config files`.
13. If included in the type/scope prefix, breaking changes MUST be indicated by a `!` immediately before the `:`. If `!` is used, `BREAKING CHANGE:` MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change.
14. Types other than feat and fix MAY be used in your commit messages, e.g., *`docs: updated ref docs`*.
15. The units of information that make up Conventional Commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
16. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE, when used as a token in a footer.


## Refs
- <a href="https://www.conventionalcommits.org/en/v1.0.0/#specification" target="_blank">https://www.conventionalcommits.org/en/v1.0.0/#specification</a>