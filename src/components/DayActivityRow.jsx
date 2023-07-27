import PropTypes from 'prop-types'

import TimeCounter from './TimeCounter'
import Counter from './Counter'
import { DAY, HOURS } from '../shared/constants'
import { isToday } from '../shared/helpers'
import styles from '../styles/DayActivityRow.module.css'

const DayActivityRow = ({ activityItem, readOnlyMode, selectedDate }) => (
  <div className={styles.row}>
    {activityItem === HOURS
      ? <TimeCounter
          activityItem={activityItem}
          isToday={isToday(selectedDate)}
          type={DAY}
        />
      : <Counter
          activityItem={activityItem}
          readOnlyMode={readOnlyMode}
          type={DAY}
        />}
  </div>
)

DayActivityRow.defaultProps = {
  activityItem: '',
  readOnlyMode: false,
  selectedDate: ''
}

DayActivityRow.propTypes = {
  activityItem: PropTypes.string,
  readOnlyMode: PropTypes.bool,
  selectedDate: PropTypes.string
}

export default DayActivityRow
