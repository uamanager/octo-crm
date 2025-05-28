import { Box, Button, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { addProjectSchema, IAppProjectForm } from './add-project.schema';
import { useForm } from '@mantine/form';
import { joiResolver } from 'mantine-form-joi-resolver';
import { ContextModalProps } from '@mantine/modals';
import { useCreateProjectMutation } from '../../../hooks/query/project/use-create-project.mutation';

export function AddProjectModal({ context, id }: ContextModalProps) {
  const createProject = useCreateProjectMutation();
  const form = useForm<Partial<IAppProjectForm>>({
    validateInputOnChange: true,
    validate: joiResolver(addProjectSchema),
    initialValues: {
      key: '',
    },
  });

  const handleSubmit = (values: Partial<IAppProjectForm>) => {
    createProject.mutate(values as IAppProjectForm, {
      onSuccess: () => {
        context.closeModal(id);
      },
    });
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        overlayProps={{ radius: 'md', blur: 2 }}
        visible={createProject.isPending}
        zIndex={1000}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Project key"
            placeholder="nestjs/nest"
            data-autofocus
            {...form.getInputProps('key')}
          />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
    </Box>
  );
}
