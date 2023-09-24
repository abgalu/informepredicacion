import ThemePanel from '../components/ThemePanel'
import { CURRENT_DATE } from '../shared/constants'
import '../styles/Footer.module.css'

const Footer = () => (
  <footer>
    <ThemePanel />
    <span>{CURRENT_DATE.getFullYear()} &copy; informepredicacion.web.app</span>
  </footer>
)

export default Footer
