# Gay3-Vomit-Bot

### What does it do?

This script will let you login to Telegram using a NodeJS client and whenever Gay3 posts a new message in her cringy little channel, it will react with a vomit emoji 🤮 immediately. So make sure you join the channel first.

### Prerequisites 
1. Node JS >= 12.2 < 17
2. IQ >= average
### How to use 
1. Get your Telegram API ID and API Hash. In order to obtain an API id and develop your own application using the Telegram API you need to do the following:
   - Sign up for Telegram using any application.
   - Log in to your Telegram core: https://my.telegram.org 
   - Go to "API development tools" and fill out the form. 
   - You will get basic addresses as well as the api_id and api_hash parameters required for user authorization. 
   - For the moment each number can only have one api_id connected to it.
2. Export the API ID & HASH as environment variables `API_ID` & `API_HASH`  
   ```
    export API_ID=xyz
    export API_HASH=abcdefgh
   ```
3. Run the following commands to get it running
   ```
   git clone https://path/to/repo gay3-vomit-bot && cd gay3-vomit-bot
   yarn install
   yarn start
   ```
4. It will prompt for your phone, login code and password (if enabled).
5. To keep it running in background use `screen` on Mac & Linux

### OMG!! I DON'T WANT TO GIVE OUT MY LOGIN CREDENTIALS. WHAT IF YOU HACK ME!!??

You can literally read what the bot does in the source files (`src/index.ts`) and see that it's safe. 

>But I don't know what the file means, I am not a coder?

Firstly, why are you alive? Secondly, get it peer reviewed by folks in channel who aren't as dumb as you. 
