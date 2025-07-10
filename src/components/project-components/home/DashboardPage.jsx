import CustomCard from "../../ui-components/CustomCard";
import CustomCharts from "../charts/CustomCharts";
import { cards } from "../../../store/Data";
import MainContent from "../layout/MainContent";
import UniversityTable from "../medictions/system/SystemTable";
import { useContext } from "react";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";

export default function DashboardPage({ name , description }) {

    const {lang , setLang} = useContext(LangContext)

    return (
        <MainContent name={name} description={description}>
            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* <!-- Card --> */}
                {cards.map((card) => (
                    <CustomCard
                        key={card.id}
                        icon={card.icon}
                        name={authLang[langs[lang]][card.name]}
                        number={card.number}
                        className={card.className}
                    />
                ))}
            </div>
            <UniversityTable />

            <CustomCharts />
        </MainContent>
    )
}