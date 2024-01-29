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
        // const inputTensor = tf.tensor2d(landmark_list, [1, landmark_list.length], 'float32');
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
        // console.log("data",data)
        // console.log("data.length",data.length)
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

function clac_landmark_list(width,height,landmarks){
    let landmark_point = [];
    let landmark_x;
    let landmark_y;
    landmarks.forEach(function(landmark,_){
        // console.log("main_landmark",landmark)値が入ってる
        // console.log("main_landmarks[0]",landmark[0])
        // landmark_x = Math.min(Math.floor(landmark.x * width), width - 1);
        // landmark_y = Math.min(Math.floor(landmark.y * height), height - 1);
        landmark_x = Math.min(Math.floor(landmark[0] * width), width - 1);
        landmark_y = Math.min(Math.floor(landmark[1] * height), height - 1);
        landmark_point.push([landmark_x, landmark_y]);
        // console.log("ｘ座標、ｙ座標")
        // console.log(landmark_x,landmark_y)
        
    });

    return landmark_point;
}

function pre_process_pose(pose_history){

    let temp_pose_list =  JSON.parse(JSON.stringify(pose_history));
    var center_point;
    let div_value;
    let pre_pose;
    let flame_mask = temp_pose_list[1].length;
    // console.log("flame_mask",flame_mask)
    for(flame=0;flame<16;flame++){
    // for(flame=0;flame<6;flame++){

        center_point=[
            (temp_pose_list[0][flame][0] + temp_pose_list[1][flame][0])/2,
            (temp_pose_list[0][flame][1] + temp_pose_list[1][flame][1])/2
        ]

        div_value=((temp_pose_list[0][flame][0] - center_point[0]) + (center_point[0] - temp_pose_list[1][flame][0])) / 2
        
        if (div_value < 0){
            div_value *= -1
        }

        for(point=0;point<temp_pose_list.length;point++){
            temp_pose_list[point][flame][0] = (temp_pose_list[point][flame][0] - center_point[0]) / div_value
            temp_pose_list[point][flame][1] = (temp_pose_list[point][flame][1] - center_point[1]) / div_value
            // console.log("temp_pose_list[point][flame][0]::",temp_pose_list[point][flame][0])
        }
    }
    // console.log("temp_pose_list.length::",temp_pose_list.length)
    if (temp_pose_list.length < 32) {
        for (let point = 0; point < temp_pose_list.length; point++) {
          for (let i = flame_mask; i < 32; i++) {
            temp_pose_list[point].push([-1000, -1000]);
          }
        }
      }      
    // console.log("temp_pose_list[point]::",temp_pose_list[point])
    
    for(point=0;point<temp_pose_list.length;point++){
        temp_pose_list[point]=temp_pose_list[point].flat();
    }
    pre_pose=temp_pose_list.flat();
    return pre_pose;
}

function pre_process_hands(hands_history){

    let temp_hands_list =  JSON.parse(JSON.stringify(hands_history.slice(1,21)));
    // console.log("temp_hands_list::",temp_hands_list)
    let hand_history = hands_history
    let max_value;
    let flame_mask = temp_hands_list[1].length;
    // console.log("flame_mask",flame_mask)
    // console.log("temp_hands_list::",temp_hands_list)

    for(num=0;num<temp_hands_list.length;num++){
        //console.log("temp_hands_list.length::",temp_hands_list.length)
        for(flame=0;flame<16;flame++){
            // console.log("temp_hands_list[num][flame][0]::",temp_hands_list[num][flame][0])
            temp_hands_list[num][flame][0] = temp_hands_list[num][flame][0] - hand_history[0][flame][0]
            temp_hands_list[num][flame][1] = temp_hands_list[num][flame][1] - hand_history[0][flame][1]
            // console.log("相対 x  y")
            // console.log("場合",temp_hands_list[num][flame][0],temp_hands_list[num][flame][1])
        }
        // temp_hands_list[num]=temp_hands_list[num].flat();
    }
    if (temp_hands_list.length < 32) {
        for (let num = 0; num < temp_hands_list.length; num++) {
          for (let i = flame_mask; i < 32; i++) {
            temp_hands_list[num].push([-1000, -1000]);
          }
          // 一次元リストに変換
          temp_hands_list[num]=temp_hands_list[num].flat();
        }
      }
      
    temp_hands_list=temp_hands_list.flat();

    try{
        // max_value=Math.max(...temp_hands_list.map(Math.abs))
        if(temp_hands_list != -1000){
            max_value=Math.max(...temp_hands_list.map(Math.abs))
            }
        // max_value = Math.max(
        //     Array.from(temp_landmark_list)
        //       .filter(n => n !== -1000)
        //       .map(n => Math.abs(n))
        //   );
          
    }
    catch(error){
        max_value=0;

    }

    function normalize_(n) {
        try {
          if (n === -1000) {
            return n;
          } else {
            return n / max_value;
          }
        } catch (error) {
          return 0;
        }
      }
      temp_hands_list = Array.from(temp_hands_list).map(normalize_);
      return temp_hands_list;
      
    
    // function normalize_(n, max_value) {
    //     try {
    //         let box=n/max_value;
    //         if(isNaN(box)){
    //             return 0;
    //         }
    //         return box;

    //     } catch (error) {
    //         return 0;
    //     }
    //   }
    //   temp_hands_list = temp_hands_list.map(value => normalize_(value, max_value));
    //   return temp_hands_list;
    
}
let gesture_history=[];
let cnt=0;
async function recognition(gestures){
    
    let pose_history=gestures[0];
    let left_history=gestures[1];
    // console.log("gestures[1]::",gestures[1])
    let right_history=gestures[2];
    // let n=gesturse[3];
    let n=2;
    
    let pre_pose=[];
    let pre_left=[];
    let pre_right=[];

    let pre_data=[];

    let gesture_id;
    let gesture_result;

    let percent;
    let most_gesture_id;
    //console.log(pose_history[0])
    // if (pose_history[0].length==16){
    // console.log("段階1")
    // console.log(pose_history[0]);
    // if (pose_history[0].length==16){
    // if (pose_history[0].length==16){
        pre_pose=pre_process_pose(pose_history);
        // console.log("段階２",pre_pose,pre_pose.length)
        pre_left=pre_process_hands(left_history);
        pre_right=pre_process_hands(right_history);
        // console.log("段階３",pre_left,pre_left.length)
        pre_data=pre_pose.concat(pre_left,pre_right);
        // console.log("段階４")
        // console.log("pre_data",pre_data)
        // console.log("pre_data(len)",pre_data.length)
        pre_data = pre_data.map((x) => {
            return x === -1000 ? -3 : x;
          });
        try {
            const ges = await gesturePredictor.gesture(pre_data, n);
            // console.log("ges::",ges)
            gesture_id = ges.gestureid;
            gesture_result = ges.gestureresult;

            if (Number.isInteger(gesture_id)) {

                percent = gesture_result;

                let result_text;
                let box;
                
                console.log(percent, gesture_id)
                console.log(cnt)
                
                
                if (cnt < 32) {
                    cnt += 1;
                    if(cnt > 20){
                        if (percent > 0.999) {
                            console.log(gesture_history)
                            const data = await fetch('/model/label.csv').then(response => response.text());
                            const rows = data.split('\n').map(row => row.trim());
                            const labels = rows.map(row => row.split(',')[0]);
                            result_text = labels[gesture_id];
                            box=[result_text,percent];
                            console.log(result_text);
                            console.log("ok0.999");
                            postMessage(box);
                            // gesture_history = [];
                            gesture_history.splice(0,gesture_history.length);
                            cnt=0;
                        }
                        if (percent > 0.90) {
                            gesture_history.push(gesture_id);
                            console.log(gesture_history)
                            most_gesture_id = getMostCommonGestureId(gesture_history);
                            if (most_gesture_id.count >= 3) {
                                const data = await fetch('/model/label.csv').then(response => response.text());
                                const rows = data.split('\n').map(row => row.trim());
                                const labels = rows.map(row => row.split(',')[0]);
                                result_text = labels[gesture_id];
                                box=[result_text,percent];
                                console.log(result_text);
                                console.log("ok0.90*3");
                                postMessage(box);
                                gesture_history.splice(0,gesture_history.length);
                                cnt=0;
                            }
                        }
                        if (percent > 0.75) {
                            gesture_history.push(gesture_id);
                            console.log(gesture_history)
                            most_gesture_id = getMostCommonGestureId(gesture_history);
                            if (most_gesture_id.count >= 4) {
                                const data = await fetch('/model/label.csv').then(response => response.text());
                                const rows = data.split('\n').map(row => row.trim());
                                const labels = rows.map(row => row.split(',')[0]);
                                result_text = labels[gesture_id];
                                box=[result_text,percent];
                                console.log(result_text);
                                console.log("ok0.75*4");
                                postMessage(box);
                                // gesture_history = [];
                                gesture_history.splice(0,gesture_history.length);
                                cnt=0;
                            }
                        }
                        
                    }
                    
                } else {
                    if (percent > 0.99) {

                        console.log(gesture_history)
                        const data = await fetch('/model/label.csv').then(response => response.text());
                        const rows = data.split('\n').map(row => row.trim());
                        const labels = rows.map(row => row.split(',')[0]);
                        result_text = labels[gesture_id];
                        box=[result_text,percent]
                        console.log(result_text)
                        postMessage(box);
                        // gesture_history = [];
                        gesture_history.splice(0,gesture_history.length);
                        cnt=0;
                        
                    }if (percent > 0.60) {
                        gesture_history.push(gesture_id);
                        console.log(gesture_history)
                        most_gesture_id = getMostCommonGestureId(gesture_history);
                        if (most_gesture_id.count >= 5) {
                            const data = await fetch('/model/label.csv').then(response => response.text());
                            const rows = data.split('\n').map(row => row.trim());
                            const labels = rows.map(row => row.split(',')[0]);
                            result_text = labels[gesture_id];
                            box=[result_text,percent]
                            console.log(result_text)
                            postMessage(box);
                            // gesture_history = [];
                            gesture_history.splice(0,gesture_history.length);
                            cnt=0;
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