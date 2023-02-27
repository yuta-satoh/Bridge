import Link from 'next/link';

export default function Logout() {
  // クリック時にクッキーを破棄
  function logout() {
    if (document.cookie) {
      return;
    } else {
      document.cookie = "id=;path=/;expires=Thu, 1-Jan-1970 00:00:00 GMT;";
    }
  }

  return (
    <>
      <div className="logout">
        <Link href="/login">ログアウト</Link>
      </div>
    </>
  );
}
