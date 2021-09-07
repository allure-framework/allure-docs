---
title: 'Useful Features'
order: 3
---

This section describes the main features of Allure. For example, you can
group your tests by stories or features, attach files, and distribute
assertions over a set of custom steps, among other features. All
features are supported by Java test frameworks, so we only provide Java
examples here. For details on how a particular adapter works with the
test framework of your choice, refer to the adapter guide.

## Flaky tests

In real life not all of your tests are stable and always green or always
red. A test might start to "blink" i.e. it fails from time-to-time
without any obvious reason. You could disable such a test, that is a
trivial solution. However what if you do not want to do that? Say you
would like to get more details on possible reasons or the test is so
critical that even being flaky it provides helpful information? You have
an option now to mark such tests in a special way, so the resulting
report will clearly show them as unstable:

```java
@Flaky
public void aTestWhichFailsFromTimeToTime {
     ...
}
```

Here is what you get in the report if such a test failed:

![A failed test marked as flaky](../images/flaky_failed.png)

you can mark a whole test class as flaky as well.

## Environment

To add information to Environment widget just create
`environment.properties` (or `environment.xml`) file to `allure-results`
directory before report generation.

**environment.properties.**

    Browser=Chrome
    Browser.Version=63.0
    Stand=Production

**environment.xml.**

```xml
<environment>
    <parameter>
        <key>Browser</key>
        <value>Chrome</value>
    </parameter>
    <parameter>
        <key>Browser.Version</key>
        <value>63.0</value>
    </parameter>
    <parameter>
        <key>Stand</key>
        <value>Production</value>
    </parameter>
</environment>
```

## Categories

There are two categories of defects by default:

-   Product defects (failed tests)

-   Test defects (broken tests)

    To create custom defects classification add `categories.json` file to
    `allure-results` directory before report generation.

    **categories.json.**
    ```json
    [
      {
        "name": "Ignored tests", 
        "matchedStatuses": ["skipped"] 
      },
      {
        "name": "Infrastructure problems",
        "matchedStatuses": ["broken", "failed"],
        "messageRegex": ".*bye-bye.*" 
      },
      {
        "name": "Outdated tests",
        "matchedStatuses": ["broken"],
        "traceRegex": ".*FileNotFoundException.*" 
      },
      {
        "name": "Product defects",
        "matchedStatuses": ["failed"]
      },
      {
        "name": "Test defects",
        "matchedStatuses": ["broken"]
      }
    ]
    ```
    
-   (mandatory) category name

-   (optional) list of suitable test statuses. Default
    `["failed", "broken", "passed", "skipped", "unknown"]`

-   (optional) regex pattern to check test error message. Default `".*"`

-   (optional) regex pattern to check stack trace. Default `".*"`

Test result falls into the category if its status is in the list and
both error message and stack trace match the pattern.

`categories.json` file can be stored in test resources directory in case
of using [allure-maven](/allure/reporting/maven) or [allure-gradle](/allure/reporting/gradle)
plugins.
