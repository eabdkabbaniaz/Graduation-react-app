import MobileHamburger from './Tools/MobileHamburger'
import SearchInput from './Tools/SearchInput'
import TopbarTools from './Tools/TopbarTools'

export default function Topbar({open,setOpen}) {
    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
        <div
          className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
        >
          <MobileHamburger onClick={() => setOpen(!open)} />

          <SearchInput />

          <TopbarTools />          
        </div>
      </header>
    )
}