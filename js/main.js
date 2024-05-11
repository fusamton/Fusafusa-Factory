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


  // 検証エリア


  // パスワード生成エリア
  refresh.addEventListener('click', () => {
    let creatingPassword = '';
    usingWord = wordList + usingCapitalWord + usingSymbolList;
    for (let i = 0; i < passwordLength.value; i++) {
      const randomNumber = Math.floor(Math.random() * usingWord.length);
      creatingPassword += usingWord[randomNumber];
    }
    password.textContent = creatingPassword;
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
  useCapital.addEventListener('change', () => {
    if (useCapital.checked) {
      usingCapitalWord += wordList.toUpperCase();
    } else {
      usingCapitalWord = '';
    }
  });

  // 記号使用エリア
  function symbolInputToggle() {
    if (useSymbol.checked) {
      usingSymbol.removeAttribute('disabled');
    } else {
      usingSymbol.setAttribute('disabled', 'disabled');
    }
  }

  useSymbol.addEventListener('change', () => {
    symbolInputToggle()
  });

  // 使用記号管理エリア
  usingSymbol.addEventListener('input', () => {
    usingSymbolList = usingSymbol.value;
    console.log(usingSymbolList);
  });

}