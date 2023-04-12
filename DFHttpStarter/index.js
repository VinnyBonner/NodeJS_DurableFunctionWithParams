const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);

    // req.body = @param input JSON-serializable input value for the orchestrator function.
    // The params are passed into the httpTrigger function in the body as an array 
    // ["Tokyo", "Paris", "Seattle"]
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
