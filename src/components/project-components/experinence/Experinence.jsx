import { useEffect, useState } from "react";
import MainContent from "../layout/MainContent";
import ExperinenceForm from "./experinenceForm";
import ExperinenceTable from "./experinenceTable";
import { fetchExperinence, toggleExperinenceStatus, deleteExperinence } from "../../../api/experinence";

const Experinence = ({ name, description }) => {
    const [selectedExperience, setSelectedExperience] = useState(null); 
    const [experiences, setExperiences] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [error, setError] = useState(null);

    const [experinence_id, setExperinenceId] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const getData = async () => {
        try {
            setIsWaiting(true);
            const data = await fetchExperinence();
            setExperiences(data);
        } catch (error) {
            console.error("Failed to load data", error);
            setError("An error occurred while loading data 😥");
        } finally {
            setIsWaiting(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = (experinence_id) => {
        console.log("experinence_id::" + experinence_id)
        setExperinenceId(experinence_id);             
        setShowDeleteModal(true);            
    }


    const confirmDelete = async () => {
        try {
            await deleteExperinence(experinence_id);
            setExperiences(prev => prev.filter(s => s.id !== experinence_id));
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Deletion failed:", err);
            setError("Failed to delete");
        }
    };

    const toggleStatus = async (id) => {
        try {
            await toggleExperinenceStatus(id);
            setExperiences(prev =>
                prev.map(exp =>
                    exp.id === id ? { ...exp, status: exp.status === 1 ? 0 : 1 } : exp
                )
            );
        } catch (err) {
            console.error("Error toggling status:", err);
            setError("Failed to update status");
        }
    };

    return (
        <MainContent name={name} description={description}>
            <ExperinenceTable
                data={experiences}
                onEdit={setSelectedExperience}
                setData={setExperiences}
                reloadData={getData}
                isWaiting={isWaiting}
                error={error}
                toggleStatus={toggleStatus}
                confirmDelete={confirmDelete}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDelete={handleDelete}
            />
            <ExperinenceForm
                experience={selectedExperience}
                setData={setExperiences}
            />
        </MainContent>
    );
}
export default Experinence;