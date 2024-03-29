import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const MainPage = memo(function MainPage() {
  const { t } = useTranslation('main');
  return (
    <Page data-testid="MainPage">
      {t('Main page')}
      <div>17122023</div>
    </Page>
  );
});

export default MainPage;
