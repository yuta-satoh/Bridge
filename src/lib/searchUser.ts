const searchUser = async (
    email: string,
    password: string
) => {
    const searchEmailResult = await fetch(`${process.env.SUPABASE_URL}/users?email=eq.${email}`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        },
	}).then((res) => res.json()).then((data) => {
        if (data.length !== 0) {
            return "このメールアドレスはすでに使用されています"
        } 
        return ""
    })

    const searchPasswordResult = await fetch(`${process.env.SUPABASE_URL}/users?password=eq.${password}`, {
        method: "GET",
        headers: {
            "apikey": `${process.env.SUPABASE_API_KEY}`,
            "Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
        },
    }).then((res) => res.json()).then((data) => {
        if (data.length !== 0) {
            return "このパスワードはすでに使用されています"
        }
        return ""
    })
    return {
        email: searchEmailResult,
        password: searchPasswordResult,
    }
}

export default searchUser;
