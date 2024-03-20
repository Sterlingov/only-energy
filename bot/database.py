import asyncpg


class Database:
    def __init__(self):
        self.pool = None

    async def create_pool(self, host, port, user, database, password):
        self.pool = await asyncpg.create_pool(host=host, port=port, user=user, database=database, password=password)

    async def create_post(self, name, desc, price, mark, img_path):
        async with self.pool.acquire() as conn:
            await conn.execute('''
                INSERT INTO posts(name, description, price, mark, image_path)
                VALUES($1, $2, $3, $4, $5)
            ''', name, desc, price, mark, img_path)
