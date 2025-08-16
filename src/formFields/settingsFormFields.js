export const getSettingsFormFields = (object, setObject, options = []) => [
    {
        label: "name",
        value: object.name,
        onChange: (e) => {
          setObject({ ...object, name: e.target.value });
        },        
        required: true,
    },
    {
        label: "calculation method",
        type: "select",
        value: object.calculation_method,
        required: true,
        onChange: (e) => {
          setObject({ ...object, calculation_method: e.target.value });
        },
        options: Array.isArray(options)
          ? options.map((opt) => ({
              value: opt.name,
              label: opt.name,
            }))
          : [],
      },
      {
        label: "final mark",
        type: "number",
        value: object.final_mark,
        onChange: (e) => setObject({ ...object, final_mark: e.target.value }),
        required: true,
      },
  ];
  