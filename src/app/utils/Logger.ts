import Configuration from "../configuration/config.json";

export class Logger {
	static log(message: any, ...optionalParams: any[]): void {
		console.log(message, ...optionalParams);
	}

	static info(message: any, ...optionalParams: any[]): void {
		if (!Configuration.logger.info) return;

		console.info(
			"%c[INFO] %c" + message,
			"color: #1e90ff;",
			"color: #777;",
			...optionalParams
		);
	}

	static debug(message: any, ...optionalParams: any[]): void {
		if (!Configuration.logger.debug) return;

		Logger.log(
			"%c[DEBUG] %c" + message,
			"color: teal;",
			"color: #777;",
			...optionalParams
		);
	}

	static warning(message: any, ...optionalParams: any[]): void {
		if (!Configuration.logger.warn) return;

		console.warn(
			"%c[WARNING] %c" + message,
			"color: #ff6200;",
			"color: #777;",
			...optionalParams
		);
	}

	static error(message: any, ...optionalParams: any[]): void {
		if (!Configuration.logger.error) return;

		console.error(
			"%c[ERROR] %c" + message,
			"color: red;",
			"color: #777;",
			...optionalParams
		);
	}
}
