import { CategoryWithProductCards } from "@/src/types/models";

import styles from "./PriceList.module.scss";
import classNames from "classnames";
import Button from "../Button";

interface Props {
  productWithCategories: CategoryWithProductCards[];
}

export default function PriceList({ productWithCategories }: Props) {
  return (
    <ul className={styles.priceList}>
      {productWithCategories.map((category) => (
        <li
          key={category.id}
          className={classNames(
            styles.priceListItem
            // category.id === 14 && styles.activeCategory
          )}
          style={{
            ["--primary-color" as string]: category.colors.primary,
            ["--alt-color" as string]: category.colors.alternative,
          }}
        >
          <div className={styles.titlePanel}>
            <div className={styles.categoryTitle}>
              <img
                src={`/storage/${category.icon}`}
                alt={category.title}
                className={styles.icon}
              />
              <h3>{category.title}</h3>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 256 256"
              className={styles.arrowDown}
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>

          <div className={styles.tablePrices}>
            {category.products.map((product) => (
              <div className={styles.tablePricesItem} key={product.id}>
                <h4>{product.title}</h4>

                <div className={styles.tableActions}>
                  <h4>From 25$</h4>
                  <Button>Let's Sign</Button>
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
