---
title: 'Codeception'
order: 2
---

This is an official [Codeception](http://codeception.com/) adapter for
Allure Framework.

## What is this for?

The main purpose of this adapter is to accumulate information about your
tests and write it out to a set of XML files: one for each test class.
This adapter only generates XML files containing information about
tests. See [wiki
section](https://github.com/allure-framework/allure-core/wiki#generating-report)
on how to generate report.

## Example project

Example project is located at:
<https://github.com/allure-examples/allure-codeception-example>

## Installation and Usage

In order to use this adapter you need to add a new dependency to your
**composer.json** file:

```json
{
    "require": {
        "php": ">=5.4.0",
        "allure-framework/allure-codeception": "~1.1.0"
    }
}
```

To enable this adapter in Codeception tests simply put it in "enabled"
extensions section of **codeception.yml**:

```yaml
extensions:
    enabled:
        - Yandex\Allure\Adapter\AllureAdapter
    config:
        Yandex\Allure\Adapter\AllureAdapter:
            deletePreviousResults: false
            outputDirectory: allure-results
```
    
`deletePreviousResults` will clear all `.xml` files from output
directory (this behavior may change to complete cleanup later). It is
set to `false` by default.

`outputDirectory` is used to store Allure results and will be calculated
relatively to Codeception output directory (also known as `paths: log`
in codeception.yml) unless you specify an absolute path. You can
traverse up using `..` as usual. `outputDirectory` defaults to
`allure-results`.

To generate report from your favourite terminal,
[install](https://github.com/allure-framework/allure-cli#installation)
allure-cli and run following command (assuming you’re in project root
and using default configuration):

    allure generate --report-version 1.4.5 --report-path tests/_output/allure-report -- tests/_output/allure-results

Report will be generated in `tests/_output/allure-report`.

## Main features

See respective
[PHPUnit](https://github.com/allure-framework/allure-phpunit#advanced-features)
section.
