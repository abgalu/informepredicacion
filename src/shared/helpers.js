import { CURRENT_DATE, LONG, MONTH_LIST, NUMERIC, SPANISH } from './constants'

export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

export const getFormattedMonth = (value) => {
  const date = toDate(`${value}/1`)
  return `${MONTH_LIST[date.getMonth()]} ${date.getFullYear()}`
}

export const getMonth = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}`

export const getOptions = (start, end) => {
  const options = []
  for (let i = start; i <= end; i++) {
    options.push(i)
  }
  return options
}

export const hasActivity = (value) => value.hours || value.minutes

export const isToday = (value) => toDate(value).toDateString() === CURRENT_DATE.toDateString()

export const padTo2Digits = (number) => number.toString().padStart(2, '0')

export const parseDate = (value) => toDate(value).toDateString()

export const toDate = (value) => new Date(value)

export const toHours = (time = 0) => {
  const minutes = Math.floor(time / 60000) % 60
  const hours = Math.floor(time / 3600000)
  return `${hours} : ${padTo2Digits(minutes)}`
}

export const getSpanishDate = (date, withDay = true) => {
  const formattedDate = new Intl.DateTimeFormat(SPANISH, {
    day: withDay ? NUMERIC : undefined,
    month: LONG,
    year: NUMERIC
  }).format(toDate(date))
  return formattedDate
}
