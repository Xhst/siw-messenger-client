import { IPublishParams, StompHeaders } from "@stomp/stompjs";
import { SiwMessenger } from "@/app/SiwMessenger";

export abstract class RequestPacket implements IPublishParams {
	protected readonly siwMessenger: SiwMessenger;

	destination: string;
	body: any;
	headers: StompHeaders | undefined;

	constructor(destination: string, body?: any, headers?: StompHeaders) {
		this.siwMessenger = SiwMessenger.instance;

		this.destination = destination;
		this.body = JSON.stringify(body);
		this.headers = headers;
	}

	send() {
		this.siwMessenger.webSocketClient.send(this);
	}
}

export class ChatMessage extends RequestPacket {
	constructor(to: number, message: string) {
		super("/app/chat_message", {
			toChat: to,
			message: message,
		});
	}
}

export class GetAllChatsRequest extends RequestPacket {
	constructor() {
		super("/app/get_chats", {});
	}
}

export class AddPrivateChatRequest extends RequestPacket {
	constructor(username: string) {
		super("/app/add_private_chat", {
			username: username,
		});
	}
}

export class AddGroupChatRequest extends RequestPacket {
	constructor(groupName: string, usernames: Set<string>) {
		super("/app/add_group_chat", {
			groupName: groupName,
			usernames: Array.from(usernames),
		});
	}
}
