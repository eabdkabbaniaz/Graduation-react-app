import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, setOpen }) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}   
        className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 
          ${open ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      ></div>

      <Sidebar
        className={`fixed inset-y-0 left-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden 
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-64"}
        `}
      />
    </>
  );
}
