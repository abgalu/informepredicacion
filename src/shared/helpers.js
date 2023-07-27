import { currentDate, LONG, NUMERIC, SPANISH } from './constants'

export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

export const formatDate = (date) =>
  new Intl.DateTimeFormat(SPANISH).format(date)

export const formatMonth = (value) => new Intl.DateTimeFormat(SPANISH, {
  month: LONG,
  year: NUMERIC
}).format(toDate(value += '/1'))

export const toDate = (value) => new Date(value)

export const getMonth = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}`

export const isToday = (value) => toDate(value).toDateString() === currentDate.toDateString()

export const padTo2Digits = (number) => number.toString().padStart(2, '0')

export const parseDate = (value) => toDate(value).toDateString()

export const toHours = (time = 0) => {
  const minutes = Math.floor(time / 60000) % 60
  const hours = Math.floor(time / 3600000)
  return `${hours} : ${padTo2Digits(minutes)}`
}

export const hasActivity = (value) => Object.values(value).some(
  (item) => Number.isFinite(item) && item
)
