# JS Plugin API overview

Front-end side of the Allure is built using
[BackboneJS](http://backbonejs.org/) framework. So some basic
understanding of its internal mechanisms may sometimes be necessary.

Api is accessible from the `allure.api` global object. Let’s take a look
at the list of functions it provides:

-   `addTab(tabName, {title, icon, route, onEnter = notFound} = {})` -
    can be used to define a new tab for the report which will appear on
    the left pane menu with name **tabName**, its icon will be defined
    by a css styles provided in the **icon** string, **route** will
    define an address for a new tab page. **onEnter** should be a
    function, that instantiates a View class managing your new tab’s
    representation.

-   `addTranslation(lang, json)` - gives you an ability to support
    multiple languages for naming in tabs, widgets or test case blocks
    you’ve created. **lang** is a language key, and **json** is a json
    object that contains mappings for string values in the specified
    language.

-   `translate(name, options)` - is needed if you generate html code in
    your plugin and don’t use existing components, provided in
    `allure.components`. In the tab example above you have to wrap
    strings in the template in this function call to enable string
    translation to be picked up from the global registry. See more in
    the docs for [i18next](https://www.npmjs.com/package/i18next-text).

-   `addWidget(name, Widget)` - is a way to create a new widget on the
    Overview page of the report. **name** will define its displayed
    name, and **Widget** is a `View` to be added to the widgets grid.
    Api provides you with a base class for a widget at
    `allure.components.WidgetStatusView`, which we will examine later in
    the Behaviors plugin section. But you may design a widget for your
    own needs extending from `Backbone.Marionette.View`, just keep in
    mind that this widget definition is designed to pop up the data to
    fill the Model for this View from the `widgets.json` file, by the
    key you supplied in **name** parameter.

-   `addTestcaseBlock(view, {position})` - allows to add a View class to
    the Test Case page, in the one of 3 possible block groups,
    determined by a **position** argument. Position can be one of this
    values: `tag`, `after` or `before`. To understand what kind of
    information you may attach to the test case page, jump to the
    section with related features \[jump to the features list\]
