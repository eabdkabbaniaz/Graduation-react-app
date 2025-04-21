import CustomCharts from "../../ui-components/CustomCharts";
import MainContent from "../layout/MainContent";

export default function Charts({ name }) {

    return (
        <MainContent name={name}>
            <CustomCharts />
        </MainContent>
    )
}