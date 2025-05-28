import {
  Button,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconBug } from '@tabler/icons-react';

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <Group
    h="100vh"
    w="100vw"
    align="center"
    justify="center">
    <Paper>
      <Stack>
        <Group justify="center">
          <ThemeIcon
            color="red"
            size={128}
            radius="xl">
            <IconBug size={96} />
          </ThemeIcon>
        </Group>
        <Title ta="center">Something went wrong</Title>
        <Text
          component="code"
          c="dimmed"
          size="lg"
          ta="center">
          {error.message}
        </Text>
        <Space h="xl" />
        <Group justify="center">
          <Button
            size="md"
            color="red"
            onClick={resetErrorBoundary}>
            Take me back to home page
          </Button>
        </Group>
      </Stack>
    </Paper>
  </Group>
);
