import { Client, Frame, StompHeaders } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Configuration from "@/app/configuration/config.json";
import { Logger } from "../utils/Logger";
import { RequestPacket } from "./OutgoingPackets";
import * as IncomingPacket from "./IncomingPackets";
import { Observer, Observable } from "../core/interfaces";

export class WebSocketClient implements Observable {
	private client: Client | undefined;

	private wrappedIsConnected = false;
	private observers: Observer[] = [];

	private token = '';


	private onConnect(frame: Frame): void {
		Logger.debug(frame);

		for (const packet of IncomingPacket.packetsToSubscribe()) {
			this.subscribe(packet);
		}

		this.isConnected = true;
	}

	public subscribe(packet: IncomingPacket.ResponsePacket): void {
		this.client?.subscribe(packet.destination, packet.callback, {
			"Authorization": this.token
		});
	}

	private onError(): void {
		Logger.error("Connection fail.");
		this.isConnected = false;
	}

	private getWebSocketUrl(): string {
		const serverConfig = Configuration.server;
		const protocol = serverConfig.ssl ? "https" : "http";

		return `${protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.channel}`;
	}

	connect(token: string): void {
		this.token = token;

		this.client = new Client({
			webSocketFactory: () => new SockJS(this.getWebSocketUrl()),
			connectHeaders: {"Authorization" : this.token},
		});

		this.client.onConnect = this.onConnect.bind(this);
		this.client.onStompError = this.onError;

		this.client.activate();

		let _this = this;
		window.onbeforeunload = function(e: Event) {
			_this.disconnect();

			e.preventDefault();
    		e.returnValue = false;

			return null;
		};
	}

	send(packet: RequestPacket): void {
		if (!this.client?.connected) return;

		this.client.publish({
			destination: packet.destination,
			body: packet.body,
			headers: {"Authorization": this.token}
		});
	}

	disconnect(): void {
		this.client?.deactivate();
		this.isConnected = false;
	}

	attach(observer: Observer): void {
		const includes = this.observers.includes(observer);
		if (includes) {
			Logger.debug("WebSocketClient: Observer already attached.");
			return;
		}

		Logger.debug("WebSocketClient: Attached an observer.");
		this.observers.push(observer);
	}

	detach(observer: Observer): void {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return;
		}

		this.observers.splice(observerIndex, 1);
		Logger.debug("WebSocketClient: Detached an observer.");
	}

	notify(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}

	get isConnected(): boolean {
		return this.wrappedIsConnected;
	}

	set isConnected(value: boolean) {
		this.wrappedIsConnected = value;
		this.notify();
	}
}
