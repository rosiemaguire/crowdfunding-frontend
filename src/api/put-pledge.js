async function putPledge(id, comment, anonymous) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/${id}/`;
  const token = window.localStorage.getItem("token");
  const body = {
    "comment": comment,
    "anonymous": anonymous,
  }

  for (let bod in body){
    if (body[bod] == ""){
      delete body[bod]
    }
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const fallbackError = `Error updating pledge`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessages = {
      commentError: data?.comment,
      anonymousError: data?.anonymous,
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

export default putPledge;
