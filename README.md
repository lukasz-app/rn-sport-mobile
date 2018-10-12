# rn-sport-mobile


React native application for viewind and editing Health / Fit data. 
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

`$ react-native run-android`

or

`$ react-native run-android`

and

`$ react-native start`


Although I did include some custom scripts to make develioping two platform application easier. 

### BETTER RUNNING



now you can:

`$ yarn run-both
// starts 2 packagers on 8081 and 8082 and builds and installs application on connected android device and on connected iOS device `

`$ yarn run-ios-device
// starts packager and installs on iOS device. `

`$ yarn fresh-install 
// rm -rf $TMPDIR/react-* && watchman watch-del-all && rm -rf ios/build/ModuleCache/* && rm -rf node_modules/ && yarn cache clean && yarn`

and some more

