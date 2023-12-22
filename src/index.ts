import makeWASocket, {useMultiFileAuthState,downloadMediaMessage} from "@whiskeysockets/baileys";
import * as fs from 'fs'
import { writeFile } from 'fs/promises'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'


const Connect = async () => {  
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
    const conn = makeWASocket({ auth: state,
        printQRInTerminal:true
    });
    conn.ev.on("creds.update", saveCreds);

    
    conn.ev.on("messages.upsert", async ({ messages }) => {
        
        
        const id = messages[0].key.remoteJid
        const m = messages[0]

        if(!m.message) return
        const field = Object(messages[0].message).conversation
        if (field.includes('.menu')){
            await conn.sendMessage(String(id),{
                text:"Selamat Datang Di Bot Yohanes"
            })
        }

        const messageType = Object.keys(Object(m.message))[0]

        console.log(messageType)
        if (messageType == "imageMessage"){
            const buffer = await downloadMediaMessage(
                m,
                'buffer',
                { },
            )
            // save to file
            await writeFile(`./src/res/${id}_Image.jpeg`, buffer)

            const sticker = new Sticker(`./src/res/${id}_Image.jpeg`,{
                pack:"Hanz Bot Stiker",
                author:"YhanzC Bot"
            })

            const StikerBuffer = await sticker.toBuffer()
            await sticker.toFile(`./src/res/stiker.webp`)

            conn.sendMessage(String(id),await sticker.toMessage())
        }
      });

}

Connect()