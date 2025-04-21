import Profile from "./profile/Profile";
import ThemeToggler from "./ThemeToggler";

export default function TopbarTools() {
    return (
        <ul className="flex items-center flex-shrink-0 space-x-6">
            <ThemeToggler />
            <Profile />
        </ul>
    )
}