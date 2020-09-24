# Categories

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
