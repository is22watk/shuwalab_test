importScripts('/js/tf.js');
importScripts('/js/gesture.js');

console.log("webworker");

onmessage = e => {
    result = recognition(e.data);
}
