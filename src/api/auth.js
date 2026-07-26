const AUTH_URL = "https://serverless-api-teal.vercel.app/api/auth/signin";

export async function signIn(email, password) {
    const response = await fetch(AUTH_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
    });
    
    const body = await response.json().catch(() => ({}));

    if (!response.ok || body.success === false){
      throw new Error(body.message || body.error || "Something went wrong. Please try again.");
    }

    const data = body.data || body;
    const token = data.jwt_token || data.token || data.jwtToken || (data.data && data.data.token);

    return {
        token,
        user: data.user || null,
    };
}