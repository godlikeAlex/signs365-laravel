import StarSVG from "@/assets/icons/star.svg?react";

import classes from "./Rating.module.scss";

type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { fontSize: "8px", size: 10 },
  md: { fontSize: "10px", size: 15 },
  lg: { fontSize: "15px", size: 22 },
};

export default function Rating({ rating, size = "sm" }: Props) {
  return (
    <div className={classes.rating}>
      {new Array(Math.min(rating, 5)).fill("").map((_, idx) => (
        <StarSVG width={sizes[size].size} height={sizes[size].size} key={idx} />
      ))}

      <span
        className={classes.ratingValue}
        style={{ fontSize: sizes[size].fontSize }}
      >
        {rating}
      </span>
    </div>
  );
}
