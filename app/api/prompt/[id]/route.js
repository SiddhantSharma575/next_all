import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database.js"
// GET 
export const GET = async(request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if(!prompt) {
            return new Response("Prompts not found", {
                status : 404
            })
        }
        return new Response(JSON.stringify(prompt), {
            status : 200
        })    
    } catch (error) {
    return new Response("Failed to fetch all prompts", {
        status : 500
    })
    }
}


// Patch (UPDATE)
export const PATCH = async (request, {params}) => {
    const {prompt,tag} = await request.json();
    try {
        await connectToDB();
        const existingPrompts = await Prompt.findById(
            params.id
        );
        if(!existingPrompts) {
            return new Response("Prompts not found", {
                status : 404
            })
        }
        existingPrompts.prompt = prompt;
        existingPrompts.tag = tag;
        await existingPrompts.save()
        return new Response(JSON.stringify(existingPrompts), {
            status : 200
        })
    } catch (error) {
        return new Response("Failed to update the prompts", {
            status : 500
        })
    }
}

// DELETE (DELETE)
export const DELETE = async (request,{params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompts deleted successfully", {
            status : 200
        })
    } catch (error) {
        return new Response("Failed to delete prompts", {
            status : 500
        })
    }
}