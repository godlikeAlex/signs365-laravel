import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";

import "./embla.css";

import { CategoryWithProductCards } from "@/src/types/models";

import styles from "./PriceList.module.scss";
import classNames from "classnames";
import Button from "../Button";
import ProductCard from "../ProductCard";
import { HomePageSection } from "../HomePageSection";
import { CallToAction } from "../CallToAction";

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const START_INITIAL_SLIDE = 2;

interface Props {
  productWithCategories: CategoryWithProductCards[];
}

export default function PriceList({ productWithCategories }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(START_INITIAL_SLIDE);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: false,
    watchDrag: false,
    startIndex: START_INITIAL_SLIDE,
  });
  const tweenFactor = useRef(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0.2, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();

    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity);
  }, [emblaApi, tweenOpacity]);

  return (
    <div
      className={styles.priceSection}
      style={{
        ["--primary-color" as string]:
          productWithCategories[selectedIndex].colors.primary,
        ["--alt-color" as string]:
          productWithCategories[selectedIndex].colors.alternative,
      }}
    >
      <HomePageSection>
        <div className="container">
          <div className="col-md-12">
            <HomePageSection.Title
              title="Custom Printing Solutions for Your Brand"
              description="We offer high-quality print-on-demand services for businesses and individuals. From small batches to large orders — fast production, consistent quality, and fair pricing."
            />
          </div>
          <div className="col-md-12">
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {productWithCategories.map((category, index) => (
                    <div
                      className="embla__slide"
                      key={index}
                      onClick={() => emblaApi.scrollTo(index)}
                    >
                      <div className={styles.slideContent}>
                        <h5
                          className={styles.categoryName}
                          style={{
                            color:
                              selectedIndex === index
                                ? category.colors.primary
                                : undefined,
                          }}
                        >
                          {category.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={classNames(styles.button, styles.buttonPrev)}
                onClick={onPrevButtonClick}
              >
                <svg width="14" height="26" viewBox="0 0 14 26" fill="none">
                  <path
                    d="M1.5 24.5L12.5 13L1.5 1.5"
                    stroke="#171109"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <button onClick={onNextButtonClick} className={styles.button}>
                <svg width="14" height="26" viewBox="0 0 14 26" fill="none">
                  <path
                    d="M1.5 24.5L12.5 13L1.5 1.5"
                    stroke="#171109"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="row" style={{ rowGap: 30 }}>
              {productWithCategories[selectedIndex].products.map(
                (product, index) => (
                  <div
                    key={product.id}
                    className={classNames(
                      "col-md-3",
                      styles.productCardContainer
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="col-md-12 mt-5">
            <CallToAction />
          </div>
        </div>
      </HomePageSection>
    </div>
  );
}
