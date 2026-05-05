import React from "react";
import { CategoryWithProductCards } from "@/src/types/models";
import classes from "./HeroSection.module.scss";
import Button from "../Button";
import { Link } from "@inertiajs/react";
import { useContactModal } from "../ContactFormModal";

interface Props {
  productWithCategories: CategoryWithProductCards[];
}

export default function HeroSection({ productWithCategories }: Props) {
  const { open } = useContactModal();
  const [activePulseIndex, setActivePulseIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!productWithCategories.length) {
      return;
    }

    setActivePulseIndex(0);

    const intervalId = window.setInterval(() => {
      setActivePulseIndex(
        (prevIndex) => (prevIndex + 1) % productWithCategories.length
      );
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [productWithCategories.length]);

  return (
    <section className={classes.heroSection}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="top-content">
              <h1 className={classes.title}>
                Print, Install, Design <br /> all in one place.
              </h1>

              <p className={classes.description}>
                From job requests to final installation, keep every step
                organized and under control
              </p>

              <div className={classes.actionGroup}>
                <Button component={Link} href="/shop/adhesive-prints">
                  Get Your Estimate Online
                </Button>

                <Button
                  variant="ghost"
                  color="black"
                  onClick={() => open(null)}
                >
                  Let’s Connect
                </Button>
              </div>
            </div>

            <ul className={classes.categories}>
              <div className="row" style={{ rowGap: 15 }}>
                {productWithCategories.map((category, index) => (
                  <div className="col-md-2 col-6" key={category.id}>
                    <Link
                      className={classes.heroCategory}
                      href={`/shop/${category.slug}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        ["--primary-color" as string]: category.colors.primary,
                        ["--alt-color" as string]: category.colors.alternative,
                      }}
                      data-pulse={
                        activePulseIndex === index && hoveredIndex !== index
                      }
                    >
                      <img
                        src={`/storage/${category.icon}`}
                        className={classes.heroCategoryIcon}
                      />
                      {category.title}
                    </Link>
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
