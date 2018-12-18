# rn-sport-mobile

React native application for viewing and editing Health / Fit data.

Uses react-native-sport, and acts as playground for it.

### Getting started

First you should fork, or clone this repository

`$ git clone https://github.com/lukaszchopin/rn-sport-mobile.git`

After that install npm depedencies:

`$ yarn`
or
`$ npm install`

### RUNNING

You can do all of the react-native magic like :

`$ react-native run-ios`

or

`$ react-native run-android`

and

`$ react-native start`

Although I did include some custom scripts to make develioping two platform application easier.

### BETTER RUNNING

now you can:

`$ yarn run-both // starts 2 packagers on 8081 and 8082. Builds and installs application on connected android device and on connected iOS device`

`$ yarn run-ios-device // starts packager and installs on iOS device.`

`$ yarn fresh-install // rm -rf $TMPDIR/react-* && watchman watch-del-all && rm -rf ios/build/ModuleCache/* && rm -rf node_modules/ && yarn cache clean && yarn`

and some more

### CONTRIBUTING

This project is meant to help developing 3 different libraries:

https://github.com/lukaszchopin/react-native-sport

https://github.com/terrillo/rn-apple-healthkit

https://github.com/StasDoskalenko/react-native-google-fit

All of them are dependencies of this project. If you edit sources of `node_modules/react-native-sport` , `node_modules/react-native-google-fit` or `node_modules/rn-apple-healthkit` remember to save your changes before you `yarn` or `npm install`.

To make to this process a little easier I have created a simple script to automatically git clone repositories after.
Commands below will clone my custom forks of above libraries.

You can call `yarn clone-health` to clone rn-apple-health-kit.

Other possibilities:

`yarn clone-fit`

`yarn clone-sport`

`yarn clone-all`

(mac only)
You can also open 4 differnent VSCode windows with this application, and 3 underlying libraries mentioned above, with command:

`yarn dev`
