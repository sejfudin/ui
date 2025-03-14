/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTitle } from 'common/hooks/useTitle';
import { Page } from 'components/Breadcrumbs';
import { UploadImport } from 'components/import/UploadImport';
import { Default } from 'components/layouts/Default';
import { useTranslation } from 'react-i18next';

export function Import() {
  const { t } = useTranslation();
  const { documentTitle } = useTitle('import');

  const pages: Page[] = [
    { name: t('products'), href: '/products' },
    { name: t('import'), href: '/products/import' },
  ];

  return (
    <Default title={documentTitle} breadcrumbs={pages} onBackClick="/products">
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-10">
          <UploadImport entity="product" onSuccess={false} type="csv" />
        </div>
      </div>
    </Default>
  );
}
