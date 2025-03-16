"use server";

export async function createShortURL(
  longURL: string,
  userID = "guest", // Default userID for non-authenticated users
): Promise<string | null> {
  try {
    const response = await fetch("http://127.0.0.1:8082/create-short-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longURL, userID }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result.shortURL;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
