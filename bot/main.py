import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher, Router, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.utils.markdown import hbold

from config_reader import config

dp = Dispatcher()
channel = config.channel_id


@dp.channel_post(lambda p: p.chat.id == channel and p.photo)
async def main_post_handler(message: Message) -> None:
    print(message.caption)


async def main() -> None:
    bot = Bot(config.bot_token.get_secret_value())
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
