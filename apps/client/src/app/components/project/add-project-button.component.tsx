import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, ActionIconProps } from '@mantine/core';

interface AddProjectButton extends ActionIconProps {
  onClick: () => void;
}

export const AddProjectButton = ({ onClick }: AddProjectButton) => (
  <ActionIcon
    w={'100%'}
    h={'100%'}
    radius="md"
    aria-label="Add Project"
    onClick={onClick}>
    <IconPlus size="40%" />
  </ActionIcon>
);
