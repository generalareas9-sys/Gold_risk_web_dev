import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useAuth } from '../auth/useAuth'
import { formatNumber, formatDate } from '../utils/format'
import { cn } from '../utils/cn'
import type { Account, Specification } from '../services/accountsApi'
import {
  listAccounts,
  listSpecifications,
  createAccount,
  updateAccount,
  deleteAccount,
  createSpecification,
  updateSpecification,
  deleteSpecification,
} from '../services/accountsApi'
import { useLanguage } from '../i18n/useLanguage'

interface AccountFormValues {
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: string
  balance: string
}

const emptyAccountForm: AccountFormValues = {
  accountName: '',
  broker: '',
  accountType: '',
  currency: 'USD',
  usdConversion: '1',
  balance: '0',
}

interface SpecificationFormValues {
  symbol: string
  contractSize: string
  minimumLot: string
  maximumLot: string
  lotStep: string
}

const emptySpecificationForm: SpecificationFormValues = {
  symbol: '',
  contractSize: '1',
  minimumLot: '0.01',
  maximumLot: '100',
  lotStep: '0.01',
}

function toPositiveNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '')
  if (trimmed === '') return null
  const value = Number(trimmed)
  return Number.isFinite(value) && value > 0 ? value : null
}

function toNonNegativeNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '')
  if (trimmed === '') return null
  const value = Number(trimmed)
  return Number.isFinite(value) && value >= 0 ? value : null
}

function AccountForm({
  initial,
  submitting,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: AccountFormValues
  submitting: boolean
  submitLabel: string
  onSubmit: (values: AccountFormValues) => Promise<void>
  onCancel: () => void
}) {
  const [values, setValues] = useState<AccountFormValues>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { t } = useLanguage()

  function setField(field: keyof AccountFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!(field in prev)) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (values.accountName.trim() === '') {
      nextErrors.accountName = t('accounts.accountNameRequired')
    }
    if (values.broker.trim() === '') {
      nextErrors.broker = t('accounts.brokerRequired')
    }
    if (values.accountType.trim() === '') {
      nextErrors.accountType = t('accounts.accountTypeRequired')
    }
    if (values.currency.trim() === '') {
      nextErrors.currency = t('accounts.currencyRequired')
    }
    if (toPositiveNumber(values.usdConversion) === null) {
      nextErrors.usdConversion = t('accounts.positiveValue')
    }
    if (toNonNegativeNumber(values.balance) === null) {
      nextErrors.balance = t('accounts.nonNegativeValue')
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    await onSubmit(values)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-md border border-border bg-surface px-5 py-5 sm:px-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t('accounts.accountName')}
          value={values.accountName}
          onChange={(event) => setField('accountName', event.target.value)}
          placeholder="Exness Standard Cent"
          errorMessage={errors.accountName}
        />
        <Input
          label={t('accounts.broker')}
          value={values.broker}
          onChange={(event) => setField('broker', event.target.value)}
          placeholder="Exness"
          errorMessage={errors.broker}
        />
        <Input
          label={t('accounts.accountType')}
          value={values.accountType}
          onChange={(event) => setField('accountType', event.target.value)}
          placeholder="Standard Cent"
          errorMessage={errors.accountType}
        />
        <Input
          label={t('accounts.currency')}
          value={values.currency}
          onChange={(event) => setField('currency', event.target.value)}
          placeholder="USD or USC"
          errorMessage={errors.currency}
        />
        <Input
          label={t('accounts.usdConversionLabel')}
          value={values.usdConversion}
          onChange={(event) => setField('usdConversion', event.target.value)}
          placeholder="1"
          hint={t('accounts.usdConversionHint')}
          inputMode="decimal"
          errorMessage={errors.usdConversion}
        />
        <Input
          label={t('accounts.balanceLabel')}
          value={values.balance}
          onChange={(event) => setField('balance', event.target.value)}
          placeholder="1,220.30"
          inputMode="decimal"
          errorMessage={errors.balance}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" disabled={submitting}>
          {submitting ? t('accounts.saving') : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('accounts.cancel')}
        </Button>
      </div>
    </form>
  )
}

function SpecificationForm({
  initial,
  submitting,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: SpecificationFormValues
  submitting: boolean
  submitLabel: string
  onSubmit: (values: SpecificationFormValues) => Promise<void>
  onCancel: () => void
}) {
  const [values, setValues] = useState<SpecificationFormValues>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { t } = useLanguage()

  function setField(field: keyof SpecificationFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!(field in prev)) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (values.symbol.trim() === '') {
      nextErrors.symbol = t('accounts.symbolRequired')
    }
    if (toPositiveNumber(values.contractSize) === null) {
      nextErrors.contractSize = t('accounts.positiveValue')
    }
    if (toPositiveNumber(values.minimumLot) === null) {
      nextErrors.minimumLot = t('accounts.positiveValue')
    }
    if (toPositiveNumber(values.maximumLot) === null) {
      nextErrors.maximumLot = t('accounts.positiveValue')
    }
    if (toPositiveNumber(values.lotStep) === null) {
      nextErrors.lotStep = t('accounts.positiveValue')
    }
    const minimumLot = toPositiveNumber(values.minimumLot)
    const maximumLot = toPositiveNumber(values.maximumLot)
    const lotStep = toPositiveNumber(values.lotStep)
    if (minimumLot !== null && maximumLot !== null && minimumLot > maximumLot) {
      nextErrors.minimumLot = t('accounts.minMaxConflict')
    }
    if (lotStep !== null && maximumLot !== null && lotStep > maximumLot) {
      nextErrors.lotStep = t('accounts.stepConflict')
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    await onSubmit(values)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-md border border-border bg-bg px-5 py-4"
    >
      <div className="grid gap-4 sm:grid-cols-5">
        <Input
          label={t('accounts.symbol')}
          value={values.symbol}
          onChange={(event) => setField('symbol', event.target.value)}
          placeholder="XAUUSDc"
          className="sm:col-span-1"
          errorMessage={errors.symbol}
        />
        <Input
          label={t('accounts.contractSize')}
          value={values.contractSize}
          onChange={(event) => setField('contractSize', event.target.value)}
          placeholder="1"
          inputMode="decimal"
          errorMessage={errors.contractSize}
        />
        <Input
          label={t('accounts.minLot')}
          value={values.minimumLot}
          onChange={(event) => setField('minimumLot', event.target.value)}
          placeholder="0.01"
          inputMode="decimal"
          errorMessage={errors.minimumLot}
        />
        <Input
          label={t('accounts.maxLot')}
          value={values.maximumLot}
          onChange={(event) => setField('maximumLot', event.target.value)}
          placeholder="200"
          inputMode="decimal"
          errorMessage={errors.maximumLot}
        />
        <Input
          label={t('accounts.lotStep')}
          value={values.lotStep}
          onChange={(event) => setField('lotStep', event.target.value)}
          placeholder="0.01"
          inputMode="decimal"
          errorMessage={errors.lotStep}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? t('accounts.saving') : submitLabel}
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
          {t('accounts.cancel')}
        </Button>
      </div>
    </form>
  )
}

function SpecificationsSection({
  account,
  token,
  onChanged,
}: {
  account: Account
  token: string
  onChanged: () => void
}) {
  const [specifications, setSpecifications] = useState<Specification[] | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSpec, setEditingSpec] = useState<Specification | null>(null)
  const [specError, setSpecError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingSpecId, setDeletingSpecId] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const res = await listSpecifications(token, account.id)
      if (cancelled) return
      if (res.ok) {
        setSpecifications(res.data.data.specifications)
      } else {
        setSpecifications([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, account.id, showForm])

  async function handleCreate(values: SpecificationFormValues) {
    setSubmitting(true)
    setSpecError(null)
    const res = await createSpecification(token, account.id, {
      symbol: values.symbol.trim(),
      contractSize: toPositiveNumber(values.contractSize) as number,
      minimumLot: toPositiveNumber(values.minimumLot) as number,
      maximumLot: toPositiveNumber(values.maximumLot) as number,
      lotStep: toPositiveNumber(values.lotStep) as number,
    })
    setSubmitting(false)
    if (res.ok) {
      setShowForm(false)
      setEditingSpec(null)
      onChanged()
    } else {
      setSpecError(res.error.message)
    }
  }

  async function handleUpdate(values: SpecificationFormValues) {
    if (editingSpec === null) return
    setSubmitting(true)
    setSpecError(null)
    const res = await updateSpecification(token, account.id, editingSpec.id, {
      symbol: values.symbol.trim(),
      contractSize: toPositiveNumber(values.contractSize) as number,
      minimumLot: toPositiveNumber(values.minimumLot) as number,
      maximumLot: toPositiveNumber(values.maximumLot) as number,
      lotStep: toPositiveNumber(values.lotStep) as number,
    })
    setSubmitting(false)
    if (res.ok) {
      setShowForm(false)
      setEditingSpec(null)
      onChanged()
    } else {
      setSpecError(res.error.message)
    }
  }

  async function handleDeleteSpec(specId: string) {
    setDeletingSpecId(specId)
    const res = await deleteSpecification(token, account.id, specId)
    setDeletingSpecId(null)
    if (res.ok) {
      setSpecifications((prev) => (prev === null ? prev : prev.filter((s) => s.id !== specId)))
      onChanged()
    } else {
      setSpecError(res.error.message)
    }
  }

  function startEdit(spec: Specification) {
    setEditingSpec(spec)
    setSpecError(null)
    setShowForm(true)
  }

  function startCreate() {
    setEditingSpec(null)
    setSpecError(null)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingSpec(null)
    setSpecError(null)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {t('accounts.specTitle')}
        </h4>
        <button
          type="button"
          onClick={startCreate}
          className="text-xs text-gold transition-colors hover:text-gold-strong"
        >
          {t('accounts.addSpec')}
        </button>
      </div>

      {specifications === null ? (
        <p role="status" className="mt-3 flex items-center gap-2 text-xs text-text-faint">
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border-strong border-t-gold"
          />
          {t('accounts.loadingSpecs')}
        </p>
      ) : specifications.length === 0 && !showForm ? (
        <p className="mt-3 text-xs text-text-faint">{t('accounts.noSpecs')}</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {specifications.map((spec) => (
            <div
              key={spec.id}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md border border-border bg-surface-raised px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-text-muted">
                <span className="font-mono text-sm font-medium text-text">{spec.symbol}</span>
                <span>
                  {t('accounts.specContract')}{' '}
                  <span className="font-mono text-text">{spec.contractSize}</span>
                </span>
                <span>
                  {t('accounts.specMinMax')}{' '}
                  <span className="font-mono text-text">
                    {spec.minimumLot} / {spec.maximumLot}
                  </span>
                </span>
                <span>
                  {t('accounts.specStep')}{' '}
                  <span className="font-mono text-text">{spec.lotStep}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(spec)}
                  className="text-xs text-text-muted transition-colors hover:text-gold"
                >
                  {t('accounts.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSpec(spec.id)}
                  disabled={deletingSpecId === spec.id}
                  className="text-xs text-text-muted transition-colors hover:text-error disabled:opacity-50"
                >
                  {deletingSpecId === spec.id ? '…' : t('accounts.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {specError && (
        <p role="alert" className="mt-3 text-xs text-error">
          {specError}
        </p>
      )}

      {showForm && (
        <div className="mt-3">
          <SpecificationForm
            initial={
              editingSpec
                ? {
                    symbol: editingSpec.symbol,
                    contractSize: String(editingSpec.contractSize),
                    minimumLot: String(editingSpec.minimumLot),
                    maximumLot: String(editingSpec.maximumLot),
                    lotStep: String(editingSpec.lotStep),
                  }
                : emptySpecificationForm
            }
            submitting={submitting}
            submitLabel={editingSpec ? t('accounts.saveChanges') : t('accounts.addSpec')}
            onSubmit={editingSpec ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        </div>
      )}
    </div>
  )
}

function AccountCard({
  account,
  token,
  onDeleted,
  onChanged,
  onStartEdit,
}: {
  account: Account
  token: string
  onDeleted: () => void
  onChanged: () => void
  onStartEdit: () => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)
  const { t } = useLanguage()

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    const res = await deleteAccount(token, account.id)
    setDeleting(false)
    setConfirmDelete(false)
    if (res.ok) {
      onDeleted()
    } else {
      setDragError(res.error.message)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-text">{account.accountName}</h3>
              {account.isDefault && (
                <span className="rounded-full border border-gold px-2.5 py-0.5 text-xs text-gold">
                  {t('accounts.default')}
                </span>
              )}
              <span
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-xs',
                  account.isActive
                    ? 'border-border-strong text-text-muted'
                    : 'border-error text-error',
                )}
              >
                {account.isActive ? t('accounts.active') : t('accounts.inactive')}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {account.broker} · {account.accountType}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartEdit}
              className="rounded border border-border-strong px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-gold hover:text-gold"
            >
              {t('accounts.edit')}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className={cn(
                'rounded border px-3 py-1.5 text-xs transition-colors disabled:opacity-50',
                confirmDelete
                  ? 'border-error bg-error text-white'
                  : 'border-border-strong text-text-muted hover:border-error hover:text-error',
              )}
            >
              {deleting ? '…' : confirmDelete ? t('accounts.confirm') : t('accounts.delete')}
            </button>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-text-muted sm:grid-cols-4">
          <div>
            <dt className="text-text-faint">{t('accounts.balance')}</dt>
            <dd className="mt-0.5 font-mono text-sm text-text">
              {formatNumber(account.balance, 2)} {account.currency}
            </dd>
          </div>
          <div>
            <dt className="text-text-faint">{t('accounts.usdConversion')}</dt>
            <dd className="mt-0.5 font-mono text-sm text-text">
              {t('accounts.usdConversionValue', { value: account.usdConversion })}
            </dd>
          </div>
          <div>
            <dt className="text-text-faint">{t('accounts.currency')}</dt>
            <dd className="mt-0.5 font-mono text-sm text-text">{account.currency}</dd>
          </div>
          <div>
            <dt className="text-text-faint">{t('accounts.created')}</dt>
            <dd className="mt-0.5 font-mono text-sm text-text">{formatDate(account.createdAt)}</dd>
          </div>
        </dl>

        {dragError && (
          <p role="alert" className="mt-3 text-xs text-error">
            {dragError}
          </p>
        )}

        <div className="mt-4 border-t border-border pt-4">
          <SpecificationsSection account={account} token={token} onChanged={onChanged} />
        </div>
      </div>
    </Card>
  )
}

export function AccountsPage() {
  const { token } = useAuth()
  const { t } = useLanguage()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const refresh = useCallback(() => {
    if (token === null) return
    void (async () => {
      const res = await listAccounts(token)
      if (res.ok) {
        setAccounts(res.data.data.accounts)
        setError(null)
      } else {
        setError(res.error.message)
      }
      setLoading(false)
    })()
  }, [token])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function handleCreate(values: AccountFormValues) {
    if (token === null) return
    setSubmitting(true)
    setFormError(null)
    const res = await createAccount(token, {
      accountName: values.accountName.trim(),
      broker: values.broker.trim(),
      accountType: values.accountType.trim(),
      currency: values.currency.trim(),
      usdConversion: toPositiveNumber(values.usdConversion) as number,
      balance: toNonNegativeNumber(values.balance) as number,
    })
    setSubmitting(false)
    if (res.ok) {
      setShowCreateForm(false)
      setAccounts((prev) => [...prev, res.data.data.account])
    } else {
      setFormError(res.error.message)
    }
  }

  async function handleUpdate(values: AccountFormValues) {
    if (token === null || editingAccount === null) return
    setSubmitting(true)
    setFormError(null)
    const res = await updateAccount(token, editingAccount.id, {
      accountName: values.accountName.trim(),
      broker: values.broker.trim(),
      accountType: values.accountType.trim(),
      currency: values.currency.trim(),
      usdConversion: toPositiveNumber(values.usdConversion) as number,
      balance: toNonNegativeNumber(values.balance) as number,
    })
    setSubmitting(false)
    if (res.ok) {
      setEditingAccount(null)
      setAccounts((prev) => prev.map((a) => (a.id === res.data.data.account.id ? res.data.data.account : a)))
    } else {
      setFormError(res.error.message)
    }
  }

  function startEdit(account: Account) {
    setEditingAccount(account)
    setFormError(null)
  }

  function closeEdit() {
    setEditingAccount(null)
    setFormError(null)
  }

  function startCreate() {
    setShowCreateForm(true)
    setFormError(null)
  }

  function closeCreate() {
    setShowCreateForm(false)
    setFormError(null)
  }

  const activeForm = editingAccount !== null || showCreateForm

  return (
    <Section className="pt-14 sm:pt-16">
      <PageContainer>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-text sm:text-4xl">{t('accounts.title')}</h1>
            <p className="mt-2 text-base text-text-muted">
              {accounts.length === 0
                ? t('accounts.subtitleEmpty')
                : t(
                    accounts.length === 1 ? 'accounts.subtitleOne' : 'accounts.subtitleMany',
                    { count: accounts.length },
                  )}
            </p>
          </div>
          {!activeForm && (
            <Button type="button" variant="secondary" onClick={startCreate}>
              {t('accounts.newAccount')}
            </Button>
          )}
        </div>

        {error && (
          <div role="alert" className="mt-6 rounded-md border border-error bg-error-muted px-4 py-3">
            <p className="text-sm font-medium text-text">{t('accounts.unableToLoad')}</p>
            <p className="mt-1 text-sm text-text-muted">{error}</p>
            <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={refresh}>
              {t('accounts.retry')}
            </Button>
          </div>
        )}

        {loading ? (
          <div role="status" className="mt-8 flex items-center gap-3 text-text-muted">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-gold"
            />
            <span className="text-sm">{t('accounts.loading')}</span>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {accounts.length === 0 && !activeForm && (
              <Card className="px-6 py-10 text-center">
                <h3 className="text-base font-semibold text-text">{t('accounts.emptyTitle')}</h3>
                <p className="mt-2 text-sm text-text-muted">{t('accounts.emptyBody')}</p>
                <Button
                  type="button"
                  className="mt-5"
                  onClick={startCreate}
                >
                  {t('accounts.createAccount')}
                </Button>
              </Card>
            )}

            {showCreateForm && (
              <div>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-muted">
                  {t('accounts.newAccount')}
                </h2>
                {formError && (
                  <p role="alert" className="mb-3 text-xs text-error">
                    {formError}
                  </p>
                )}
                <AccountForm
                  initial={emptyAccountForm}
                  submitting={submitting}
                  submitLabel={t('accounts.createAccount')}
                  onSubmit={handleCreate}
                  onCancel={closeCreate}
                />
              </div>
            )}

            {editingAccount !== null && (
              <div>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-muted">
                  {t('accounts.editAccount', { name: editingAccount.accountName })}
                </h2>
                {formError && (
                  <p role="alert" className="mb-3 text-xs text-error">
                    {formError}
                  </p>
                )}
                <AccountForm
                  initial={{
                    accountName: editingAccount.accountName,
                    broker: editingAccount.broker,
                    accountType: editingAccount.accountType,
                    currency: editingAccount.currency,
                    usdConversion: String(editingAccount.usdConversion),
                    balance: String(editingAccount.balance),
                  }}
                  submitting={submitting}
                  submitLabel={t('accounts.saveChanges')}
                  onSubmit={handleUpdate}
                  onCancel={closeEdit}
                />
              </div>
            )}

            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                token={token as string}
                onDeleted={() => setAccounts((prev) => prev.filter((a) => a.id !== account.id))}
                onChanged={() => refresh()}
                onStartEdit={() => startEdit(account)}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </Section>
  )
}