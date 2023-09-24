import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { DAY, DEFAULT_VALUES } from '../shared/constants'
import { parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'
import Day from './Day'

const Calendar = () => {
  const [value, setValue] = useState(dayjs(new Date()))
  const {
    selectedMonth,
    selectedMonthActivity,
    selectedYear,
    updateSelectedDate,
    updateSelectedDayActivity,
    updateShowActivityDialog
  } = useStore()

  useEffect(() => {
    setValue(prevState =>
      dayjs(new Date(selectedYear, selectedMonth, new Date(prevState).getDate()))
    )
  }, [selectedMonth, selectedYear])

  const handleChange = (value) => {
    const newSelectedDate = parseDate(value)
    const dayActivity = selectedMonthActivity?.daily_activity?.find(
      (item) => item.date === newSelectedDate
    ) ?? DEFAULT_VALUES.DAY_ACTIVITY

    setValue(value)
    updateSelectedDate(newSelectedDate) //
    updateSelectedDayActivity(dayActivity) //
    updateShowActivityDialog(DAY)
  }
  const highlightedDays = selectedMonthActivity?.daily_activity?.map(
    (item) =>
      toDate(item.date).getDate()
  )

  return (
    <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleChange}
        slotProps={{
          day: {
            highlightedDays
          }
        }}
        slots={{
          day: Day
        }}
        sx={{
          '.MuiDayCalendar-slideTransition': {
            minHeight: 230
          },
          '.MuiPickersCalendarHeader-root': {
            display: 'none'
          }
        }}
        value={value}
      />
    </LocalizationProvider>
  )
}

export default Calendar
