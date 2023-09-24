import 'dayjs/locale/es'
import { ThemeProvider } from '@mui/material/styles'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { useTheme } from './hooks/useTheme'
import styles from './styles/App.module.css'

const App = () => {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <div>
          <Header />
          <Main />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
