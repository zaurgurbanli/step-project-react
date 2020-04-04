const domain = "http://localhost:3000/";

function fetchFabric(endpoint, method) {
  return async (getParams = "", postParams = {}) => {
    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (method !== "GET") {
      options.method = method;
      options.body = JSON.stringify(postParams);
    }

    const res = await fetch(`${domain}${endpoint}${getParams}`, options);
    return res.json();
  };
}

export const postsFetch = fetchFabric("notes", "GET");
export const createFetch = fetchFabric("notes", "POST");
export const updateFetch = fetchFabric("notes", "PATCH");
export const deleteFetch = fetchFabric("notes", "DELETE");
