// ==UserScript==
// @name       milky way market tracker
// @author     sdwr
// @updateURL  https://github.com/sdwr/cow-price-extension/raw/main/price-tracker.user.js
// @downloadURL  https://github.com/sdwr/cow-price-extension/raw/main/price-tracker.user.js
// @match      https://milkywayidle.com/game
// @match      https://www.milkywayidle.com/game
// @match      https://www.test.milkywayidle.com/game
// @match      https://test.milkywayidle.com/game
// @run-at       document-start
// @grant        none
// ==/UserScript==

window.mysocket = undefined;
const nativeSocket = window.WebSocket;
window.WebSocket = function(...args){
    console.log("made a socket!")
    const socket = new nativeSocket(...args);
    window.mysocket = socket;
    const spy = function(event) {
        let jsonData = event.data.substring(2);
        console.log(event);
    }
    window.mysocket.addEventListener('message', spy);

    window.mysocket.oldSend = window.mysocket.send
    window.mysocket.send = function(data){
        console.log("sending:");
        console.log(data);
        window.mysocket.oldSend(data);
    }

    console.log("added spy to websocket!");
    return socket;
};
