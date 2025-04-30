import { navbar } from '../../../store/Data'
import Element from '../../ui-components/Element'
import Button from '../../ui-components/Button'
import { Link } from 'react-router-dom'
import { langs } from '../../../lang/langs'
import { authLang } from '../../../lang/authLang'
import { useContext } from 'react'
import LangContext from '../../../context/LangContext'

export default function Sidebar(props) {

  const {lang , setLang} = useContext(LangContext)

  return (
    <aside {...props}>
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a className="ml-6 mr-6 text-lg font-bold text-gray-800 dark:text-gray-200">
          {authLang[langs[lang]].Pharmacology}
        </a>

        {navbar.map((n) => (
          <Element 
            key={n.id} 
            name={authLang[langs[lang]][n.name]}
            route={authLang[langs['en']][n.name]} 
            icon={n.icon} 
            icon2={n.icon2} 
            isFirstElement={n.id === 1 ? true : false}
            />
        ))}

        <Link to="create_account">
          <Button 
            name={authLang[langs[lang]].signUp} 
            parentStyle="px-6 my-6" 
            size="large" 
            lang={lang}
            />
        </Link>

      </div>
    </aside>
  )
}