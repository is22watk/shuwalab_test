let title_sc = document.getElementById("title");
let menu_sc = document.getElementById("menu");
let practice_mode_sc = document.getElementById("start_practice_mode");
let test_mode_sc = document.getElementById("start_test_mode");
let hand_sign_sc = document.getElementById("hand_sign");
let camera_sc = document.getElementById("camera");
let result_sc = document.getElementById("result");
let quiz_sc = document.getElementById("quiz");
let quiz_camera_sc = document.getElementById("quiz_camera");
let config_sc = document.getElementById("config");
let ans_sc = document.getElementById("ans");
let test_result1_sc = document.getElementById("test_result1");
let test_result2_sc = document.getElementById("test_result2");
//カテゴリごとの画面
let gr = document.getElementById("greeting");
let of = document.getElementById("often_use");
let fe = document.getElementById("feeling");
let qu = document.getElementById("question");
let ac = document.getElementById("action");
let ya = document.getElementById("yamagata");
//カテゴリごとのデータ
let greeting = document.querySelectorAll("greeting");
let often_use = document.querySelectorAll("often_use");
let feeling = document.querySelectorAll("feeling");
let question = document.querySelectorAll("question");
let action = document.querySelectorAll("action");
let yamagata = document.querySelectorAll("yamagata");

let count_flg = 0;
// let remainingSeconds = 30; 
// let gree = document.getElementsByClassName("gree");
let gree = document.querySelectorAll(".gree");
function change_title(){
  title_sc.style.display = "block";
    menu_sc.style.display = "none";
    practice_mode_sc.style.display = "none";
    test_mode_sc.style.display = "none";
    hand_sign_sc.style.display = "none";
    camera_sc.style.display = "none";
    result_sc.style.display = "none";
    console.log("タイトルだよ");
}

function change_menu(){
    title_sc.style.display = "none";
    menu_sc.style.display = "flex";
    practice_mode_sc.style.display = "none";
    test_mode_sc.style.display = "none";
    hand_sign_sc.style.display = "none";
    camera_sc.style.display = "none";
    result_sc.style.display = "none";
    quiz_sc.style.display = "none";
    quiz_camera_sc.style.display = "none";
    config_sc.style.display = "none";
    ans_sc.style.display = "none";
    test_result1_sc.style.display = "none";
    test_result2_sc.style.display = "none";
    console.log("メニューだよ");
}

function change_practice_mode(){
    sc_flg = 0;
    title_sc.style.display = "none";
    menu_sc.style.display = "none";
    practice_mode_sc.style.display = "block";
    test_mode_sc.style.display = "none";
    hand_sign_sc.style.display = "none";
    camera_sc.style.display = "none";
    result_sc.style.display = "none";
    quiz_sc.style.display = "none";
    quiz_camera_sc.style.display = "none";
    config_sc.style.display = "none";
    ans_sc.style.display = "none";
    test_result1_sc.style.display = "none";
    test_result2_sc.style.display = "none";
    console.log("練習モードだよ");
}

function change_test_mode(){
    sc_flg = 1;
    title_sc.style.display = "none";
    menu_sc.style.display = "none";
    practice_mode_sc.style.display = "none";
    test_mode_sc.style.display = "block";
    hand_sign_sc.style.display = "none";
    camera_sc.style.display = "none";
    result_sc.style.display = "none";
    quiz_sc.style.display = "none";
    quiz_camera_sc.style.display = "none";
    config_sc.style.display = "none";
    ans_sc.style.display = "none";
    test_result1_sc.style.display = "none";
    test_result2_sc.style.display = "none";
    console.log("本番モードだよ");
    if(test_mode_sc.style.display = "block"){
      
    }
}

function change_hand_sign(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "block";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "block";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  console.log("手話画面だよ");
  hint_pop()
} 

let category = document.querySelectorAll(".category");
let category2 = document.querySelectorAll(".category2");
let click_cate;
let cate_num=1;

function change_category(){
document.addEventListener("click",function(event){
    click_cate = event.target;
    console.log(click_cate);
    if(click_cate.classList.contains("category")){
        console.log(click_cate.className);
        all_reset()
        click_cate.className = "category-active";
        console.log(click_cate.className);
        if(click_cate.id == 1){
          cate_num=1;
          gr.style.display= "flex";
          gr.style.flexWrap= "wrap";
          gr.style.justifyContent= "center";
          of.style.display= "none";
          fe.style.display= "none";
          qu.style.display= "none";
          ac.style.display= "none";
          ya.style.display= "none";
        }
        else if(click_cate.id == 2){
          cate_num=2;
          gr.style.display= "none";
          of.style.display= "flex";
          of.style.flexWrap= "wrap";
          of.style.justifyContent= "center";
          fe.style.display= "none";
          qu.style.display= "none";
          ac.style.display= "none";
          ya.style.display= "none";
        }
        else if(click_cate.id == 3){
          cate_num=3;
          gr.style.display= "none";
          of.style.display= "none";
          fe.style.display= "flex";
          fe.style.flexWrap= "wrap";
          fe.style.justifyContent= "center";
          qu.style.display= "none";
          ac.style.display= "none";
          ya.style.display= "none";
        }
        else if(click_cate.id == 4){
          cate_num=4;
          gr.style.display= "none";
          of.style.display= "none";
          fe.style.display= "none";
          qu.style.display= "flex";
          qu.style.flexWrap= "wrap";
          qu.style.justifyContent= "center";
          ac.style.display= "none";
          ya.style.display= "none";
        }
        else if(click_cate.id == 5){
          cate_num=5;
          gr.style.display= "none";
          of.style.display= "none";
          fe.style.display= "none";
          qu.style.display= "none";
          ac.style.display= "flex";
          ac.style.flexWrap= "wrap";
          ac.style.justifyContent= "center";
          ya.style.display= "none";
        }
        else if(click_cate.id == 6){
          cate_num=6;
          gr.style.display= "none";
          of.style.display= "none";
          fe.style.display= "none";
          qu.style.display= "none";
          ac.style.display= "none";
          ya.style.display= "flex";
          ya.style.flexWrap= "wrap";
          ya.style.justifyContent= "center";
        }
    }
    else if(click_cate.classList.contains("category2")){
      console.log(click_cate.className);
      all_reset2()
      click_cate.className = "category2-active";
      console.log(click_cate.className);
    }
  },{ once: true });
}

function all_reset(){
  console.log("allreset")
  category[0].className = "category";
  category[1].className = "category";
  category[2].className = "category";
  category[3].className = "category";
  category[4].className = "category";
  category[5].className = "category";
  hand_sign_sc.style.display = "none";
};

function all_reset2(){
  console.log("allreset2")
  category2[0].className = "category2";
  category2[1].className = "category2";
  category2[2].className = "category2";
  category2[3].className = "category2";
  category2[4].className = "category2";
  category2[5].className = "category2";
  hand_sign_sc.style.display = "none";
};

let countdown = document.getElementById("countdown");
let camera_overlay = document.getElementById("camera_overlay");
let camera_flg = 0;
let sc_flg = 0;

function camera_font(){
  countdown.style.display = "block";
  camera_overlay.style.display = "block";
  countdown.innerHTML = "3"
  setTimeout(function() {
    countdown.innerHTML = "2"
    console.log('1秒後の処理');
  }, 1000);
  
  setTimeout(function() {
    countdown.innerHTML = "1"
    console.log('2秒後の処理');
  }, 2000);

  setTimeout(function() {
    countdown.style.display = "none";
    camera_overlay.style.display = "none";
    camera_flg = 1
    console.log('3秒後の処理');
  }, 3000);
  
}

function change_camera(){
  count_flg = 1;
  gesture_history = [];
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "block";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  good.style.display = "none";
  great.style.display = "none";
  fight.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  camera_font()
}

let good = document.getElementById("good");
let great = document.getElementById("great");
let fight = document.getElementById("fight");

function change_result(shuwa){
  count_flg = 0
  remainingSeconds = 30;
  gesture_history = [];
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "block";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";

  console.log(shuwa[0]);//result
  console.log(click.id);
  console.log(shuwa[1]);//percent

  const hanamaru = document.getElementById("hanamaru");
  
  hanamaru.style.display = "block";

  // let continuous = 5;
  // let count = 0;
  if(click.id === shuwa[0]){
    if(shuwa[1] >= 0.99){
      console.log("great");
      great.style.display = "block";
      const output1 = document.getElementById("output1");
      output1.innerHTML = "すばらしい！";
      const output2 = document.getElementById("output2");
      output2.innerHTML = "非常に素晴らしいです！<br>上手に特徴を捉えられていますね！";
      
    }
    else if(shuwa[1] >= 0.60){
      // count++;
      // console.log(count)
      // if(count === continuous){
        console.log("good");
        good.style.display = "block";
        const output1 = document.getElementById("output1");
        output1.innerHTML = "よくできました";
        const output2 = document.getElementById("output2");
        output2.innerHTML = "よくできています！<br>その調子です！";
    }
  }
  else{
    console.log("fight");
    fight.style.display = "block";
    const output1 = document.getElementById("output1");
    output1.innerHTML = "がんばりましょう";
    const output2 = document.getElementById("output2");
    output2.innerHTML = "お手本をよく見て<br>もう一度頑張ってみましょう！";
  }

}
// let category_id=0
let Q = document.getElementById("Q");

function change_quiz(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "block";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  console.log("クイズです");

  document.addEventListener("click", function(event) {
  //難易度を分けるため
  let click_level = event.target;
  console.log(click_level);
  console.log(click_cate.id);
  if(click_cate.id == "greeting"){
    console.log("greeting!");
    change_camera()
    greeting.forEach(function(){
      console.log(greeting.id)
    });
    Q.innerHTML = "aaa";
  }
  else if(click_cate.id == "often_use"){
    console.log("often!");
  }
  else if(click_cate.id == "feeling"){
    console.log("feel!");
  }
  else if(click_cate.id == "question"){
    console.log("qus!");
  }
  else if(click_cate.id == "action"){
    console.log("act!");
  }
  else if(click_cate.id == "yamagata"){
    console.log("yama!");
  }

  },{ once: true })
}

function change_quizu_camera(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "block";
  config_sc.style.display = "block";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  console.log("カメラです");
}

function change_config(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "block";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  console.log("確認です");
}

function change_ans(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "block";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "none";
  console.log("答えです");
}

function change_test_result1(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "block";
  test_result2_sc.style.display = "none";
  console.log("評価です（１）");
}

function change_test_result2(){
  title_sc.style.display = "none";
  menu_sc.style.display = "none";
  practice_mode_sc.style.display = "none";
  test_mode_sc.style.display = "none";
  hand_sign_sc.style.display = "none";
  camera_sc.style.display = "none";
  result_sc.style.display = "none";
  quiz_sc.style.display = "none";
  quiz_camera_sc.style.display = "none";
  config_sc.style.display = "none";
  ans_sc.style.display = "none";
  test_result1_sc.style.display = "none";
  test_result2_sc.style.display = "block";
  console.log("評価です（２）");
  trivia()
}

// let keys,values,element
let click;

function hint_pop(){
  console.log("hintだよ")
  const hint = document.getElementById("hint")
  let hintbox = {
    "konnitiha":"ヒント：正午に人に挨拶する様子",
    "gomennasai":"ヒント：まゆの間をつまむようにしてから<br>　　　　　手を開いて前に出す",
    "arigatou":"ヒント：土俵上で、勝った力士が手刀を切る様子",
    "ohisasiburi":"ヒント：両手をそれぞれ人間に例え、<br>　　　　　お互い離れていた状態を示す",
    "otukaresama":"ヒント：肩たたきをしてあげる様子",
    "dare":"ヒント：首をかしげながら右手を右頬に当てて、<br>　　　　　　　２回頬をこする。",
    "nani":"ヒント：首をかしげながら立てた人差し指を左右に振る",
    "naze":"ヒント：首をかしげながら左の手のひらの下から<br>　　　　　人差し指を伸ばした右手を出す",
    "haha":"ヒント：右手の人差し指で軽く頬に触れ、子指を立てて<br>　　　　　　　上にあげる（小指は女性を表す）",
    "titi":"ヒント：右手の人差し指で軽く頬に触れ、親指を立てて<br>　　　　　　　上にあげる（親指は男性を表す）",
    "imouto":"ヒント：右手の小指を立てて、甲を相手に向けて下げる<br>　　　　　　　（下に下げると「目下」の意味になる）",
    "otouto":"ヒント：右手の中指を立てて、甲を相手に向けて下げる<br>　　　　　　　（下に下げると「目下」の意味になる）",
    "watasi":"ヒント：自分を指す様子",
    "bikkuri":"ヒント：驚いて飛びあがる様子",
    "ganbaru":"ヒント：両手をグーにして肘を張ったら、<br>　　　　　　こぶしを２回力強く下す",
    "kanasii":"ヒント：両目から涙がこぼれる様子",
    "tukareru":"ヒント：両手を胸の前でだらりと下ろす",
    "suki":"ヒント：右手の親指と人差し指をひらいてアゴの下に置き、<br>　　　　　　　　指を閉じながら下にさげる",
    "tasukeru":"ヒント：後ろから人が後押しする様子",
    "tanosii":"ヒント：胸がワクワクするように両手を上下に動かす",
    "iku":"ヒント：人差し指を前にふる",
    "suwaru":"ヒント：人差し指と中指で指のイスにすわる様子",
    "taberu":"ヒント：お皿を持って２本指のはしで食べる様子",
    "tatu":"ヒント：本足で手のひらに立つ様子",
    "hanagasa":"ヒント：両手を頭の前でひらひらさせ、<br>　　　　　　右肩でみこしを担ぐ様子",
    "onsen":"ヒント：左手で右手の３本指を出した状態を横から握る（♨マーク）",
    "rahuransu":"ヒント：両手の３本指を使い、ラフランスの形を作る",
    "sakuranbo":"ヒント：左手の親指と人差し指でつくった輪の先に<br>　　　　　　　　右手の人差し指でツンツンする（親指が上）",
    "yama":"ヒント：山の形を手で表す",
    "asu":"ヒント：右手の人差し指を前に倒して「未来」を指す",
    "kinou":"ヒント：右手の人差し指を後ろに倒して「過去」を指す",
    "kyo":"ヒント：両手の平を下に向け下げる",
    "shuwa":"ヒント：両手の人差し指を向かい合わせてくるくる回す",
    "wakaranai":"ヒント：手でかたを２回はらい上げる",
    "wakaru":"ヒント：手で胸をなでおろす"
  };
  let keys = Object.keys(hintbox);
  let values = Object.values(hintbox);

    // クリックイベントハンドラを設定
  document.addEventListener("click", function(event) {
    //どの手話を選んだか
  click = event.target;
  console.log(click);

  if(click.classList.contains("gree")){
    console.log(click.classList.contains("gree"))
    for(let i = 0; i < keys.length; i++){//手話の個数分
      // element.id と keys を比較し、一致するものがあればその value を取得
      console.log(i);
      if ( click.id == keys[i]) {
        console.log(keys[i]);
        console.log(values[i]);
        hint.innerHTML = values[i];
        break;
        // ここでヒントを表示するか、他の処理を行う
      }
    }
  }
  }, { once: true });
}

let consecutiveCount = 0;  // 連続のカウンター
let consecutiveThreshold = 5;  // 連続の閾値

function continuous(value) {
    if (previousValue === value) {
        consecutiveCount++;
        if (consecutiveCount === consecutiveThreshold) {
            console.log(true);
            // ここで何か特定の処理を行うか、return true; などを行う
        }
    } else {
        consecutiveCount = 1;  // 違う値が出たらカウンターをリセット
    }
    previousValue = value;  // 現在の値を保存
}

function random_video(){
  const video_greeting = {
    konnitiha : 'mp4/aisatu_konnitiha.mp4',
    gomennasai : 'mp4/aisatu_gomennasai.mp4',
    arigatou : 'mp4/aisatu_arigatou.mp4',
    ohisasiburi : 'mp4/aisatu_ohisasiburi.mp4',
    otukaresama : 'mp4/aisatu_otukaresama.mp4',
  }
}

function trivia(){
  let trivia = document.getElementById("trivia");
  const trivias = [
    "手話はフランスのド・レペー神父が<br>始めたことがきっかけだよ！",
    "手話は、表情がとても大切だよ！",
    "手話は国や地域によって違うよ！"
  ]

  const random = Math.floor(Math.random()*trivias.length);
  trivia.innerHTML = trivias[random]
}