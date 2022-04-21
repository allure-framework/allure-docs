---
title: '🚁 Helicopter view'
order: 1
---

# Helicopter view


May be some funny info like "Who is Allure Report, what magic is in it, and why you may need it" in two words?

## Overview

Entry point for every report would be the 'Overview' page with seven default widgets representing basic characteristics of your project and test environment.

![Overview](../images/tab_overview.png)

- 1 - Summary - overall report statistics.

- 2 - [Suites]() - shows tests grouped by suites existing in the project.

- 3 - [Environment](../useful_features#environment) - information about tests environment.

- 4 - [Behaviors]() - information about results aggregated according to epics, features and stories.

- 5 - [History Trend]() - if tests accumulated some historical data, it’s trend will be calculated and shown on the graph.

- 6 - [Categories](../useful_features#categories) - common information of defects.

- 7 - [Executors](../quick_start#executors) - information about how results was appeared.

Home page widgets are [draggable and configurable](../widgets). Also, Allure supports it’s own plugin system, so quite different widget layouts are possible.

Collapsible navigation bar contains tabs with more detailed description of the test results, see below.

## Categories

Categories tab gives you the way to [create custom defects classification](../useful_features#categories) to apply for test results.

![Categories](../images/tab_categories.png)

## Suites

On the Suites tab a standard structural representation of executed tests, grouped by [suites]() and classes can be found.

![Suites](../images/tab_suites.png)

## Graphs

Graphs allow you to see different statistics collected from the test data: statuses breakdown or severity and duration diagrams.

![Graphs](../images/tab_graphs.png)

## Timeline

Timeline tab visualizes retrospective of tests execution, allure adaptors collect precise timings of tests, and here on this tab they are arranged accordingly to their sequential or parallel timing structure.

![Timeline](../images/tab_timeline.png)

## Behaviors

For Behavior-driven approach, this tab groups test results according to [Epic, Feature and Story tags]().

![Behaviors](../images/tab_behaviors.png)


## Packages

Packages tab represents a tree-like layout of test results, grouped by different [packages]().

![Packages](../images/tab_packages.png)


## Test result

From some of the results overview pages described above you can go to the test case page after clicking on the individual tests. This page will typically contain a lot of individual data related to the test case: steps executed during the test, timings, attachments, test categorization labels, descriptions and links (see more on [Test result](../test_result_page)).

![Test result page](../images/testcase.png)
