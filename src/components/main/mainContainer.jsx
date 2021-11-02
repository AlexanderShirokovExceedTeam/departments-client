import React, { useState } from 'react';
import { Container } from '@mui/material';
import SideBar from '../sidebar/sideBar';
import ContentHeader from '../contentHeader/contentHeader';
import ModalAddEdit from '../modalAddEdit/modalAddEdit';
import './mainContainer.scss';

const MainContainer = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);

  const okHandler = () => {
    setOpenModal(false);
  }

  return (
    <Container className="main-container">
      <SideBar />
      <ContentHeader
        openModal={() => setOpenModal(true)}
        entity={entity}
      />
      <ModalAddEdit
        openModal={openModal}
        closeHandler={() => setOpenModal(false)}
        okHandler={() => okHandler()}
        modalAction='Create'
        entity={entity}
      />
    </Container>
  )
}

export default MainContainer;
