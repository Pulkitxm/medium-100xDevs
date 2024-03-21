import { useEffect, useMemo, useState } from "react";
import "./style.css";

import Editor from "../../components/Editor";
import Preview from "../../components/Preview";
import convertIntoMarkup from "./utils/convertToMarkup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const New = () => {
  const user = useSelector((state) => (state as RootState).user);
  const navigate= useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(true);
  const [text, setText] = useState("");
  const markUpText = useMemo(() => {
    return convertIntoMarkup(text);
  }, [text]);
  useEffect(() => {
    if (id && user.token) {
      axios
        .get(apiUrl + "/api/v1/blog/" + id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setText(res.data.content);
        });
    }
    if(!user.token){
      localStorage.setItem("redirect", "/blog/"+id);
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, []]);
  return (
    <div className="new-blog">
      <Editor
        text={text}
        setText={setText}
        setPreview={setPreview}
        preview={preview}
      />
      <Preview preview={preview} markUpText={markUpText} styles={{}} />
    </div>
  );
};
export default New;
