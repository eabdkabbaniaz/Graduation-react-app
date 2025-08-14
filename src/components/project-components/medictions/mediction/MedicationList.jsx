import {Card,CardHeader,CardContent,CardMedia,CardActions,Avatar,IconButton,Button as MUIButton} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useState , useEffect } from "react";
import DeleteModal from "../../../ui-components/DeleteModal";
import { addMediction, deleteMediction, editMediction } from "../../../../api/medications";
import FlexButton from "../../../ui-components/FlexButton";
import CreateAcountModalDynmic from "../../../ui-components/CreateAcountModalDynmic";
import { getMedictionFormFields } from "../../../../formFields/medictionFormFields";
import heart from "../../../../assets/heart.png"
import intestine from "../../../../assets/intestine.png"

export default function MedicationList({productsList, setProductsList, isSubmitting, setIsSubmitting, systemsList, effectsList}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [add, setAdd] = useState(false);
    const [medName, setMedName] = useState("");
    const [medID, setMedID] = useState("");

    const [object, setObject] = useState({ 
      name: "", 
      generic_name: "",
      description: "", 
      usage: "",
      side_effects: "",
      dosage: "",
      system_id: "",
      effect_id: "",
    });

    const handleDelete = () => {
      if (medID) {
          deleteMediction(medID)
              .then(() => {
                  setProductsList(prev => prev.filter(s => s.id !== medID));
                  setShowDeleteModal(false);
              })
              .catch(err => {
                  console.log("حدث خطأ:", err);
              });
      }
  };

  const onEdit = (obj) => {
    setMedID(obj.id)
    setObject({
        ...object,
        name: obj.name, 
        generic_name: obj.generic_name,
        description: obj.description, 
        usage: obj.usage,
        side_effects: obj.side_effects,
        dosage: obj.dosage,
        system_id: obj.system.id,
        effect_id: obj.effect.id,  
    });
    setShowModal(true)
}

const handleSubmit = async (e, isAdd) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        if(isAdd){
            await addMediction(object);
        }else{
            await editMediction(medID, object);
        }
        setObject({
          name: "", 
          generic_name: "",
          description: "", 
          usage: "",
          side_effects: "",
          dosage: "",
          system_id: "",
          effect_id: "", 
      })
        setShowModal(false);
    } catch (err) {
        console.log(" An error occurred during submission");
    } finally {
        setIsSubmitting(false);
    }
};

const formFields = getMedictionFormFields(object, setObject, systemsList, effectsList);

    return (
        <>
        {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)} 
                title="Delete Mediction"
                message={`do you want to delete ${medName} `}
                onClick={handleDelete}
                // title={authLang[langs[lang]].deleteUniversity}
                // message={authLang[langs[lang]].targetNameDel('"name"',authLang[langs[lang]].University)}
                />}

        {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setObject({
                        name: "", 
                        generic_name: "",
                        description: "", 
                        usage: "",
                        side_effects: "",
                        dosage: "",
                        system_id: "",
                        effect_id: "", 
                    })
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e,true) : (e) => handleSubmit(e,false)}
                isSubmitting={isSubmitting}
                modalTitle={add ? "Add Mediction" :`Edit Mediction`}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                size="h-[600px] overflow-y-scroll"
            />}


      {productsList?.length === 0 ? (
        <p className="text-center my-52 text-lg text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {productsList?.map((product) => (
            <Card
              key={product.id}
              sx={{ borderRadius: "1rem", display: 'flex', flexDirection: 'column', height: '100%' }}
              className="shadow-md hover:shadow-lg transition-shadow dark:bg-gray-700 dark:text-gray-100"
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {product.effect.name}
                  </Avatar>
                }
                action={
                  <IconButton onClick={() => {
                    setShowDeleteModal(true)
                    setMedID(product.id)
                    setMedName(product.name)
                    }} className="dark:text-gray-100">
                      <span className="text-[20px] mr-[200px]">{product.system?.name}</span>
                    <DeleteIcon  />
                  </IconButton>
                }
                title={product.name}
                subheader={product.generic_name}
              />

              <CardMedia
                component="img"
                image={product.system?.name.startsWith("قلب") ? heart : intestine}
                alt={product.system?.name}
                sx={{
                  height: '200px',
                  objectFit: 'fill',
                }}              
                />

              <CardContent sx={{ flexGrow: 1 }}>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">side effects: </span> 
                {product.side_effects}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">usage: </span> 
                 {product.usage} 
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">dosage: </span> 
                {product.dosage}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">Info: </span> 
                {product.description}
                </p>
              </CardContent>

              <CardActions className="pb-4 px-4">
                <MUIButton
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: "capitalize", borderRadius: "50px", py: 1.5 }}
                  onClick={() => onEdit(product)}
                >
                Edit
                </MUIButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      <FlexButton 
                // label={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Exam} 
                label="Add Mediction"
                signal="+"
                onClick={() => {
                    setShowModal(true)
                    setAdd(true)
                }}
            />
      </>
    )
}