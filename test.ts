import { Fudball } from "./source/client"

const client = new Fudball()
const slug = "nightthefox";

(async () =>
{
    console.info(await client.getChatroom(slug))
})()