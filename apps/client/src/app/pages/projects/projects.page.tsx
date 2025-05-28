import { Button, Container, Group, SimpleGrid } from '@mantine/core';
import { useSearchProjectsQuery } from '../../hooks/query/project/use-search-projects.query';
import { AddProjectButton } from '../../components/project/add-project-button.component';
import { ProjectCard } from '../../components/project/card/project-card.component';
import { Fragment } from 'react';
import { useRefreshProjectMutation } from '../../hooks/query/project/use-refresh-project.mutation';
import { useDeleteProjectMutation } from '../../hooks/query/project/use-delete-project.mutation';
import { modals } from '@mantine/modals';

export const ProjectsPage = () => {
  const projects = useSearchProjectsQuery();
  const refreshProject = useRefreshProjectMutation();
  const deleteProject = useDeleteProjectMutation();

  const handleRefresh = async (values: { id: string }) => {
    await refreshProject.mutateAsync(values);
  };

  const handleDelete = async (values: { id: string }) => {
    await deleteProject.mutateAsync(values);
  };

  return (
    <Container size="lg">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing={{ base: 'md', sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}>
        <AddProjectButton
          onClick={() =>
            modals.openContextModal({
              modal: 'addProjectModal',
              innerProps: {},
            })
          }
        />

        {projects.data?.pages.map((page) => (
          <Fragment key={page.pagination.offset}>
            {page.result.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onRefresh={handleRefresh}
                onDelete={handleDelete}
              />
            ))}
          </Fragment>
        ))}
      </SimpleGrid>

      {projects.hasNextPage && (
        <Group
          justify="center"
          mt="xl"
          align="center">
          <Button
            loading={projects.isFetching}
            onClick={() => projects.fetchNextPage()}>
            Load more
          </Button>
        </Group>
      )}
    </Container>
  );
};
