import { Anchor, Avatar, Grid, Group, Stack, Text, Tooltip } from '@mantine/core';
import { RepositoryOwnerType } from '@octo-crm/core';
import { IconBuildings, IconLicense, IconUser } from '@tabler/icons-react';
import { ReactNode, useMemo } from 'react';

interface IProjectCardHeaderProps {
  project_key: string;
  owner_avatar_url?: string;
  owner_url?: string;
  owner_type?: RepositoryOwnerType;
  owner_login?: string;
  repo_url?: string;
  repo_name?: string;
  repo_license?: string;
  actions: ReactNode;
}

export const ProjectCardHeader = ({
  project_key,
  owner_avatar_url = 'https://github.com/identicons/random.png',
  owner_url,
  owner_type = RepositoryOwnerType.USER,
  owner_login,
  repo_url,
  repo_name,
  repo_license = 'Other',
  actions,
}: IProjectCardHeaderProps) => {
  const { project_owner_login, project_repo_name, project_owner_url, project_repo_url } =
    useMemo(() => {
      const [project_owner_login = '', project_repo_name = ''] = project_key.split('/');

      const project_owner_url = `https://github.com/${project_owner_login}`;
      const project_repo_url = `${project_owner_url}/${project_repo_name}`;

      return {
        project_owner_login,
        project_repo_name,
        project_owner_url,
        project_repo_url,
      };
    }, [project_key]);

  return (
    <Grid
      m="xs"
      gutter={10}
      justify="space-between"
      align="center">
      <Grid.Col span="content">
        <Stack
          h="100%"
          gap={0}
          justify="center">
          <Avatar
            src={owner_avatar_url}
            radius="xl"
          />
        </Stack>
      </Grid.Col>
      <Grid.Col
        span="auto"
        miw={0}>
        <Stack
          h="100%"
          w="100%"
          gap={0}
          justify="center">
          <Group
            gap={1}
            wrap="nowrap">
            <Anchor
              target="_blank"
              href={owner_url ?? project_owner_url}
              size="sm"
              fw={500}
              truncate="end">
              <Group
                gap={4}
                wrap="nowrap">
                <Group>
                  {owner_type === RepositoryOwnerType.ORGANIZATION ? (
                    <IconBuildings size={16} />
                  ) : (
                    <IconUser size={16} />
                  )}
                </Group>
                <Text truncate="end">{owner_login ?? project_owner_login}</Text>
              </Group>
            </Anchor>
            <Text c="dimmed">/</Text>
            <Anchor
              target="_blank"
              href={repo_url ?? project_repo_url}
              size="sm"
              fw={700}
              truncate="end">
              <Text truncate="end">{repo_name ?? project_repo_name}</Text>
            </Anchor>
          </Group>

          <Tooltip label={'License: ' + repo_license}>
            <Group
              gap={4}
              wrap="nowrap">
              <Text c="dimmed">
                <IconLicense size={16} />
              </Text>
              <Text
                c="dimmed"
                truncate="end"
                size="sm">
                {repo_license}
              </Text>
            </Group>
          </Tooltip>
        </Stack>
      </Grid.Col>
      {actions && (
        <Grid.Col span="content">
          <Stack
            h="100%"
            gap={0}
            justify="center">
            {actions}
          </Stack>
        </Grid.Col>
      )}
    </Grid>
  );
};
