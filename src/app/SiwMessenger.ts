import { WebSocketClient } from "./websocket/WebSocketClient";

export class SiwMessenger {
	private static _instance: SiwMessenger = new SiwMessenger();

	private wrappedWebSocketClient: WebSocketClient;

	private constructor() {
		this.wrappedWebSocketClient = new WebSocketClient();
	}

	/**
	 * The static method that controls the access to the singleton instance.
	 * @returns The singleton instace of SiwMessenger
	 */
	static get instance(): SiwMessenger {
		return SiwMessenger._instance;
	}

	get webSocketClient(): WebSocketClient {
		return this.wrappedWebSocketClient;
	}
}
