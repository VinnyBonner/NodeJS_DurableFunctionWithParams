const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];

    // Get the input from the context
    params = context.df.getInput();

    // pass in the params to the activity
    outputs.push(yield context.df.callActivity("DFActivity", params[0]));
    outputs.push(yield context.df.callActivity("DFActivity", params[1]));
    outputs.push(yield context.df.callActivity("DFActivity", params[2]));

    // returns ["Hello Tokyo!", "Hello Paris!", "Hello Seattle!"]
    return outputs;
});
