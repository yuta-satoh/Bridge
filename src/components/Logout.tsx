import Link from 'next/link';
import Cookies from 'js-cookie';
import useSWR from 'swr';

// export default function Logout() {
//   const fetcher = (url: string) =>
//     fetch(url).then((res) => res.json());
//   // クリック時にクッキーを破棄
//   function logout() {
//     if (!document.cookie) {
//       return;
//     } else {
//       const { data, error } = useSWR(`/api/logoutIron`, fetcher);
//       document.cookie =
//         'id=;path=/;expires=Thu, 1-Jan-1970 00:00:00 GMT;';
//       Cookies.remove('status');
//     }
//   }

//   return (
//     <>
//       <div className="logout">
//         <Link href="/login" onClick={() => logout()}>
//           ログアウト
//         </Link>
//       </div>
//     </>
//   );
// }
