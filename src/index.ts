import "dotenv/config";
import express from 'express'
import { database } from "./db/db";
import { todoSchema } from "./db/schema";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    const test = await database.select().from(todoSchema)
    console.log(test);
})