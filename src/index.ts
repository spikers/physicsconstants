import * as Alexa from "alexa-sdk";

let handlers: Alexa.Handlers = {
  "HelloIntent": function () {
    let self: Alexa.Handler = this;
    let intentRequest = <Alexa.IntentRequest> self.event.request;
    let value = intentRequest.intent.slots.Word.value;
    let speechOutput = "";
    if (value.toLowerCase() == "Hello") {
      speechOutput = "The translation is hola";
    } else {
      speechOutput = "I didn't understand the world";
    }
    self.emit(":tellWithCard", speechOutput, "Hello Translated", speechOutput);
  }
}

export class Handler {
  constructor(event: Alexa.RequestBody, context: Alexa.Context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "my_alexa_id";
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}