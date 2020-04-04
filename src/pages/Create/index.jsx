import React, { useState, useEffect } from "react";
import { createFetch, updateFetch, postsFetch } from "../../API/fetchAPI";

import { Container } from "../../commons";
import { NoteForm } from "../../components";

export const Create = ({ history }) => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await postsFetch();
      setFetchData(data);
    })();
  }, []);
  const createNoteSuccess = note => {
    createFetch("", note);
    history.push("/");
  };

  const editNoteSuccess = note => {
    const id = JSON.parse(localStorage.getItem("item")).id;
    updateFetch(
      `/${id}`,
      (fetchData[id - 1] = {
        title: note.title,
        text: note.text,
        color: note.color,
        completed: note.completed
      })
    );
    history.push(
      JSON.parse(localStorage.getItem("item")).completed ? "/archive" : "/"
    );
  };

  return (
    <Container>
      <h1>{localStorage.length ? "Edit" : "Create"}</h1>
      <NoteForm
        submitBtnText={localStorage.length ? "Save" : "Create"}
        onSuccessSubmit={
          localStorage.getItem("item") ? editNoteSuccess : createNoteSuccess
        }
      />
    </Container>
  );
};
