import CTA from "../home/CTA"

export default function MainContent(props) {

    console.log(props)
    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{props.name}</h2>
                <CTA />
                {props.children}
            </div>
        </main>
    )
}