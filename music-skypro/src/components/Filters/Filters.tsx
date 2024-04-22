"use client";

import styles from "./Filters.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";
import { filters } from "./data";

export default function Filters() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          isOpened={activeFilter === filter.title ? true : false}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
          key={filter.title}
        />
      ))}
    </div>
  );
}
