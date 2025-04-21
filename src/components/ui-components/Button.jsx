export default function Button({name , signal}){
    return (
        <div className="px-6 my-6">
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            {name}
            <span className="ml-2" aria-hidden="true">{signal}</span>
          </button>
        </div>
    )

}
