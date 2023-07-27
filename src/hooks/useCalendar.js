import { useState } from 'react'

import { currentDate, DATE, DAY } from '../shared/constants'
import { getMonth, parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'

export const useCalendar = (
  setIsCurrentMonth,
  setIsMonthEditionMode,
  setSelectedDate,
  setSelectedMonth,
  setShowDayActivity
) => {
  const [view, setView] = useState(DAY)
  const { selectedMonthActivity, updateSelectedDayActivity } = useStore()
  const highlightedDays = selectedMonthActivity?.daily_Activity?.map(
    (item) =>
      toDate(item.date).getDate()
  )

  const handleChangeDay = (value) => {
    updateSelectedDayActivity(value, DATE)
    setSelectedDate(parseDate(value))
    setShowDayActivity(true)
  }

  const handleChangeMonth = (value) => {
    const currentMonth = getMonth(currentDate)
    const date = toDate(value)
    const selectedMonth = getMonth(date)
    setSelectedMonth(selectedMonth)
    setSelectedDate()
    setIsCurrentMonth(selectedMonth === currentMonth)
    setIsMonthEditionMode(false)
    setShowDayActivity(false)
  }

  const handleChangeView = (value) => setView(value)

  return {
    handleChangeDay,
    handleChangeMonth,
    handleChangeView,
    highlightedDays,
    view
  }
}
