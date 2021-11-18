import React from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default function DetailsTask({ task, error }) {
    if (error) {
        const { statusCode, statusText } = error;
        return <Error statusCode={statusCode} title={statusText} />;
    }

    const { _id, title, describe } = task;
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const URL = `http://localhost:3000/api/tasks/${_id}`;
            await fetch(URL, {
                method: "DELETE",
            });
            await router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <hr />
            <h2>Detalles de la tarea</h2>
            <div>
                <h5>{title}</h5>
                <div>
                    <p>
                        <i>{describe}</i>
                    </p>
                    <button onClick={handleDelete}>Eliminar</button>
                    <button onClick={() => router.push(`/tasks/${_id}/edit`)}>
                        modificar
                    </button>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const {
        params: { id },
    } = context;

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (res.status === 200) {
        const task = await res.json();

        return {
            props: { task },
        };
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "tarea invalida",
            },
        },
    };
};
