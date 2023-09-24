import { MenuItem } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'

import {
  DAY,
  DICTIONARY,
  HOURS,
  MINUTES,
  MONTH
} from '../shared/constants'
import { getOptions, padTo2Digits } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/TimeCounter.module.css'

const TimeCounter = ({ readOnlyMode }) => {
  const {
    activityDialogType,
    isCurrentMonth,
    selectedDayActivity,
    selectedMonthActivity,
    updateSelectedDayActivity,
    updateSelectedMonthActivity
  } = useStore()

  const currentActivity = activityDialogType === MONTH || readOnlyMode ? selectedMonthActivity : selectedDayActivity
  const updateCurrentActivity = activityDialogType === MONTH ? updateSelectedMonthActivity : updateSelectedDayActivity

  return (
    <div className={styles.container}>
      {readOnlyMode
        ? (
          <span>{DICTIONARY.HOURS} <span className={styles.display}>{`${currentActivity.hours} : ${padTo2Digits(currentActivity.minutes)}`}</span></span>
          )
        : (
          <>
            <div>
              <InputLabel id={HOURS}>{DICTIONARY.HOURS}</InputLabel>
              <Select
                disabled={activityDialogType === DAY && !isCurrentMonth}
                labelId={HOURS}
                onChange={(event) => updateCurrentActivity(event.target.value, HOURS)}
                value={currentActivity.hours}
              >
                {getOptions(0, 99).map((hour) => (
                  <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel id={MINUTES}>{DICTIONARY.MINUTES}</InputLabel>
              <Select
                disabled={activityDialogType === DAY && !isCurrentMonth}
                labelId={MINUTES}
                onChange={(event) => updateCurrentActivity(event.target.value, MINUTES)}
                value={currentActivity.minutes}
              >
                {getOptions(0, 59).map((minute) => (
                  <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                ))}
              </Select>
            </div>
          </>
          )}
    </div>
  )
}

TimeCounter.defaultProps = {
  readOnlyMode: false
}

TimeCounter.propTypes = {
  readOnlyMode: PropTypes.bool
}

export default TimeCounter
