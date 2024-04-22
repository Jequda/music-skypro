import classnames from "classnames";
import styles from "./FilterItem.module.css";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export default function FilterItem({
  title,
  list,
  handleFilterClick,
  isOpened,
}: FilterItemType) {
  return (
    <>
      <div
        onClick={() => handleFilterClick(title)}
        className={classnames(styles.filterButton, styles.BtnText, {
          [styles.active]: isOpened,
        })}
      >
        {title}
      </div>
      {isOpened && (
        <div className={styles.activeFilterContainer}>
          <ul className={styles.activeFilter}>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
