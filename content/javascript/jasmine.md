# Jasmine

A plugin for Allure report generation from Jasmine tests.

## Installation

### From Jasmine2

Add the lib into `package.json` and then configure the plugin:

```javascript
// conf.js
var AllureReporter = require('jasmine-allure-reporter');
jasmine.getEnv().addReporter(new AllureReporter({
  resultsDir: 'allure-results'
}));
```

### From Protractor

Put the above code into the `onPrepare` inside of your `conf.js`:

```javascript
// conf.js
exports.config = {
  framework: 'jasmine2',
  onPrepare: function() {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
  }
}
```

## Generate HTML report from Allure results

The Reporter will generate xml files inside of a `resultsDir`, then we
need to generate HTML out of them. You can use Maven for that. Copy
ready-to-use `pom.xml` from `node_modules/jasmine-allure-reporter` and
run:

`mvn site -Dallure.results_pattern=allure-results`

It will put HTMLs into `target/site/allure-maven-plugin` folder. To
serve them via `localhost:1324` use:

`mvn jetty:run -Djetty.port=1234`

Otherwise choose one of the [other ways to generate
HTML](https://github.com/allure-framework/allure-core/wiki#generating-a-report).

## Features

This adapter provides a set of methods that can be called from the
global `Jasmine2AllureReporter` object. It wraps [common allure JS
adapter](https://github.com/allure-framework/allure-js-commons) and
provides access to basic Allure features implemented there.

### Title

TBD it is not implemented currently

### Description

In order to add a detailed description for a test you should call a
`setDescription(description)` method where **description** is your
string argument.

code snippet TBD

### Severity

You can specify a severity attribute for a test via `severity(severity)`
method where **severity** argument can hold one of the following
pre-defined values:

-   BLOCKER

-   CRITICAL

-   NORMAL

-   MINOR

-   TRIVIAL

code snippet TBD

### Behaviours

In some development approaches tests are classified by
[stories](https://github.com/allure-framework/allure-core/wiki/Glossary#user-story)
and
[features](https://github.com/allure-framework/allure-core/wiki/Glossary#feature).
If you’re using this, then for each test you can set story and feature
attributes via `story(story)` and `feature(feature)` methods
respectively, accepting **story** or **feature** as a string argument.

code snippet TBD

### Steps

Steps are needed to specify actions that constitute a testing scenario.
Steps are named, they can create attachments and can be used in
different testing scenarios. You can add a step via
`createStep(name, stepFunc)` method, where

-   **name** is a string arg bearing step name

-   **stepFunc** is a wrapped function whose logic this step represents
    in the report.

code snippet TBD

### Attachments

You can add an attachment for one of the steps via
`createAttachment(name, content, type)` method here

-   **name** is a string bearing attachment’s description

-   **content** is either a function, returning attachment object or the
    attachment object itself.

-   **type** is a string parameter to specify exact MIME type for each
    attached file. However there’s no need to specify attachment
    explicitly type for all attached files as Allure by default analyses
    attachment contents and can determine attachment type automatically.
    You usually need to specify attachment type when working with plain
    text files.

Example: adding a screenshot in the end of each test

```javascript
onPrepare: function () {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
        browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64')
            }, 'image/png')();
            done();
        })
    });
}
```

Note `done` callback!

### Issues Tracker

Integration with bug tracker system is not currently implemented

### Test Management System

Integration with test management system is not currently implemented

### Parameters

In order to add information about test method
[parameters](https://github.com/allure-framework/allure-core/wiki/Glossary#parameter)
you should use one of the methods:

1.  `addArgument(name, value)` - to specify more information on one of
    the test arguments

2.  `addEnvironment(name, value)` - to specify more information on some
    of the environment variables

code snippet TBD

## TBD

-   Currently attachments are added to the test case instead of the
    current step. This needs to be fixed in allure-js-commons.

-   Add support for Features.

-   Add support to Jasmine1. Right now only Jasmine2 is available (do we
    really need this?).

-   Add ability to use reflection for decoration method of page objects
    so that we don’t need to write Allure-related boilerplate tying
    ourselves to one specific reporter.

## For Developers

See the [system
tests](https://github.com/allure-framework/allure-jasmine-plugin/blob/master/test/system)
to quickly check how the reporter works in real life:

`node_modules/protractor/bin/protractor ./test/system/conf.js`
