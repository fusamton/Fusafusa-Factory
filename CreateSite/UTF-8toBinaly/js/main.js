// 'use strict';

// {
//   const orgUtf16 = document.querySelector('#org-utf16');
//   const utf16ToBinaly = document.querySelector('#utf16-to-binaly');
//   const resultBinaly = document.querySelector('#result-binaly');
//   const contentCopy = document.querySelector('#content-copy');
  
//   let binaryString = '';
  
//   utf16ToBinaly.addEventListener('click', () => {
//     const utf16String = orgUtf16.value; // UTF-16文字列
  
//     // UTF-16文字列全体をループで処理
//     binaryString = '';
//     for (let i = 0; i < utf16String.length; i++) {
//       const codePoint = utf16String.codePointAt(i); // 文字のコードポイントを取得
//       const binaryCode = codePoint.toString(2); // コードポイントを二進数に変換
//       binaryString += binaryCode.padStart(16, '0'); // 16桁に整形
//     }
  
//     // 平方根の長さごとに改行を挿入
//     const rootLength = Math.sqrt(binaryString.length);
//     const formattedBinaryString = binaryString.match(new RegExp(`.{1,${Math.ceil(rootLength)}}`, 'g')).join('<br>');
  
//     // ■と□に置き換えて表示
//     const displayString = formattedBinaryString.replace(/0/g, '□').replace(/1/g, '■');
  
//     // HTMLとして挿入
//     resultBinaly.innerHTML = displayString;

//     adjustFontSize(resultBinaly);
  
//     console.log(displayString);
//   });
  
//   // コピーボタン
//   contentCopy.addEventListener('click', () => {
//     navigator.clipboard.writeText(binaryString);
//   })

//   // フォントサイズ調整
//   function adjustFontSize(element) {
//     const parent = element.parentElement;
//     let fontSize = parseInt(window.getComputedStyle(element).fontSize);

//     while (element.scrollHeight > parent.clientHeight || element.scrollWidth > parent.clientWidth) {
//       fontSize -= 1;
//       element.style.fontSize = `${fontSize}px`;
//       if (fontSize <= 10) break; // 最小フォントサイズの制限
//     }
  
//   // UTF-16生成ボタン
//   const orgBinaly = document.querySelector('#org-binaly');
//   const binalyToUtf16 = document.querySelector('#binaly-to-utf16');
//   const resultUtf16 = document.querySelector('#result-utf16');

//   binalyToUtf16.addEventListener('click', () => {
//     const binaryString = orgBinaly.value;
//     const binaryArray = binaryString.match(/.{1,16}/g); // 16ビットごとに分割

//     let utf16String = '';

//     binaryArray.forEach(binary => {
//       let codePoint = parseInt(binary, 2);
//       if (codePoint <= 0xFFFF) {
//         utf16String += String.fromCharCode(codePoint);
//       } else {
//         codePoint -= 0x10000;
//         const highSurrogate = (codePoint >> 10) + 0xD800;
//         const lowSurrogate = (codePoint & 0x3FF) + 0xDC00;
//         utf16String += String.fromCharCode(highSurrogate, lowSurrogate);
//       }
//     });

//     resultUtf16.textContent = utf16String;
//     console.log(utf16String);
//   });

// }

'use strict';

{
  const orgUtf16 = document.querySelector('#org-utf16');
  const utf16ToBinaly = document.querySelector('#utf16-to-binaly');
  const resultBinaly = document.querySelector('#result-binaly');
  const contentCopy = document.querySelector('#content-copy');
  
  let binaryString = '';
  
  utf16ToBinaly.addEventListener('click', () => {
    const utf16String = orgUtf16.value; // UTF-16文字列
  
    // UTF-16文字列全体をループで処理
    binaryString = '';
    for (let i = 0; i < utf16String.length; i++) {
      const codePoint = utf16String.codePointAt(i); // 文字のコードポイントを取得
      const binaryCode = codePoint.toString(2); // コードポイントを二進数に変換
      binaryString += binaryCode.padStart(16, '0'); // 16桁に整形
    }
  
    // 平方根の長さごとに改行を挿入
    const rootLength = Math.sqrt(binaryString.length);
    const formattedBinaryString = binaryString.match(new RegExp(`.{1,${Math.ceil(rootLength)}}`, 'g')).join('<br>');
  
    // ■と□に置き換えて表示
    const displayString = formattedBinaryString.replace(/0/g, '□').replace(/1/g, '■');
  
    // HTMLとして挿入
    resultBinaly.innerHTML = displayString;

    // 文字サイズを調整
    adjustFontSize(resultBinaly);

    console.log(displayString);
  });
  
  // コピーボタン
  contentCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(binaryString);
  })
  
  // UTF-16生成ボタン
  const orgBinaly = document.querySelector('#org-binaly');
  const binalyToUtf16 = document.querySelector('#binaly-to-utf16');
  const resultUtf16 = document.querySelector('#result-utf16');

  binalyToUtf16.addEventListener('click', () => {
    const binaryString = orgBinaly.value;
    const binaryArray = binaryString.match(/.{1,16}/g); // 16ビットごとに分割

    let utf16String = '';

    binaryArray.forEach(binary => {
      let codePoint = parseInt(binary, 2);
      if (codePoint <= 0xFFFF) {
        utf16String += String.fromCharCode(codePoint);
      } else {
        codePoint -= 0x10000;
        const highSurrogate = (codePoint >> 10) + 0xD800;
        const lowSurrogate = (codePoint & 0x3FF) + 0xDC00;
        utf16String += String.fromCharCode(highSurrogate, lowSurrogate);
      }
    });

    resultUtf16.textContent = utf16String;
    console.log(utf16String);
  });

  function adjustFontSize(element) {
    const parent = element.parentElement;
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);

    while (element.scrollWidth > parent.clientWidth) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
      if (fontSize <= 1) break; // 最小フォントサイズの制限
    }
  }
}
