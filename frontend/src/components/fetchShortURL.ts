export async function createShortURL(longURL:string,userID:string): Promise<void> {
  try {
    const response = await fetch("http://127.0.0.1:8082/create-short-url", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({longURL,userID}), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
