import { ReactNode } from 'react';
import { Group, Text, Tooltip } from '@mantine/core';

interface ProjectStatProps {
  label: string;
  value?: string | number;
  icon: ReactNode;
}

export const ProjectStat = ({ label, value = '–', icon }: ProjectStatProps) => (
  <Tooltip label={`${label}: ${value}`}>
    <Group
      gap={4}
      align="center"
      justify="center">
      {icon}
      <Text
        truncate="end"
        size="sm">
        {value}
      </Text>
    </Group>
  </Tooltip>
);
