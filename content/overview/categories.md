---
title: 'Categories'
order: 2
---

# Categories

![Categories](../images/tab_categories.png)

There are two categories of defects by default:

Product defects (failed tests)

Test defects (broken tests)

To create custom defects classification add categories.json file to allure-results directory before report generation.


```JSON
categories.json
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
(mandatory) category name
(optional) list of suitable test statuses. Default ["failed", "broken", "passed", "skipped", "unknown"]
(optional) regex pattern to check test error message. Default ".*"
(optional) regex pattern to check stack trace. Default ".*"
Test result falls into the category if its status is in the list and both error message and stack trace match the pattern.

categories.json file can be stored in test resources directory in case of using allure-maven or allure-gradle plugins.

## Flaky test

In real life not all of your tests are stable and always green or always red. A test might start to "blink" i.e. it fails from time-to-time without any obvious reason. You could disable such a test, that is a trivial solution. However what if you do not want to do that? Say you would like to get more details on possible reasons or the test is so critical that even being flaky it provides helpful information? You have an option now to mark such tests in a special way, so the resulting report will clearly show them as unstable:

```Java
@Flaky
public void aTestWhichFailsFromTimeToTime {
     ...
}
```
Here is what you get in the report if such a test failed:

