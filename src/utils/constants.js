let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:8080";
} else {
  apiRoot = "https://be-5kst.onrender.com";
}
// if (process.env.BUILD_MODE === "production") {
// }
console.log(apiRoot);
export const api_root = apiRoot;
