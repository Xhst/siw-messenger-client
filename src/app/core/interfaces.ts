export interface Observer {
	update(subject: Observable): void;
}

export interface Observable {
	attach(observer: Observer): void;

	detach(observer: Observer): void;

	notify(): void;
}
