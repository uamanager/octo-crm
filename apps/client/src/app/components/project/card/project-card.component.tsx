import { ActionIcon, Card, Divider, Menu, Stack, Text } from '@mantine/core';
import { ProjectCardHeader } from './project-card-header.component';
import { ProjectCardBody } from './project-card-body.component';
import { ProjectCardFooter } from './project-card-footer.component';
import { IProjectResponseDto } from '@octo-crm/shared';
import { IconDotsVertical, IconRefresh, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

interface IProjectCardProps {
  project: IProjectResponseDto;
  onRefresh: (values: { id: string }) => Promise<void>;
  onDelete: (values: { id: string }) => Promise<void>;
}

export const ProjectCard = ({ project, onRefresh, onDelete }: IProjectCardProps) => {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete Project?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this project? This action cannot be undone.
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Delete Project', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => onDelete({ id: project.id }),
    });

  return (
    <Card
      p={0}
      withBorder
      h={'100%'}
      mih={300}
      radius="md">
      <Stack
        h="100%"
        align="stretch"
        justify="space-between"
        gap={0}>
        <Stack gap={0}>
          <ProjectCardHeader
            project_key={project.key}
            owner_avatar_url={project?.source.owner?.avatar_url}
            owner_url={project.source.owner?.url}
            owner_type={project.source.owner?.type}
            owner_login={project.source.owner?.login}
            repo_url={project.source.repository?.url}
            repo_name={project.source.repository?.name}
            repo_license={project.source.repository?.license}
            actions={
              <Menu
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                withinPortal>
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    color="gray">
                    <IconDotsVertical />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => onRefresh({ id: project.id })}
                    leftSection={
                      <IconRefresh
                        size={16}
                        stroke={1.5}
                      />
                    }>
                    Refresh
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={openDeleteModal}
                    leftSection={
                      <IconTrash
                        size={16}
                        stroke={1.5}
                      />
                    }>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            }
          />
          <Divider w="100%" />
        </Stack>
        <Stack
          gap={0}
          h="100%">
          <ProjectCardBody
            pending={!project.source.repository || !project.source.owner}
            description={project.source.repository?.description}
            topics={project.source.repository?.topics}
            created_at={project.source.repository?.created_at}
            updated_at={project.source.repository?.updated_at}
            pushed_at={project.source.repository?.pushed_at}
          />
        </Stack>
        <Stack gap={0}>
          <Divider w="100%" />
          <ProjectCardFooter
            stars={project.source.repository?.stars}
            forks={project.source.repository?.forks}
            issues={project.source.repository?.issues}
            watchers={project.source.repository?.watchers}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
