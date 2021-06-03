export type ChatBubble = {
	id: number;
	text: string;
	sendDate: string;
    from?: string,
	isRight?: boolean;
    isGroupMessage?: boolean
};

export class Chat {
    private wrappedId: number;
    private wrappedName: string;
    private wrappedIsGroup: boolean;
    private wrappedOwnerName: string;

    private wrappedConversation: ChatBubble[] = [];
    private wrappedNotification: number = 0;

    private lastId: number;

    constructor(id: number, name: string, isGroup: boolean = false, ownerName: string = "") {
        this.wrappedId = id;
        this.wrappedName = name;
        this.wrappedIsGroup = isGroup;
        this.wrappedOwnerName = ownerName;
        this.lastId = 0;
    }

    addMessage(text: string, sendDate: string, from: string = "", recieved: boolean = false): void {

        text = this.applyTextReplacements(text);
        this.wrappedConversation.push({
            id: ++this.lastId,
            from: from,
            text: text,
            sendDate: sendDate,
            isRight: !recieved,
            isGroupMessage: this.isGroup
        });
    }

    private applyTextReplacements(text: string): string {
        const map = {
            ">:(": "😡",
            ":)":  "🙂",
            ":(":  "🙁",
            "(:":  "🙃",
            ":D":  "😀",
            "=D":  "😃",
            "^_^": "😄",
            ">.<": "😆",
            ":P":  "😋",
            ":O":  "😮",
            "D:":  "😦",
            ":|":  "😐",
            "<3":  "❤️",
            ";)":  "😉",
            ";(":  "😢"
        };
        
        for (const [key, value] of Object.entries(map)) {
            text = text.replace(key, value);
        }

        return text;
    }

    addNotification(): void {
        this.wrappedNotification++;
    }

    resetNotifications(): void {
        this.wrappedNotification = 0;
    }

    get id() {
        return this.wrappedId;
    }

    get name() {
        return this.wrappedName;
    }

    get isGroup() {
        return this.wrappedIsGroup;
    }

    get ownerName() {
        return this.wrappedOwnerName;
    }

    get notifications() {
        return this.wrappedNotification;
    }

    get conversation() {
        return this.wrappedConversation;
    }
}