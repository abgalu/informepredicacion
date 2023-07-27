import PropTypes from 'prop-types'

import { HOURS, MONTH } from '../shared/constants'
import styles from '../styles/MonthActivityRow.module.css'
import Counter from './Counter'
import TimeCounter from './TimeCounter'

const MonthActivityRow = ({ activityItem, editionMode }) => (
  <div className={styles.row}>
    {activityItem === HOURS
      ? <TimeCounter
          activityItem={activityItem}
          readOnlyMode={!editionMode}
          type={MONTH}
        />
      : <Counter
          activityItem={activityItem}
          readOnlyMode={!editionMode}
          type={MONTH}
        />}
  </div>
)

MonthActivityRow.defaultProps = {
  activityItem: '',
  editionMode: false
}

MonthActivityRow.propTypes = {
  activityItem: PropTypes.string,
  editionMode: PropTypes.bool
}

export default MonthActivityRow
