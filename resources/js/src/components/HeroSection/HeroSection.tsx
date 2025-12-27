import { CategoryWithProductCards } from "@/src/types/models";
import classes from "./HeroSection.module.scss";
import Button from "../Button";

interface Props {
  productWithCategories: CategoryWithProductCards[];
}

export default function HeroSection({ productWithCategories }: Props) {
  return (
    <section className={classes.heroSection}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="top-content">
              <h1 className={classes.title}>
                Manage your sign installations <br /> in one place
              </h1>

              <p className={classes.description}>
                From job requests to final installation, keep every step
                organized and under control
              </p>

              <Button className={classes.button}>Let's Start Sign</Button>
            </div>

            <ul className={classes.categories}>
              <div className="row" style={{ rowGap: 15 }}>
                {productWithCategories.map((category) => (
                  <div className="col-md-2 col-6">
                    <a
                      className={classes.heroCategory}
                      style={{
                        ["--primary-color" as string]: category.colors.primary,
                        ["--alt-color" as string]: category.colors.alternative,
                      }}
                    >
                      <img
                        src={`/storage/${category.icon}`}
                        className={classes.heroCategoryIcon}
                      />
                      {category.title}
                    </a>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
