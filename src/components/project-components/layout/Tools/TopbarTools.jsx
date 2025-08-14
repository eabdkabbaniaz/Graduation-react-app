import Languages from "./language/Languages";
import Profile from "./profile/Profile";
import ProfilePage from "./profile/ProfilePage";
import ThemeToggler from "./ThemeToggler";
import { useState } from "react"

export default function TopbarTools() {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);

    return (
        <>
        <ul className="flex items-center flex-shrink-0 space-x-6">
            <Languages />
            <ThemeToggler />
            <Profile onClick={togglePopup} />
        </ul>

        {isOpen && <ProfilePage onClick={togglePopup} />}
        </>

    )
}