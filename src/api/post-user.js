
async function postUser(first_name,last_name,email,username,password) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  const response =  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "username": username,
      "password": password,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error creating user`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessages = {
      usernameError: data?.username,
      emailError: data?.email,
      detailError: data?.detail,
    };

    if (errorMessages) {
      for (let error in errorMessages) {
        if (!errorMessages[error]) {
          delete errorMessages[error];
        }
      }

      const errorMessage = Object.values(errorMessages);
      throw new Error(errorMessage);
    } else {
      const errorMessage = fallbackError;
      throw new Error(errorMessage);
    }  
  }
  return await response.json();
}

export default postUser;