import { navbar } from '../../../store/Data'
import Element from '../../ui-components/Element'
import Button from '../../ui-components/Button'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
  return (
    <aside {...props}>
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          Pharmacology
        </a>

        {navbar.map((n) => (
          <Element key={n.id} name={n.name} icon={n.icon} icon2={n.icon2} />
        ))}

        <Link to="create_account"><Button name="Create account" signal="+" /></Link>

      </div>
    </aside>
  )
}