import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useIndexedDB } from '../hooks/useIndexedDB'
import {
  CONTAINED,
  DAY,
  DEFAULT_VALUES,
  DICTIONARY,
  MONTH
} from '../shared/constants'
import { compareObjects, getSpanishDate, hasActivity } from '../shared/helpers'
import { useStore } from '../store/useStore'
import TimeCounter from './TimeCounter'

const ActivityDialog = () => {
  const { updateIndexedDBActivity } = useIndexedDB()
  const {
    activityDialogType,
    isCurrentMonth,
    selectedDate,
    selectedDayActivity,
    selectedMonth,
    selectedMonthActivity,
    selectedYear,
    showActivityDialog,
    updateSelectedMonthActivity,
    updateShowActivityDialog
  } = useStore()

  const dayHasActivity = hasActivity(selectedDayActivity)
  const monthHasActivity = hasActivity(selectedMonthActivity)
  const isDisabled = (activityDialogType === DAY && !dayHasActivity) || (activityDialogType === MONTH && !monthHasActivity)

  const handleSaveActivity = () => {
    let newDailyActivity = selectedMonthActivity?.daily_activity ?? []
    let newMonthActivity = {
      ...selectedMonthActivity,
      month: selectedMonth,
      year: selectedYear,
      id: `${selectedMonth}_${selectedYear}`
    }
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === selectedDayActivity.date
    )
    const dayActivityIsEdited = !compareObjects(newDailyActivity[dayActivityIndex], selectedDayActivity)

    if (selectedDate) {
      selectedDayActivity.date = selectedDate
    }

    if (isCurrentMonth) {
      if (dayActivityIndex >= 0) {
        if (dayActivityIsEdited) {
          if (dayHasActivity) {
            newDailyActivity[dayActivityIndex] = selectedDayActivity
          } else {
            newDailyActivity.splice(dayActivityIndex, 1)
          }
        }
      } else if (dayHasActivity) {
        newDailyActivity = [...newDailyActivity, selectedDayActivity]
      }

      newMonthActivity = newDailyActivity.reduce(
        (acc, current) => ({
          bible_studies: newMonthActivity.bible_studies,
          daily_activity: newDailyActivity,
          hours: acc.hours + current.hours,
          id: `${newMonthActivity.month}_${newMonthActivity.year}`,
          minutes: acc.minutes + current.minutes,
          month: newMonthActivity.month,
          year: newMonthActivity.year
        }),
        DEFAULT_VALUES.MONTH_ACTIVITY
      )
    }

    updateShowActivityDialog()
    updateIndexedDBActivity(newMonthActivity)
    updateSelectedMonthActivity(newMonthActivity)
  }

  return (
    <Dialog
      onClose={updateShowActivityDialog}
      open={showActivityDialog}
    >
      <DialogTitle>
        {DICTIONARY.ACTIVITY_FOR} {activityDialogType === DAY && DICTIONARY.THE} {getSpanishDate(selectedDate, activityDialogType === DAY)}
      </DialogTitle>
      <DialogContent>
        <TimeCounter />
      </DialogContent>
      {(isCurrentMonth || activityDialogType === MONTH) && (
        <DialogActions>
          <Button onClick={updateShowActivityDialog}>
            {DICTIONARY.CANCEL}
          </Button>
          <Button disabled={isDisabled} onClick={handleSaveActivity} variant={CONTAINED}>
            {DICTIONARY.SAVE}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ActivityDialog
