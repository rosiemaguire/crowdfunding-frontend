
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
      if (
        errorMessages.usernameError &&
        errorMessages.usernameError.some((error) => error.includes("valid number"))
      ) {
        errorMessages.usernameError = "Goal must be a number.";
      }
      if (
        errorMessages.emailError &&
        errorMessages.emailError.some((error) => error.includes("URL"))
      ) {
        errorMessages.emailError = "Provide a valid link to image.";
      }
      if (
        errorMessages.detailError &&
        errorMessages.detailError.includes("Authentication credentials")
      ) {
        errorMessages.detailError =
          "You must be logged in to create a project.";
      }
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