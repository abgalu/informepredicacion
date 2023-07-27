import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import PropTypes from 'prop-types'

import { useTimeCounter } from '../hooks/useTimeCounter'
import {
  CONTAINED,
  DAY,
  dictionary,
  ERROR,
  HOURS,
  LARGE,
  MINUTES,
  PRIMARY,
  START_CHRONOMETER,
  START_TIME, STOP_CHRONOMETER
} from '../shared/constants'
import styles from '../styles/TimeCounter.module.css'

const TimeCounter = ({ activityItem, isToday, readOnlyMode, type }) => {
  const {
    displayTime,
    handleLessTime,
    handleMoreTime,
    isStarted,
    startChronometer,
    startTime,
    stopChronometer
  } = useTimeCounter(isToday, type)

  return (
    <div className={type === DAY ? styles.container : ''}>
      <div>
        {readOnlyMode
          ? (
            <div className={styles.row}>
              <span className={styles.activity}>{dictionary[activityItem]}</span>
              <span className={styles.displayTime}>{displayTime}</span>
            </div>
            )
          : isStarted
            ? (
              <span>{START_TIME} {startTime.display}</span>
              )
            : (
              <div className={styles.row}>
                <span className={styles.activity}>{dictionary[activityItem]}</span>
                <div>
                  <div>
                    <IconButton onClick={() => handleMoreTime(HOURS)}>
                      <AddRoundedIcon fontSize={LARGE} />
                    </IconButton>
                    <IconButton onClick={() => handleMoreTime(MINUTES)}>
                      <AddRoundedIcon fontSize={LARGE} />
                    </IconButton>
                  </div>
                  <span className={styles.displayTime}>{displayTime}</span>
                  <div>
                    <IconButton onClick={() => handleLessTime(HOURS)}>
                      <RemoveRoundedIcon fontSize={LARGE} />
                    </IconButton>
                    <IconButton onClick={() => handleLessTime(MINUTES)}>
                      <RemoveRoundedIcon fontSize={LARGE} />
                    </IconButton>
                  </div>
                </div>
              </div>
              )}
      </div>
      {isToday && (
        <div className={styles.action}>
          <Button
            color={isStarted ? ERROR : PRIMARY}
            onClick={isStarted ? stopChronometer : startChronometer}
            variant={CONTAINED}
          >
            {isStarted ? STOP_CHRONOMETER : START_CHRONOMETER}
          </Button>
        </div>
      )}
    </div>
  )
}

TimeCounter.defaultProps = {
  activityItem: '',
  isToday: false,
  readOnlyMode: false,
  type: ''
}

TimeCounter.propTypes = {
  activityItem: PropTypes.string,
  isToday: PropTypes.bool,
  readOnlyMode: PropTypes.bool,
  type: PropTypes.string
}

export default TimeCounter
