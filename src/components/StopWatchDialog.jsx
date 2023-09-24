import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useStopwatch } from 'react-timer-hook'

import { useIndexedDB } from '../hooks/useIndexedDB'
import { CONTAINED, CURRENT_DATE, DEFAULT_VALUES, DICTIONARY } from '../shared/constants'
import { getIdData, padTo2Digits } from '../shared/helpers'
import { useStore } from '../store/useStore'

const StopWatchDialog = () => {
  const {
    hours,
    isRunning,
    minutes,
    pause,
    seconds,
    start,
    totalSeconds
  } = useStopwatch()
  const {
    showStopWatchDialog,
    updateSelectedMonthActivity,
    updateShowStopWatchDialog,
    updateUserActivity,
    userActivity
  } = useStore()
  const { updateIndexedDBActivity } = useIndexedDB()

  const handleSaveActivity = () => {
    const currentDate = CURRENT_DATE.toDateString()
    const currentMonth = CURRENT_DATE.getMonth()
    const currentYear = CURRENT_DATE.getFullYear()
    const currentMonthActivity = userActivity?.find(
      (item) => {
        const { month, year } = getIdData(item.id)
        return month === currentMonth && year === currentYear
      }
    ) ?? DEFAULT_VALUES.MONTH_ACTIVITY
    const newDailyActivity = currentMonthActivity.daily_activity
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === currentDate
    )

    if (dayActivityIndex >= 0) {
      newDailyActivity[dayActivityIndex] = {
        ...newDailyActivity[dayActivityIndex],
        hours: newDailyActivity[dayActivityIndex].hours + hours,
        minutes: newDailyActivity[dayActivityIndex].minutes + minutes
      }
    } else {
      newDailyActivity.push({
        date: currentDate,
        hours,
        minutes
      })
    }

    const newMonthActivity = newDailyActivity.reduce(
      (acc, current) => ({
        daily_activity: newDailyActivity,
        hours: acc.hours + current.hours,
        id: `${currentYear}_${currentMonth}`,
        minutes: acc.minutes + current.minutes
      }),
      DEFAULT_VALUES.MONTH_ACTIVITY
    )

    const newUserActivity = [...userActivity]
    const monthActivityIndex = newUserActivity.findIndex(item => item.id === newMonthActivity.id)
    newUserActivity[monthActivityIndex] = newMonthActivity

    updateShowStopWatchDialog()
    updateIndexedDBActivity(newMonthActivity)
    updateSelectedMonthActivity(newMonthActivity)
    updateUserActivity(newUserActivity)
  }

  return (
    <Dialog
      onClose={updateShowStopWatchDialog}
      open={showStopWatchDialog}
    >
      <DialogTitle>
        {DICTIONARY.ACTIVITY_FOR_TODAY}
      </DialogTitle>
      <DialogContent
        sx={{
          margin: 'auto',
          width: 'min-content'
        }}
      >
        {padTo2Digits(hours)}:{padTo2Digits(minutes)}:{padTo2Digits(seconds)}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button disabled={isRunning} onClick={start} variant={CONTAINED}>
          {DICTIONARY.START}
        </Button>
        <Button disabled={!isRunning} onClick={pause} variant={CONTAINED}>
          {DICTIONARY.PAUSE}
        </Button>
        {!isRunning && totalSeconds > 60 && (
          <Button onClick={handleSaveActivity} variant={CONTAINED}>
            {DICTIONARY.SAVE}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default StopWatchDialog
