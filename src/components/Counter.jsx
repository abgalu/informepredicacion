import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

import { DICTIONARY } from '../shared/constants'
import styles from '../styles/Counter.module.css'
import { useStore } from '../store/useStore'
import { getOptions } from '../shared/helpers'
import { MenuItem } from '@mui/material'

const Counter = ({ name, readOnlyMode }) => {
  const { selectedMonthActivity, updateSelectedMonthActivity } = useStore()

  return (
    <div className={!readOnlyMode ? styles.container : undefined}>
      <span>{DICTIONARY[name.toUpperCase()]}</span>
      {
        readOnlyMode
          ? <span className={styles.count}> {selectedMonthActivity[name]}</span>
          : (
            <div className={styles.countBox}>
              <InputLabel id={name}>{DICTIONARY[name]}</InputLabel>
              <Select
                value={selectedMonthActivity[name]}
                labelId={name}
                onChange={(event) => updateSelectedMonthActivity(event.target.value, name)}
              >
                {getOptions(0, 99).map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </div>
            )
      }
    </div>
  )
}

Counter.defaultProps = {
  name: '',
  readOnlyMode: false
}

Counter.propTypes = {
  name: PropTypes.string,
  readOnlyMode: PropTypes.bool
}

export default Counter
