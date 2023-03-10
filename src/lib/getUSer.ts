import useSWR from 'swr';
import Cookies from 'js-cookie';

type User = {
  id:number;
  lastName: string;
  firstName: string;
  gender: string;
  tell1: string;
  tell2: string;
  tell3: string;
  email: string;
  zipcode1: string;
  zipcode2: string;
  address: string;
  password: string;
  confirmationPassword: string;
}[];

export default function getUser(userid: string | undefined) {
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error }: { data: User; error: any } = useSWR(
    `/api/users?id=eq.${userid}`,
    fetcher
  );

  if (error) return undefined;

  return data;
}

export async function midLogin(
    email:string,
    password:string
  ) {
    // postgRESTのAPIと通信するためのTOKENを設定
    const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
    // 以下、JSONデータの受け取り
    const res = await fetch(
      `http://127.0.0.1:8000/users?email=eq.${email}&password=eq.${password}`,
      {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res)=>res.json())
    .then((data:User)=>{
        if(data.length !== 0){
            // Cookies.set('status', 'true');
            // Cookies.set('id',`${data[0].id}`)
            // console.log(data)
            return data[0].id
        }
        return 'false'
    })
    if(res !== 'false'){
        Cookies.set('status', 'true');
        Cookies.set('id',`${res}`)
        return res
    }
    return res
  }
