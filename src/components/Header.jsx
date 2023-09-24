import { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import {
  CURRENT_DATE,
  DEFAULT_VALUES,
  MONTH_LIST,
  REPORT
} from '../shared/constants'
import { getOptions } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/Header.module.css'

const Header = () => {
  const {
    selectedMonth,
    selectedYear,
    updateSelectedMonth,
    updateSelectedMonthActivity,
    updateSelectedYear,
    userActivity
  } = useStore()

  useEffect(() => {
    if (userActivity) {
      const monthActivity = userActivity?.find(
        (item) => item.month === selectedMonth && item.year === selectedYear
      ) ?? DEFAULT_VALUES.MONTH_ACTIVITY
      updateSelectedMonthActivity(monthActivity)
    }
  }, [userActivity, selectedMonth, selectedYear])

  return (
    <header className={styles.container}>
      <h1>{REPORT}</h1>
      <div className={styles.selects}>
        <Select
          defaultValue={CURRENT_DATE.getMonth()}
          onChange={(event) => updateSelectedMonth(event.target.value)}
        >
          {MONTH_LIST.map((month, index) => (
            <MenuItem key={index} value={index}>{month}</MenuItem>
          ))}
        </Select>
        <Select
          defaultValue={CURRENT_DATE.getFullYear()}
          onChange={(event) => updateSelectedYear(event.target.value)}
        >
          {getOptions(2023, CURRENT_DATE.getFullYear()).map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </div>
    </header>
  )
}

export default Header
