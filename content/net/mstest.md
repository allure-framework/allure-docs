# MSTest

**MSTestAllureAdapter** allows you convert an MSTest trx file to the
XMLs from which an Allure report can be generated.

Because MSTest does not have an extension or hook mechanism this adapter
cannot run as part of MSTest but instead it converts the resulting trx
file to the xml format expected by allure.

It is a .NET/Mono based console application.

## Usage

    MSTestAllureAdapter.Console.exe <TRX file> [output target dir]

If '\[output target dir\]' is missing the reslts are saved in the
current directory in a folder named 'results'.

    $ mono MSTestAllureAdapter.Console.exe sample.trx

This will generate the xml files from which the allure report can be
created based upon the 'sample.trx' file.

    $ mono MSTestAllureAdapter.Console.exe sample.trx output-xmls

This will generate the xml files from which the allure report can be
created in a folder named 'output-xmls' based upon the 'sample.trx'
file.

If the target directory does not exists it is created.

To generate a report using [allure-cli](https://github.com/allure-framework/allure-cli/releases/tag/allure-cli-2.1):

    $ allure generate output-xmls -v 1.4.0
