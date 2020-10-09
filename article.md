# Web components: the secret ingredient helping power the web

# Recipe for creating a web component

# Fundamentals and Case Studies

# Building Web Components at Scale

# Building a practical Web Component

# Create reusable components that work everywhere.

By our count, somewhere between 5% and 8% of all page loads today use one or
more web components.

You can find web components on sites you probably use every day, like YouTube,
GitHub, Netflix, Salesforce and Apple Music.

Our fundamental principle behind building a UI component API is to make it
agnostic in regard to any library or framework. This means the API should be
able to work in any context and be framework-interoperable.

##

So what are web components? The web components specifications provide a
low-level set of APIs that let you extend the browser's built-in set of HTML
tags. Web components provide:

-   A common method for creating a component (using standard DOM APIs).
-   A common way of receiving and sending data (using properties/events).

First things first: Web components are a set of standards that allow us to write
modular, reusable and encapsulated HTML elements. And the best thing about them:
since they're based on web standards, we don't have to install any framework or
library to start using them. You can start writing web components using vanilla
javascript, right now!

## What are web components good for?

The key difference between web components and proprietary component systems is
interoperability. Because of their standard interface, you can use web
components anywhere you'd use a built-in element like <input> or <video>.

Because they can be expressed as real HTML, they can be rendered by all the
popular frameworks. So your components can be consumed more widely, in a more
diverse range of applications, without locking users into any one framework.

And because the component interface is standard, web components implemented
using different libraries can be mixed on the same page. This fact helps
future-proof your applications when you update your tech stack. Instead of a
giant step-change between one framework and another, where you replace all of
your components, you can update your components one at a time.

## State Management

Unlike React or Vue, web components do not provide support for state management,
that is propagating changes from your internal model to the UI elements.

##

-   Shadow Dom: a way to encapsulate the styling and markup of our components.
    It's a sub DOM tree attached to a DOM element, to make sure none of our
    styling leaks out, or gets overwritten by any external styles. This makes it
    great for modularity.
-   HTML Templates: The HTML <template> tag allows us to write reusable chunks
    of DOM. Inside a template, scripts don't run, images don't load, and
    styling/mark up is not rendered. A template tag itself is not even
    considered to be in the document, until it's activated. HTML templates are
    great, because for every instance of our element, only 1 template is used.
-   Custom Elements: The Custom Elements api allows us to author our own DOM
    elements. Using the api, we can define a custom element, and inform the
    parser how to properly construct that element and how elements of that class
    should react to changes. Have you ever wanted your own HTML element, like
    <my-cool-element>? Now you can

## A component's lifecycle

### constructor()

The constructor runs whenever an element is created, but before the element is
attached to the document. We'll use the constructor for setting some initial
state, event listeners, and creating the shadow DOM.

### connectedCallback()

The connectedCallback is called when the element is inserted to the DOM. It's a
good place to run setup code, like fetching data, or setting default attributes.

### disconnectedCallback()

The disconnectedCallback is called whenever the element is removed from the DOM.
Clean up time! We can use the disconnectedCallback to remove any event
listeners, or cancel intervals.

attributeChangedCallback(name, oldValue, newValue) The attributeChangedCallback
is called any time your element's observed attributes change. We can observe an
element's attributes by implementing a static observedAttributes getter, like
so: static get observedAttributes() {return ['my-attr'];
}
In this case, any time the my-attr attribute is changed, the
attributeChangedCallback will run. We'll go more in-depth on this later this
blog post.

Only attributes listed in the observedAttributes getter are affected in the
attributeChangedCallback.

### adoptedCallback()

The adoptedCallback is called each time the custom element is moved to a new
document. You'll only run into this use case when you have <iframe> elements in
your page.

When you move a custom element whith adoptNode(), the callback are called in
this order: disconnectedCallback (with ownerDocument set from source document) >
adoptedCallback (with ownerDocument set from new document) > connectedCallback.

## Shadow DOM

The Shadow DOM allows a component author to create a sub-DOM tree.

-   Light DOM: The light DOM lives outside the component's shadow DOM, and is
    basically anything that is not shadow DOM. For example, the <h1>Hello
    world</h1> up there lives in the light DOM. The term light DOM is used to
    distinguish it from the Shadow DOM. It's perfectly fine to make web
    components using light DOM, but you miss out on the great features of shadow
    DOM.
-   Open shadow DOM: Open shadow DOM allows us to create a sub DOM tree next to
    the light DOM to provide encapsulation for our components. Our shadow DOM
    can still be pierced by javascript like so:
    document.querySelector('our-element').shadowRoot. One of the downsides of
    shadow DOM is that web components are still relatively young, and many
    external libraries don't account for it.

The closed mode of Shadow DOM provides the same encapsulation as the open mode
but additionally allows the component author to hide access to the ShadowRoot,
but not really — let me explain.

Shadow DOM don't inherit styles, but they do inherit CSS variables.

## Attributes and Properties

    Attributes              Properties          events
       |                        |                   ^
       V                        V                   |
       [               web component                    ]

Which is the source of truth?

Syncing between attributes and properties (and vice-versa). Not alawys 100%,
e.g. `value` property and attribute in `<textarea>`

### Attributes

An attribute is a name-value pair where the value is a string or a number.

“The presence of a boolean attribute on an element represents the true value,
and the absence of the attribute represents the false value.”

Use attributes to pass configuration in. Use boolean attributes for boolean
values. Ex: <my-element selected> instead of <my-element selected="true">.

HTML5 defines restrictions on the allowed values of boolean attributes: If the
attribute is present, its value must either be the empty string (equivalently,
the attribute may have an unassigned value), or a value that is an ASCII
case-insensitive match for the attribute’s canonical name, with no leading or
trailing whitespace. The following examples are valid ways to mark up a boolean
attribute:

To be clear, the values "true" and "false" are not allowed on boolean attributes

All attribute names should be lowercase (attribute names are case insensitive,
but in some context can be parsed case-sensitively).

### Properties

getter/setter

## More Resources

-   [open-wc.org](https://open-wc.org/) features great getting started
    information, as well as tips and default configurations for build and
    development tooling.
-   [Web
    Fundamentals](https://developers.google.com/web/fundamentals/web-components/)
    provides primers on the basic web components APIs, and best practices for
    designing web components.
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) provides
    reference docs for the web components APIs, plus some tutorials.

## Events

Events for data out: Use custom events to pass information out of components
unless the information to pass is large or changes extremely often.
this.dispatchEvent(new CustomEvent("clicked", {detail: this.\_timesClicked
}));

-   cancellable and bubble

### Custom Events

## Accessibility

## Focusing

## PUBLISHED ON

-   linked in
-   medium
-   cortexjs.io (uijs?)
-   dev.to
-   web.dev
-   css-tricks.com tweet https://twitter.com/chriscoyier to see if he's
    interested in publishing

## PUBLICIZE ON

-   hacker news
-   reddit
