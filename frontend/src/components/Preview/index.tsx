import PropTypes from "prop-types";
import "./index.css";

const Preview = (
  {preview,markUpText,styles}:
  {preview:boolean,markUpText: string,styles: object}
  ) => {    
  return (
    <div className="preview" style={{
      ...styles,
      display:preview?"block":"none"
    }}>
    <h1 className="font-bold text-2xl p-3 bg-gray-300">Preview</h1>
      <div className="content" dangerouslySetInnerHTML={{ __html: markUpText }}  ></div>
    </div>
  );
};
export default Preview;
Preview.propTypes = {
  markUpText: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};