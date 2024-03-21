import PropTypes from "prop-types";
import "./index.css";
import useWindow from "../hooks/useWindow";
import { useMemo } from "react";

const Preview = ({
  preview,
  markUpText,
  styles,
}: {
  preview: boolean;
  markUpText: string;
  styles: object;
}) => {
  const { width } = useWindow();
  const isSmall = useMemo(() => {
    return width < 800;
  }, [width]);
  return (
    <div
      className="preview"
      style={{
        ...styles,
        display: isSmall ? "block" : preview ? "block" : "none",
        width: isSmall ? "95%" : "50%",
      }}
    >
      <h1 className="font-bold text-2xl p-3 bg-gray-300">Preview</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: markUpText }}
      ></div>
    </div>
  );
};
export default Preview;
Preview.propTypes = {
  markUpText: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};
