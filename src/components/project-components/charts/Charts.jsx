import CustomCharts from "./CustomCharts";
import MainContent from "../layout/MainContent";

export default function Charts({ name , description }) {

    return (
        <MainContent name={name} description={description}>
            <CustomCharts />
        </MainContent>
    )
}