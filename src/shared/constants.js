import { getMonth } from './helpers'

export const DAY_ACTIVITY_ITEMS = [
  'hours',
  'placements',
  'video_showings',
  'return_visits',
  'bible_studies'
]
export const CONTAINED = 'contained'
export const currentDate = new Date()
export const DARK = 'dark'
export const DARK_PREFERENCE = '(prefers-color-scheme: dark)'
export const DATA_THEME = 'data-theme'
export const DATE = 'date'
export const DAY = 'day'
export const DB_NAME = 'informepredicacion'
export const DEFAULT_VALUES = {
  DATE: currentDate,
  DAY_ACTIVITY: {
    bible_studies: 0,
    date: '',
    hours: 0,
    placements: 0,
    return_visits: 0,
    video_showings: 0
  },
  MONTH: getMonth(currentDate),
  MONTH_ACTIVITY: {
    bible_studies: 0,
    daily_Activity: [],
    hours: 0,
    month: '',
    placements: 0,
    return_visits: 0,
    video_showings: 0
  },
  TIME: {
    display: '',
    time: 0
  }
}
export const dictionary = {
  placements: 'Publicaciones',
  video_showings: 'Presentaciones de videos',
  hours: 'Horas',
  return_visits: 'Revisitas',
  bible_studies: 'Cursos bíblicos'
}
export const EDIT_MONTH_ACTIVITY = 'Editar actividad del mes'
export const ERROR = 'error'
export const GO_TO_MODE = 'Pasar a modo'
export const HOURS = 'hours'
export const INDEXEDDB_ERROR = 'Error opening IndexedDB'
export const KEY_PATH = 'month'
export const LARGE = 'large'
export const LIGHT = 'light'
export const LONG = 'long'
export const MINUTES = 'minutes'
export const MONTH = 'month'
export const MONTH_ACTIVITY_ITEMS = [
  'placements',
  'video_showings',
  'hours',
  'return_visits',
  'bible_studies'
]
export const NUMERIC = 'numeric'
export const PRIMARY = 'primary'
export const READ_ONLY = 'readonly'
export const READ_WRITE = 'readwrite'
export const REPORT = 'Informe de'
export const SPANISH = 'es-ES'
export const START_CHRONOMETER = 'Comenzar a contar'
export const START_TIME = 'Hora de inicio'
export const STOP_CHRONOMETER = 'Dejar de contar'
export const STORE_NAME = 'monthlyActivity'
export const THEME = 'theme'
export const VIEWS = ['year', 'month', 'day']
export const WARNING = 'warning'
