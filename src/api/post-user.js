
async function postNewUser(username,password,first_name,last_name,email) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  const response =  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error creating user`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    
  }

  return await response.json();
}

export default postNewUser;