import { getTask, delTask, putTask } from "pages/api/services/taskServices";

export default async function task(req, res) {
    const {
        method,
        body,
        query: { id },
    } = req;

    switch (method) {
        case "GET":
            await getTask(res, id);
            break;

        case "PUT":
            await putTask(res, body, id);
            break;

        case "DELETE":
            await delTask(res, id);
            break;

        default:
            return res.status(400).json({ data: "VERIFIQUE LA RUTA" });
    }
}
