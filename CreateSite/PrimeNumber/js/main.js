'use strict';

{
  // 要素取得エリア、素数羅列用
  const primeNumberQuantity = document.querySelector('#prime-number-quantity');
  const primeNumberOutput = document.querySelector('#prime-numbers-output');
  const generateButton = document.querySelector('#generate-button');

  // ボタンのクリックイベント
  generateButton.addEventListener('click', () => {
    displayPrimeNumber();
  });

  // 素数表示プログラム
  function displayPrimeNumber() {
    primeNumberOutput.textContent = generatePNList(primeNumberQuantity.value).join(', ');
  }

  // n個の素数リスト作成プログラム
  function generatePNList(PNQ) {
    const PNList = [];
    let PNCandidate = 2;
    while (PNList.length < PNQ) {
      if (isPrimeNumber(PNCandidate)) {
        PNList.push(PNCandidate);
      }
      PNCandidate++;
    }
    return PNList;
  }

  // 素数判断プログラム
  function isPrimeNumber(serchingNumber) {
    // 早期リターン
    if (serchingNumber <= 1) return false;
    if (serchingNumber === 2) return true;
    //必要な要素
    const currentNumberLimit = Math.ceil(serchingNumber ** .5);
    let currentNumber = 2;
    // 探す
    while (currentNumber <= currentNumberLimit) {
      if (serchingNumber % currentNumber === 0) {
        return false;
      }
      currentNumber++;
    }
    return true;
  }

  // 要素取得エリアランダム素数用
  const primeNumberSize = document.querySelector('#prime-number-size');
  const rangeValue = document.querySelector('#range-value');
  const randomPrimeNumberOutput = document.querySelector('#random-prime-number-output');
  const generateButton2 = document.querySelector('#generate-button-2');
  // 変数
  let randomStartPoint = 0;
  let randomPrimeNumber = 0;

  // リロード時実行箇所
  updateRangeValue();

  // 素数の大きさ指定
  primeNumberSize.addEventListener('input', updateRangeValue);
  primeNumberSize.addEventListener('change', updateRangeValue);

  function updateRangeValue() {
    rangeValue.textContent = `${primeNumberSize.value}桁`;
  }

  // 素数の探索開始地点作成
  generateButton2.addEventListener('click', createRandom);

  function createRandom() {
    randomStartPoint = 0;
    while (randomStartPoint < 10 ** (primeNumberSize.value - 1)) {
      for (let i = 0; i < primeNumberSize.value; i++) {
        randomStartPoint += Math.floor(Math.random() * 10) * 10 ** i;
      }
    }
    return randomStartPoint;
  }

  // 素数生成
  generateButton2.addEventListener('click', () => {
    let randomPrimeNumberCandidate = randomStartPoint;
    while (isPrimeNumber(randomPrimeNumberCandidate) === false) {
      randomPrimeNumberCandidate++;
    }
    randomPrimeNumber = randomPrimeNumberCandidate;
  });

  // 素数出力
  generateButton2.addEventListener('click', () => {
    randomPrimeNumberOutput.textContent = randomPrimeNumber;
    console.log(randomPrimeNumber);

  });
}

