---
title: 'ScalaTest'
order: 1
---

This adapter allows to retrieve test execution data from
[ScalaTest](http://www.scalatest.org) framework and convert it to the
form suitable for [Allure report generation](https://github.com/allure-framework/allure-core/wiki#generating-report).

## Example project

Example project is located at:
<https://github.com/allure-framework/allure-scalatest-example>

## Installation, Configuration and Usage

**In order to use this adapter you need to have JDK 1.7+ installed.** To
enabled adapter simply add the following dependency to build.sbt:

```scala
libraryDependencies += "ru.yandex.qatools.allure" % "allure-scalatest_2.10" % "1.4.0-SNAPSHOT"
```


Then attach **AllureReporter** in build.sbt:

    testOptions in Test ++= Seq(
        Tests.Argument(TestFrameworks.ScalaTest, "-oD"),
        Tests.Argument(TestFrameworks.ScalaTest, "-C", "ru.yandex.qatools.allure.scalatest.AllureReporter")
    )

When using this adapter you can encounter the following warning:

    [ScalaTest-dispatcher] WARN ru.yandex.qatools.allure.utils.AllureResultsUtils - Can't set "com.sun.xml.bind.marshaller.CharacterEscapeHandler" property to given marshaller
    javax.xml.bind.PropertyException: name: com.sun.xml.bind.marshaller.CharacterEscapeHandler value: ru.yandex.qatools.allure.utils.BadXmlCharacterEscapeHandler@5e652b7b
        at javax.xml.bind.helpers.AbstractMarshallerImpl.setProperty(AbstractMarshallerImpl.java:358)
        at com.sun.xml.internal.bind.v2.runtime.MarshallerImpl.setProperty(MarshallerImpl.java:527)
        at ru.yandex.qatools.allure.utils.AllureResultsUtils.setPropertySafely(AllureResultsUtils.java:199)
        at ru.yandex.qatools.allure.utils.AllureResultsUtils.marshaller(AllureResultsUtils.java:171)
        at ru.yandex.qatools.allure.utils.AllureResultsUtils.writeTestSuiteResult(AllureResultsUtils.java:148)
        at ru.yandex.qatools.allure.Allure.fire(Allure.java:180)
        at ru.yandex.qatools.allure.scalatest.AllureReporter.testSuiteFinished(AllureReporter.scala:74)
        at ru.yandex.qatools.allure.scalatest.AllureReporter.apply(AllureReporter.scala:46)
        at org.scalatest.DispatchReporter$Propagator$$anonfun$run$1.apply(DispatchReporter.scala:240)
        at org.scalatest.DispatchReporter$Propagator$$anonfun$run$1.apply(DispatchReporter.scala:239)
        at scala.collection.immutable.List.foreach(List.scala:318)
        at org.scalatest.DispatchReporter$Propagator.run(DispatchReporter.scala:239)
        at java.lang.Thread.run(Thread.java:744)

This is related to incompatible JAXB versions used in Allure and
Scalatest so you can safely ignore it.

## How to generate report

This adapter only generates XML files containing information about
tests. See \[wiki section\]
(<https://github.com/allure-framework/allure-core/wiki#generating-report>)
on how to generate report.

## Publishing to Sonatype (adapter development)

A publicly available (on public keyserver) GPG key should be present in
you default GPG keyring. You need to create **sonatype.sbt** file in
**~/.sbt/&lt;sbt-version&gt;/**:

    credentials += Credentials("Sonatype Nexus Repository Manager",
                               "oss.sonatype.org",
                               "login",
                               "password")

To publish simply run:

    $ sbt publish-signed
