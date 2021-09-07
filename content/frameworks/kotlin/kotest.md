---
title: 'Kotest'
order: 1
---

Kotest support is maintained at the Kotest framework repository - https://github.com/kotest/kotest

## Installation

The latest versions of adapters:

- Kotest plugin `kotest-extensions-allure`:
![Kotest allure extension](https://img.shields.io/maven-central/v/io.kotest/kotest-extensions-allure.svg)

- Maven support `allure-maven`:
![Allure Maven](https://img.shields.io/maven-central/v/io.qameta.allure/allure-maven.svg)

- Gradle support `allure-gradle`:
![Allure Gradle](https://img.shields.io/bintray/v/qameta/maven/allure-gradle.svg?style=flat)

To use allure with Kotest requires two steps. The first is to use the gradle or maven plugin and the second is to configure the kotest allure reporter.



## Gradle

For Gradle users, the `allure-gradle` plugin is available:

```groovy
plugins {
   id("io.qameta.allure") version "2.8.1"
}

allure {
   version = '2.13.1'
   autoconfigure = false
}

dependencies {
    testImplementation("io.kotest:kotest-extensions-allure:LATEST_VERSION")
}
```

Then run the build as usual:

    $ ./gradlew clean check


Allure results will appear in **build/allure-results** folder. To generate html report and automatically open it in a web browser, run the following command:

    $ ./gradlew allureServe build/allure-results


## Maven

Add the following to your *pom.xml*:

**pom.xml.**

```xml
<dependencies>
        <dependency>
            <groupId>io.qameta.allure</groupId>
            <artifactId>kotest-extensions-allure</artifactId>
            <version>LATEST_VERSION</version>
            <scope>test</scope>
        </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.21</version>
            <configuration>
                <testFailureIgnore>false</testFailureIgnore>
            </configuration>
        </plugin>
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>LATEST_VERSION</version>
            <configuration>
                <reportVersion>2.13.1</reportVersion>
            </configuration>
        </plugin>
    </plugins>
</build>
...
```

Then run the build as usual:

    $ mvn clean test


### Configure Reporter

Add the reporter to project config. If you do not have project config, create a class like the following and
place anywhere in test sources.

```kotlin
class MyConfig : AbstractProjectConfig {
    override fun listeners() = listOf(AllureTestReporter())
}
```
