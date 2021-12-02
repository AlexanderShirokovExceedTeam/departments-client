import React from "react";

import { Container, Typography, Button } from "@mui/material";

import "./styles.scss";

const Header = ({ buttonAddHandler, entity }) => {
  return (
    <Container className="content-header">
      <Typography variant="h5">{entity}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => buttonAddHandler()}
      >
        Add
      </Button>
    </Container>
  );
};

export default Header;
