import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import Switch from '@mui/material/Switch'

import { useTheme } from '../hooks/useTheme'
import { PRIMARY, WARNING } from '../shared/constants'
import styles from '../styles/ThemePanel.module.css'

const ThemePanel = () => {
  const { checked, toggleTheme } = useTheme()

  return (
    <div className={styles.container}>
      <LightModeRoundedIcon color={WARNING} />
      <Switch checked={checked} color={WARNING} onChange={toggleTheme} />
      <DarkModeRoundedIcon color={PRIMARY} />
    </div>
  )
}

export default ThemePanel
