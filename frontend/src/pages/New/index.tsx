import { useEffect, useMemo, useState } from "react";
import "./style.css";

import Editor from "../../components/Editor";
import EditNav from "../../components/Editor/EditNav";
import Preview from "../../components/Preview";
import convertIntoMarkup from "./utils/convertToMarkup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import useWindow from "../../components/hooks/useWindow";

const New = () => {
  const { width } = useWindow();
  const isSmall = useMemo(() => {
    return width < 800;
  }, [width]);
  const user = useSelector((state) => (state as RootState).user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(true);
  const [text, setText] = useState("");
  const markUpText = useMemo(() => {
    return convertIntoMarkup(text);
  }, [text]);
  useEffect(() => {
    if (!user.token && id) {
      localStorage.setItem("redirect", "/blog/" + id);
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, []]);
  return (
    <div className="new-blog">
      {isSmall ? (
        preview ? (
          <div className="flex flex-col w-full">
            <EditNav
              preview={preview}
              text={text}
              setPreview={setPreview}
              setText={setText}
            />
            <Editor
              text={text}
              setText={setText}
              setPreview={setPreview}
              preview={preview}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <EditNav
              preview={preview}
              text={text}
              setPreview={setPreview}
              setText={setText}
            />
            <Preview preview={preview} markUpText={markUpText} styles={{}} />
          </div>
        )
      ) : (
        <>
          <Editor
            text={text}
            setText={setText}
            setPreview={setPreview}
            preview={preview}
          />
          <Preview preview={preview} markUpText={markUpText} styles={{}} />
        </>
      )}
    </div>
  );
};
export default New;
