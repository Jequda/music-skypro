import classnames from "classnames";
import styles from "./FilterItem.module.css";
import { trackType } from "@/types";
import { order } from "../data";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/PlaylistSlice";
import { useEffect, useState } from "react";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  optionList: string[] | string;
};

export default function FilterItem({
  title,
  value,
  handleFilterClick,
  isOpened,
  optionList,
}: FilterItemType) {
  const tracksData = useAppSelector((state) => state.playlist.initialTracks);
  const [filterNumber, SetFilterNumber] = useState<number>(0);
  const dispatch = useAppDispatch();
  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };

  const toggleFilter = (item: string) => {
    if (value !== "order" && optionList && optionList instanceof Array) {
      dispatch(
        setFilters({
          [value]: optionList.includes(item)
            ? optionList.filter((el) => el !== item)
            : [...optionList, item],
        })
      );
    } else {
      dispatch(setFilters({ order: item }));
    }
  };

  useEffect(() => {
    if (value !== "order" && optionList) SetFilterNumber(optionList.length);
  }, [optionList, value]);

  getFilterList();
  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={() => handleFilterClick(title)}
          className={classnames(styles.filterButton, styles.BtnText, {
            [styles.active]: isOpened,
          })}
        >
          {title}
        </div>
        {filterNumber > 0 && (
          <div className={styles.filterNumber}>{filterNumber}</div>
        )}
        {isOpened && (
          <div className={styles.activeFilterContainer}>
            <ul className={classnames(styles.activeFilter)}>
              {getFilterList().map((item) => (
                <li
                  onClick={() => toggleFilter(item)}
                  key={item}
                  className={classnames({
                    [styles.SelectedFilter]:
                      value === "order"
                        ? item === optionList
                        : optionList.includes(item),
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
