import { create } from 'zustand'

import { DEFAULT_VALUES, LIGHT } from '../shared/constants'

export const useStore = create((set) => {
  return {
    activityDialogType: null,
    isCurrentMonth: true,
    mode: LIGHT,
    selectedDate: DEFAULT_VALUES.DATE,
    selectedDayActivity: DEFAULT_VALUES.DAY_ACTIVITY,
    selectedMonth: DEFAULT_VALUES.MONTH,
    selectedMonthActivity: DEFAULT_VALUES.MONTH_ACTIVITY,
    selectedYear: DEFAULT_VALUES.YEAR,
    showActivityDialog: false,
    userActivity: null,
    updateMode: (value) => {
      set(() => ({
        mode: value
      }))
    },
    updateSelectedDate: (value) => {
      set(() => ({
        selectedDate: value
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
    updateSelectedMonth: (value) => {
      set((store) => ({
        isCurrentMonth: value === DEFAULT_VALUES.MONTH && store.selectedYear === DEFAULT_VALUES.YEAR,
        selectedMonth: value
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
    },
    updateSelectedYear: (value) => {
      set((store) => ({
        isCurrentMonth: value === DEFAULT_VALUES.YEAR && store.selectedMonth === DEFAULT_VALUES.MONTH,
        selectedYear: value
      }))
    },
    updateShowActivityDialog: (type) => {
      set((store) => ({
        showActivityDialog: !store.showActivityDialog,
        activityDialogType: type
      }))
    },
    updateUserActivity: (value) => {
      set(() => ({
        userActivity: value
      }))
    }
  }
})
