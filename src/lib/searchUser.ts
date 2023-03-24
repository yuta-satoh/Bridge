const searchUser = async (
    email: string,
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
        return "";
    }).catch(() => {
        return "";
    });
    
    return {
        email: searchEmailResult,
    }
}

export default searchUser;
