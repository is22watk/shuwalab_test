function cleanData(land, hand) {
    cleanedData = [];
    
  
    //xyxyxyxyに一次元にしてく
    for (i = 0; i <= 41; i++) {
      // console.log(Math.floor(i / 2));
      if (i == 0 || i % 2 == 0) {
        cleanedData[i] = 1 - land[Math.floor(i / 2)].x;
        if (hand == "Right") {
          cleanedData[i] = cleanedData[i] * -1;
          // console.log("Left");
        }
      } else {
        cleanedData[i] = land[Math.floor(i / 2)].y;
      }
    }
  
    //相対座標にする
    for (i = 0; i < cleanedData.length; i = i + 2) {
      if (i == 0) {
        baseX = cleanedData[i];
        baseY = cleanedData[i + 1];
      }
      cleanedData[i] = cleanedData[i] - baseX;
      cleanedData[i + 1] = cleanedData[i + 1] - baseY;
    }
  
    //正規化！
    if (Math.max(...cleanedData) > Math.min(...cleanedData) * -1) {
      absValue = Math.abs(Math.max(...cleanedData));
    } else {
      absValue = Math.abs(Math.min(...cleanedData));
    } //絶対値の最大値
  
    for (i = 0; i < cleanedData.length; i++) {
      cleanedData[i] = cleanedData[i] / absValue;
    }
  
    // console.log(cleanedData);
    
    return cleanedData;
  }