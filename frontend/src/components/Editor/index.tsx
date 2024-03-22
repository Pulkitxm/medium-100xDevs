import "./Editor.css";
import EditNav from "./EditNav";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config";
import { RootState } from "../../state/store";
import useWindow from "../hooks/useWindow";
import { useNavigate, useParams } from "react-router-dom";

const Editor = ({
  text,
  setText,
  preview,
  setPreview,
}: {
  text: string;
  setText: (preview: string) => void;
  preview: boolean;
  setPreview: (preview: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [ichange, setIchange] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const { width } = useWindow();
  const isSmall = useMemo(() => {
    return width < 800;
  }, [width]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => (state as RootState).user);
  const shakeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const txt = localStorage.getItem("new-blog");
    if (txt && txt != text) {
      setText(txt as string);
    }
    if (id && user.token && !fetching) {
      setFetching(true);
      axios
        .get(apiUrl + "/api/v1/blog/" + id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setText(res.data.content);
          setFetching(false);
        });
    }
  }, []);
  useEffect(() => {
    if (!saving &&  shakeRef.current) {
      (shakeRef.current as HTMLDivElement).classList.remove("shake");
      setTimeout(() => {
        (shakeRef.current as HTMLDivElement).classList.add("shake");
      }, 100);
    }
    if (!id) localStorage.setItem("new-blog", text);
  }, [text]);
  const handleSave = () => {
    if(!ichange) return;
    setLoading(true);
    const newBlog = {
      title: "A new Blog",
      content: text,
    };
    if (id) {
      axios
        .put(apiUrl + "/api/v1/blog/"+id, newBlog, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
            } , 1000);
          } , 1000);
        });
      
    } else {
      axios
        .post(apiUrl + "/api/v1/blog", newBlog, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res:any) => {
          setLoading(false);
          navigate("/blog/"+res.data.id);
          localStorage.removeItem("new-blog");
        });
    }
  };
  return (
    <div
      className="editor"
      style={{
        width: isSmall ? (preview ? "96%" : "50%") : preview ? "50%" : "100%",
        height: "100%",
      }}
    >
      {!isSmall && (
        <EditNav
          text={text}
          setText={setText}
          preview={preview}
          setPreview={setPreview}
        />
      )}
      {fetching ? (
        <div
          style={{
            width: preview ? "100%" : "100%",
            height: "100%",
          }}
          className="flex items-center justify-center"
        >
          <div className="loading flex items-center justify-center">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <textarea
          onChange={(e) => {
            setText(e.target.value);
            setIchange(true);
          }}
          value={text}
          spellCheck="false"
          style={{
            width: preview ? "100%" : "100%",
            height: "100%",
          }}
        />
      )}
      {loading ? (
        <div className="save">
          <div className="m-auto w-4 h-4 bg-gray-300 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : saving ? (
        <div className="save" style={{opacity:ichange?"1":".5"}} ref={shakeRef} onClick={handleSave}>
          <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
            <path
              stroke="currentColor"
              d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
            />
          </svg>
        </div>
      ) : (
        <div className="save" style={{opacity:ichange?"1":".5"}} ref={shakeRef} onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
        </div>
      )}
    </div>
  );
};
export default Editor;
