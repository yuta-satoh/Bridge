export default function getCookieValue(): string {
  // cookie文字列をセミコロン(;)で分割
  const cookies = document.cookie.split(';');
  // 配列cookiesを=で分割して代入し、
  // 0番目の要素が"id"なら1番目の要素(cookieの値)を返す
  for (let cookie of cookies) {
      const cookiesArray = cookie.split('='); 
      if (cookiesArray[0].trim() === "id") { 
          return cookiesArray[1];  // (key[0],value[1])
      }
  }
  // 上記の処理で何もリターンされなければ空文字を返す
  return '';
}
