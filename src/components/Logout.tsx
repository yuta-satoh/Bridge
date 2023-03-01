import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Logout() {
  // クリック時にクッキーを破棄
  function logout() {
    if (!document.cookie) {
      return;
    } else {
      document.cookie = "id=;path=/;expires=Thu, 1-Jan-1970 00:00:00 GMT;";
      Cookies.remove('status')
    }
  }

  return (
    <>
      <div className="logout">
        <Link href="/login" onClick={() => logout()}>ログアウト</Link>
      </div>
    </>
  );
}
