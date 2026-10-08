import * as yup from 'yup'

export const settingsSchema = yup.object({
  currency: yup.string().trim().required('Currency is required'),
  locale: yup.string().trim().required('Locale is required'),
  timezone: yup.string().trim().default('UTC'),
})

export type SettingsFormValues = yup.InferType<typeof settingsSchema>
