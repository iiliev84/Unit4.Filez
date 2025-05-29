import express from "express";
const router = express.Router();
export default router;
import { getFolders, getFolderByIdIncludingFiles } from "#db/queries/folders";
import { createFiles } from "#db/queries/files";

router.route("/").get(async (req, res) => {
    const folders = await getFolders();
    res.send(folders);
});

router.param("id", async (req, res, next, id) => {
    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder) 
        return res.status(404).send("Folder doesn't exist.");
    req.folder = folder;
    next();
});

router.route("/:id").get(async(req, res) => {
    res.send(req.folder);
});

router.route("/:id/files").post(async (req, res) => {
    if (!req.body) 
        return res.status(400).send("Request body is not provided.");

    const { name, size } = req.body;
    if (!name || !size)
        return res.status(400).send("Request body is missing required fields.");

    const file = await createFiles(name, size, req.folder.id);
    res.status(201).send(file);
});