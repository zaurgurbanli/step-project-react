import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { updateFetch, postsFetch, deleteFetch } from "../../API/fetchAPI";
import { Container } from "../../commons";
import { NavLink } from "react-router-dom";
import { Modal } from "../../components";

export const SingleNote = ({ history }) => {
  const data = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : JSON.parse(localStorage.getItem("reserved"));

  const [modalStatus, setModalStatus] = useState(false);
  const toggleModal = () => setModalStatus((v) => !v);

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await postsFetch();
      setFetchData(data);
      localStorage.removeItem("item");
    })();
  }, []);

  return (
    <Container>
      <Row>
        <NoteContainer color={data.color}>
          <NoteHeader>
            <Title>{data.title}</Title>
            <Date>{data.date}</Date>
          </NoteHeader>
          <Text>{data.text}</Text>
        </NoteContainer>
        <StyledDiv>
          <StyledNavLink
            to="/create"
            onClick={() => {
              localStorage.setItem("item", JSON.stringify(data));
            }}
          >
            Edit
          </StyledNavLink>
          <StyledButton
            onClick={() => {
              updateFetch(
                `/${data.id}`,
                (fetchData[data.id - 1] = {
                  ...fetchData[data.id - 1],
                  completed: !data.completed,
                })
              );
              alert(
                `Item is set as ${
                  fetchData[data.id - 1].completed ? "Archive" : "Actual"
                }!`
              );
            }}
          >
            {data.completed ? "Actual" : "Archive"}
          </StyledButton>
          <StyledButton onClick={toggleModal}>Delete</StyledButton>
        </StyledDiv>
      </Row>
      {modalStatus && (
        <Modal
          close={toggleModal}
          text="Do you want to remove this note?"
          actions={[
            <ModalBtn
              key={1}
              onClick={() => {
                deleteFetch(`/${data.id}`);
                history.push(data.completed ? "/archive" : "/");
                toggleModal();
              }}
            >
              Remove
            </ModalBtn>,
            <ModalBtn key={2} onClick={toggleModal}>
              Cancel
            </ModalBtn>,
          ]}
        />
      )}
    </Container>
  );
};

const ModalBtn = styled.button`
  width: 150px;
  height: 40px;
  margin: 20px 10px 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  color: white;
`;
const StyledButton = styled.button`
  border: none;
  margin: 0 12px 12px 18px;
  padding: 8px 30px;
  text-align: center;
  background-color: #77dd77;
  color: white;
  font-size: 16px;
  border-radius: 5px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  background-color: #77dd77;
  color: white;
  margin: 0 12px 12px 18px;
  padding: 8px 30px;
  font-size: 16px;
  border-radius: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteContainer = styled.div`
  background-color: ${(p) => p.color};
  padding: 10px;
  border-radius: 10px;
  color: white;
  width: 500px;
  min-height: 500px;
`;

const NoteHeader = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid white;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Date = styled.div`
  font-size: 12px;
  margin: 10px 0;
`;

const Text = styled.p`
  text-align: center;
`;
