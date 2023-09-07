const EMAIL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_URL_EMAIL_AUTH || "/auth/email/login";

export const loginWithEmail = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await fetch(EMAIL_AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error data:", errorData.error);
      return {
        error: true,
        message: errorData.error,
      };
    } else {
      await res.json();
      return {
        error: false,
        message: null,
      };
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
