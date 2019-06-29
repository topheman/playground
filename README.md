# topheman-playground

[![Demo](https://img.shields.io/badge/demo-online-blue.svg)](https://topheman-playground.herokuapp.com/)

## Intro

Once you snapped the QR-code with your phone, take control of the bouncing ball on your desktop screen, like a Wiimote, tilting your phone as you would do on a labyrinth game.

* Connect with multiple mobile devices
* Watch from multiple desktop/laptop screens

Not a game, more of an experiment that could lead to a game …

**On your phone, you will likely need to enable "Motion and Orientation" in Settings > Safari (or chrome ...)**

![Topheman Playground](https://raw.github.com/topheman/playground/master/app/public/src/css/img/topheman-playground-bandeau.png)

## Install

* `yarn`
* `node app.js 192.168.1.2:3000` (192.168.1.2:3000 being the public IP:PORT of your node server - port by default at 3000 - this is used to create the QR-Code)

## Previous versions

* [topheman/playground1](https://github.com/topheman/playground1): I made the very first version in 2012 to play with websockets on node (most like likely with some version of 0.8.x 😉)
* [topheman/playground2](https://github.com/topheman/playground2): started a little after the v1
    * it was testable on heroku
    * there was a feature that let you test the accelerometer in-browser with a ui (at the time we didn't have sensors in the devtools)
    * using requirejs
    * upgraded over the years up to node v6

Those previous versions are deprecated in favor of this one - [topheman/playground](https://github.com/topheman/playground). I upgraded some dependencies and patched the code so it would work with the latest version of node.

## Next

I coded the [v1](https://github.com/topheman/playground1) about a year ago, and now I decided to refactor it so that it could be a sort of a boilerplate for some other games.

Take it, make your own games and tell me about it !


## Notes

When you'll browse the code, you'll see that there is a connection/disconnetion routine on the sockets which makes sure to disconnect any mobile client which has more than one socket opened (to prevent multiple dead balls). This was a tricky part, playing with the express session and the socket.io handshake :-) 

At the beginning of the year 2019, Apple started to block by default `devicemotion` and `deviceorientation` events on Safari. You still can enable them in the settings.

This is the reason I dove back into the code.

Presentation : [http://slid.es/topheman/topheman-playground](http://slid.es/topheman/topheman-playground)