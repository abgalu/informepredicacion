import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import PropTypes from 'prop-types'

import { LIGHT } from '../shared/constants'
import { useStore } from '../store/useStore'

const Day = ({ day, highlightedDays, isCurrentMonth, ...other }) => {
  const isHighlightedDay = highlightedDays?.includes(day.date())
  const { mode } = useStore()

  return (
    <PickersDay
      {...other}
      day={day}
      disabled={!isCurrentMonth && !isHighlightedDay}
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
  day: {},
  highlightedDays: [],
  isCurrentMonth: true
}

Day.propTypes = {
  day: PropTypes.object,
  highlightedDays: PropTypes.array,
  isCurrentMonth: PropTypes.bool
}

export default Day
