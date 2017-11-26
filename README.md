# DwtAngJsWebpack
This is a test project to experiment with installation of Dynamsoft WebTwain and Barcode reader.  It partially simulates our current application architecture and the problems we are having with installation of Dynamsoft components due to the interations with Webpack.

We are using:
- Webpack 1.x, dwt 13.2, dbr 5.2

To run this project simply:

- npm i && npm start

npm i will get all the dependencies then npm start will run the project using webpack devserver.  To access the site go to localhost:5000.  The port etc is specified in dev.sh

The project
-----------

I have placed all the Dynamsoft resources in the myresources and these are then copied to /Resources by webpackcopy when it runs.  I have set 

The key code is in code.js.  In there I create the references to dwt and dbr, and then access functions, which kick off the installers, and where the problems start!

Issues with installation
------------------------

The issue is that Webtwain does not play well with Webpack.  In particular dwt does not work properly, but dbr seems to work better.

When you access the site the installers inside dwt and dbr will run.  The dwt will get an error:

- TypeError: OnWebTwainNotFoundOnWindowsCallback is not a function

dbr installation will run and display the "Dynamsoft Service is not installed."    If you follow the installation then dbr is installed properly (WinDBR...zip expanded nicely), but the WinDWT is not. But if you F5 refreshg the page then WinDWT is installed.  

We do not want to have to refresh every time, that is confusing.
We do not always use dbr, so we cannot depend on dbr always being present and need the dwt install to work.  We cannot use dbr on Mac, so we currently use QuaggJS for barcoding on a Mac.

Note I can bypass the type error by changing the reference of OnWebTwainNotFoundOnWindowsCallback to G.OnWebTwainNotFoundOnWindowsCallback in the minified file and this runs the webtwain,install.js callback, although it doersnt work because of webpack.
