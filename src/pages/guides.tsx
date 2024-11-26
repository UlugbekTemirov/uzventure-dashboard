import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { GuidesView } from 'src/sections/guides/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Guides - ${CONFIG.appName}`}</title>
      </Helmet>

      <GuidesView />
    </>
  );
}
