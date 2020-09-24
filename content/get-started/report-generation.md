# Report generation

This is already enough to see the Allure report in one command:

`allure serve /home/path/to/project/target/surefire-reports/`

Which generates a report in temporary folder from the data found in the
provided path and then creates a local Jetty server instance, serves
generated report and opens it in the default browser. It is possible to
use a **--profile** option to enable some pre-configured allure setting.
**junit** profile is enabled by default, you will learn more about
profiles in the following [section](/allure/reporting/commandline).

This would produce a report with a minimum of information extracted from
the xml data that will lack nearly all of the advanced allure features
but will allow you to get a nice visual representation of executed
tests.

![Report generated on xml data](../../images/get_started_report_overview.png)
