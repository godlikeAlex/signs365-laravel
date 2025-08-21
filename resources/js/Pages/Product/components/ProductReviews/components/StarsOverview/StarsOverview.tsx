import { Rating } from "@/src/components";

import classes from "./StarsOverview.module.scss";
import { SummaryRatting } from "@/src/types/ProductModel";

type Props = {
  summaryRatings: SummaryRatting;
};

export default function StarsOverview({ summaryRatings }: Props) {
  return (
    <div className={classes.starsOverview}>
      {Array.from({ length: 5 }, (_, i) => i + 1)
        .reverse()
        .map((currentRating) => {
          return (
            <div key={currentRating} className={classes.starsOverviewItem}>
              <Rating size="lg" rating={currentRating} withLabel={false} />

              <span className={classes.starsOverviewCount}>
                {summaryRatings[currentRating]}
              </span>
            </div>
          );
        })}
    </div>
  );
}
