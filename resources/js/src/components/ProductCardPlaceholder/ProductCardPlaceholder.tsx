import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";

interface Props {}

const ProductCardPlaceholder: React.FC<Props> = ({}: Props) => {
  const DEFAULT_PLACEHOLDER_PADDING = 15;

  return (
    <>
      <ContentLoader
        speed={2}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        height={300}
      >
        <rect x={0} rx="0" ry="0" width={"100%"} height={"200px"} />
        {new Array(2).fill("").map((_, idx) => (
          <rect
            x={0}
            y={200 + 30 * idx + DEFAULT_PLACEHOLDER_PADDING * (idx + 1)}
            width={"100%"}
            height={"30px"}
          />
        ))}
      </ContentLoader>
    </>
  );
};

export default ProductCardPlaceholder;
