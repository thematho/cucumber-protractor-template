**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [cucumber-protractor-template](#)
  - [Objectives](#)
    - [What are we gonna do](#)
    - [Arguments](#)
  - [Installation](#)
  - [Running the E2E test](#)
  - [Protractor + CucumberJS + Sugar-Step](#)
  - [Dev Mocks (default/common mocks)](#)
  - [E2E Test Mocks for each Feature/Scenario](#)
  - [Easy Asynchornous/Synchornous Steps](#)




#cucumber-protractor-template

The project is a working template of Automated test using [`Protractor`](https://github.com/angular/protractor), [`CucumberJS`](https://github.com/cucumber/cucumber-js/), [`ngMock`](https://docs.angularjs.org/api/ngMock) and [`sugar-step`](https://github.com/ldegen/sugar-step), all running on an integrated AngularJS project mocking several scenarios, using a technique which allows to not only have common preconditions for all the Scenarios, but also inject mocks dynamically whenever a given scenario/Story or Feature might need.
The project currently includes 3 Scenarios:
 - The first test check a service against a default service (Dev environment mock)
 - The Second test check that the service request returns an error with status code 404
 - The Third test check that the service request returns an error with status code 500


##Objectives

The objective of this template is to show how practical and useful is the convination of this tools and which kind of problems and scenarios can be solved with them

###What are we gonna do
* We are going to inject mock modules using [`Around`](https://github.com/cucumber/cucumber/wiki/Hooks).
* We are going to wrigth Asynchronous and Synchornous steps in a very transparent way.

###Arguments
Why implement your UI-Mocks in AngularJS and not with a proxy?
The Answer depends on the nature of each project, but here there are valid reasons to do it:

- *UI Control*; using Angular you can easily do things like: disable Angular animations  and jQuery animations entirely, Mock your local browser Date, to emulate behaviors which depends on date in a automatically way

- *Cost*; (depending of your project) the cost of implement a local proxy for all the web services on every dev environment can be expensive (in hardware or effort or hours of implementation).

- *Dependency*; if your dev teams are working in parallel, it's more likely to be depending from eachother, if the UI team is working in a feature which depends on a X Web Service, knowing the implementation specs the UI team can create simple mocks to continue with his work making more probable the deliver on time of the whole project

##Installation
1.Install the following tools:
  - Ruby v2.0+
  - Node v0.10.0+
  - node-gyp addon and it's dependencies

2.Install the following gems:
   - `gem install sass`
   - `gem install compass`

3.Install grunt and bower
  - `npm install -g grunt-cli`
  - `npm install -g bower`

4.Install the node and bower dependencies, navigate throw the proyect root folder ant execute the following commands:
  - `npm install`
  - `bower install`

##Running the E2E test

Execute the following command:
`grunt e2e`

##Protractor + CucumberJS + Sugar-Step

Explain how to use CucumberJS and adds several Libraries to simplify logic like sugar-step, for executing steps in a more simple way:

[Protractor](https://github.com/angular/protractor) as  E2E Test Framework
[CucumberJS](https://github.com/cucumber/cucumber-js/) as Behaviour-Driven Development tool which uses [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) syntac
[Sugar-Step](https://github.com/ldegen/sugar-step)  for handling Sync/Asynchronous Steps in CucumberJS!

This project implements 2 kinds of Mock Modules

##Dev Mocks (default/common mocks)

This modules are lodead when the server is starter using `grunt serve --mock` command.
The idea is to use this mocks on normal development

**Why mock?**

  The UI development can be very restricted when the web services which you need are no easy to reach or consume, maybe the services are already built and in production and for cost or technical reasons is not easy to obtain the backend build and deploy it locally, or maybe the web service that you need to implement is been developed in parallel.

**Why mock in the UI and not in the services?**

  To *avoid Attachment*. With Angular you can implement your Front-End with all the proper Testing and avoid dependencies from other layers _(proxies/Bussiness logic/Data sources)_.
  *They doesn't mess with your build*. If you are implementing your UI in Angular you can abstract the Web Services Mocks into Modules, which using `Grunt` and `grunt-targethtml` package you can import them when you are running the build and testing in dev environments, and without messing with your deliverables.


##E2E Test Mocks for each Feature/Scenario

This Modules can be injected for each Features or Scenarios, using the `Around` feature of [CucumberJS](https://github.com/cucumber/cucumber-js/) to inject and remove Angular Modules into our Angular Application.
Those Mock modules can override the default *(dev-environment)* Mocks behaviour even if any matchs with the same method and url. Which allow us to test ever possible scenario, even several request in the same scenario with differents responses data and status codes.

The e2e test can be run using `grunt e2e` command


## Easy Asynchornous/Synchornous Steps
_*Sugar! (8) Ohhh Honey Honey (8)*_

**[Sugar-Step](https://github.com/ldegen/sugar-step)** Is a simple way to wrap the behaviour of our steps,normally if we implement steps in Cucumber or Jasmine:

```
Given /$I have a trivial, synchronous step^/, (callback) ->
  trivial.but.intersting.stuff()
  callback()

And /$there is also non-trivial, asynchronous stuff^/, (callback) ->
  do.stuff.that.produces.a.promise().then(
  callback(),
  (err) ->
    callback.fail(err))(
  )
```

We can avoid each Promise handling using something like:

```
Given /$I have a trivial, synchronous step^/, ->
  trivial.but.intersting.stuff()

And /$there is also a non-trivial, asynchronous stuff^/, ->
  do.stuff.that.produces.a.promise()
```
**Reuse steps**: ` given = then = when = sugarStep(this.defineStep);`
No matter in which type of step is, it's more like it to abstract the same logic for the same semantic key.

You can see the Why ? & How? in the official repository of [`sugar-step`](https://github.com/ldegen/sugar-step)
