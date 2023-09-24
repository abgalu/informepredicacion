import { Button } from '@mui/material'

import { BIBLE_STUDIES, CONTAINED, EDIT_MONTH_ACTIVITY, MONTH } from '../shared/constants'
import { useStore } from '../store/useStore'
import styles from '../styles/MonthActivity.module.css'
import Counter from './Counter'
import TimeCounter from './TimeCounter'

const MonthActivity = () => {
  const { isCurrentMonth, updateShowActivityDialog } = useStore()

  return (
    <div className={styles.container}>
      <TimeCounter readOnlyMode />
      <Counter
        name={BIBLE_STUDIES}
        readOnlyMode
      />
      {!isCurrentMonth && (
        <Button
          onClick={() => updateShowActivityDialog(MONTH)}
          variant={CONTAINED}
        >
          {EDIT_MONTH_ACTIVITY}
        </Button>
      )}
    </div>
  )
}

export default MonthActivity
