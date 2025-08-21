import classNames from "classnames";

import StarSVG from "@/assets/icons/star.svg?react";

import classes from "./ReviewForm.module.scss";
import { useState } from "react";

interface Props {
  disabled?: boolean;
  value: number;
  onChange: (value) => void;
}

export default function RatingInput({ value, onChange, disabled }: Props) {
  const [visitedStar, setVisitedInput] = useState<number>();

  return (
    <div className={classes.ratingInput}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <button
          onClick={() => onChange(star)}
          key={star}
          disabled={disabled}
          onMouseEnter={() => !disabled && setVisitedInput(star)}
          onMouseLeave={() => !disabled && setVisitedInput(null)}
          className={classNames(classes.ratingInputStar, {
            [classes.ratingInputStarActive]: visitedStar
              ? visitedStar >= star
              : value >= star,
          })}
          type="button"
        >
          <StarSVG className={classes.ratingInputStarIcon} />
        </button>
      ))}
    </div>
  );
}
