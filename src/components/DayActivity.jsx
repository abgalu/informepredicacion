import PropTypes from 'prop-types'

import DayActivityRow from './DayActivityRow'
import { DAY_ACTIVITY_ITEMS } from '../shared/constants'

const DayActivity = ({ readOnlyMode, selectedDate }) => (
  <div>
    {DAY_ACTIVITY_ITEMS.map((activityItem) => (
      <DayActivityRow
        activityItem={activityItem}
        key={activityItem}
        readOnlyMode={readOnlyMode}
        selectedDate={selectedDate}
      />
    ))}
  </div>
)

DayActivity.defaultProps = {
  readOnlyMode: false,
  selectedDate: ''
}

DayActivity.propTypes = {
  readOnlyMode: PropTypes.bool,
  selectedDate: PropTypes.string
}

export default DayActivity
