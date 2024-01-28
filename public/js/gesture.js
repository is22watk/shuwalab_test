//手話用のモデルの呼び出しと認識
class GesturePredictor {
    constructor() {
        this.models = {
            1: null,  // モデル1のパスとモデル本体の対応
            // 他のモデルも同様に追加
            2: '/model_gesture/model.json',
            3: '/model_gesture/model.json',
            4: '/model_gesture/model.json',
            5: '/model_gesture/model.json',
            6: '/model_gesture/model.json',
            7: '/model_gesture/model.json',
            8: '/model_gesture/model.json'
        };
    }

    async loadModel(modelPath) {
        if (!this.models[modelPath]) {
            this.models[modelPath] = await tf.loadLayersModel(modelPath);
            console.log(`Model loaded: ${modelPath}`);
        }
        return this.models[modelPath];
    }

    async predictGesture(landmark_list, modelPath) {
        const model = await this.loadModel(modelPath);
        const inputTensor = tf.tensor2d(landmark_list, [1, landmark_list.length], 'float32');
        const predictResult = model.predict(inputTensor);
        const gestureId = tf.argMax(tf.squeeze(predictResult)).dataSync()[0];

        return { gestureId, predictResult: await predictResult.data() };
    }

    async gesture(data, modelNumber) {
        const modelPath = this.models[modelNumber]; // モデル番号に対応するパスを取得
        if (!modelPath) {
            console.error(`Model not found for modelNumber: ${modelNumber}`);
            return null;  // モデルが存在しない場合はエラーを返すか適切な処理を行う
        }

        const { gestureId, predictResult } = await this.predictGesture(data, modelPath);
        const gestureResult = predictResult[gestureId];
        let gestureid = gestureId;
        let gestureresult = gestureResult;
        return { gestureid, gestureresult };
    }
}

// GesturePredictor インスタンスを作成
const gesturePredictor = new GesturePredictor();


function getMostCommonGestureId(history) {
    let counts = {};
    let max_count = 0;
    let most_commonId;

    for (const id of history) {
        counts[id] = (counts[id] || 0) + 1;

        if (counts[id] > max_count) {
            max_count = counts[id];
            most_commonId = id;
        }
    }

    return { id: most_commonId, count: max_count };
}
//calc=計算
//座標の返還などはここ

function clac_landmark_list(width, height, landmarks) {
    let landmark_point = [];
    let landmark_x;
    let landmark_y;
    landmarks.forEach(function (landmark, _) {
        landmark_x = Math.min(Math.floor(landmark.x * width), width - 1);
        landmark_y = Math.min(Math.floor(landmark.y * height), height - 1);
        landmark_point.push([landmark_x, landmark_y]);

    });

    return landmark_point;
}

function pre_process_pose(pose_history) {

    let temp_pose_list = JSON.parse(JSON.stringify(pose_history));
    var center_point;
    let div_value;
    let pre_pose;
    for (flame = 0; flame < 16; flame++) {

        center_point = [
            (temp_pose_list[0][flame][0] + temp_pose_list[1][flame][0]) / 2,
            (temp_pose_list[0][flame][1] + temp_pose_list[1][flame][1]) / 2
        ]

        div_value = ((temp_pose_list[0][flame][0] - center_point[0]) + (center_point[0] - temp_pose_list[1][flame][0])) / 2

        if (div_value < 0) {
            div_value *= -1
        }

        for (point = 0; point < temp_pose_list.length; point++) {
            temp_pose_list[point][flame][0] = (temp_pose_list[point][flame][0] - center_point[0]) / div_value
            temp_pose_list[point][flame][1] = (temp_pose_list[point][flame][1] - center_point[1]) / div_value
        }
    }

    for (point = 0; point < temp_pose_list.length; point++) {
        temp_pose_list[point] = temp_pose_list[point].flat();
    }
    pre_pose = temp_pose_list.flat();
    return pre_pose;
}

function pre_process_hands(hands_history) {

    let temp_hands_list = JSON.parse(JSON.stringify(hands_history.slice(1, 21)));
    let hand_history = hands_history
    let max_value;
    for (num = 0; num < temp_hands_list.length; num++) {
        for (flame = 0; flame < 16; flame++) {
            temp_hands_list[num][flame][0] = temp_hands_list[num][flame][0] - hand_history[0][flame][0]
            temp_hands_list[num][flame][1] = temp_hands_list[num][flame][1] - hand_history[0][flame][1]
        }
        temp_hands_list[num] = temp_hands_list[num].flat();
    }
    temp_hands_list = temp_hands_list.flat();

    try {
        max_value = Math.max(...temp_hands_list.map(Math.abs))
    }
    catch (error) {
        max_value = 0;

    }


    function normalize_(n, max_value) {
        try {
            let box = n / max_value;
            if (isNaN(box)) {
                return 0;
            }
            return box;

        } catch (error) {
            return 0;
        }
    }
    temp_hands_list = temp_hands_list.map(value => normalize_(value, max_value));
    return temp_hands_list;

}

let gesture_history = [];
let cnt = 0;



let new_history_length = 16;
let new_one_gesture_time = 2.6;

let new_start_time = 0;
let new_ch_flame = (new_one_gesture_time / new_history_length) * 1000;
let new_temp_ch_flame = new_ch_flame;
let new_time_difference = 0;
let flag_cnt = 0


test = false
async function recognition(gestures) {

    if (new_start_time == 0) {
        new_start_time = Date.now();
    }

    let pose_history = gestures[0];
    let left_history = gestures[1];
    let right_history = gestures[2];
    // let n=gesturse[3];
    let n = 2;

    let pre_pose = [];
    let pre_left = [];
    let pre_right = [];

    let pre_data = [];

    let gesture_id;
    let gesture_result;

    let percent;
    let most_gesture_id;
    // console.log("flag_cnt",flag_cnt)

    //console.log(pose_history[0])
    if (pose_history[0].length == 16) {
        pre_pose = pre_process_pose(pose_history);
        pre_left = pre_process_hands(left_history);
        pre_right = pre_process_hands(right_history);

        pre_data = pre_pose.concat(pre_left, pre_right);
        // console.log(pre_data.length)

        try {
            const ges = await gesturePredictor.gesture(pre_data, n);
            gesture_id = ges.gestureid;
            gesture_result = ges.gestureresult;

            if (Number.isInteger(gesture_id)) {

                percent = gesture_result;

                let result_text;
                let box;


                // console.log(cnt)
                if (cnt < 16) {
                    new_time_difference = Date.now() - new_start_time;

                    if (flag_cnt == 1) {
                        new_start_time = Date.now();
                        console.log("new_start_time", new_start_time);
                        flag_cnt = 0;
                        cnt = 0;


                    }

                    // console.log("flag_cnt",flag_cnt)

                    console.log("new_time_difference", new_time_difference)
                    console.log("new_ch_flame", new_ch_flame)

                    if ((new_time_difference) > new_ch_flame) {
                        new_ch_flame = new_ch_flame + new_temp_ch_flame;
                        cnt += 1;

                        console.log("cnt", cnt);
                    }

                    if (new_time_difference > (new_one_gesture_time * 1000)) {
                        new_ch_flame = new_temp_ch_flame
                        flag_cnt = 1;

                    }

                    console.log("www")



                    // cnt += 1;

                } if (cnt == 16) {
                    console.log(Date.now() - new_start_time)
                    if (percent > 0.99) {

                        // console.log(gesture_history)
                        const data = await fetch('/model/label.csv').then(response => response.text());
                        const rows = data.split('\n').map(row => row.trim());
                        const labels = rows.map(row => row.split(',')[0]);

                        result_text = labels[gesture_id];

                        box = [result_text, percent]

                        // console.log(result_text)

                        postMessage(box);

                        gesture_history = [];
                        cnt = 0;



                        throw new Error('Some error occurred');


                    } else if (percent > 0.60) {
                        gesture_history.push(gesture_id);
                        // console.log(gesture_history)

                        most_gesture_id = getMostCommonGestureId(gesture_history);

                        if (most_gesture_id.count >= 5) {
                            const data = await fetch('/model/label.csv').then(response => response.text());
                            const rows = data.split('\n').map(row => row.trim());
                            const labels = rows.map(row => row.split(',')[0]);

                            result_text = labels[gesture_id];

                            box = [result_text, percent]
                            // console.log(result_text)
                            postMessage(box);
                            gesture_history = [];
                            cnt = 0;



                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in recognition:', error);
        }


        // gesture(pre_data).then(ges=>{
        //     gesture_id=ges.gestureid;
        //     gesture_result=ges.gestureresult;


        //     if(Number.isInteger(gesture_id)){

        //         percent = gesture_result;

        //         let result_text;
        //         if (flame < 16) {
        //             flame += 1;
        //         } else {
        //             if (percent > 0.999) {
        //                 console.log("gesture_history",gesture_history)
        //                 fetch('/model/label.csv')
        //                     .then(response => response.text())
        //                     .then(data => {
        //                         // CSV データの処理
        //                         const rows = data.split('\n').map(row => row.trim());
        //                         const labels = rows.map(row => row.split(',')[0]);

        //                         result_text = labels[gesture_id];
        //                         gesture_history=[]

        //                         return result_text;

        //                     })
        //                     .catch(error => console.error('Error reading the file:', error));
        //                     pre_data=[];

        //                     return result_text;
        //             } else if (percent > 0.60) {
        //                 gesture_history.push(gesture_id);

        //                 most_gesture_id = getMostCommonGestureId(gesture_history);

        //                 console.log("gesture_history",gesture_history)

        //                 if (most_gesture_id.count >= 5) {
        //                     fetch('/model/label.csv')
        //                     .then(response => response.text())
        //                     .then(data => {
        //                         // CSV データの処理
        //                         const rows = data.split('\n').map(row => row.trim());
        //                         const labels = rows.map(row => row.split(',')[0]);

        //                         result_text = labels[gesture_id];
        //                         gesture_history=[]

        //                         return result_text;
        //                     })
        //                     .catch(error => console.error('Error reading the file:', error));
        //                     pre_data=[];

        //                 }

        //             }
        //         }


        //     }
        // });

    }
}