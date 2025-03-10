/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Card, Element } from '@invoiceninja/cards';

import { useInjectCompanyChanges } from 'common/hooks/useInjectCompanyChanges';
import { useTitle } from 'common/hooks/useTitle';
import Toggle from 'components/forms/Toggle';
import { Settings } from 'components/layouts/Settings';
import { useTranslation } from 'react-i18next';
import { InputField, SelectField } from '../../../components/forms';
import { useDiscardChanges } from '../common/hooks/useDiscardChanges';
import { useHandleCompanySave } from '../common/hooks/useHandleCompanySave';
import {
  useHandleCurrentCompanyChange,
  useHandleCurrentCompanyChangeProperty,
} from '../common/hooks/useHandleCurrentCompanyChange';
import { Gateways } from '../gateways/index/Gateways';

export function OnlinePayments() {
  const [t] = useTranslation();

  useTitle('online_payments');

  const pages = [
    { name: t('settings'), href: '/settings' },
    { name: t('online_payments'), href: '/settings/online_payments' },
  ];

  const company = useInjectCompanyChanges();

  const handleChange = useHandleCurrentCompanyChange();
  const handleChangeProperty = useHandleCurrentCompanyChangeProperty();

  const onSave = useHandleCompanySave();
  const onCancel = useDiscardChanges();

  return (
    <Settings
      title={t('online_payments')}
      breadcrumbs={pages}
      docsLink="docs/basic-settings/#online_payments"
      onSaveClick={onSave}
      onCancelClick={onCancel}
    >
      <Card title={t('settings')}>
        <Element leftSide={t('auto_bill_on')}>
          <SelectField
            id="settings.auto_bill_date"
            value={company?.settings.auto_bill_date || 'on_send_date'}
            onChange={handleChange}
          >
            <option value="on_send_date">{t('send_date')}</option>
            <option value="on_due_date">{t('due_date')}</option>
          </SelectField>
        </Element>

        <Element leftSide={t('use_available_credits')}>
          <SelectField
            value={company?.settings.use_credits_payment || 'off'}
            id="settings.use_credits_payment"
            onChange={handleChange}
          >
            <option value="always">{t('enabled')}</option>
            <option value="option">{t('show_option')}</option>
            <option value="off">{t('off')}</option>
          </SelectField>
        </Element>

        <Element leftSide={t('enable_applying_payments')}>
          <Toggle
            label={t('enable_applying_payments_help')}
            id="allow_over_payment"
            checked={company?.enable_applying_payments || false}
            onChange={(value) =>
              handleChangeProperty('enable_applying_payments', value)
            }
          />
        </Element>

        <Element leftSide={t('allow_over_payment')}>
          <Toggle
            label={t('allow_over_payment_help')}
            id="allow_over_payment"
            checked={
              company?.settings.client_portal_allow_over_payment || false
            }
            onChange={(value) =>
              handleChangeProperty(
                'settings.client_portal_allow_over_payment',
                value
              )
            }
          />
        </Element>

        <Element leftSide={t('allow_under_payment')}>
          <Toggle
            label={t('allow_under_payment_help')}
            id="allow_under_payment"
            checked={
              company?.settings.client_portal_allow_under_payment || false
            }
            onChange={(value) =>
              handleChangeProperty(
                'settings.client_portal_allow_under_payment',
                value
              )
            }
          />
        </Element>
        {company?.settings.client_portal_allow_under_payment && (
          <Element leftSide={t('minimum_under_payment_amount')}>
            <InputField
              value={company?.settings.client_portal_under_payment_minimum}
              onValueChange={(value) =>
                handleChangeProperty(
                  'settings.client_portal_under_payment_minimum',
                  value
                )
              }
            />
          </Element>
        )}
      </Card>

      <Gateways />
    </Settings>
  );
}
