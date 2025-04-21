import { profileMenu } from "../../../../../store/Data";
import ProfileMenu from "./profileMenu";

export default function Profile() {

    return (
        <li className="relative">
              <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                // @click="toggleProfileMenu"
                // @keydown.escape="closeProfileMenu"
                aria-label="Account"
                aria-haspopup="true"
              >
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <template x-if="isProfileMenuOpen">
                <ul
                  x-transition:leave="transition ease-in duration-150"
                  x-transition:leave-start="opacity-100"
                  x-transition:leave-end="opacity-0"
                  // @click.away="closeProfileMenu"
                  // @keydown.escape="closeProfileMenu"
                  className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                  aria-label="submenu"
                >
                    {profileMenu.map((menu) => (
                        <ProfileMenu key={menu.id} name = {menu.name} icon = {menu.icon}/>
                    ))}
                </ul>
              </template>
            </li>
    )
}