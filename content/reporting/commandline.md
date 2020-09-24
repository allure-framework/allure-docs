# Commandline

Using Allure command line tool you can generate the report from existing
Allure results.

## Installation

Allure CLI is a Java application so it’s available for all platforms.
You have to manually install Java 1.8 before using Allure CLI

### Mac OS

You can install Allure CLI via [Homebrew](http://brew.sh).

```shell script
$ brew tap qameta/allure
$ brew install allure
```

After installation you will have **allure** command available. Read more
about [Allure Homebrew Formula](https://formulae.brew.sh/formula/allure).

### Debian

For Debian-based repositories we provide a PPA so the installation is
straightforward:

```shell script
$ sudo apt-add-repository ppa:yandex-qatools/allure-framework
$ sudo apt-get update
$ sudo apt-get install allure-commandline
```

Supported distributions are: [Trusty](http://releases.ubuntu.com/14.04)
and [Precise](http://releases.ubuntu.com/12.04). After installation you
will have allure command available. Read more about [Allure Debian Package](https://github.com/allure-framework/allure-debian).

### Windows and other Unix

-   Download the latest version as zip archive from [Maven Central](http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/).
-   (older releases, ⇐ 2.8.0) Download the desired version as zip
    archive from [bintray](https://bintray.com/qameta/generic/allure2).
-   Unpack the archive to **allure-commandline** directory.
-   Navigate to **bin** directory.
-   Use **allure.bat** for Windows and **allure** for other Unix platforms.
-   Add **allure** to system PATH.

## Command line arguments

There are an options you can use directly from command line. To show
them, execute the command

    $ allure help

## Usage

There is few commands available.

### Generate the report

To generate the report from existing Allure results you can use the
following command:

    $ allure generate <directory-with-results>

The report will be generated to **allure-report** folder. You can change
the destination folder using **-o** flag:

    $ allure generate <directory-with-results> -o <directory-with-report>

For more information use the **allure help generate** command.

### Open the report

When the report is generated you can open it in your default system
browser. Simply run

    $ allure open <directory-with-report>

You can also use `allure serve` command, to generate the report to
temporary folder and open it.

### Clean the report

If you want to remove the generated report data use **allure report
clean** command.

By default the report commands will looking for the report in
**allure-results** folder. If you are want to use the report from
different location you can use **-o** option.
