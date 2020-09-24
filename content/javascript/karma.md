# Karma

Reporter for the Allure XML format. It allows to make a detailed report

## karma-allure-reporter

Install karma-allure-reporter into your project as devDependency

    {
      "devDependencies": {
        "karma": "~0.10",
        "karma-allure-reporter": "~1.0.0"
      }
    }

You can simple do it by:

    npm install karma-allure-reporter --save-dev

## Configuration

Add allure into `reporters` section. Allure-reporter has a single
config, it’s a `reportDir` — result files location relatively to base
dir. By default, files save right in the base dir.

```javascript
// karma.conf.js
module.exports = function(config) {
    config.set({
        reporters: ['progress', 'allure'],
        
        // the default configuration
        allureReport: {
          reportDir: '',
        }
    });
};
```

You can pass list of reporters as a CLI argument too:

    karma start --reporters allure,dots

## API

With allure reporter you get some functions for provide additional info
about tests. All functions available as methods of the global `allure`
object.

-   `description(description)` assign a description to current testcase

-   `severity(severity)` assign a severity to current testcase. Possible
    values enumerated as properties, eg. `allure.severity.BLOCKER`. All
    securities by descending of their importance:

    -   BLOCKER

    -   CRITICAL

    -   NORMAL

    -   MINOR

    -   TRIVIAL

-   `createStep(name, stepFunction)` defines test step. Returns wrapped
    function which reports about every step calling. Step function can
    be nested within one another. It is most powerful feature of allure,
    because it allow to write self-documented tests which report about
    every its step.

See the
[docs](https://github.com/allure-framework/allure/blob/master/docs/dictionary.md)
in core project for more information about these features and their
purpose.

## Example

There is an [example
project](https://github.com/allure-examples/allure-karma-example), where
you may look to allure-reporter in action.

For more information about Allure see the [allure
core](https://github.com/allure-framework/allure) project.

For more information about Karma see the [Karma
homepage](http://karma-runner.github.com/).
