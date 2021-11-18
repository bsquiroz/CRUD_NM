import { dbConnect } from "utils/db";
import Task from "models/Task";

dbConnect();

export const getTasks = async (res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getTask = async (res, id) => {
    try {
        const uniqueTask = await Task.findById(id);

        if (!uniqueTask)
            return res
                .status(404)
                .json({ error: "La tarea no fue encontrada" });

        return res.status(200).json(uniqueTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const potsTask = async (res, body) => {
    try {
        const { title, describe } = body;
        const newTask = await Task({ title, describe });
        const saveTask = await newTask.save();
        return res.status(201).json(saveTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const putTask = async (res, body, id) => {
    try {
        const { title, describe } = body;
        const obj = {
            title,
            describe,
        };

        const updateTask = await Task.findByIdAndUpdate(id, obj, {
            new: true,
        });

        if (!updateTask)
            return res.status(404).json({ message: "tarea no encontrada" });

        return res.status(200).json(updateTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const delTask = async (res, id) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(id);

        if (!deleteTask)
            return res
                .status(404)
                .json({ error: "La tarea no fue encontrada" });

        return res.status(200).json(deleteTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
