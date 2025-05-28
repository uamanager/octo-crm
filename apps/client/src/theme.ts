import { ActionIcon, Anchor, Badge, Button, createTheme, ThemeIcon } from '@mantine/core';

export const theme = createTheme({
  scale: 1,
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'violet',
        variant: 'light',
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        color: 'violet',
        variant: 'light',
        radius: 'sm',
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: 'violet',
        variant: 'light',
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        color: 'violet',
        variant: 'light',
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        c: 'violet',
      },
    }),
  },
});
