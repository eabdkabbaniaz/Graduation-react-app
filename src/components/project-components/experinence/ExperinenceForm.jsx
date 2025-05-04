import { useState, useEffect } from "react";
import Button from "../../ui-components/Button";
import { createExperinence, updateExperinence } from "../../../Api/experinence";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";

const ExperinenceForm = ({ experience, setData }) => {

    const [name, setName] = useState("");
    const [beforeInstruction, setBeforeInstruction] = useState("");
    const [afterInstruction, setAfterInstruction] = useState("");


    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (experience) {
            setName(experience.name);
            setBeforeInstruction(experience.before_instruction);
            setAfterInstruction(experience.after_instruction);
            setIsModalOpen(true);
        }
    }, [experience]);  


    const formFields = [
        { label: "name_experince", value: name, onChange: (e) => setName(e.target.value), required: true },
        { label: "before_instruction", value: beforeInstruction, onChange: (e) => setBeforeInstruction(e.target.value), required: true, type: "textarea" },
        { label: "after_instruction", value: afterInstruction, onChange: (e) => setAfterInstruction(e.target.value), required: true, type: "textarea" },
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (experience) {
                await updateExperinence(experience.id, {
                    name,
                    before_instruction: beforeInstruction,
                    after_instruction: afterInstruction,
                });
                setData(prev =>
                    prev.map(exp =>
                        exp.id === experience.id
                            ? { ...exp, name, before_instruction: beforeInstruction, after_instruction: afterInstruction }
                            : exp
                    )
                );
            } else {
                const newExp = await createExperinence({
                    name,
                    before_instruction: beforeInstruction,
                    after_instruction: afterInstruction,
                });
              
                setData(prev => [...prev, newExp]);

            }   
            setName('');
            setBeforeInstruction('');
            setAfterInstruction('');       
           setIsModalOpen(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex justify-end">
            <div className="fixed bottom-4 right-6  mt-4">

                <Button
                    name="Add Experience"
                    signal=" "
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            <CreateAcountModalDynmic
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setName('');
                    setBeforeInstruction('');
                    setAfterInstruction('');
                }
                }
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={experience ? "Edit Experience" : "Add Experience"}
                formFields={formFields}
                submitButtonText={isSubmitting ? "Adding..." : experience ? "Update Experience" : "Add"}
                submitButtonVariant="primary"
            />
        </div>
    )
}
export default ExperinenceForm;













