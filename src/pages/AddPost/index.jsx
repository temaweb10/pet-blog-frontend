import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "easymde/dist/easymde.min.css";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../axios";
import { selectorIsAuth } from "../../redux/slices/auth";
import styles from "./AddPost.module.scss";
export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectorIsAuth);
  const [title, setTitle] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [tags, setTags] = useState("");
  const [value, setValue] = React.useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);

  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      const { data } = await axios.post("/uploads", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка загрузки файла");
    }
  };

  const onClickRemoveImage = async (e) => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        tags,
        imageUrl,
        text: value,
      };

      const { data } = await axios.post("/posts", fields);
      console.log(data);
      const id = data._id;
      navigate(`/posts/${id}`);
    } catch (error) {}
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
