'use strict';

{
  // 要素取得エリア
  const refresh = document.querySelector('#refresh');
  const password = document.querySelector('#password');
  const contentCopy = document.querySelector('#content-copy');
  const passwordLength = document.querySelector('#password-length');
  const passwordLengthDisplay = document.querySelector('#password-length-display');
  const useCapital = document.querySelector('#use-capital');
  const useSymbol = document.querySelector('#use-symbol');
  const usingSymbol = document.querySelector('#using-symbol');

  // グローバル変数管理エリア
  const wordList = 'abcdefghijklmnopqrstuvwxyz';
  let usingWord = '';
  let usingCapitalWord = '';
  let usingSymbolList = '';
  let creatingPassword = '';

  // 検証エリア


  // パスワード生成エリア
  function generatPassword() {
    creatingPassword = '';
    usingWord = wordList + usingCapitalWord + usingSymbolList;
    for (let i = 0; i < passwordLength.value; i++) {
      const randomNumber = Math.floor(Math.random() * usingWord.length);
      creatingPassword += usingWord[randomNumber];
    }
    password.textContent = creatingPassword;
  }

  function lowerCaseCheck() {
    let lowerCaseCount = 0;
      for (let i = 0; i < passwordLength.value; i++) {
        for (let j = 0; j < 26; j++) {
          if (creatingPassword[i] === wordList[j]) {
            lowerCaseCount++;
          }
        }
      }
    console.log(lowerCaseCount);
    return lowerCaseCount;
  }

  refresh.addEventListener('click', () => {
    generatPassword();
    while (capitalCheck() === 0 || symbolCheck() === 0 || lowerCaseCheck() === 0) {
      generatPassword();
    }
  });

  // コピーボタンエリア
  contentCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(password.textContent);
  });

  // 文字数変更エリア
  passwordLengthDisplay.textContent = passwordLength.value + '文字';

  passwordLength.addEventListener('input', () => {
    passwordLengthDisplay.textContent = passwordLength.value + '文字';
  });

  // 大文字使用エリア
  function capitalCheck() {
    let capitalCount = 0;
    if (useCapital.checked) {
      for (let i = 0; i < passwordLength.value; i++) {
        for (let j = 0; j < 26; j++) {
          if (creatingPassword[i] === usingCapitalWord[j]) {
            capitalCount++;
          }
        }
      }
    } else {
      capitalCount++;
    }
    console.log(capitalCount);
    return capitalCount;
  }

  useCapital.addEventListener('change', () => {
    if (useCapital.checked) {
      usingCapitalWord += wordList.toUpperCase();
    } else {
      usingCapitalWord = '';
    }
  });

  // 記号使用エリア
  function symbolCheck() {
    let symbolCount = 0;
    if (useSymbol.checked) {
      for (let i = 0; i < passwordLength.value; i++) {
        for (let j = 0; j < usingSymbolList.length; j++) {
          if (creatingPassword[i] === usingSymbolList[j]) {
            symbolCount++;
          }
        }
      }
    } else {
      symbolCount++;
    }
    console.log(symbolCount);
    return symbolCount;
  }

  function symbolInputToggle() {
    if (useSymbol.checked) {
      usingSymbol.removeAttribute('disabled');
    } else {
      usingSymbol.setAttribute('disabled', 'disabled');
    }
  }

  useSymbol.addEventListener('change', () => {
    symbolInputToggle();
  });

  // 使用記号管理エリア
  usingSymbol.addEventListener('input', () => {
    usingSymbolList = usingSymbol.value;
    console.log(usingSymbolList);
  });

}