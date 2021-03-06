# DwtAngJsWebpack
This is a test project to experiment with installation of Dynamsoft WebTwain and Barcode reader.  It partially simulates our current application architecture and the problems we are having with installation of Dynamsoft components due to the interactions with Webpack.

We are using:
- Webpack 1.x, dwt 13.2, dbr 5.2

To run this project simply:

- npm i && npm start

npm i will get all the dependencies then npm start will run the project using webpack devserver.  To access the site go to localhost:5000.  The port etc is specified in dev.sh

The project
-----------

I have placed all the Dynamsoft resources in the myresources and these are then copied to /Resources by webpackcopy when it runs.  This is to simulate our real environment, rather than directly creating the Resources directory (which is more normal in a non-webpack environment).

The key code is in code.js.  In there I create the references to dwt and dbr, and then access functions, which kick off the installers, and where the problems start!

Issues with installation
------------------------

The issue is that Webtwain does not play well with Webpack and there is a problem with the code in the dwt npm package.  dwt does not work properly, but dbr seems to work better.  Perhaps dwt just needs making the same as dbr -- I'm not sure what will happen installing both as the only thing I think is different between dwt and dbr is the extraction of the zip files containkinmg the important functionality.

When you access the site the installers inside dwt and dbr will run on load.  The dwt will get an error:

- TypeError: OnWebTwainNotFoundOnWindowsCallback is not a function

dbr installation will run and display the "Dynamsoft Service is not installed."    If you follow the installation then dbr is installed properly (WinDBR...zip expanded nicely), but the WinDWT is not. But if you F5 refreshing the page then WinDWT will also be automatically installed.  

- We do not want to have to refresh every time, that is confusing for the users.
- We do not always use dbr, so we cannot depend on dbr always being present and need the dwt install to work.  We cannot use dbr on Mac, so we currently use QuaggaJS for barcoding on a Mac.

Note I can bypass the type error by changing the reference of OnWebTwainNotFoundOnWindowsCallback to G.OnWebTwainNotFoundOnWindowsCallback in the minified file and this runs the dynamsoft.webtwain.install.js callback, although it doesn't get far because of webpacked variables (no globals again) ands we cant go hacking minified npm code.

I think the solution will be to make DWT work and install the same way as DBR, and in fact they should play well together when both are used.

Hacky Workaround
----------------

I noticed that the DBR install actually installs correctly so if I let the DBR install and then only access the DWT objects after the  dbrEnv.init success callback.  Then when the DWT code accesses objects it does not go to the installer and instead just downloads and extracts the WinDwt.zip silently.  This is only practical for a small example, and is impractical in our complex app with Angular services and multiple platforms.

Note
----

Our real application contains Angular 1.x, but this sample project is not using Angular as the issue is unrelated to Angular.
