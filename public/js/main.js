
// カーソルy用webworker作成
const handsign_worker = new Worker('/js/handsign_webworker.js');

//カーソル用webworkerから取得した値を入れる変数
let handsign = "none";

const gesture_worker = new Worker('/js/gesture_webworker.js');

//手話用webworkerから取得した要素を入れる変数[0]:手話名[1]:認識率
let shuwa = "none";

//手話用webworkerに引き渡すカテゴリーを示す変数
let number=0;

//カメラのサイズ
const width= 1280;
const height= 720;

// const width= 1400;
// const height= 900;

//カーソル用webworker作成からデータを受け取る記述
handsign_worker.addEventListener('message', function (e) {
    handsign = e.data[0];
});

//手話用webworker作成からデータを受け取る記述
gesture_worker.addEventListener('message', function (e) {
    shuwa = e.data;
});

//クリックの判定
let clickCheck = false;

//HTMLからclassを取得
let videoElement = document.getElementsByClassName('input_video')[0];
let canvasElement = document.getElementsByClassName('output_canvas')[0];
let canvasCtx = canvasElement.getContext('2d');

//gesture.jsに渡すようデータの加工に必要な変数の宣言
const pose_history=[];
const left_history = [];
const right_history = [];

let pose_landmarks=[];
let left_landmarks=[];
let right_landmarks=[];

let use_pose_landmarks;

for(let i=0;i<6;i++){
    pose_history.push([]);
}
for(let i=0;i<21;i++){
    left_history.push([]);
    right_history.push([]);
}


let start_time = Date.now();
console.log(start_time);
let history_length = 16;
let one_gesture_time = 2.6;
let ch_flame = (one_gesture_time / history_length) * 1000 ;
let temp_ch_flame = ch_flame;


// let ch_flame = ch_flame_cnt

// let ando = 12
// console.log(adsf)


//常に実行され続ける関数的な奴
function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0,canvasElement.width, canvasElement.height);

    let time_difference = Date.now() - start_time;
    // console.log(time_difference);

    //時間処理
    if ((time_difference) > ch_flame){ 
        ch_flame = ch_flame + new_ch_flame;
        // console.log("j3",ch_flame)
        //poseLandmarks(肩肘手首)を検知したら動作。if文の必要性は要検討
        if(results.poseLandmarks){
            //検出した33個の特徴点のうち認識に必要な点だけを抽出
            use_pose_landmarks = results.poseLandmarks.slice(11,17);

            //clac_landmark_listでデータの計算(gesture.jsの関数)
            pose_landmarks=clac_landmark_list(width,height,use_pose_landmarks);
            for(let i=0;i<6;i++){
                pose_history[i].push(pose_landmarks[i]);
                //16フレーム分保持。それ以上は削除
                if(pose_history[i][16]){
                    pose_history[i].shift();
                }
            }
        }else{
            for(let i=0;i<6;i++){
                //検出されなかったら[0,0]を挿入
                pose_history[i].push([0,0]);
                if(pose_history[i][16]){
                    pose_history[i].shift();
                }
            }
        }
        //leftHandLandmarks(左手)を検知したら動作
        if(results.leftHandLandmarks){

            //clac_landmark_listでデータの計算(gesture.jsの関数)
            left_landmarks=clac_landmark_list(width,height,results.leftHandLandmarks);

            //検出した左手の特徴点(手首)とposeLandmarksの特徴点(手首)の合成。
            results.leftHandLandmarks[0]=results.poseLandmarks[15];
            for(let i=0;i<21;i++){
                left_history[i].push(left_landmarks[i]);
                if(left_history[i][16]){
                    left_history[i].shift();
                }
            }
        }else{
            for(let i=0;i<21;i++){
                left_history[i].push([0,0]);
                if(left_history[i][16]){
                    left_history[i].shift();
                }
            }
        }
        //rightHandLandmarks(右手)を検知したら動作
        if(results.rightHandLandmarks){
            //clac_landmark_listでデータの計算(gesture.jsの関数)
            right_landmarks=clac_landmark_list(width,height,results.rightHandLandmarks);

            //検出した右手の特徴点(手首)とposeLandmarksの特徴点(手首)の合成
            results.rightHandLandmarks[0]=results.poseLandmarks[16];

            for(let i=0;i<21;i++){
                right_history[i].push(right_landmarks[i]);
                //console.log(right_history[i][0])
                if(right_history[i][16]){
                    right_history[i].shift();
                }
            }
        }else{
            for(let i=0;i<21;i++){
                right_history[i].push([0,0]);
                // console.log(right_history[i][0])
                if(right_history[i][16]){
                    right_history[i].shift();
                }
            }
        }
    }
    //特徴点と点をつなぐ線の表示(pose)
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                    {color: '#fff', lineWidth: 4});
    //特徴点の表示(pose)             
    drawLandmarks(canvasCtx, use_pose_landmarks,
                    {color: '#fff', lineWidth: 2});
    //特徴点と点をつなぐ線の表示(right)
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                    {color: '#fff', lineWidth: 5});
    //特徴点の表示(right)  
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
                    {color: '#fff', lineWidth: 2});
    //特徴点と点をつなぐ線の表示(left)
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                    {color: '#fff', lineWidth: 5});
    //特徴点の表示(left)  
    drawLandmarks(canvasCtx, results.rightHandLandmarks,
                    {color: '#fff', lineWidth: 2});

    //描画状態の復元
    canvasCtx.restore();
    

    //カメラに右手か左手が検出されたら動作
    if (results.leftHandLandmarks || results.rightHandLandmarks) {

    //取得したデータの処理
        try {
            //検出された手が左手なら動作
            if (results.leftHandLandmarks) {

                //cleanData.js
                data = cleanData(results.leftHandLandmarks,"Left");

            }
            //検出された手が左手なら動作
            else {
                
                //cleanData.js
                data = cleanData(results.rightHandLandmarks,"Right");

            }

            //手話用webworkerに送信するためのデータ加工
            message_data=[pose_history,left_history,right_history,cate_num]

            //count_flg==1なら(カメラが表示されたら)動作
            if(count_flg==1){handsign="none";}
            if(camera_flg == 1){

                gesture_worker.postMessage(message_data);
                //カーソルを画面上に表示したいようにするための記述
 
                console.log(shuwa)
                //認識が終わったら実行
                if(shuwa != "none"){
                    if(sc_flg == 0){
                        console.log(shuwa)
                        change_result(shuwa);
                        camera_flg = 0;
                
                    }
                    else if(sc_flg == 1){
                        console.log(shuwa)
                        change_config(shuwa);
                        camera_flg = 0;
                    }
                }
            }
            //count_flg==0なら(カメラ以外が表示されたら)動作
            else{

                //変数shuwaを初期値に変更
                shuwa="none";

                //カーソル用webworkerにデータを送信
                handsign_worker.postMessage(data);
            }

        }
        catch (error) { //エラーが発生したらlog出力
            // console.log(error.message);
        }
        
        try {
            //ハンドサインが「open」だった場合、カーソル移動処理。下のコードと合わせられるかも。
            if (results.leftHandLandmarks[0] && handsign == "0") {
                //手の中心座標をcursorXYに渡す。
                cursorXY(results.leftHandLandmarks[0,9]);  
            }
            
        }
        catch (error) {
            //console.log("left error.message");
        }
        try {
            //ハンドサインが「open」だった場合、カーソル移動処理。
            if (results.rightHandLandmarks[0] && handsign == "0") {
                cursorXY(results.rightHandLandmarks[0,9]);  
                
            }
            
        }
        catch (error) {
            //console.log("left error.message");
        }
        try {
            if (results) {
                //まだクリックされておらず、ハンドサインが「close」だった時
                if (clickCheck == false && handsign == "1") {
                    mouseClick();
                    clickCheck = true;
                }
                else if (handsign != 1) {
                    clickCheck = false;
                }
            }
        }
        catch (error) {
            // console.log(error.message);
        }
    }

};

//holisticのファイル読み込み
const holistic = new Holistic({locateFile: (file) => {
    return `./node_modules/@mediapipe/holistic/${file}`
}});
//holisticの設定読み込み
holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
});
//なんかいるやつ。回帰？
holistic.onResults(onResults);
//カメラからの映像をholistic.jsで使えるようにする
const camera = new Camera(videoElement, {
    onFrame: async () => {
    await holistic.send({image: videoElement});
    },
    //カメラの解像度の設定
    width: width,
    height: height
});

camera.start();

