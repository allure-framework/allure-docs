# Writing a skeleton code for a new plugin.

Here we will cover the steps that it usually takes to build a new
plugin.

## Step 1: Create a new plugin project

**Plugin structure**

Basically, any plugin will be constituted of two main parts:

-   **Java classes** that process the report data and produce some
    results in the report folder.

-   **JS script** that takes stored results and creates a representation
    for them on the report’s front-end side, e.g. a widget or an
    additional tab.

Typical structure of a plugin module would look like this:

    /my-plugin
        /src
            /dist
                /static
                allure-plugin.yml
            /main
                /java
                    /my.company.plugin
        build.gradle

Here in `src/dist/static` all the static `.js` and `.css` files are
stored, and everything under `src/main/java` is a data processing Java
code. `allure-plugin.yml` - is a configuration file.

**Contents of allure-plugin.yml file**

This file contains directives in human-readable format that plugin
loader will further use to locate resources and connect the plugin.

**allure-plugin.yml.**

```yaml
id: my-plugin
name: Plugin name goes here
description: More detailed explanation of what does this plugin do.
extensions:
- my.company.allure.CustomPlugin // - Fully qualified names of classes that implement `Extension` interface and comprise data processing functionality.
- my.company.allure.CustomWidget
jsFiles:
- index.js
cssFiles:
- styles.css
```

**Adding allure-plugin-api dependency**

To be able to use the API you should simply download the
`allure-plugin-api` dependency
[from](https://mvnrepository.com/artifact/io.qameta.allure/allure-plugin-api)
the jcenter repository. To do so add to your project build script:

in Gradle:

```groovy
dependencies {
    compileOnly('io.qameta.allure:allure-plugin-api:${allureVersion}')
}
```

in Maven:

```xml
<dependency>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-plugin-api</artifactId>
    <version>${allureVersion}</version>
    <scope>provided</scope>
</dependency>
```

## Step 2: Writing a Java class that processes test results

Let’s consider we have some very simple set of parameterized tests,
where typical result will contain captured arguments of test case in the
`parameters` section.

```json
{
  "uuid":"0edd28b1-3c7f-4593-8dda-db9aa004891f",
  "fullName":"io.qameta.allure.animals.AnimalsTest.angryCat",
  "name":"angryCat",
  "status":"passed",
  "stage":"finished",
  "start":1495467840415,
  "stop":1495467840416,
  "parameters":[
    {
      "name":"arg0",
      "value":"Hiss!"
    }
  ]
}
```

We are preparing to write a fully-fledged new plugin that adds a new tab
with some test results representation and creates a widget to place on
Overview tab with some digested data. For example, let’s consider a
plugin that extracts passed and failed parameters from this
parameterized tests, creates a new tab, and a widget where only recent
failures are displayed.

We should start with writing a Java class that implements `Aggregator`
and `Widget` interfaces.

**MyPlugin.java.**

```java
public class MyPlugin implements Aggregator, Widget {

    @Override
    public void aggregate(final Configuration configuration,
                          final List<LaunchResults> launches,
                          final Path outputDirectory) throws IOException {
    final JacksonContext jacksonContext = configuration
        .requireContext(JacksonContext.class);
    final Path dataFolder = Files.createDirectories(outputDirectory.resolve("data"));
    final Path dataFile = dataFolder.resolve("myplugindata.json");
    final Stream<TestResult> resultsStream = launches.stream()
        .flatMap(launch -> launch.getAllResults().stream());
    try (OutputStream os = Files.newOutputStream(dataFile)) {
        jacksonContext.getValue().writeValue(os, extractData(resultsStream));
    }
    }

    private Collection<Map> extractData(final Stream<TestResult> testResults) {
        //extraction logic
    }

    @Override
    public Object getData(Configuration configuration, List<LaunchResults> launches) {
        Stream<TestResult> filteredResults = launches.stream().flatMap(launch -> launch.getAllResults().stream())
                .filter(result -> result.getStatus().equals(Status.FAILED));
        return extractData(filteredResults);
    }

    @Override
    public String getName() {
        return "mywidget";
    }
}
```

What is happening in the code above?

1.  In `aggregate` method, data that is extracted from test results in
    the `extractData` method is written to the `myplugindata.json` file
    that is stored in the report’s `data` folder. To create a proper
    .json file a `JacksonContext` is used to obtain a mapper instance.
    This data will be displayed on the new tab.

2.  `getData` method implementation creates data to be used in the new
    widget, and `getName` method defines name of the entry for the
    `widgets.json` file where this data will be stored.

**myplugindata.json.**

```json
[ {
  "sounds" : [ "Growl!", "Hiss!" ],
  "name" : "angryCat"
}, {
  "sounds" : [ "Oink!", "Meow!" ],
  "name" : "hungryCat"
}, {
  "sounds" : [ "Bark!", "Woof!", "Moo!" ],
  "name" : "bigDog"
} ]
```

**widgets.json.**

```json
...
"mywidget" : [ {
    "sounds" : [ "Oink!" ],
    "name" : "hungryCat"
  }, {
    "sounds" : [ "Moo!" ],
    "name" : "bigDog"
  } ],
...
```

## Adding an utility Context class

Your plugins may require to share some common utilities that would be
wise to make available in on-demand manner. A quick example of such an
utility class would be `JacksonContext`, which can be used to obtain a
mapper to serialize Java objects with data into the report JSON files.

```java
public class JacksonContext implements Context<ObjectMapper> {

    private final ObjectMapper mapper;

    public JacksonContext() {
        this.mapper = new ObjectMapper()
                .configure(MapperFeature.USE_WRAPPER_NAME_AS_PROPERTY_NAME, true)
                .setAnnotationIntrospector(new JaxbAnnotationIntrospector(TypeFactory.defaultInstance()))
                .enable(SerializationFeature.INDENT_OUTPUT)
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @Override
    public ObjectMapper getValue() {
        return mapper;
    }
}
```

Then, from a plugin class it can be accessed from `Configuration`
instance as in the Step 2.

## Step 3: Adding a new tab for the report

Here we switch to the front-end side of the Allure report and start with
adding some JavaScript code to the `index.js` file.

Backbone manages data with [Models](http://backbonejs.org/#Model) or
[Collections](http://backbonejs.org/#Collection), on the previous step
we saved the data for our page as a Collection&lt;Map&gt;, so the model
for the tab should extend `Backbone.Collection`. This object will
contain the data from the file, specified in the `url`. Then, for your
new tab you need to extend a [View](http://backbonejs.org/#View) class
from the base `AppLayout` class that already contains report’s left
navigational menu. It is provided in the global `allure` object:

```js
var MyTabModel = Backbone.Collection.extend({
    url: 'data/myplugindata.json'
})

class MyLayout extends allure.components.AppLayout {

    initialize() {
        this.model = new MyTabModel();
    }

    loadData() {
        return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model.models});
    }
}
```
    
In `MyLayout` class you can override a `getContentView` method to define
some other View class that will manage the contents of your tab. Below
is some simplistic implementation of the View class, `template` is some
template function that returns html template with added data.

```js
const template = function (data) {
    html = '<h3 class="pane__title">My Tab</h3>';
    for (var item of data.items) {
        html += '<p>' + item.attributes.name + ' says: ' + item.attributes.sounds + '</p>';
    }
    return html;
}

var MyView = Backbone.Marionette.View.extend({
    template: template,

    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    }
})
```

After all that add `addTab` function call would look like this:

```js
allure.api.addTab('mytab', {
    title: 'My Tab', icon: 'fa fa-trophy',
    route: 'mytab',
    onEnter: (function () {
        return new MyLayout()
    })
});
```

Which will finally give you a new tab:

![Hello world tab example](../../images/plugins_add_tab_example.png)

## Step 4: Adding a new widget on the Overview page

To create a new widget you need to implement a small View class that
manages data that you put into `widgets.json` on the step 2. Note, that
if you return the data from `getData` as a collection, it will
subsequently be provided to the widget as an array, that can be obtained
as `this.model.get('items')`. In the code below `template` function
defines the actual html to be displayed in the widget.

**index.js.**

```js
class MyWidget extends Backbone.Marionette.View {

    template(data) {
            return widgetTemplate(data)
    }

    serializeData() {
        return {
            items: this.model.get('items'),
        }
    }
}

allure.api.addWidget('mywidget', MyWidget);
```

This finally gives us a new widget on the Overview dashboard.

![A new widget on the Overview](../../images/plugins_add_widget_example.png)

## Step 5: Adding translation for strings

Returning to the tab example, it’s very easy to enable translated
strings in it. In templates you need to substitute plain text strings
for placeholders and use `translate` function, and also you need to
register translations via `addTranslation`.

```js
const template = function (data) {
    html = '<h3 class="pane__title">' + allure.api.translate(mytab.name) + '</h3>';
    for (var item of data.items) {
        html += '<p>' + item.attributes.name + ' says: ' + item.attributes.sounds + '</p>';
    }
    return html;
}

allure.api.addTranslation('en', {
    mytab: {
        name: 'My Tab',
    }
},
);

allure.api.addTranslation('ru', {
    mytab: {
        name: 'Моя Вкладка',
    }
},
});
```

## Step 6: Adding new sections for test case page

Internally, many Allure features are implemented using plugin api, let’s
see how for example links are added to the test case page.

With `addTestcaseBlock` method you can define a View that you can assume
will have a test case object as a Model available at `this.model`.

A View class:

**LinksView.js.**

```js
import './styles.css';
import {View} from 'backbone.marionette';
import {className} from '../../decorators';
import template from './LinksView.hbs';

@className('pane__section')
class LinksView extends View {
    template = template;

    serializeData() {
        return {
            links: this.model.get('links')
        };
    }
}
```

Handlebars is used as a template engine:

**LinksView.hbs.**

```html
{{#if links}}
    <h3 class="pane__section-title">{{t 'testCase.links.name'}}</h3>
    {{#each links}}
        <span class="testcase-link">
        {{#if (eq type "issue")}}
            <span class="fa fa-bug"></span>
        {{/if}}
        {{#if (eq type "tms")}}
            <span class="fa fa-database"></span>
        {{/if}}
        <a class="link" href="{{this.url}}" target="_blank">{{name}}</a>
    </span>
    {{/each}}
{{/if}}
```

**index.js.**

```js
import LinksView from './LinksView';

allure.api.addTestcaseBlock(LinksView, {position: 'before'});
```

Which adds a links section to the test case:

![New test case block](../../images/plugins_add_testcase_block_example.png)

## Step 7: Plugin distribution

When you build a plugin, you should come up with the following
structure, which then can be copied into `plugins` folder of the
commandline distribution.

    /my-plugin
        allure-plugin.yml
        plugin.jar
        /lib
            dependency.jar
        /static
            styles.css
            index.js

-   **plugin.jar** - is a jar with your compiled plugin classes

-   **/lib** - all of your pugin’s dependencies should be placed in here

-   **/static** - a folder containing all static `.js` and `.css` files.

Here is a template of gradle build script for a plugin project that uses
[Java Library Distribution Plugin](https://docs.gradle.org/current/userguide/javaLibraryDistribution_plugin.html)
to package plugin classes and copy files and dependencies into one .zip
archive.

**build.gradle.**

```groovy
repositories {
    jcenter()
}

apply plugin: 'java-library-distribution'

jar {
    archiveName = 'plugin.jar'
}

dependencies {
    compileOnly('io.qameta.allure:allure-plugin-api:2.0-BETA8')
}
```

## Step 8: Enabling a plugin

Allure commandline distribution has a following folder structure:

    /allure-commandline
        /bin
        /config
            allure.yml
        /lib
        /plugins
            /behaviors-plugin
            /junit-plugin
            /screen-diff-plugin

Here in `plugins` folder plugins distributions to use at the report
generation reside. By default several plugins are already added to the
Allure. Their usage is managed by default build profile configuration
file\`/config/allure.yml\`. In this file, under the section `plugins`
plugin folders to use are listed, so its contents should look like this:

**allure.yml.**

```yaml
plugins:
  - behaviors-plugin
  - junit-plugin
  - screen-diff-plugin
```


To enable your own plugin, copy folder with distribution to the
`plugins` folder and then add the folder’s name to the corresponding
build profile configuration:

    /allure-commandline
        /bin
        /config
            allure.yml
        /lib
        /plugins
            /behaviors-plugin
            /junit-plugin
            /screen-diff-plugin
            /my-plugin

**allure.yml.**

```yaml
plugins:
  - behaviors-plugin
  - junit-plugin
  - screen-diff-plugin
  - my-plugin
```

