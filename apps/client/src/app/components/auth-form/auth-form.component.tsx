import {
  Box,
  Button,
  Card,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { authSchema, IAppAuthForm } from './auth-form.schema';
import { AuthPageMode } from '../../pages/auth/auth.page';
import { useForm } from '@mantine/form';
import { joiResolver } from 'mantine-form-joi-resolver';

interface Props {
  mode: AuthPageMode.SignIn | AuthPageMode.SignUp;
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  loading: boolean;
}

export function AuthForm({ mode, onSubmit, loading }: Props) {
  const isSignIn = mode === AuthPageMode.SignIn;
  const form = useForm<Partial<IAppAuthForm>>({
    validateInputOnChange: true,
    validate: joiResolver(authSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: Partial<IAppAuthForm>) => {
    onSubmit(values as IAppAuthForm);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        overlayProps={{ radius: 'md', blur: 2 }}
        visible={loading}
        zIndex={1000}
      />
      <Card
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="john.doe@example.com"
          required
          radius="md"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
          {...form.getInputProps('password')}
        />
        <Button
          fullWidth
          mt="xl"
          radius="md"
          type="submit"
          loading={loading}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
      </Card>
    </Box>
  );
}
