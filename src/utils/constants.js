let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:8080";
} else {
  apiRoot = "https://be-5kst.onrender.com";
}
// if (process.env.BUILD_MODE === "production") {
// }
console.log(process.env);
export const api_root = apiRoot;

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEM_PER_PAGE = 12;

export const CARD_MEMBER_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};
