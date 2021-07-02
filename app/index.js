import { App } from "./App.js";
import api from "./helpers/wp_api.js";

const d = document;

d.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
