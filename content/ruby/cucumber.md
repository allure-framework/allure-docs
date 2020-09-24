# Cucumber

This page describes Allure adaptor usage for
[Cucumber](http://cukes.info/) framework.

## Installation

Add this line to your application’s Gemfile:

    gem 'allure-cucumber'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install allure-cucumber

## Configuration

By default, Allure XML files are stored in `gen/allure-results`. To
change this add the following in `features/support/env.rb` file:

```ruby
AllureCucumber.configure do |c|
   c.output_dir = "/output/dir"
end
```


By default, the Allure XML files from earlier runs are deleted at the
start of new run. This can be disabled by:

```ruby
AllureCucumber.configure do |c|
  c.clean_dir  = false
end
```

By default, allure-cucumber will analyze your cucumber tags looking for
Test Management, Issue Management, and Severity hooks. These hooks will
be displayed in the generated allure report (see allure-core for further
info).

```ruby
DEFAULT_TMS_PREFIX      = '@TMS:'
DEFAULT_ISSUE_PREFIX    = '@ISSUE:'
DEFAULT_SEVERITY_PREFIX = '@SEVERITY:'
```

Example:

```ruby
@SEVERITY:trivial @ISSUE:YZZ-100 @TMS:9901
Scenario: Leave First Name Blank
  When I register an account without a first name
  Then exactly (1) [validation_error] should be visible
```

You can configure what allure-cucumber looks for by making the following
changes

```ruby
AllureCucumber.configure do |c|
  c.clean_dir  = false
  c.tms_prefix      = '@HIPTEST--'
  c.issue_prefix    = '@JIRA++'
  c.severity_prefix = '@URGENCY:'
end
```

Example:

```ruby
@URGENCY:critical @JIRA++YZZ-100 @HIPTEST--9901
Scenario: Leave First Name Blank
  When I register an account without a first name
  Then exactly (1) [validation_error] should be visible
```

## Usage

Put the following in your `features/support/env.rb` file:

    require 'allure-cucumber'

Use `--format AllureCucumber::Formatter --out where/you-want-results`
while running cucumber or add it to `cucumber.yml`

You can also [attach
screenshots](https://github.com/allure-framework/allure-core/wiki/Glossary#attachment),
logs or test data to
[steps](https://github.com/allure-framework/allure-core/wiki/Glossary#test-step).

```ruby
#file: features/support/env.rb
include AllureCucumber::DSL
attach_file(title, file)
```

## How to generate report

This adapter only generates XML files containing information about
tests. See [wiki
section](https://github.com/allure-framework/allure-core/wiki#generating-report)
on how to generate report.
