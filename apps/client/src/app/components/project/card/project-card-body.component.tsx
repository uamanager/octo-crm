import { Badge, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { useMemo } from 'react';
import { IconAlien, IconHourglass } from '@tabler/icons-react';

interface IProjectCardBodyProps {
  pending: boolean;
  description?: string;
  topics?: string[];
  created_at?: string | number | Date;
  updated_at?: string | number | Date;
  pushed_at?: string | number | Date;
}

enum ProjectCardBodyState {
  EMPTY,
  PENDING,
  FULL,
}

export const ProjectCardBody = ({
  pending,
  description = '',
  topics = [],
  created_at,
  updated_at,
  pushed_at,
}: IProjectCardBodyProps) => {
  const dates = useMemo(() => {
    return [
      { date: created_at, label: 'Created' },
      { date: updated_at, label: 'Updated' },
      {
        date: pushed_at,
        label: 'Pushed',
      },
    ]
      .filter((date) => date.date)
      .map((date) => `${date.label}: ${new Date(date.date!).toLocaleDateString()}`)
      .join(' • ');
  }, [created_at, updated_at, pushed_at]);

  const state = useMemo(() => {
    if (pending) {
      return ProjectCardBodyState.PENDING;
    }

    return description || topics.length
      ? ProjectCardBodyState.FULL
      : ProjectCardBodyState.EMPTY;
  }, [pending, description, topics]);

  return (
    <>
      {state === ProjectCardBodyState.EMPTY && (
        <Stack
          justify="center"
          align="center"
          h="100%"
          w="100%">
          <Group
            justify="center"
            align="center">
            <ThemeIcon
              color="grey"
              size={64}
              radius="lg">
              <IconAlien size={48} />
            </ThemeIcon>
          </Group>
          <Text
            ta="center"
            c="dimmed">
            Project info was abducted
          </Text>
        </Stack>
      )}

      {state === ProjectCardBodyState.PENDING && (
        <Stack
          justify="center"
          align="center"
          h="100%"
          w="100%">
          <Group
            justify="center"
            align="center">
            <ThemeIcon
              color="grey"
              size={64}
              radius="lg">
              <IconHourglass size={48} />
            </ThemeIcon>
          </Group>
          <Text
            ta="center"
            c="dimmed">
            Pending data from provider…
          </Text>
        </Stack>
      )}

      {state === ProjectCardBodyState.FULL && (
        <Stack
          gap={5}
          h="100%"
          w="100%">
          <Stack
            m="xs"
            gap={5}>
            <Text
              size="sm"
              lineClamp={6}>
              {description}

              <Text
                component="span"
                size="sm">
                {topics.map((topic) => (
                  <Badge
                    component="span"
                    p={2}
                    key={topic}
                    variant="transparent"
                    size="xs">
                    #{topic}
                  </Badge>
                ))}
              </Text>
            </Text>

            <Text
              c="dimmed"
              size="xs">
              {dates}
            </Text>
          </Stack>
        </Stack>
      )}
    </>
  );
};
