export const getNameFormFields = (name, setName) => [
    {
        label: "name",
        value: name,
        onChange: (e) => setName(e.target.value ),
        required: true,
    },
  ];
  