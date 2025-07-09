import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import search from "./search.png";
import { getEffects, getMedications, getSystems } from "../../../../api/medications";
import QuotationStepper from "../QuotationStepper";
import MedicationList from "./MedicationList";
import SystemTable from "../system/SystemTable";
import EffectTable from "../effect/EffectTable";


export default function MedictionTable() {
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [systemsList, setSystemsList] = useState([]);
  const [effectsList, setEffectsList] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [filter, setFilter] = useState({ id: 0, name: "all" });
  const [loading, setLoading] = useState(false);

  const [isWaiting, setIsWaiting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getData = async () => {
        try {
            setIsWaiting(true);
            const data = await getMedications();
            const dataSystem = await getSystems();
            const dataEffect = await getEffects();
            setProductsList(data);
            setSystemsList(dataSystem);
            setEffectsList(dataEffect);
        } catch (error) {
            console.log("An error occurred while loading the data😥");
        } finally {
            setIsWaiting(false);
        }
    };
    getData();
}, [isSubmitting === false]);


  const handleShowAll = (id, name) => {
    setFilter({ id, name });
  };


  return (
    <div className="p-8 h-full flex flex-col gap-6 dark:bg-gray-900">
      <section className="flex flex-wrap items-center gap-4">
       
       <QuotationStepper current={current} setCurrent={setCurrent} />

        <div className="relative">
          <input
            id="filter-toggle"
            type="checkbox"
            className="peer hidden"
            onChange={() => setShowOption((prev) => !prev)}
          />
          <label 
            htmlFor="filter-toggle"
            className="cursor-pointer select-none px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
          >
            Filter
          </label>

          {/* قائمة الفئات */}
          {showOption && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 p-4 space-y-3">
              <Link
                to="/addProduct"
                className="block text-indigo-600 hover:underline font-medium"
              >
                Add new product →
              </Link>

              {categoryList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleShowAll(category.id, category.category_name)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition
                    ${category.id === filter.id ? "bg-gray-100 dark:bg-gray-700 font-semibold scale-105" : ""}
                  `}
                >
                  <span className="text-left dark:text-gray-200">
                    {category.category_name}
                  </span>
                  <img
                    src={`${url}${category.category_path}`}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {current === 0 ? <MedicationList productsList={productsList} setProductsList={setProductsList} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} systemsList={systemsList} effectsList={effectsList}/> : ""}
      {current === 1 ? <SystemTable systemsList={systemsList} setSystemsList={setSystemsList} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} /> : ""}
      {current === 2 ? <EffectTable effectsList={effectsList} setEffectsList={setEffectsList} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} /> : ""}

     
    </div>
  );
}
