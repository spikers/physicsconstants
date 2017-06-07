exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log('New Request');
    }

    switch (event.request.type) {
      case "LaunchRequest":
        console.log('LAUNCH REQUEST');
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an Alexa Skill, Running on server", true)
          )
        );
        break;
      case "IntentRequest":
        console.log('Intent Request');
        if (event.request.intent.name == "HelloIntent") {
          buildSpeechletResponse("6.022 times 10 to the 23rd");
        }
        break;
      case "SessionEndedRequest":
        console.log('Session Ended Request');
        break;
      default:
        context.fail('Invalid Request Type: ' + event.request.type);
    }
  } catch (error) { context.fail(`exception: ${error}`) }


}

buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

generateResponse = (sessionAttributes, speechletResponse) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,

  }
}