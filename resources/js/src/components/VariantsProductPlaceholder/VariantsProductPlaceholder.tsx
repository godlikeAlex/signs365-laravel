import React from "react";
import ContentLoader from "react-content-loader";

interface Props {}

const VariantsProductPlaceholder: React.FC<Props> = ({}: Props) => {
  const loader = () => (
    <>
      <ContentLoader
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        height={45}
        width={210}
      >
        <rect x="0" y="5" rx="8" ry="8" width="200" height="40" />
      </ContentLoader>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {loader()}
      {loader()}
    </div>
  );
};

export default VariantsProductPlaceholder;
