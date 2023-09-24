import styles from '../styles/MonthActivity.module.css'
import TimeCounter from './TimeCounter'

import { useStore } from '../store/useStore'

const MonthActivity = () => {
  const { selectedMonthActivity } = useStore()

  return (
    <div className={styles.container}>
      <TimeCounter currentActivity={selectedMonthActivity} readOnlyMode />
    </div>
  )
}

export default MonthActivity
