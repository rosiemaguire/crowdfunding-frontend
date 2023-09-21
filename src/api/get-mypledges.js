async function getMyPledges() {

  const url = `${import.meta.env.VITE_API_URL}/mypledges/`;
  const token = window.localStorage.getItem("token");
  const body = {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  if (token == null){
    delete body.headers
  }

  const response = await fetch(url, body);

  if (!response.ok) {
    const fallbackError = "Error fetching pledges";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await response.json();
}

export default getMyPledges;