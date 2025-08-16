import MainContent from "../layout/MainContent";
import SettingsTable from "./SettingsTable";

export default function Settings({name , description}) {

    return (
        <MainContent name={name} description={description}>
            <SettingsTable />
        </MainContent>
    )
}