import { Menu } from "./Menu.js";
import { SearchForm } from "./SearchForm.js";
import { Tile } from "./Title.js";

export function Header() {
  const $header = document.createElement("header");
  $header.classList.add("header");
  $header.appendChild(Tile());
  $header.appendChild(Menu());
  $header.appendChild(SearchForm());

  return $header;
}
