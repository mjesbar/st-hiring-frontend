import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../lib/api/settings'
import { SettingsForm } from '../components/SettingsForm'
import type { SettingsFormValues } from '../lib/settingsSchema'

const DEFAULT_SETTINGS: SettingsFormValues = { currency: 'USD', locale: 'en-US', timezone: 'UTC' }

export function SettingsPage() {
  const { data, isLoading, isError } = useGetSettingsQuery()
  const [updateSettings, { isLoading: isSaving, isSuccess, isError: isSaveError }] = useUpdateSettingsMutation()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  const initialValues: SettingsFormValues = data
    ? { currency: data.currency, locale: data.locale, timezone: data.timezone }
    : DEFAULT_SETTINGS

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, width: '100%', maxWidth: 480 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Settings
        </Typography>
        {isError && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No settings found — showing defaults.
          </Alert>
        )}
        {isSaveError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to save settings.
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Settings saved.
          </Alert>
        )}
        <SettingsForm
          initialValues={initialValues}
          isSubmitting={isSaving}
          onSubmit={(values) => updateSettings(values)}
        />
      </Paper>
    </Box>
  )
}
