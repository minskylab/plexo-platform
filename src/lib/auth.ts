export const loginWithEmail = async ({
  authEmailURL,
  email,
  password,
}: {
  authEmailURL: string | undefined;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(authEmailURL || "/auth/email/login", {
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
