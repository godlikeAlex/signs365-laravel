import React, { useState } from "react";

export const PrevArrow = ({ className, style, onClick }: any) => (
  <div
    className={`${className} custom-arrow left-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}
  >
    <i className="icon-chevron-left"></i>
  </div>
);

export const NextArrow = ({ className, style, onClick }: any) => (
  <div
    className={`${className} custom-arrow right-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}
  >
    <i className="icon-chevron-right"></i>
  </div>
);
