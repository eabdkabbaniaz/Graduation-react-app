export const getMedictionFormFields = (object, setObject, systems = [], effects = []) => [
    {
      label: "name",
      value: object.name,
      onChange: (e) => setObject({ ...object, name: e.target.value }),
      required: true,
    },
    {
      label: "generic name",
      value: object.generic_name,
      onChange: (e) => setObject({ ...object, generic_name: e.target.value }),
      required: true,
    },
    {
        label: "description",
        value: object.description,
        onChange: (e) => setObject({ ...object, description: e.target.value }),
        required: true,
    },
    {
        label: "usage",
        value: object.usage,
        onChange: (e) => setObject({ ...object, usage: e.target.value }),
        required: true,
    },
    {
        label: "side_effects",
        value: object.side_effects,
        onChange: (e) => setObject({ ...object, side_effects: e.target.value }),
        required: true,
    },
    {
        label: "dosage",
        value: object.dosage,
        onChange: (e) => setObject({ ...object, dosage: e.target.value }),
        required: true,
    },
    {
      label: "systems",
      type: "select",
      value: object.system_id,
      required: true,
      onChange: (e) => {
        setObject({ ...object, system_id: e.target.value });
      },
     options: [
      { value: "", label: "choose system" },
      ...(
        Array.isArray(systems)
          ? systems.map((system) => ({
              value: system.id,
              label: system.name,
            }))
          : []
        )
    ]
    },
    {
        label: "effects",
        type: "select",
        value: object.effect_id,
        required: true,
        onChange: (e) => {
          setObject({ ...object, effect_id: e.target.value });
        },
        options: [
            { value: "", label: "choose effect" },
            ...(
              Array.isArray(effects)
                ? effects.map((effect) => ({
                    value: effect.id,
                    label: effect.name,
                  }))
                : []
              )
          ]
      },
  ];
