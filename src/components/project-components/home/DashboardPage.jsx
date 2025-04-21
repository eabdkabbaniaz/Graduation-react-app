import CustomCard from "../../ui-components/CustomCard";
import CustomCharts from "../../ui-components/CustomCharts";
import CustomTable from "../../ui-components/CustomTable";
import { cards } from "../../../store/Data";
import MainContent from "../layout/MainContent";

export default function DashboardPage({ name }) {
    return (
        <MainContent name={name}>
            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* <!-- Card --> */}
                {cards.map((card) => (
                    <CustomCard
                        key={card.id}
                        icon={card.icon}
                        name={card.name}
                        number={card.number}
                        className={card.className}
                    />
                ))}
            </div>

            <CustomTable />

            <CustomCharts />
        </MainContent>
    )
}