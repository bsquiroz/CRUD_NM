import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const initialState = {
    title: "",
    describe: "",
};

export default function NewTaskPage() {
    const [stateErrors, setStateErrors] = useState(null);
    const [values, setValues] = useState(initialState);
    const { title, describe } = values;

    const { query, push } = useRouter();

    const handleInputs = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    const getTask = async () => {
        const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
        const data = await res.json();
        setValues({ title: data.title, describe: data.describe });
    };

    useEffect(() => {
        if (query.id) getTask();
    }, []);

    const validate = () => {
        let errors = {};

        if (!title) {
            errors.title = "Title is required";
        }
        if (!describe) {
            errors.describe = "Description is required";
        }

        return errors;
    };

    const createTask = async () => {
        try {
            await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async () => {
        try {
            await fetch("http://localhost:3000/api/tasks/" + query.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = validate();

        if (Object.keys(errors).length) return setStateErrors(errors);

        if (query.id) {
            setStateErrors(null);
            alert("Todo ok, enviando");
            await updateTask();
            setValues(initialState);
        } else {
            setStateErrors(null);
            alert("Todo ok, enviando");
            await createTask();
            setValues(initialState);
        }

        await push("/");
    };

    return (
        <>
            <h2>
                {" "}
                {query.id
                    ? "Modificando una tarea"
                    : "Creando una nueva tarea"}{" "}
            </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titulo
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleInputs}
                    />
                </label>
                <br />
                {stateErrors && <p>{stateErrors.title}</p>}
                <label>
                    descripción
                    <input
                        type="text"
                        value={describe}
                        name="describe"
                        onChange={handleInputs}
                    />
                </label>
                {stateErrors && <p>{stateErrors.describe}</p>}
                <br />
                <button> {query.id ? "Modificar" : "Crear"} </button>
            </form>
        </>
    );
}
