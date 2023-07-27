import { useState, useEffect } from 'react'

import { DB_NAME, DEFAULT_VALUES, STORE_NAME } from '../shared/constants'
import { compareObjects, hasActivity } from '../shared/helpers'
import { useStore } from '../store/useStore'
import { useIndexedDB } from './useIndexedDB'

export const useActivity = () => {
  const { indexedDBActivity, updateIndexedDBActivity } = useIndexedDB(DB_NAME, STORE_NAME)
  const [isCurrentMonth, setIsCurrentMonth] = useState(true)
  const [isMonthEditionMode, setIsMonthEditionMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_VALUES.MONTH)
  const [showDayActivity, setShowDayActivity] = useState(false)
  const {
    resetSelectedDayActivity,
    selectedDayActivity,
    selectedMonthActivity,
    updateSelectedDayActivity,
    updateSelectedMonthActivity
  } = useStore()

  useEffect(() => {
    const monthActivity = indexedDBActivity?.find(
      (item) => item.month === selectedMonth
    ) ?? DEFAULT_VALUES.MONTH_ACTIVITY
    const dayActivity =
      monthActivity?.daily_Activity?.find(
        (item) => item.date === selectedDate
      ) ?? DEFAULT_VALUES.DAY_ACTIVITY

    updateSelectedDayActivity(dayActivity)
    updateSelectedMonthActivity(monthActivity)
  }, [
    indexedDBActivity,
    selectedDate,
    selectedMonth,
    updateSelectedDayActivity,
    updateSelectedMonthActivity
  ])

  const handleCloseActionPanel = () => {
    resetSelectedDayActivity()
    setIsMonthEditionMode(false)
    setSelectedDate()
    setShowDayActivity(false)
  }

  const handleSaveActivity = () => {
    let newDailyActivity = selectedMonthActivity?.daily_Activity ?? []
    let newMonthActivity = {
      ...selectedMonthActivity,
      month: selectedMonth
    }
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === selectedDayActivity.date
    )
    const dayActivityIsEdited = !compareObjects(newDailyActivity[dayActivityIndex], selectedDayActivity)
    const dayHasActivity = hasActivity(selectedDayActivity)
    const monthActivityIndex = indexedDBActivity.findIndex(
      (item) => item.month === newMonthActivity.month
    )
    const monthActivityIsEdited = !compareObjects(indexedDBActivity[monthActivityIndex], selectedMonthActivity)
    const monthHasActivity = hasActivity(selectedMonthActivity)

    if (selectedDate) {
      selectedDayActivity.date = selectedDate
    }

    if (isCurrentMonth) {
      if (dayActivityIndex >= 0) {
        if (dayActivityIsEdited) {
          if (dayHasActivity) {
            newDailyActivity[dayActivityIndex] = selectedDayActivity
          } else {
            newDailyActivity.splice(dayActivityIndex, 1)
          }
        }
      } else if (dayHasActivity) {
        newDailyActivity = [...newDailyActivity, selectedDayActivity]
      }

      newMonthActivity = newDailyActivity.reduce(
        (acc, current) => ({
          bible_studies: acc.bible_studies + current.bible_studies,
          daily_Activity: newDailyActivity,
          hours: acc.hours + current.hours,
          month: newMonthActivity.month,
          placements: acc.placements + current.placements,
          return_visits: acc.return_visits + current.return_visits,
          video_showings: acc.video_showings + current.video_showings
        }),
        DEFAULT_VALUES.MONTH_ACTIVITY
      )
    }

    if (
      (dayActivityIndex === -1 && dayHasActivity) ||
      (dayActivityIndex >= 0 && dayActivityIsEdited) ||
      !isCurrentMonth
    ) {
      updateIndexedDBActivity(newMonthActivity)
      resetSelectedDayActivity()
      setSelectedDate()
      setShowDayActivity(false)
      updateSelectedMonthActivity(newMonthActivity)
      if (!isCurrentMonth && (monthHasActivity || (monthActivityIndex >= 0 && monthActivityIsEdited))) {
        setIsMonthEditionMode(false)
      }
    }
  }

  return {
    handleCloseActionPanel,
    handleSaveActivity,
    isCurrentMonth,
    isMonthEditionMode,
    selectedDate,
    selectedMonth,
    setIsCurrentMonth,
    setIsMonthEditionMode,
    setSelectedDate,
    setSelectedMonth,
    setShowDayActivity,
    showDayActivity
  }
}
