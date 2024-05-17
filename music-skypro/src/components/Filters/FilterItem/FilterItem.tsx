import classnames from "classnames";
import styles from "./FilterItem.module.css";
import { trackType } from "@/types";
import { order } from "../data";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/PlaylistSlice";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  tracksData: trackType[];
  filterNumber: number;
};

export default function FilterItem({
  title,
  value,
  handleFilterClick,
  isOpened,
  tracksData,
  filterNumber,
}: FilterItemType) {
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
    dispatch(
      setFilters({
        author: authorsList.includes(item)
          ? authorsList.filter((el) => el !== item)
          : [...authorsList, item],

        genre: genreList.includes(item)
          ? genreList.filter((el) => el !== item)
          : [...genreList, item],
      })
    );
  };

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
        {filterNumber > 0 ? (
          <div className={styles.filterNumber}>{filterNumber}</div>
        ) : null}
        {isOpened && (
          <div className={styles.activeFilterContainer}>
            <ul className={classnames(styles.activeFilter)}>
              {getFilterList().map((item) => (
                <li
                  onClick={() => toggleFilter(item)}
                  key={item}
                  className={classnames({
                    [styles.SelectedFilter]:
                      authorsList.includes(item) || genreList.includes(item),
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
