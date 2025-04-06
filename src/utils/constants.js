let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:8080";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://be-5kst.onrender.com";
}
console.log(apiRoot);
export const api_root = apiRoot;
