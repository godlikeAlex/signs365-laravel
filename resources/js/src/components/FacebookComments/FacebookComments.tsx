import React, { useEffect } from "react";

const FacebookComments = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }, []);

  return (
    <div
      className="fb-comments"
      data-href={window.location.href}
      data-width=""
      data-numposts="5"
      style={{ width: "100%" }}
    ></div>
  );
};

export default FacebookComments;
