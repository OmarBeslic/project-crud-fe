import React from "react";
interface FavIconProps extends React.SVGProps<SVGSVGElement> {
  handleFav: () => void
  fillColor?: string;
}
const FavIcon: React.FC<FavIconProps> = ({ fillColor = "black", handleFav }) => {
  return (
    <svg
      height="24px"
      width="24px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: "pointer"
      }}
      onClick={handleFav}
    >
      <g fill={fillColor}>
        <path d="M446.758,0H48.798v512L256,391.98L463.202,512V0H446.758z M256,353.971L81.687,454.938V32.889h348.626v422.056 L256,353.971z" />
        <polygon points="283.218,185.978 256,116.706 228.776,185.978 154.48,190.462 211.953,237.766 193.253,309.814 256,269.769 318.74,309.814 300.047,237.766 357.52,190.462" />
      </g>
    </svg>
  );
};

export default FavIcon;
