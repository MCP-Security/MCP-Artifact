# agent.py with Telegram integration
import asyncio
import yaml
import logging
import signal
import sys
import platform
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, ContextTypes, filters
from core.loop import AgentLoop
from core.session import MultiMCP

# Configure basic logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Bot token from test.ipynb
BOT_TOKEN = "<ENTER YOUR BOT TOKEN HERE>"

# Global MultiMCP instance to reuse across requests
global_multi_mcp = None

# Event for handling shutdown
stop_event = asyncio.Event()

def log(stage: str, msg: str):
    """Simple timestamped console logger."""
    import datetime
    now = datetime.datetime.now().strftime("%H:%M:%S")
    logger.info(f"[{now}] [{stage}] {msg}")

async def process_query(user_input):
    # print("🧠 Cortex-R Agent Ready")
    # user_input = input("🧑 What do you want to solve today? → ")

    # Load MCP server configs from profiles.yaml
    with open("config/profiles.yaml", "r") as f:
        profile = yaml.safe_load(f)
        mcp_servers = profile.get("mcp_servers", [])

    multi_mcp = MultiMCP(server_configs=mcp_servers)
    print("Agent before initialize")
    await multi_mcp.initialize()

    agent = AgentLoop(
        user_input=user_input,
        dispatcher=multi_mcp  # now uses dynamic MultiMCP
    )

    try:
        final_response = await agent.run()
        return final_response.replace("FINAL_ANSWER:", "").strip().strip("[]")
    
    except Exception as e:
        log("fatal", f"Agent failed: {e}")
        raise


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a welcome message when the command /start is issued."""
    user = update.effective_user
    await update.message.reply_text(
        f"Hi {user.first_name}! I'm your AI assistant powered by Cortex-R. "
        f"Send me any question or task, and I'll help you solve it.\n\n"
        f"Your chat ID is: {update.effective_chat.id}"
    )
    # Don't log commands as regular messages for agent processing

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a help message when the command /help is issued."""
    await update.message.reply_text(
        "I can help you answer questions and complete tasks using various tools. "
        "Just send me your question or task, and I'll do my best to assist you."
    )
    # Don't log commands as regular messages for agent processing

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Process the user message using the agent system and respond."""
    # global global_multi_mcp
    
    # # Ensure MCP is initialized
    # if global_multi_mcp is None:
    #     global_multi_mcp = await initialize_mcp()
    
    user_message = update.message.text
    chat_id = update.effective_chat.id
    
    # Skip command messages - this is the important check we were missing!
    if user_message.startswith('/'):
        return
    
    # Send typing action to show the bot is processing
    await context.bot.send_chat_action(chat_id=chat_id, action="typing")
    
    # Log the incoming message
    log("user", f"[{chat_id}] {user_message}")
    
    # Let the user know we're processing
    processing_msg = await update.message.reply_text("Processing your request. This may take a moment...")
    
    # Process the query using our agent system
    response = await process_query(user_message)
    logger.info(f"Response: {response}")
    
    # Delete the processing message
    await processing_msg.delete()
    
    # Send the final response
    await update.message.reply_text(response)
    log("bot", f"[{chat_id}] Response sent")

def signal_handler():
    """Handle termination signals."""
    stop_event.set()
    logger.info("Shutdown signal received. Stopping bot...")

# Define a keyboard interrupt handler
def handle_keyboard_interrupt():
    logger.info("KeyboardInterrupt received. Stopping bot...")
    stop_event.set()

async def main():
    """Start the bot."""
    # Create the Application
    application = Application.builder().token(BOT_TOKEN).build()
    
    # # Initialize MCP system
    # global global_multi_mcp
    # global_multi_mcp = await initialize_mcp()
    
    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Set up signal handlers - with platform-specific approach
    # Signal handling on Windows is limited, so we'll use a different approach
    # We'll handle KeyboardInterrupt in the main loop instead of using signal handlers
    
    # Start the Bot
    logger.info("Starting bot")
    await application.initialize()
    await application.start()
    await application.updater.start_polling()
    
    # Run the bot until a stop event is received
    logger.info("Bot is running. Press Ctrl+C to stop.")
    try:
        # Wait for stop event or keyboard interrupt
        while not stop_event.is_set():
            try:
                await asyncio.sleep(1)
            except KeyboardInterrupt:
                handle_keyboard_interrupt()
                break
    finally:
        # Clean shutdown
        logger.info("Shutting down...")
        await application.stop()
        await application.shutdown()

if __name__ == "__main__":
    asyncio.run(main())

# Find the ASCII values of characters in INDIA and then return sum of exponentials of those values.
# How much Anmol singh paid for his DLF apartment via Capbridge? 
# What do you know about Don Tapscott and Anthony Williams?
# What is the relationship between Gensol and Go-Auto?
# which course are we teaching on Canvas LMS?
# Summarize this page: https://theschoolof.ai/
# What is the log value of the amount that Anmol singh paid for his DLF apartment via Capbridge?

# User messsage:
# Find the Current Point Standings of F1 Racers, then put that into a Google Excel Sheet, and then share the spreadsheet link with me (shettysaish20@gmail.com) with writer access. Reply with a completion message
# Can you add the sum of first 50 prime numbers and send the result to shettysaish20@gmail.com? Respond to me with a completion message.