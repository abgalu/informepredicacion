import { useEffect, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'

import {
  DARK,
  DARK_PREFERENCE,
  DATA_THEME,
  LIGHT,
  THEME
} from '../shared/constants'
import { useStore } from '../store/useStore'

export const useTheme = () => {
  const { mode, updateMode } = useStore()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  const setMode = (value) => {
    document.documentElement.setAttribute(DATA_THEME, value)
    window.localStorage.setItem(THEME, value)
    updateMode(value)
  }

  const toggleTheme = (event) =>
    setMode(event.target.checked ? DARK : LIGHT)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME)
    const prefersDark =
      window.matchMedia &&
      window.matchMedia(DARK_PREFERENCE).matches
    const defaultDark = storedTheme === DARK || (!storedTheme && prefersDark)
    setMode(defaultDark ? DARK : LIGHT)
  }, [])

  const checked = useMemo(() => mode === DARK, [mode])

  return {
    checked,
    theme,
    toggleTheme
  }
}
