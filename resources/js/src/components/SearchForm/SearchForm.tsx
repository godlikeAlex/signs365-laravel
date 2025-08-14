import BaseInput from "../BaseInput";

import SearchIcon from "@/assets/icons/search.svg?react";

import classes from "./SearchForm.module.scss";

export default function SearchForm() {
  return (
    <form action="/search" className={classes.searchForm}>
      <BaseInput
        name="query"
        className={classes.searchInput}
        placeholder="Search"
      />

      <button className={classes.searchInputButton}>
        <SearchIcon />
      </button>
    </form>
  );
}
