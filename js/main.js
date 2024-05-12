'use strict';

{
  // 要素取得エリア
  const refresh = document.querySelector('#refresh');
  const password = document.querySelector('#password');
  const contentCopy = document.querySelector('#content-copy');
  const passwordLength = document.querySelector('#password-length');
  const passwordLengthDisplay = document.querySelector('#password-length-display');
  const useNumber = document.querySelector('#use-number');
  const useCapital = document.querySelector('#use-capital');
  const useSymbol = document.querySelector('#use-symbol');
  const usingSymbol = document.querySelector('#using-symbol');

  // グローバル変数管理エリア
  const wordList = 'abcdefghijklmnopqrstuvwxyz';
  const numberList = '1234567890';
  let usingWord = '';
  let usingNumberWord = '';
  let usingCapitalWord = '';
  let usingSymbolWord = '';
  let creatingPassword = '';

  // 検証エリア


  // パスワード生成エリア
  function generatPassword() {
    creatingPassword = '';
    usingWord = wordList + usingCapitalWord + usingSymbolWord + usingNumberWord;
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
    console.log(`小文字${lowerCaseCount}`);
    return lowerCaseCount;
  }

  refresh.addEventListener('click', () => {
    generatPassword();
    while (capitalCheck() === 0 || symbolCheck() === 0 || lowerCaseCheck() === 0 || numberCheck() === 0) {
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

  // 数字使用エリア
  function numberCheck() {
    let numberCount = 0;
    if (useNumber.checked) {
      for (let i = 0; i < passwordLength.value; i++) {
        for (let j = 0; j < 10; j++) {
          if (creatingPassword[i] === usingNumberWord[j]) {
            numberCount++;
          }
        }
      }
    } else {
      numberCount--;
    }
    console.log(`数字${numberCount}`);
    return numberCount;
  }

  useNumber.addEventListener('change', () => {
    if (useNumber.checked) {
      usingNumberWord = numberList;
    } else {
      usingCapitalWord = '';
    }
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
      capitalCount--;
    }
    console.log(`大文字${capitalCount}`);
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
        for (let j = 0; j < usingSymbolWord.length; j++) {
          if (creatingPassword[i] === usingSymbolWord[j]) {
            symbolCount++;
          }
        }
      }
    } else {
      symbolCount--;
    }
    console.log(`記号${symbolCount}`);
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
    usingSymbolWord = usingSymbol.value;
    console.log(usingSymbolWord);
  });

}