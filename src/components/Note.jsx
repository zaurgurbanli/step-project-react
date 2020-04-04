import React from "react";
import styled from "styled-components";

export const Note = ({ note: { title, text, date, color }, onClick }) => {
  return (
    <NoteContainer color={color} onClick={onClick}>
      <NoteHeader>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </NoteHeader>
      <Text>{text}</Text>
    </NoteContainer>
  );
};

const NoteContainer = styled.div`
  background-color: ${p => p.color};
  padding: 10px;
  border-radius: 10px;
  color: white;
`;

const NoteHeader = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid white;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 12px;
  margin: 10px 0;
`;

const Text = styled.p`
  text-align: center;
`;
