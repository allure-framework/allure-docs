---
title: 'Gradle'
order: 5
---

Allure plugin for Gradle allows integration of Allure listeners into
TestNG, Junit4, Cucumber JVM and Spock frameworks in your Gradle-based
projects, and also provides several tasks for building a single-project
or multi-project report.

## Autoconfiguration for Junit4 and TestNG

Plugin is able to use Gradle integration for Junit4 and TestNG, so in
case you are using one of this frameworks, configuration will look very
simple:

```groovy
buildscript {

    repositories {
        jcenter()
    }
    
    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

plugins {
    id 'io.qameta.allure'
}

allure {
    version = '2.2.1'
    autoconfigure = true
 }
```

Here you will need only two parameters: `autoconfigure` - it is a flag
that enables framework detection. If you enable it, plugin will
automatically add the right listener and a dependency for aspectjweaver
runtime agent and `version` - parameter that specifies the Allure
Commandline to download and build a report with.

After you apply automatic configuration, Allure results obtained after
the `test` task execution will be stored in `build/allure-results`.

To build a report execute the `allure` Gradle task:

    ./gradlew clean build allure

Note, that if you don’t specify the version, plugin will not create any
Allure-related tasks. So if you only want to create results for further
processing, omit the `version` parameter.

## Configuration for a specific testing framework

Plugin provides a configuration closure parameter for 4 different
frameworks: Junit4, TestNG, Cucumber JVM and Spock.

Let’s see how the Spock-based build script will look:

```groovy
buildscript {

    repositories {
        jcenter()
    }

    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

plugins {
        id 'io.qameta.allure'
}

allure {
    version = '2.2.1'
    aspectjweaver = true

    useSpock {
        version = '2.0-BETA12'
    }
}
```

Here `aspectjweaver` flag is used to add a corresponding dependency for
runtime agent to your project, and `useSpock` configures a version for
Allure Spock adaptor dependency.

## Full configuration

```groovy
allure {
    version = '2.2.1'

    autoconfigure = false

    String allureJavaVersion = '2.0-BETA9'

    aspectjweaver = true

    boolean clean = true

    resultsDir = file('/path/to/project/module/build/allure-results')

    reportDir = file('build/reports/allure-report')

    String configuration = 'testCompile'

    useJunit4 {
       version = '2.0-BETA12'
    }

    useTestNG {
       version = '2.0-BETA12'
       spi-off = false
    }

    useCucumberJVM {
       version = '2.0-BETA12'
    }

    useSpock {
       version = '2.0-BETA12'
    }

    downloadLink = 'https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/2.2.1/allure-2.2.1.zip'
    // Allure >= 2.8.0 is no longer available on Bintray
    // downloadLink = 'https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.8.1/allure-commandline-2.8.1.zip'
}
```

-   **boolean** `autoconfigure` (`default = false`) - a flag to specify
    usage of autoconfiguration, plugin will attempt to find test
    platform integration provided by Gradle (currently works only for
    Junit4 and TestNG).

-   **boolean** `aspectjveaver` - a flag to specify inclusion/exclusion
    of aspectjweaver runtime agent

-   **boolean** `clean` (`default = true`) - enable `--clean` option for
    the Allure commandline tool, `true` by default.

-   **String** `version` - specify report generator version, note, this
    property is necessary to enable `allure` and
    `aggregatedAllureReport` tasks

-   **String** `configuration` (`default = 'testCompile'`) -
    configuration name where to bind plugin dependencies

-   **File** `resultsDir` - directory for Allure results in the current
    project, `build\allure-results` by default

-   **File** `reportDir` - directory for Allure report in the current
    project, `build\reports\allure-report` by default

-   **String** `allureJavaVersion` (`default = '2.0-BETA9'`) - version
    of allure java release to be used for autoconfiguration

-   **String** `downloadLink` - custom location of Allure distribution
    to download from, by default allure is downloaded from bintray by
    specified version and installed into `.allure` folder in the project
    root. To use Allure &gt;= 2.8.0, download URL must be configured to
    use Maven Central as Allure is no longer available on Bintray.

## Tasks

You can use some of the tasks that are defined in the plugin for your
own convenience.

### allure

Creates Allure report for a given list of input directories

Parameters:

-   **File** `reportDir` - destination directory for Allure report

-   **boolean** `clean` - enable `--clean` option for the Allure
    commandline tool

-   **String** `version` - Allure Commandline version, will attempt to
    discover an installation of commandline with this version in the
    `.allure` folder in the root of your project.

-   **List&lt;File&gt;** `resultsDirs` - list of directories with Allure
    results.

So to generate an Allure report for a multi-module project you will have
to define your own `allureAggregatedReport` task, for example:

```groovy
plugins {
    id 'io.qameta.allure'
}

allprojects { project ->

    apply plugin: 'io.qameta.allure'

    allure {
        version = '2.1.0'
    }
}

import io.qameta.allure.gradle.task.AllureReport

task allureAggregatedReport(type: AllureReport) {
    resultsDirs = subprojects.allure.resultsDir
}
```

And invoke it like: `./gradlew clean build allureAggregatedReport`

### downloadAllure

Downloads Allure Commandline from provided url and saves it into
`.allure` folder in your project’s root directory.

-   **String** `src` - url specifying download location for Allure
    Commandline.

-   **String** `version` - version parameter is needed to find the right
    version of Allure in the downloaded archive.

-   **File** `dest` - destination folder to install downloaded Allure
    Commandline.

`allure` task depends on `downloadAllure`, so in the default case there
is no need to invoke it manually, whenever `allure` task is invoked, it
will call `downloadAllure` first.

### serve

Can be used to generate and open report in the default browser after the
build.

-   **String** `version` - version to discover Allure Commandline
    installation in the `.allure/version`

-   **List&lt;File&gt;** `resultsDirs` - list of folders with results.

By default `serve` task is configured by plugin for a single-module
report and when executed will open it in the default browser.

usage example: `./gradlew clean build serve`
