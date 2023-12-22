import { downloadMediaMessage } from '@whiskeysockets/baileys'
import { writeFile } from 'fs/promises'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'

const CreateSticker = async(m:any) => {
    console.log("Mengaktifkan Pembuat Stiker ...")
    const id = m.key.remoteJid
    const buffer = await downloadMediaMessage(
        m,
        'buffer',
        {},
    )
    const file = "./src/res/Buffer.jpeg"
    // save to file
    await writeFile(file, buffer)

    const sticker = new Sticker(file,{
        pack:"Umume Stiker",
        author:"Bot Yohanes"
    })
    const StikerBuffer = await sticker.toBuffer()
    await sticker.toFile(`./src/res/stiker.webp`)

    return (sticker.toMessage())
}
export default CreateSticker