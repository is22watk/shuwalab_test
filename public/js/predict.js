async function loadModel() {
    model = await tf.loadLayersModel("/model/model.json");
    //モデルロード
    //console.log("Model Loaded!");
}

let model;
loadModel();

function predict(data) {
    result = [2];

    result = tf.tidy(() => {
        ten = tf.tensor([data]);
        preResult = model.predict(ten);

        max = [-1, -1];

        for (i = 0; i < 7; i++) {
            index = preResult.dataSync()[i];
            if (max[1] < index) {
                max = [i, index];
            }
        }
        //console.log(max)
        return [max[0], max[1]];
        
    });

    return result;
}