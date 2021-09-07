---
title: 'Maven'
order: 6
---

This plugin generates Allure report by [existing XML files](https://github.com/allure-framework/allure-core/wiki#gathering-information-about-tests)
during the Maven build process.

## Installation

Add allure-maven-plugin to your pom.xml file build section.

**pom.xml.**

```xml
<project>
    ...
    <plugin>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-maven</artifactId>
        <version>2.8</version>
    </plugin>
    ...
</project>
```

## Configuration

### Properties handling

Since 2.5 report generation is configurable. There are a few ways to do
it:

### Directly from source code

Put **allure.properties** (**report.properties** for Allure 1.5 or
above) to classpath. Both compile **class** path and **test class** path
are supported.

### Or specify the **properties** in configuration

**pom.xml.**

```xml
<plugin>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-maven</artifactId>
    <configuration>
       <properties>
           <allure.issues.tracker.pattern>http://example.com/%s</allure.issues.tracker.pattern>
       </properties>
    </configuration>
</plugin>
```

### Or specify the **propertiesFilePath**

**pom.xml.**

```xml
<configuration>
   <propertiesFilePath>path/to/your/allure.properties</propertiesFilePath>
</configuration>
```

### Report version

Since 2.6, the plugin constructs a report using Allure which is
downloaded from the default
[url](https://dl.bintray.com/qameta/generic/io/qameta/allure/allure).
Allure is extracted and placed into the **.allure** folder created in
your project directory.

The default Allure version is **2.7.0**

**pom.xml.**

```xml
<configuration>
    <reportVersion>2.7.0</reportVersion>
</configuration>
```

You can use Allure &gt;= 2.8.0 if you configure both **reportVersion**
and **allureDownloadUrl** (see above) accordingly.

You can specify your own url for the download, or you can specify a file
path using the system property **allure.download.url**. (%s are replaced
by **reportVersion** configuration)

**pom.xml.**

```xml
<configuration>
    <!-- Allure < 2.7.0 (default value): download from Bintray -->
    <allureDownloadUrl>https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/%s/allure-%s.zip</allureDownloadUrl>
    <!-- Allure >= 2.8.0: download from Maven Central -->
    <!-- <allureDownloadUrl>https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/%s/allure-commandline-%s.zip</allureDownloadUrl> -->
    <!-- Custom URL -->
    <!-- <allureDownloadUrl>https://example.com/allure/allure-2.0.1.zip</allureDownloadUrl> -->
</configuration>
```

### Results Directory

The path to Allure results directory. In general it is the directory
created by allure adaptor and contains allure files and attachments.
This path can be relative from the build directory (for maven it is the
target directory) or absolute (absolute only for report mojo).

Default value is **"allure-results"**.

System property **allure.results.directory**.

**pom.xml.**

```xml
<configuration>
    <reportDirectory>allure-report</reportDirectory>
</configuration>
```

## Usage

You can generate a report using one of the following command:

    mvn allure:serve

Report will be generated into temp folder. Web server with results will
start. You can additionally configure the server timeout. The default
value is **"3600"** (one hour).

System property **allure.serve.timeout**.

    mvn allure:report

Report will be generated tо directory: **target/site/allure-maven/index.html**
