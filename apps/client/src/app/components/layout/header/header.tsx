import { Avatar, Container, Group, Menu, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconBrandGithub, IconChevronDown, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../../context/auth.context';

export function Header() {
  const { logout } = useAuth();

  return (
    <Container
      size="lg"
      mt="lg"
      mb="lg">
      <Group justify="space-between">
        <ThemeIcon
          radius="xl"
          size={36}
          color="black"
          variant="white">
          <IconBrandGithub size={28} />
        </ThemeIcon>

        <Menu
          position="bottom-end"
          transitionProps={{ transition: 'pop-top-right' }}
          withinPortal>
          <Menu.Target>
            <UnstyledButton>
              <Group gap={7}>
                <Avatar radius="xl" />
                <IconChevronDown
                  size={12}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={logout}
              leftSection={
                <IconLogout
                  size={16}
                  stroke={1.5}
                />
              }>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
}
