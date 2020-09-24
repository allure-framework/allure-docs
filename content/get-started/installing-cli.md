# Installing a commandline

Several options for Allure installation are currently supported:

## Linux

For debian-based repositories a PPA is provided:

```shell script
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update     
sudo apt-get install allure
```

## Mac OS X

For Mas OS, automated installation is available via
[Homebrew](https://brew.sh)

```shell script
brew install allure
```

## Windows

For Windows, Allure is available from the [Scoop](http://scoop.sh/)
commandline-installer.

To install Allure, download and install Scoop and then execute in the
Powershell:

```shell script
scoop install allure
```

Also Scoop is capable of updating Allure distribution installations. To
do so navigate to the Scoop installation directory and execute

    \bin\checkver.ps1 allure -u

This will check for newer versions of Allure, and update the manifest
file. Then execute

```shell script
scoop update allure
```
    
to install a newer version.
([documentation](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate))

## Manual installation

1.  Download the latest version as zip archive from [Maven Central](https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/).
2.  Unpack the archive to allure-commandline directory.
3.  Navigate to **bin** directory.
4.  Use **allure.bat** for Windows or **allure** for other Unix
    platforms.
5.  Add **allure** to system PATH.

To run commandline application, Java Runtime Environment must be
installed.

Older releases (⇐ 2.8.0) are available on
[bintray](https://bintray.com/qameta/generic/allure2).

## Check the installation

Execute `allure --version` in console to make sure that allure is now
available:

```shell script
$ allure --version
2.0.1
```
