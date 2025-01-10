import cors from "cors";
import express from "express";

const PORT = 3000;
export const MESSAGE_PATH = "/message";

export function launchApi(){
    const api = express();
    api.use(express.json());
    //Middleware to accept different requests from different origins. E.g. Frontend/Backend hosted on different servers
    api.use(cors());

    api.listen(PORT, () => console.log(`⚡ Express is up on port ${PORT}`));

    return api;
}