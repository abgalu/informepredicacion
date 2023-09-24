export const ACTIVITY = 'activity'
export const ACTIVITY_DIALOG_TYPE = {
  ADD: 'add',
  DAY: 'day',
  MONTH: 'month'
}
export const CONTAINED = 'contained'
export const CURRENT_DATE = new Date()
export const DARK = 'dark'
export const DARK_PREFERENCE = '(prefers-color-scheme: dark)'
export const DATA_THEME = 'data-theme'
export const DATE = 'date'
export const DB_NAME = 'contador'
export const DEFAULT_VALUES = {
  DATE: CURRENT_DATE,
  DAY_ACTIVITY: {
    date: null,
    hours: 0,
    minutes: 0
  },
  MONTH: CURRENT_DATE.getMonth(),
  MONTH_ACTIVITY: {
    id: null,
    daily_activity: [],
    hours: 0,
    minutes: 0
  },
  YEAR: CURRENT_DATE.getFullYear()
}
export const DICTIONARY = {
  ACTIVITY_FOR_TODAY: 'Actividad para hoy',
  ACTIVITY: 'Actividad',
  ADD: 'Añadir',
  CANCEL: 'Cancelar',
  CHRONOMETER: 'Cronómetro',
  COUNTER: 'Contador de',
  DARK_MODE: 'Modo oscuro',
  DATE: 'Fecha',
  HOURS: 'Horas',
  LIGHT_MODE: 'Modo claro',
  LOADING: 'Cargando',
  MINUTES: 'Minutos',
  NEW_ACTIVITY: 'Nueva actividad',
  OF_THE: 'del',
  OF: 'de',
  PAUSE: 'Pausa',
  SAVE: 'Guardar',
  START: 'Inicio'
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
export const OUTLINED = 'outlined'
export const PRIMARY = 'primary'
export const READ_ONLY = 'readonly'
export const READ_WRITE = 'readwrite'
export const SPANISH = 'es-ES'
export const STORE_NAME = 'userActivity'
export const THEME = 'theme'
export const VIEWS = ['year', 'month', 'day']
export const WARNING = 'warning'
