import { Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { settingsSchema, type SettingsFormValues } from '../lib/settingsSchema'

interface SettingsFormProps {
  initialValues: SettingsFormValues
  isSubmitting: boolean
  onSubmit: (values: SettingsFormValues) => void
}

export function SettingsForm({ initialValues, isSubmitting, onSubmit }: SettingsFormProps) {
  const formik = useFormik<SettingsFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: settingsSchema,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          fullWidth
          id="currency"
          name="currency"
          label="Currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          helperText={formik.touched.currency && formik.errors.currency}
        />
        <TextField
          fullWidth
          id="locale"
          name="locale"
          label="Locale"
          value={formik.values.locale}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.locale && Boolean(formik.errors.locale)}
          helperText={formik.touched.locale && formik.errors.locale}
        />
        <TextField
          fullWidth
          id="timezone"
          name="timezone"
          label="Timezone"
          value={formik.values.timezone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.timezone && Boolean(formik.errors.timezone)}
          helperText={formik.touched.timezone && formik.errors.timezone}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ alignSelf: 'flex-start' }}>
          Save
        </Button>
      </Stack>
    </form>
  )
}
