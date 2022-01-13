type graphqlQueryType = {
  operationName: string;
  query: string;
  variables?: { [key: string]: any };
};

export const movieQuery = async (graphqlQuery: graphqlQueryType) => {
  const endpoint = "https://movieqlapi.ujjalacharya.com.np/";
  const headers = {
    "content-type": "application/json",
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  const res = await fetch(endpoint, options);
  return res.json();
};
