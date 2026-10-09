import { api } from './api'
import type { Settings } from '../types'

export type SettingsPayload = Omit<Settings, 'updatedAt'>

export const settingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<Settings, void>({
      query: () => 'settings',
      providesTags: ['Settings'],
    }),
    updateSettings: build.mutation<Settings, SettingsPayload>({
      query: (body) => ({ url: 'settings', method: 'POST', body }),
      invalidatesTags: ['Settings'],
    }),
  }),
})

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi
