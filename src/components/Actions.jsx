import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

import { LARGE } from '../shared/constants'
import styles from '../styles/Actions.module.css'

const Actions = ({ onClose, onSubmit }) => (
  <div className={styles.container}>
    <IconButton onClick={onClose}>
      <CloseRoundedIcon fontSize={LARGE} />
    </IconButton>
    <IconButton onClick={onSubmit}>
      <SaveRoundedIcon fontSize={LARGE} />
    </IconButton>
  </div>
)

Actions.defaultProps = {
  onClose: () => {},
  onSubmit: () => {}
}

Actions.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

export default Actions
