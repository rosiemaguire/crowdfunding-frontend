async function postProject(title, description, goal, image) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const token = window.localStorage.getItem("token");
  const body = {
    "title": title,
    "description": description,
    "goal": goal,
    "image": image,
  };

  if (!image) {
    delete body.image;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const fallbackError = `Error creating project`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessages = {
      goalError: data?.goal,
      imageError: data?.image,
      detailError: data?.detail,
    };
    if (errorMessages) {
      if (
        errorMessages.goalError &&
        errorMessages.goalError.some((error) => error.includes("valid number"))
      ) {
        errorMessages.goalError = "Goal must be a number.";
      }
      if (
        errorMessages.imageError &&
        errorMessages.imageError.some((error) => error.includes("URL"))
      ) {
        errorMessages.imageError = "Provide a valid link to image.";
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

export default postProject;
