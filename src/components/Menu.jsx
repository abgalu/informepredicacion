import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'

import { useTheme } from '../hooks/useTheme'
import { ACTIVITY_DIALOG_TYPE, DARK, DICTIONARY } from '../shared/constants'
import { useStore } from '../store/useStore'
import styles from '../styles/Menu.module.css'

const Menu = () => {
  const { mode, updateShowActivityDialog, updateShowStopWatchDialog } =
    useStore()
  const { toggleTheme } = useTheme()

  const isDarkMode = mode === DARK

  return (
    <footer>
      <div className={styles.menuItem} onClick={updateShowStopWatchDialog}>
        <UpdateOutlinedIcon />
        <span>{DICTIONARY.CHRONOMETER}</span>
      </div>
      <div className={styles.menuItem} onClick={() => updateShowActivityDialog(ACTIVITY_DIALOG_TYPE.ADD)}>
        <AddOutlinedIcon />
        <span>{DICTIONARY.ADD}</span>
      </div>
      <div className={styles.menuItem} onClick={toggleTheme}>
        {isDarkMode
          ? <LightModeOutlinedIcon />
          : <DarkModeOutlinedIcon />}
        <span>{isDarkMode ? DICTIONARY.LIGHT_MODE : DICTIONARY.DARK_MODE}</span>
      </div>
    </footer>
  )
}

export default Menu
