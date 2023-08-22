import { Client } from "../../../client";
import { GamePacket } from "../../packet";
import { NameQuery } from "../../query/name";
import { WorldServer } from "../../worldserver";
import { ChannelMessage } from "../channel";
import { Message } from "../message";
import { SayMessage } from "../say";
import { SystemMessage } from "../system";
import { WhisperMessage } from "../whisper";
import { YellMessage } from "../yell";


const MESSAGE_TYPES = [
    SystemMessage,
    WhisperMessage,
    ChannelMessage,
    SayMessage,
    YellMessage,
];


export class MessageParser {
    constructor(public world: WorldServer) {
    }

    async fromPacket(
        gp: GamePacket,
        isGm: boolean = false
    ): Promise<Message | undefined> {
        var type = gp.readUInt8(); // type
        const lang = gp.readUInt32LE(); // language
        const guid = gp.readGUID();
        const unk1 = gp.readUInt32LE();

        let senderName = "";
        if (isGm) {
            const nameLen = gp.readUInt32LE();
            senderName = gp.readBytes(nameLen).toString();
        } else {
            senderName = await new NameQuery(this.world).send(guid.toNumber());
        }

        let message: Message | undefined;
        for (let msgType of MESSAGE_TYPES) {
            if (type === msgType.type) {
                message = await msgType.fromPacket(gp);
            }
        }
        if (!message) {
            message = await Message.fromPacket(gp);
        }
        if (!message) {
            return message;
        }
        message.language = lang;
        message.sender = guid;
        message.senderName = senderName;
        message.isGm = isGm;
        return message;
    }
}
