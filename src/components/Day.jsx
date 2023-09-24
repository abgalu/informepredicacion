import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import PropTypes from 'prop-types'

import { ACTIVITY_DIALOG_TYPE, DEFAULT_VALUES, LIGHT } from '../shared/constants'
import { parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'

const Day = ({ day, ...other }) => {
  const {
    mode,
    selectedMonthActivity,
    updateSelectedDate,
    updateSelectedDayActivity,
    updateShowActivityDialog
  } = useStore()

  const highlightedDays = selectedMonthActivity?.daily_activity?.map(
    (item) =>
      toDate(item.date).getDate()
  )

  const isHighlightedDay = highlightedDays?.includes(day.date())

  const handleClick = () => {
    const date = parseDate(day)
    const dayActivity = selectedMonthActivity?.daily_activity?.find(
      (item) => item.date === date
    ) ?? DEFAULT_VALUES.DAY_ACTIVITY

    updateSelectedDate(date) //
    updateSelectedDayActivity(dayActivity) //
    updateShowActivityDialog(ACTIVITY_DIALOG_TYPE.DAY)
  }

  return (
    <PickersDay
      {...other}
      day={day}
      onClick={isHighlightedDay && handleClick}
      sx={{
        backgroundColor:
          isHighlightedDay && mode === LIGHT
            ? '#7ab422'
            : isHighlightedDay && '#9bbb6b',
        color:
          isHighlightedDay && mode === LIGHT
            ? '#fff'
            : isHighlightedDay && '#000000de',
        fontSize: 16
      }}
    />
  )
}

Day.defaultProps = {
  day: {}
}

Day.propTypes = {
  day: PropTypes.object
}

export default Day
