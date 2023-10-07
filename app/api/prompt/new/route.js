import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database.js";

export const POST = async (req,res) => {
    const {prompt, userId ,tag} = await req.json();
    try {
        await connectToDB()

        const newPrompt = new Prompt({
            creator : userId,
            tag: tag,
            prompt : prompt
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {
            status : 201
        })
    } catch (error) {
        return new Response("Failed to create a new prompt", {
            status : 500
        })
    }
}