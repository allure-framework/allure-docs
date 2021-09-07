---
title: 'Selenide'
order: 5
---

## Installation

The available latest version of `allure-selenide`:

![Allure Selenide](https://img.shields.io/maven-central/v/io.qameta.allure/allure-selenide.svg)

### Maven

You need to add the following to your **pom.xml**:

**pom.xml.**

```xml
<dependencies>
    ...
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-selenide</artifactId>
        <version>LAST_VERSION</version>
        <scope>test</scope>
    </dependency>
    ...
</dependencies>
```

### Gradle

**build.gradle.**

```groovy
...
compile group: 'io.qameta.allure', name: 'allure-selenide', version: '2.0-BETA22'
...
```

### Listener

And add listener to Selenide:

```java
import io.qameta.allure.selenide.AllureSelenide;
...
SelenideLogger.addListener("AllureSelenide", new AllureSelenide().screenshots(true).savePageSource(false));
```
