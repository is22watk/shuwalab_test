importScripts('/js/tf.js');
importScripts('/js/predict.js');

//console.log("webworker");

onmessage = e => {
    preresult = predict(e.data);
    //console.log(preresult); 
    postMessage(preresult);
    // console.log("onmessage_count");
}
