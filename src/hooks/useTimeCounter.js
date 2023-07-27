import { useEffect, useState } from 'react'

import { DAY, DEFAULT_VALUES, HOURS } from '../shared/constants'
import { padTo2Digits, toHours } from '../shared/helpers'
import { useStore } from '../store/useStore'

export const useTimeCounter = (isToday, type) => {
  const {
    selectedDayActivity,
    selectedMonthActivity,
    updateSelectedDayActivity,
    updateSelectedMonthActivity
  } = useStore()
  const [displayTime, setDisplayTime] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [startTime, setStartTime] = useState(DEFAULT_VALUES.TIME)
  const selectedActivity = type === DAY ? selectedDayActivity : selectedMonthActivity
  const updateActivity = type === DAY ? updateSelectedDayActivity : updateSelectedMonthActivity

  useEffect(() => {
    setDisplayTime(toHours(selectedActivity.hours))

    if (!isToday) {
      setIsStarted(false)
    }
  }, [isToday, selectedActivity])

  const handleLessTime = (type) => {
    const newTime =
    selectedActivity.hours - (type === HOURS ? 3600000 : 60000)
    if (newTime >= 0) {
      updateActivity(newTime, HOURS)
    }
  }

  const handleMoreTime = (type) => {
    const newTime =
    selectedActivity.hours + (type === HOURS ? 3600000 : 60000)
    updateActivity(newTime, HOURS)
  }

  const startChronometer = () => {
    setStartTime({
      display: `${new Date().getHours()}h${padTo2Digits(
        new Date().getMinutes()
      )}`,
      time: new Date().getTime()
    })
    setIsStarted(true)
  }

  const stopChronometer = () => {
    const newTime = new Date().getTime() - startTime.time
    updateActivity(selectedActivity.hours + newTime, HOURS)
    setIsStarted(false)
  }

  return {
    displayTime,
    handleLessTime,
    handleMoreTime,
    isStarted,
    startChronometer,
    startTime,
    stopChronometer
  }
}
