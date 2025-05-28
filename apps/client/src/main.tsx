import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './app/context/auth.context';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { queryClient } from './app/common/query/query';
import { theme } from './theme';
import { ModalsProvider } from '@mantine/modals';
import { AddProjectModal } from './app/components/project/modals/add-project.modal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        stylesTransform={emotionTransform}
        defaultColorScheme="auto">
        <MantineEmotionProvider>
          <ModalsProvider modals={{ addProjectModal: AddProjectModal }}>
            <Notifications
              position="top-right"
              zIndex={1000}
            />
            <AuthProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthProvider>
          </ModalsProvider>
        </MantineEmotionProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
