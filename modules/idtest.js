async function getAppId(url, data) {
  // Create a new Request object.
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Make the request.
  const response = await fetch(request);
  // Check the response status code.
  if (response.status === 200) {
    // The request was successful.
    const data = await response.json();
    console.log(data);
  } else {
    // The request failed.
    throw new Error(`Request failed with status code ${response.status}`);
  }
}



