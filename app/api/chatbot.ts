import Replicate from "replicate";

export default async function handler(req, res) {
    const prompt = req.body.prompt;
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // Your code
        const output = await replicate.run(
            "stability-ai/sdxl:2a865c9a94c9992b6689365b75db2d678d5022505ed3f63a5f53929a31a46947",
            {
                input: {
                    prompt: prompt,
                    number_outputs: 2,
                },
            }
        );

        // const prediction = await replicate.predictions.create({
        //     version:
        //         "2a865c9a94c9992b6689365b75db2d678d5022505ed3f63a5f53929a31a46947",
        //     input: {
        //         prompt: prompt,
        //         number_outputs: 2,
        //     },
        //     webhook: "https://example.com/your-webhook",
        //     webhook_events_filter: ["completed"],
        // });

        // res.status(200).json({ output, prediction });
        res.status(200).json({ output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}
