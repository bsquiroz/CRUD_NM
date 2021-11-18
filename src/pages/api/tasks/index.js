import { getTasks, potsTask } from "pages/api/services/taskServices";

export default async function tasks(req, res) {
    const { method, body } = req;

    switch (method) {
        case "GET":
            await getTasks(res);
            break;

        case "POST":
            await potsTask(res, body);
            break;

        default:
            return res.status(400).json({ data: "todo muy mal" });
    }
}
