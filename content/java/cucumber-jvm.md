# Cucumber JVM

## Installation

Each major version of Cucumber JVM requires a particular version of
Allure Cucumber JVM adapter.

The available latest version of adapters:

-   Cucumber JVM 1.x - `allure-cucumber-jvm` ![Allure Cucumber JVM
    1.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber-jvm.svg)

-   Cucumber JVM 2.x - `allure-cucumber2-jvm` ![Allure Cucumber JVM
    2.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber2-jvm.svg)

-   Cucumber JVM 3.x - `allure-cucumber3-jvm` ![Allure Cucumber JVM
    3.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber3-jvm.svg)

-   Cucumber JVM 4.x - `allure-cucumber4-jvm` ![Allure Cucumber JVM
    4.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber4-jvm.svg)

### Maven

Simply add `allure-cucumber4-jvm` plugin as a dependency to your project
and add it to CucumberOptions:

**pom.xml.**

```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-cucumber4-jvm</artifactId>
        <version>LATEST_VERSION</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                <argLine>
                    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                    -Dcucumber.options="--plugin io.qameta.allure.cucumber4jvm.AllureCucumber4Jvm"
                </argLine>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.aspectj</groupId>
                    <artifactId>aspectjweaver</artifactId>
                    <version>${aspectj.version}</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

Then execute `mvn clean test` goal. After tests executed allure JSON
files will be  
placed in `allure-results` directory by default.

## Features

This adapter provides runtime integration allowing conversion of Gherkin
dsl features into basic Allure features

### Display Name

Titles for tests and suites are extracted at runtime from `.feature`
files

### Description

Feature’s description appears on every scenario

### Steps

All scenario steps are automatically translated into allure steps

### Attachments

An attachment in Java code is simply a method annotated with
**@Attachment** that returns either a **String** or **byte\[\]**, which
should be added to the report:

```java
import io.qameta.allure.Attachment;

...

@Attachment
public String performedActions(ActionSequence actionSequence) {
    return actionSequence.toString();
}

@Attachment(value = "Page screenshot", type = "image/png")
public byte[] saveScreenshot(byte[] screenShot) {
    return screenShot;
}
```

Or you can use Allure helper methods

```java
import io.qameta.allure.Allure;

...

Allure.addAttachment("My attachment", "My attachment content");

Path content = Paths.get("path-to-my-attachment-contnet");
try (InputStream is = Files.newInputStream(content)) {
    Allure.addAttachment("My attachment", is);
}
```

If return type in a method annotated with **@Attachment** differs from
**String** or **byte\[\]** we call **toString()** on return value to get
attachment contents.

You can specify exact MIME type for each attached file using **type**
parameter of **@Attachment** annotation like shown above. However
there’s no need to explicitly specify attachment type for all attached
files as Allure by default analyses attachment contents and can
determine attachment type automatically. You usually need to specify
attachment type when working with plain text files.

### Links

To pass issues to report, just add `@issue=<ISSUE-NUMBER>` on top of
Scenario on Feature in your .feature file.

To pass TMS links to report, just add `@tmsLink=<TEST-CASE-ID>` on top
of Scenario on Feature in your .feature file.

do not forget to configure allure properties with link patterns.

### Severity

To set severity, add `@severity=blocker` on top of Scenario on Feature
in your .feature file.  
If severity has wrong value it will be forced to normal (default).

Supported severity values: `blocker`, `critical`, `normal`, `minor`,
`trivial`.

### Test markers

Every Feature or Scenario can be annotated by following tags: `@flaky`,
`@muted`, `@known`

### Test fixtures

All methods annotated by `@import cucumber.api.java.After` or
`@cucumber.api.java.Before` annotations  
will appear in the report as steps with method names.  
If @Before execution fails, the scenario will be marked as skipped.  
If @After execution fails, the scenario will be marked as passed, and
only `After` method’s step  
will be marked as failed.

### Behaviours Mapping

Allure Cucumber JVM integration uses information extracted from
`Feature:` section.

### Configuration

Location of `allure-results` directory, and patterns for `@TmsLink` and
`@Issue` links can be set by placing `allure.properties` file with
following properties to resources directory: `src/test/resources`

**allure.properties.**

```properties
allure.results.directory=target/allure-results
allure.link.issue.pattern=https://example.org/browse/{}
allure.link.tms.pattern=https://example.org/browse/{}
```

Or by setting system properties in `pom.xml`

**pom.xml.**

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                ...
                <systemPropertyVariables>
                    <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
                    <allure.link.issue.pattern>https://example.org/browse/{}</allure.link.issue.pattern>
                    <allure.link.tms.pattern>https://example.org/browse/{}</allure.link.tms.pattern>
                </systemPropertyVariables>
            </configuration>
            ...
        </plugin>
    </plugins>
</build>
```
