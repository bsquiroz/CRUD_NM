import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
    const router = useRouter();

    if (tasks.length === 0)
        return (
            <div>
                <h2>Crea una tarea</h2>
                <button>Crea tu primera tarea</button>
            </div>
        );

    return (
        <>
            <h2>Hola mundo</h2>
            <div>
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        onClick={() => router.push(`/tasks/${task._id}`)}
                    >
                        <h5>{task.title}</h5>
                        <div>
                            <p>
                                <i>{task.describe}</i>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/tasks");
    const tasks = await res.json();

    return {
        props: {
            tasks,
        },
    };
};
