import PropTypes from 'prop-types'
import { Button } from '@mui/material'

import MonthActivityRow from './MonthActivityRow'
import { MONTH_ACTIVITY_ITEMS, CONTAINED, EDIT_MONTH_ACTIVITY } from '../shared/constants'
import { useStore } from '../store/useStore'
import styles from '../styles/MonthActivity.module.css'

const MonthActivity = ({
  editionMode,
  isCurrentMonth,
  setIsMonthEditionMode
}) => {
  const { selectedMonthActivity } = useStore()

  return (
    <div className={styles.container}>
      {MONTH_ACTIVITY_ITEMS.map((activityItem) => (
        <MonthActivityRow
          activityItem={activityItem}
          editionMode={editionMode}
          key={activityItem}
          selectedMonthActivity={selectedMonthActivity}
        />
      ))}
      {!editionMode && !isCurrentMonth && (
        <Button
          onClick={() => setIsMonthEditionMode(true)}
          variant={CONTAINED}
        >
          {EDIT_MONTH_ACTIVITY}
        </Button>
      )}
    </div>
  )
}

MonthActivity.defaultProps = {
  editionMode: false,
  isCurrentMonth: true,
  setIsMonthEditionMode: () => {}
}

MonthActivity.propTypes = {
  editionMode: PropTypes.bool,
  isCurrentMonth: PropTypes.bool,
  setIsMonthEditionMode: PropTypes.func
}

export default MonthActivity
