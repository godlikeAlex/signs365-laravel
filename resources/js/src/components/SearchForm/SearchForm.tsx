import { FormEvent, useState } from "react";

import BaseInput from "../BaseInput";

import SearchIcon from "@/assets/icons/search.svg?react";

import classes from "./SearchForm.module.scss";
import classNames from "classnames";

export default function SearchForm() {
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    const query = fieldValues["query"] ?? "";

    if (query.length <= 2) {
      e.preventDefault();
      setError(true);
    }
  };

  return (
    <form
      action="/search"
      className={classes.searchForm}
      onSubmit={handleSubmit}
    >
      <BaseInput
        name="query"
        className={classNames(classes.searchInput, {
          [classes.searchInputError]: error,
        })}
        onChange={() => setError(false)}
        placeholder="Search"
      />

      <button className={classes.searchInputButton}>
        <SearchIcon />
      </button>
    </form>
  );
}
