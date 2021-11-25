import React from "react";

import { Container, Typography, Button } from "@mui/material";

import "./headerComponent.scss";

const HeaderComponent = ({ openModal, entity }) => {
  return (
    <Container className="content-header">
      <Typography variant="h5">{entity}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openModal(true)}
      >
        Add
      </Button>
    </Container>
  );
};

export default HeaderComponent;
