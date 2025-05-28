import { Group } from '@mantine/core';
import { IconBug, IconEye, IconGitFork, IconStar } from '@tabler/icons-react';
import { ProjectStat } from './project-stat/project-stat.component';

interface IProjectCardFooterProps {
  stars?: number | string;
  forks?: number | string;
  issues?: number | string;
  watchers?: number | string;
}

export const ProjectCardFooter = ({
  stars,
  forks,
  issues,
  watchers,
}: IProjectCardFooterProps) => {
  return (
    <Group
      m="xs"
      wrap="nowrap"
      align="center"
      justify="space-around">
      <ProjectStat
        label="Stars"
        icon={<IconStar size={16} />}
        value={stars}
      />
      <ProjectStat
        label="Forks"
        icon={<IconGitFork size={16} />}
        value={forks}
      />
      <ProjectStat
        label="Issues"
        icon={<IconBug size={16} />}
        value={issues}
      />
      <ProjectStat
        label="Watchers"
        icon={<IconEye size={16} />}
        value={watchers}
      />
    </Group>
  );
};
