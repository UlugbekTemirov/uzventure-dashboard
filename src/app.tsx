import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

// eslint-disable-next-line
import Swal from 'sweetalert2'

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const applicationButton = (
    <Fab
      size="medium"
      aria-label="Uzventure"
      href="#"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      {/* <Iconify width={24} icon="eva:github-fill" /> */}
      UZ
    </Fab>
  );

  return (
    <ThemeProvider>
      <Router />
      {applicationButton}
    </ThemeProvider>
  );
}
