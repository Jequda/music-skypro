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
  tracksData: trackType[];
  optionList: string[] | string;
};

export default function FilterItem({
  title,
  value,
  handleFilterClick,
  isOpened,
  tracksData,
  optionList,
}: FilterItemType) {
  const [filterNumber, SetFilterNumber] = useState<number>(0);
  const authorsList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  const genreList = useAppSelector(
    (state) => state.playlist.filterOptions.genre
  );
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
        // setFilters({
        //   author: authorsList.includes(item)
        //     ? authorsList.filter((el) => el !== item)
        //     : [...authorsList, item],

        //   genre: genreList.includes(item)
        //     ? genreList.filter((el) => el !== item)
        //     : [...genreList, item],

        // })
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
    console.log(optionList);
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
