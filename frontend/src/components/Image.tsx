import { useState } from "react";

type Props = {
  url: string;
};

const Image = ({ url }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    // if (!expanded) {
    setExpanded(!expanded);
    // }
  };

  return (
    <div
      style={
        expanded
          ? {
              width: "80vw",
              height: "80vh",
              aspectRatio: "auto",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              cursor: "zoom-out",
            }
          : {
              cursor: "zoom-in",
            }
      }
      className={
        expanded
          ? "fixed top-1/2 left-1/2 rounded-md bg-white border overflow-hidden "
          : "w-100 h-40 rounded-md  bg-white border overflow-hidden "
      }
    >
      <img className="w-full h-full" onClick={handleExpand} src={url} alt="" />
    </div>
  );
};

export default Image;
