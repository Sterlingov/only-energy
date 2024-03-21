import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.types import Message

from config_reader import config
from database import Database

channel = config.channel_id
dp = Dispatcher()
db = Database()
bot = Bot(config.bot_token.get_secret_value())


@dp.channel_post(lambda p: p.chat.id == channel and p.photo)
async def main_post_handler(message: Message) -> None:
    post = message.caption.split('\n')
    path_to_image = '../images/' + message.photo[-1].file_unique_id + '.jpg'
    await message.bot.download(message.photo[-1].file_id, destination=path_to_image)
    name = post[0]
    desc = post[1]
    price = int(''.join([i for i in post[-1] if i.isnumeric()]))
    mark = 0
    for i in post[-2]:
        if i.isnumeric():
            mark = int(i)
            break
    await db.create_post(name, desc, price, mark, message.photo[-1].file_unique_id + '.jpg')


async def main() -> None:
    await bot.delete_webhook(drop_pending_updates=True)
    await db.create_pool('localhost', 5432, 'postgres', 'postgres', config.postgres_password.get_secret_value())
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
