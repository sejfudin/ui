/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from '../../../components/layouts/Settings';
import {
  AccentColor,
  Connect,
  Details,
  Notifications,
  Password,
} from './components';

export function UserDetails() {
  const [t] = useTranslation();

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE}: ${t('user_details')}`;
  });

  return (
    <Settings title={t('user_details')}>
      <div className="space-y-6 mt-6">
        <Details />
        <Password />
        <Connect />
        <AccentColor />
        <Notifications />
      </div>
    </Settings>
  );
}