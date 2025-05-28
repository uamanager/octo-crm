import { Anchor, Center, Container, Group, Text, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../hooks/query/auth/use-sign-in.mutation';
import { useSignUpMutation } from '../../hooks/query/auth/use-sign-up.mutation';
import { AuthForm } from '../../components/auth-form/auth-form.component';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth.context';
import { ROUTES } from '../../router/routes';

export enum AuthPageMode {
  SignIn,
  SignUp,
}

interface AuthPageProps {
  mode: AuthPageMode;
}

export const AuthPage = ({ mode }: AuthPageProps) => {
  const isSignIn = mode === AuthPageMode.SignIn;
  const { isAuthenticated, logout } = useAuth();
  const signIn = useSignInMutation();
  const signUp = useSignUpMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [isAuthenticated, logout, navigate]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (isSignIn) {
      await signIn.mutateAsync(values);
      navigate('/');
    } else {
      await signUp.mutateAsync(values);
      navigate(ROUTES.AUTH.SIGN_IN);
    }
  };

  return (
    <Container
      size={420}
      my={100}>
      <Title ta="center">Welcome!</Title>

      <Center>
        <Group
          justify="space-between"
          mt="xl">
          <Text>
            {isSignIn ? 'Do not have an account yet?' : 'Already have an account?'}
          </Text>
          <Anchor
            component={Link}
            to={isSignIn ? ROUTES.AUTH.SIGN_UP : ROUTES.AUTH.SIGN_IN}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Anchor>
        </Group>
      </Center>

      <AuthForm
        mode={mode}
        loading={signIn.isPending || signUp.isPending}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export const AuthSignInPage = () => <AuthPage mode={AuthPageMode.SignIn} />;
export const AuthSignUpPage = () => <AuthPage mode={AuthPageMode.SignUp} />;
