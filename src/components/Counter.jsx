import IconButton from '@mui/material/IconButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import PropTypes from 'prop-types'

import { useCounter } from '../hooks/useCounter'
import { dictionary, LARGE } from '../shared/constants'
import styles from '../styles/Counter.module.css'

const Counter = ({ activityItem, readOnlyMode, type }) => {
  const {
    count,
    handleLess,
    handleMore
  } = useCounter(activityItem, type)

  return (
    <div className={styles.container}>
      <span className={styles.label}>{dictionary[activityItem]}</span>
      {
        readOnlyMode
          ? <span className={styles.count}>{count}</span>
          : (
            <div>
              <IconButton onClick={handleLess}>
                <RemoveRoundedIcon fontSize={LARGE} />
              </IconButton>
              <span className={styles.count}>{count}</span>
              <IconButton onClick={handleMore}>
                <AddRoundedIcon fontSize={LARGE} />
              </IconButton>
            </div>
            )
      }
    </div>
  )
}

Counter.defaultProps = {
  activityItem: '',
  readOnlyMode: false,
  type: ''
}

Counter.propTypes = {
  activityItem: PropTypes.string,
  readOnlyMode: PropTypes.bool,
  type: PropTypes.string
}

export default Counter
