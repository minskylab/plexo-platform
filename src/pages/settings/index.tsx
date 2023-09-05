import type { ReactElement } from "react";

import Layout from "components/ui/Layout";
import { SettingsPageContent } from "modules/settings";
import { NextPageWithLayout } from "pages/_app";

const SettingsPage: NextPageWithLayout = () => {
  return <SettingsPageContent />;
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
