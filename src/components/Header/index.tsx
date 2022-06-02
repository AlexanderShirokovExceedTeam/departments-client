import React, { FC } from "react";

import { Container, Typography, Button } from "@mui/material";

import "./styles.scss";

interface IHeaderProps {
  createEntity: Function,
  entity: string
}

const Header: FC<IHeaderProps> = ({ createEntity, entity }) => {
  return (
    <Container className="content-header">
      <Typography variant="h5">{entity}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => createEntity()}
      >
        Add
      </Button>
    </Container>
  );
};

export default Header;
