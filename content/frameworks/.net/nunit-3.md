---
title: 'NUnit 3'
order: 1
---

## Installation and usage

1.  Download [NUnit.Allure](https://www.nuget.org/packages/NUnit.Allure/) NuGet package
2.  Configure **AllureConfig.json**
3.  Add **\[AllureNUnit\]** attribute to test clases where you want to
    use Allure. Add more attributes to tests if there’s a need.
4.  Run tests with any test runner. Generated Allure reports will appear
    in directory you configured with AllureConfig.json

## Config samples

allureConfig.json sample
```json
{
  "allure": {
    "directory": "allure-results",
    "links": [
      "{link}",
      "https://testrail.com/browse/{tms}",
      "https://jira.com/browse/{issue}"
    ]
  },
  "specflow": {
    "stepArguments": {
      "convertToParameters": "true",
      "paramNameRegex": "",
      "paramValueRegex": ""
    },
    "grouping": {
      "suites": {
        "parentSuite": "^parentSuite:?(.+)",
        "suite": "^suite:?(.+)",
        "subSuite": "^subSuite:?(.+)"
      },
      "behaviors": {
        "epic": "^epic:?(.+)",
        "story": "^story:(.+)"
      }
    },
    "labels": {
      "owner": "^author:?(.+)",
      "severity": "^(normal|blocker|critical|minor|trivial)"
    },
    "links": {
      "tms": "^story:(.+)",
      "issue": "^issue:(.+)",
      "link": "^link:(.+)",
    }
  }
}
```

## Test sample
```CSharp
[TestFixture]
[AllureNUnit]
[AllureDisplayIgnored]
class TestClass
{
    [Test(Description = "XXX")]
    [AllureTag("Regression")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureIssue("ISSUE-1")]
    [AllureTms("TMS-12")]
    [AllureOwner("User")]
    [AllureSuite("PassedSuite")]
    [AllureSubSuite("NoAssert")]
    public void TestSample()
    {
        Console.WriteLine(DateTime.Now);
    }
}
```

## Links
-   [Allure CSharp](https://github.com/allure-framework/allure-csharp/wiki/Allure.Commons)
-   [Allure SpecFlow](https://github.com/allure-framework/allure-csharp/wiki/SpecFlow-Adapter)
-   [Allure NUnit 3](https://github.com/unickq/allure-nunit/wiki)
