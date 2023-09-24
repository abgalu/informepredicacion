export const BIBLE_STUDIES = 'bible_studies'
export const CONTAINED = 'contained'
export const CURRENT_DATE = new Date()
export const DARK = 'dark'
export const DARK_PREFERENCE = '(prefers-color-scheme: dark)'
export const DATA_THEME = 'data-theme'
export const DATE = 'date'
export const DAY = 'day'
export const DB_NAME = 'informepredicacion.web.app'
export const DEFAULT_VALUES = {
  DATE: CURRENT_DATE,
  DAY_ACTIVITY: {
    date: '',
    hours: 0,
    minutes: 0
  },
  MONTH: CURRENT_DATE.getMonth(),
  MONTH_ACTIVITY: {
    id: null,
    bible_studies: 0,
    daily_activity: [],
    hours: 0,
    minutes: 0,
    month: null,
    year: null
  },
  TIME: {
    display: '',
    time: 0
  },
  YEAR: CURRENT_DATE.getFullYear()
}
export const DICTIONARY = {
  BIBLE_STUDIES: 'Cursos bíblicos',
  HOURS: 'Horas',
  MINUTES: 'Minutos',
  CANCEL: 'Cancelar',
  SAVE: 'Guardar',
  ACTIVITY_FOR: 'Actividad para',
  THE: 'el'
}
export const EDIT_MONTH_ACTIVITY = 'Editar actividad del mes'
export const ERROR = 'error'
export const HOURS = 'hours'
export const INDEXEDDB_ERROR = 'Error opening IndexedDB'
export const KEY_PATH = 'id'
export const LARGE = 'large'
export const LIGHT = 'light'
export const LONG = 'long'
export const MINUTES = 'minutes'
export const MONTH = 'month'
export const MONTH_LIST = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]
export const NUMERIC = 'numeric'
export const PRIMARY = 'primary'
export const READ_ONLY = 'readonly'
export const READ_WRITE = 'readwrite'
export const REPORT = 'Informe de predicación'
export const SPANISH = 'es-ES'
export const STORE_NAME = 'userActivity'
export const THEME = 'theme'
export const VIEWS = ['year', 'month', 'day']
export const WARNING = 'warning'
