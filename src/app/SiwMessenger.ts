import { Observable, Observer } from "./core/interfaces";
import { Logger } from "./utils/Logger";
import { WebSocketClient } from "./websocket/WebSocketClient";

export class SiwMessenger implements Observable {
	private static _instance: SiwMessenger = new SiwMessenger();

	private wrappedWebSocketClient: WebSocketClient;
	private wrappedErrors: string[] = [];
	private observers: Observer[] = [];
	

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

	attach(observer: Observer): void {
		const includes = this.observers.includes(observer);
		if (includes) {
			Logger.debug("SiwMessenger: Observer already attached.");
			return;
		}

		Logger.debug("SiwMessenger: Attached an observer.");
		this.observers.push(observer);
	}

	detach(observer: Observer): void {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return;
		}

		this.observers.splice(observerIndex, 1);
		Logger.debug("SiwMessenger: Detached an observer.");
	}

	notify(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}

	set errors(err: string[]) {
		this.wrappedErrors = err;
		this.notify();
	} 

	get errors(): string[] {
		return this.wrappedErrors;
	}

	get webSocketClient(): WebSocketClient {
		return this.wrappedWebSocketClient;
	}
}
