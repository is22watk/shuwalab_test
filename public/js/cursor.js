let x, y;

let Xrange = document.getElementById("Xrange");
let Yrange = document.getElementById("Yrange");

let Xoffset = Xrange.value; //max  7
let Yoffset = Yrange.value; //max 4

let cTime = setTimeout(function () {
  document.getElementById("hand").style.display = "none";
}, 500);

//カーソルの座標取得ー＞手の画像表示
function cursorXY(xy) {
  // console.log(xy);
  clearTimeout(cTime);

  if (document.getElementById("touch").style.display = "none"){
    document.getElementById("hand").style.display = "block";
  }

  preX = (1 - xy.x) * 16 - Xoffset;
  preY = xy.y * 9 - Yoffset;

  preX = preX / (16 - 2 * Xoffset);
  preY = preY / (9 - 2 * Yoffset);
  
  x = Math.floor(window.innerWidth * preX);
  y = Math.floor(window.innerHeight * preY);
  
  //座標を表示する
  document.getElementById("cursor").style.left = x + "px";
  document.getElementById("cursor").style.top = y + "px";
  
  cTime = setTimeout(function () {
    document.getElementById("hand").style.display = "none";
  }, 500);
  
  //animation.jsに記載
  btnAnimation(x, y);
}

function mouseClick() {

  document.getElementById("hand").style.display = "none";

  //console.log(document.elementFromPoint(x, y));

  document.elementFromPoint(x, y).click();
  document.getElementById("touch").style.display = "block";

  setTimeout(function () {
    document.getElementById("hand").src = "./img/hand/janken_pa.png";
    document.getElementById("hand").style.display = "block";
    document.getElementById("touch").style.display = "none";
  }, 500);
  cTime = setTimeout(function () {
    document.getElementById("hand").style.display = "none";
  }, 1000);
}

Xrange.addEventListener("change", function () {
  document.getElementById("Xosv").innerHTML = Xrange.value;
  Xoffset = Xrange.value;
});

Yrange.addEventListener("change", function () {
  document.getElementById("Yosv").innerHTML = Yrange.value;
  Yoffset = Yrange.value;
});
