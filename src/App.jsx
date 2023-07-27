import 'dayjs/locale/es'
import { ThemeProvider } from '@mui/material/styles'

import styles from './App.module.css'
import Actions from './components/Actions'
import Calendar from './components/Calendar'
import DayActivity from './components/DayActivity'
import Header from './components/Header'
import MonthActivity from './components/MonthActivity'
import ThemePanel from './components/ThemePanel'
import { useActivity } from './hooks/useActivity'
import { useCalendar } from './hooks/useCalendar'
import { useTheme } from './hooks/useTheme'
import { formatMonth } from './shared/helpers'

const App = () => {
  const {
    handleCloseActionPanel,
    handleSaveActivity,
    isCurrentMonth,
    isMonthEditionMode,
    selectedDate,
    selectedMonth,
    setIsCurrentMonth,
    setIsMonthEditionMode,
    setSelectedDate,
    setSelectedMonth,
    setShowDayActivity,
    showDayActivity
  } = useActivity()

  const {
    handleChangeDay,
    handleChangeMonth,
    handleChangeView,
    highlightedDays,
    view
  } = useCalendar(
    setIsCurrentMonth,
    setIsMonthEditionMode,
    setSelectedDate,
    setSelectedMonth,
    setShowDayActivity
  )

  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.main}>
        <ThemePanel />

        <Header selectedMonth={formatMonth(selectedMonth)} />

        <MonthActivity
          editionMode={isMonthEditionMode}
          isCurrentMonth={isCurrentMonth}
          setIsMonthEditionMode={setIsMonthEditionMode}
        />

        <Calendar
          handleChangeDay={handleChangeDay}
          handleChangeMonth={handleChangeMonth}
          handleChangeView={handleChangeView}
          highlightedDays={highlightedDays}
          isCurrentMonth={isCurrentMonth}
          view={view}
        />

        {showDayActivity && (
          <DayActivity
            readOnlyMode={!isCurrentMonth}
            selectedDate={selectedDate}
          />
        )}

        {(showDayActivity || isMonthEditionMode) && (
          <Actions onClose={handleCloseActionPanel} onSubmit={handleSaveActivity} />
        )}
      </main>
    </ThemeProvider>
  )
}

export default App
