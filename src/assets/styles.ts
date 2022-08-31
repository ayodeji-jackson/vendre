import { CSSProperties } from "react";

export const sliderRootStyles: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 150,
  height: 20,
};

export const sliderTrackStyles: CSSProperties = {
  backgroundColor: "black",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  height: 3,
};

export const sliderRangeStyles: CSSProperties = {
  position: "absolute",
  backgroundColor: "black",
  borderRadius: "9999px",
  height: "100%",
};

export const sliderThumbStyles: CSSProperties = {
  display: "block",
  width: 15,
  height: 15,
  backgroundColor: "black",
  borderRadius: "50%",
  border: "3px solid white",
};

export const radioItemStyles: CSSProperties = {
  position: "relative"
};

export const itemIndicatorStyles: CSSProperties = {
	position: "absolute", 
	left: "-14px", 
	top: "25%", 
};
