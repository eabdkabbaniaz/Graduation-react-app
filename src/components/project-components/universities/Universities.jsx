import CustomTable from "../../ui-components/CustomTable";
import MainContent from "../layout/MainContent";

export default function Universities({ name }) {
    return (
        <MainContent name={name}>
            <CustomTable />
        </MainContent>
    )
}