import React, { useState, useEffect, useCotext } from "react";
import styled from "styled-components";

// import { NoteContext } from "../../context/notes";
import { postsFetch } from "../../API/fetchAPI";
import { Container } from "../../commons";
import { Note } from "../../components";

export const Homepage = ({ history }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await postsFetch();
      setData(data);
      localStorage.clear();
    })();
  }, []);

  return (
    <Container>
      <h1>Homepage</h1>
      <Row>
        {data.map(
          note =>
            !note.completed && (
              <StyledDiv key={note.id}>
                <Note
                  onClick={() => {
                    localStorage.setItem("item", JSON.stringify(note));
                    localStorage.setItem("reserved", JSON.stringify(note));
                    history.push(`/${note.id}`);
                  }}
                  note={note}
                />
              </StyledDiv>
            )
        )}
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  justify-content: center;
`;

const StyledDiv = styled.div`
  width: calc(100% / 3);
  padding: 0 15px 30px;
`;
