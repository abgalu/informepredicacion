import { DAY, HOURS } from '../shared/constants'
import { useStore } from '../store/useStore'

export const useCounter = (activityItem, type) => {
  const {
    selectedDayActivity,
    selectedMonthActivity,
    updateSelectedDayActivity,
    updateSelectedMonthActivity
  } = useStore()
  const count = type === DAY ? selectedDayActivity?.[activityItem] : selectedMonthActivity?.[activityItem] ?? 0
  const timeCount = selectedMonthActivity?.[HOURS] ?? 0

  const handleLess = () => {
    if (count > 0) {
      if (type === DAY) {
        updateSelectedDayActivity(count - 1, activityItem)
      } else {
        updateSelectedMonthActivity(count - 1, activityItem)
      }
    }
  }

  // TODO: Remove
  const handleLessTime = (type) => {
    const newTime = timeCount - (type === HOURS ? 3600000 : 60000)
    if (newTime >= 0) {
      updateSelectedMonthActivity(newTime, HOURS)
    }
  }

  const handleMore = () => {
    if (type === DAY) {
      updateSelectedDayActivity(count + 1, activityItem)
    } else {
      updateSelectedMonthActivity(count + 1, activityItem)
    }
  }

  // TODO: Remove
  const handleMoreTime = (type) => {
    const newTime = timeCount + (type === HOURS ? 3600000 : 60000)
    updateSelectedMonthActivity(newTime, HOURS)
  }

  return {
    count,
    handleLess,
    handleLessTime,
    handleMore,
    handleMoreTime
  }
}
