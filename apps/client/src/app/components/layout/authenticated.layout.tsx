import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from './header/header';

export const AuthenticatedLayout = () => {
  return (
    <Container
      fluid
      m="10">
      <Header />

      <Outlet />
    </Container>
  );
};
