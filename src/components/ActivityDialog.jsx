import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useIndexedDB } from '../hooks/useIndexedDB'
import {
  ACTIVITY_DIALOG_TYPE,
  CONTAINED,
  DEFAULT_VALUES,
  DICTIONARY
} from '../shared/constants'
import { compareObjects, getSpanishDate, hasActivity, padTo2Digits, parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/ActivityDialog.module.css'
import TimeCounter from './TimeCounter'
import CustomToolbar from './CustomToolbar'

const ActivityDialog = () => {
  const { updateIndexedDBActivity } = useIndexedDB()
  const [currentActivity, setCurrentActivity] = useState(DEFAULT_VALUES.DAY_ACTIVITY)
  const {
    activityDialogType,
    selectedDate,
    selectedDayActivity,
    selectedMonth,
    selectedMonthActivity,
    selectedYear,
    showActivityDialog,
    updateSelectedDate,
    updateSelectedMonthActivity,
    updateShowActivityDialog,
    updateUserActivity,
    userActivity
  } = useStore()

  const dayHasActivity = activityDialogType !== ACTIVITY_DIALOG_TYPE.MONTH && hasActivity(currentActivity)
  const isDisabled =
  (activityDialogType === ACTIVITY_DIALOG_TYPE.ADD && (!hasActivity(currentActivity) || !selectedDate)) ||
    (activityDialogType !== ACTIVITY_DIALOG_TYPE.ADD && !hasActivity(currentActivity))

  useEffect(() => {
    const getDefaultActivity = () => {
      if (activityDialogType === ACTIVITY_DIALOG_TYPE.MONTH) {
        return selectedMonthActivity
      }
      if (activityDialogType === ACTIVITY_DIALOG_TYPE.DAY) {
        return selectedDayActivity
      }
      return DEFAULT_VALUES.DAY_ACTIVITY
    }
    setCurrentActivity(getDefaultActivity())
  }, [activityDialogType, selectedDayActivity, selectedMonthActivity])

  const handleClose = () => {
    updateSelectedDate(null)
    updateShowActivityDialog(null)
  }

  const handleSaveActivity = () => {
    let newDailyActivity = selectedMonthActivity?.daily_activity ?? []
    let newMonthActivity = {
      ...currentActivity,
      id: `${selectedYear}_${selectedMonth}`
    }
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === currentActivity.date
    )
    const dayActivityIsEdited = !compareObjects(newDailyActivity[dayActivityIndex], currentActivity)

    if (selectedDate) {
      currentActivity.date = selectedDate
    }

    if (activityDialogType !== ACTIVITY_DIALOG_TYPE.MONTH) {
      if (dayActivityIndex >= 0) {
        if (dayActivityIsEdited) {
          if (dayHasActivity) {
            newDailyActivity[dayActivityIndex] = currentActivity
          } else {
            newDailyActivity.splice(dayActivityIndex, 1)
          }
        }
      } else if (dayHasActivity) {
        newDailyActivity = [...newDailyActivity, currentActivity]
      }

      newMonthActivity = newDailyActivity.reduce(
        (acc, current) => ({
          daily_activity: newDailyActivity,
          hours: acc.hours + current.hours,
          id: `${toDate(selectedDate).getFullYear()}_${toDate(selectedDate).getMonth()}`,
          minutes: acc.minutes + current.minutes
        }),
        DEFAULT_VALUES.MONTH_ACTIVITY
      )
    }

    const newUserActivity = [...userActivity]
    const monthActivityIndex = newUserActivity.findIndex(item => item.id === newMonthActivity.id)
    newUserActivity[monthActivityIndex] = newMonthActivity

    updateShowActivityDialog(null)
    updateIndexedDBActivity(newMonthActivity)
    updateSelectedMonthActivity(newMonthActivity)
    updateUserActivity(newUserActivity)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={showActivityDialog}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        {activityDialogType === ACTIVITY_DIALOG_TYPE.ADD ? DICTIONARY.NEW_ACTIVITY : DICTIONARY.ACTIVITY}
        {activityDialogType === ACTIVITY_DIALOG_TYPE.MONTH && ` ${DICTIONARY.OF}`}
        {activityDialogType === ACTIVITY_DIALOG_TYPE.DAY && ` ${DICTIONARY.OF_THE}`}
        {activityDialogType !== ACTIVITY_DIALOG_TYPE.ADD && ` ${activityDialogType === ACTIVITY_DIALOG_TYPE.DAY
          ? getSpanishDate(selectedDate)
          : getSpanishDate(`${selectedYear}-${padTo2Digits(selectedMonth + 1)}`, false)}`}
      </DialogTitle>
      <DialogContent
        sx={{
          margin: 'auto',
          width: 'min-content'
        }}
      >
        {activityDialogType === ACTIVITY_DIALOG_TYPE.ADD && (
          <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
            <div className={styles.date}>
              <DatePicker
                onChange={(day) => updateSelectedDate(parseDate(day))}
                slotProps={{
                  textField: {
                    placeholder: DICTIONARY.DATE
                  }
                }}
                slots={{
                  toolbar: CustomToolbar
                }}
              />
            </div>
          </LocalizationProvider>
        )}
        <TimeCounter
          currentActivity={currentActivity}
          setCurrentActivity={setCurrentActivity}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {DICTIONARY.CANCEL}
        </Button>
        <Button disabled={isDisabled} onClick={handleSaveActivity} variant={CONTAINED}>
          {DICTIONARY.SAVE}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ActivityDialog
