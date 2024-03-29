---
title: 'Behave'
order: 2
---

Allure integrates with behave as an external formatter.

## Instalation

    $ pip install allure-behave

## Usage

You can specify the formatter directly in the command line:

    $ behave -f allure_behave.formatter:AllureFormatter -o %allure_result_folder% ./features

## Features

### Severity

Tags that are matched to severity names (like critical, trivial, etc.)
will be interpreted as a feature or scenario severity. Scenario inherits
feature severity if not provided, or overrides it in the other case. If
there is more than one severity definition tag, only the last one is
used.

### Steps and Scenarious status

Steps with assertion exceptions will be marked as failed. Other
exceptions thrown during the test execution will cause it to have status
broken. Scenario status will be determined by the first unsuccessful
step status. When all steps are passed, then the whole scenario is
considered passed.

### Step Data

Step data text or table data are represented as step attachments in
report.
