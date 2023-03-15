// supabaseのURLとAPIkeyを環境変数から取得

// 環境変数の型はundefinedを含むので、String()を使用しています
const spbaseUrl = String(process.env.SUPABASE_URL);
const spbaseKey = String(process.env.SUPABASE_API_KEY);

export { spbaseUrl, spbaseKey };
