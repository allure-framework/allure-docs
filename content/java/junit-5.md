# jUnit 5

## Installation

The latest available version of `allure-junit5`:
![Allure JUnit5](https://img.shields.io/maven-central/v/io.qameta.allure/allure-junit5.svg)

The latest available version of `allure-maven`:
[ ![Allure Maven](https://api.bintray.com/packages/qameta/maven/allure-maven/images/download.svg) ](https://bintray.com/qameta/maven/allure-maven/_latestVersion)

The latest available version of `allure-gradle`:
[ ![Allure Gradle](https://api.bintray.com/packages/qameta/maven/allure-gradle/images/download.svg) ](https://bintray.com/qameta/maven/allure-gradle/_latestVersion)

### Maven

Add the following to your **pom.xml**:

**pom.xml.**

```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
        <dependency>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-junit5</artifactId>
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
                        <argLine>
                            -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                        </argLine>
                    <systemProperties>
                        <property>
                            <name>junit.jupiter.extensions.autodetection.enabled</name>
                            <value>true</value>
                        </property>
                    </systemProperties>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.junit.platform</groupId>
                        <artifactId>junit-platform-surefire-provider</artifactId>
                        <version>1.2.0</version>
                    </dependency>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjweaver</artifactId>
                        <version>${aspectj.version}</version>
                    <dependency>
                </dependencies>
            </plugin>
            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>LATEST_VERSION</version>
                <configuration>
                    <reportVersion>2.4.1</reportVersion>
                </configuration>
            </plugin>
    </plugins>
</build>
...
```


Then run the build as usual:

    $ mvn clean test

### Gradle

For Gradle users, the `allure-gradle` plugin is available. The plugin
autoconfigures all of the required dependencies:

**build.gradle.**

```groovy
plugins {
    id 'io.qameta.allure' version '2.5' // Latest Plugin Version
    id 'java'
}

allure {
    autoconfigure = true
    version = '2.7.0'  // Latest Allure Version

    useJUnit5 {
        version = '2.7.0' // Latest Allure Version
    }

}

sourceCompatibility = 1.8

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    testImplementation(
            'org.junit.jupiter:junit-jupiter-api:5.2.0'
    )
    testRuntimeOnly(
            'org.junit.jupiter:junit-jupiter-engine:5.2.0'
    )
}

test {
    useJUnitPlatform()
}
```


Then run the build as usual:

    $ ./gradlew clean test

Allure results will appear in **allure-results** folder under the
project root. To generate html report and automatically open it in a web
browser, run the following command:

    $ ./gradlew allureServe

## Features

Java annotations and traits are available to use the main Allure
features.

### DisplayName

**@DisplayName** annotation has been removed.

### Description

Similarly you can add detailed description for each test method. To add
such description use **@Description** annotation:

```java
package my.company.tests;

import org.junit.Test;
import io.qameta.allure.Description;

@Test
public class MyTests {

    @Test
    @Description("Some detailed test description")
    public void testSomething() throws Exception {
        ...
    }

}
```

### Steps

Steps are any actions that constitute a testing scenario. Steps can be
used in different testing scenarios. They can: be parametrized, make
checks, have nested steps, and create attachments. Each step has a name.

In order to define steps in Java code, you need to annotate the
respective methods with **@Step** annotation. When not specified, the
step name is equal to the annotated method name.

Note that steps' mechanics was revised and now it supports smart fields'
analysis. In Allure 1 users had to specify indexes to refer which args'
values they want to inject into step. Allure 2 uses reflection-based
approach, which provides deep fields' extraction by their names.

Assuming that you have the following entity:

```java
public class User {

     private String name;
     private String password;
     ...
}
```


You can access these fields' values directly by name:

```java
import io.qameta.allure.Step;

...

@Step("Type {user.name} / {user.password}.")
public void loginWith(User user) {
     ...
}
```

**Arrays** and **Collections** are supported as well. So you don’t need
to explicitly override **toString()** for your custom objects anymore.

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

ou can link your tests to some resources such as TMS (test management
system) or bug tracker.

```java
import io.qameta.allure.Link;
import io.qameta.allure.Issue;
import io.qameta.allure.TmsLink;

@Link("https://example.org")
@Link(name = "allure", type = "mylink")
public void testSomething() {
     ...
}

@Issue("123")
@Issue("432")
public void testSomething() {
     ...
}

@TmsLink("test-1")
@TmsLink("test-2")
public void testSomething() {
     ...
}
```

In order to specify the link pattern you can use the system property in
the following format:
`allure.link.my-link-type.pattern=https://example.org/custom/{}/path`.
Allure will replace `{}` placeholders with value specified in
annotation. For example:

```properties
allure.link.mylink.pattern=https://example.org/mylink/{}
allure.link.issue.pattern=https://example.org/issue/{}
allure.link.tms.pattern=https://example.org/tms/{}
```

### Severity

**@Severity** annotation is used in order to prioritize test methods by
severity:

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;

public class MyTest {

    @Test
    @Severity(SeverityLevel.CRITICAL)
    public void testSomething() throws Exception {
        // ...
    }

}
```

### Behaviours Mapping

In some development approaches tests are classified by Features and
Stories. To add such mapping you can use `Epic`, `Feature` and `Stories`
annotations:

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@Epic("Allure examples")
@Feature("Junit 4 support")
public class MyTest {

    @Test
    @Story("Base support for bdd annotations")
    @Story("Advanced support for bdd annotations")
    public void testSomething() throws Exception {
        // ...
    }

}
```
