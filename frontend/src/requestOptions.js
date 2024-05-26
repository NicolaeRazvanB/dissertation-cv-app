let base_url = import.meta.env.BACK || "http://localhost:7777/";
let requestOptions = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export { base_url, requestOptions };
