import { IProductCard } from "@/src/types/models";
import { Link } from "@inertiajs/react";
import classNames from "classnames";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import ProductCard from "../ProductCard";
import SliderProducts from "../SliderProducts";
import classes from "./HomeSection.module.scss";

type Props = {
  title: string;
  titleUrl: string;
  products: IProductCard[];
  primaryColor: string;
  altColor: string;
};

export default function HomeSection({
  title,
  titleUrl,
  products,
  primaryColor,
  altColor,
}: Props) {
  return (
    <section
      className={classes.homeSection}
      style={{
        ["--primary-color" as string]: primaryColor,
        ["--alt-color" as string]: altColor,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className={classNames("m-0", classes.homeSectionTitle)}>
              <Link href={titleUrl} className={classes.homeSectionTitleLink}>
                {title}
              </Link>
            </h2>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "container",
          classes.homeSectionProductsContainer
        )}
      >
        <SliderProducts products={products} />
      </div>
    </section>
  );
}
