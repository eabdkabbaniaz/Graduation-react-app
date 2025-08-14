export const getExamFormFields = (object, setObject, subjects = []) => [
    {
      label: "name",
      value: object.name,
      onChange: (e) => setObject({ ...object, name: e.target.value }),
      required: true,
    },
    {
      label: "number of questions",
      type: "number",
      min: "1",
      value: object.number_of_questions,
      onChange: (e) => setObject({ ...object, number_of_questions: e.target.value }),
      required: true,
    },
    {
      label: "final grade",
      type: "number",
      value: object.Final_grade,
      onChange: (e) => setObject({ ...object, Final_grade: e.target.value }),
      required: true,
    },
    {
      label: "start date",
      type: "date",
      value: object.Start_date,
      onChange: (e) => setObject({ ...object, Start_date: e.target.value }),
      required: true,
    },
    {
      label: "end date",
      type: "date",
      value: object.End_date,
      onChange: (e) => setObject({ ...object, End_date: e.target.value }),
      required: true,
    },
    {
      label: "subjects",
      type: "checkbox-group",
      value: object.subject_id || [],
      required: true,
      onChange: (val) => {
        const exists = object.subject_id?.includes(val);
        let newSubjects;
        if (exists) {
          newSubjects = object.subject_id.filter((id) => id !== val);
        } else {
          newSubjects = [...(object.subject_id || []), val];
        }
        setObject({ ...object, subject_id: newSubjects });
      },
      options: Array.isArray(subjects)
        ? subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
          }))
        : [],
    },
    {
      label: "period (per min)",
      type: "number",
      value: object.time,
      onChange: (e) => setObject({ ...object, time: e.target.value }),
      required: true,
    },
  ];
