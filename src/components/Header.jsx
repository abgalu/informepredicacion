import PropTypes from 'prop-types'

import { REPORT } from '../shared/constants'

const Header = ({ selectedMonth }) => (
  <header>
    <h1>{REPORT} {selectedMonth}</h1>
  </header>
)

Header.defaultProps = {
  selectedMonth: ''
}

Header.propTypes = {
  selectedMonth: PropTypes.string
}

export default Header
