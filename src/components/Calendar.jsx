import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PropTypes from 'prop-types'

import Day from './Day'
import { VIEWS } from '../shared/constants'

const Calendar = ({
  handleChangeDay,
  handleChangeMonth,
  handleChangeView,
  highlightedDays,
  isCurrentMonth
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
    <DateCalendar
      onChange={handleChangeDay}
      onMonthChange={handleChangeMonth}
      onYearChange={handleChangeMonth}
      onViewChange={handleChangeView}
      slotProps={{
        day: {
          highlightedDays,
          isCurrentMonth
        }
      }}
      slots={{
        day: Day
      }}
      views={VIEWS}
    />
  </LocalizationProvider>
)

Calendar.defaultProps = {
  handleChangeDay: () => {},
  handleChangeMonth: () => {},
  handleChangeView: () => {},
  highlightedDays: [],
  isCurrentMonth: true
}

Calendar.propTypes = {
  handleChangeDay: PropTypes.func,
  handleChangeMonth: PropTypes.func,
  handleChangeView: PropTypes.func,
  highlightedDays: PropTypes.array,
  isCurrentMonth: PropTypes.bool
}

export default Calendar
