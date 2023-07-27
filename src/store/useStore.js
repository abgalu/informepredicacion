import { create } from 'zustand'

import { DEFAULT_VALUES, LIGHT } from '../shared/constants'

export const useStore = create((set) => {
  return {
    mode: LIGHT,
    selectedDayActivity: DEFAULT_VALUES.DAY_ACTIVITY,
    selectedMonthActivity: DEFAULT_VALUES.MONTH_ACTIVITY,
    resetSelectedDayActivity: () => {
      set(() => ({
        selectedDayActivity: DEFAULT_VALUES.DAY_ACTIVITY
      }))
    },
    updateMode: (value) => {
      set(() => ({
        mode: value
      }))
    },
    updateSelectedDayActivity: (value, key) => {
      set((store) => ({
        selectedDayActivity: key
          ? {
              ...store.selectedDayActivity,
              [key]: value
            }
          : value
      }))
    },
    updateSelectedMonthActivity: (value, key) => {
      set((store) => ({
        selectedMonthActivity: key
          ? {
              ...store.selectedMonthActivity,
              [key]: value
            }
          : value
      }))
    }
  }
})
