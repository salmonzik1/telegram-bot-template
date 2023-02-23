<h1 align="center">Telegram Bot Template</h1>

This is bot starter template based on [grammY](https://grammy.dev/) bot framework and [mongoose](https://mongoosejs.com) ORM.

## Usage

Clone this repo

```bash
git clone https://github.com/fulltiltgg/telegram-bot-template
```

<details>
<summary>Launch</summary>

1.  Create environment variables file

```bash
cp .env.sample .env
```

2.  Edit [environment variables](#environment-variables-reference) in `.env`

3.  Launch bot

    ```bash
    # run bot
    deno task (dev|prod)
    ```

</details>

| Key | Value |
| --- | --- |
| DENO_ENV | Deno environment |
| LOG_LEVEL | Log level |                        
| DATABASE_URL | Database URL |                                                                                            
| BOT_SERVER_HOST | Server address |
| BOT_SERVER_PORT | Server port |
| BOT_ALLOWED_UPDATES | List of [update types](https://core.telegram.org/bots/api#update) to receive |
| BOT_TOKEN | Token, get it from [@BotFather](https://t.me/BotFather) |
| BOT_WEBHOOK | <details><summary>Webhook endpoint</summary>Used for setup a webhook in production mode.</details> |
| BOT_ADMIN_USER_ID | <details><summary>Administrator user ID</summary>Commands, such as `/stats` or `/setcommands`, will only be available to the user with this ID.</details> |
| --- | --- |