import { messageCallbackType } from "@stomp/stompjs";

export class ResponsePacket {
	destination: string;
	callback: messageCallbackType;

	constructor(destination: string, callback: messageCallbackType) {
		this.destination = destination;
		this.callback = callback;
	}
}

export function packetsToSubscribe(): ResponsePacket[] {
	const packets = [
		new ResponsePacket("/topic/greetings", (message) =>
			console.log(JSON.parse(message.body).content)
		),
		new ResponsePacket("/user/queue/test", (message) =>
			console.log(JSON.parse(message.body).content)
		),
		new ResponsePacket("/users/queue/errors", (message) =>
			console.log(JSON.parse(message.body))
		),
		new ResponsePacket("/users/queue/info", (message) =>
			console.log(JSON.parse(message.body).username)
		),
		new ResponsePacket("/topic/info", (message) =>
			console.log(JSON.parse(message.body).username)
		)
	];

	return packets;
}


export class MessageRecieved extends ResponsePacket {
	constructor(callback: messageCallbackType) {
		super(`/user/queue/message`, callback);
	}
}

export class AllChatsResponse extends ResponsePacket {	
	constructor(callback: messageCallbackType) {
		super(`/user/queue/chats`, callback);
	}
}

export class AddChatResponse extends ResponsePacket {	
	constructor(callback: messageCallbackType) {
		super(`/user/queue/add_chat`, callback);
	}
}
