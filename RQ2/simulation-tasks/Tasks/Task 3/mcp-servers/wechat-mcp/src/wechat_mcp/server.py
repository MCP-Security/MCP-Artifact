import subprocess
from datetime import datetime
import os
import time
import anyio
import click
import httpx
import mcp.types as types
from mcp.server.lowlevel import Server
from mcp.server.fastmcp import FastMCP
from pywxdump import *
import requests
import wxauto
from pywxdump.api.local_server import (
    get_wxinfo,
    init_last,
    init_key,
    get_real_time_msg,
    InitKeyRequest,
)


from pywxdump.api.utils import error9999, ls_loger, random_str, gc
from pywxdump.db import DBHandler
from pywxdump.db.utils import download_file, dat2img, timestamp2str
import logging
import socket

# 配置日志记录
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


def init():
    merge_path = ""
    wx_path = ""
    work_path = os.path.join(
        os.getcwd(), "wxdump_work"
    )  # 临时文件夹,用于存放图片等    # 全局变量
    if not os.path.exists(work_path):
        os.makedirs(work_path, exist_ok=True)
        print(f"[+] 创建临时文件夹：{work_path}")

    # 日志处理，写入到文件
    log_format = (
        "[{levelname[0]}] {asctime} [{name}:{levelno}] {pathname}:{lineno} {message}"
    )
    log_datefmt = "%Y-%m-%d %H:%M:%S"
    log_file_path = os.path.join(work_path, "wxdump.log")
    formatter = logging.Formatter(fmt=log_format, datefmt=log_datefmt, style="{")
    wx_core_logger = logging.getLogger("wx_core")
    db_prepare = logging.getLogger("db_prepare")

    conf_file = os.path.join(work_path, "conf_auto.json")  # 用于存放各种基础信息
    auto_setting = "auto_setting"
    env_file = os.path.join(work_path, ".env")  # 用于存放环境变量
    # set 环境变量
    os.environ["PYWXDUMP_WORK_PATH"] = work_path
    os.environ["PYWXDUMP_CONF_FILE"] = conf_file
    os.environ["PYWXDUMP_AUTO_SETTING"] = auto_setting

    with open(env_file, "w", encoding="utf-8") as f:
        f.write(f"PYWXDUMP_WORK_PATH = '{work_path}'\n")
        f.write(f"PYWXDUMP_CONF_FILE = '{conf_file}'\n")
        f.write(f"PYWXDUMP_AUTO_SETTING = '{auto_setting}'\n")

    if merge_path and os.path.exists(merge_path):
        my_wxid = my_wxid if my_wxid else "wxid_dbshow"
        gc.set_conf(my_wxid, "wxid", my_wxid)  # 初始化wxid
        gc.set_conf(my_wxid, "merge_path", merge_path)  # 初始化merge_path
        gc.set_conf(my_wxid, "wx_path", wx_path)  # 初始化wx_path
        db_config = {"key": my_wxid, "type": "sqlite", "path": merge_path}
        gc.set_conf(my_wxid, "db_config", db_config)  # 初始化db_config
        gc.set_conf(auto_setting, "last", my_wxid)  # 初始化last


@click.command()
@click.option("--port", default=8000, help="Port to listen on for SSE")
@click.option(
    "--transport",
    type=click.Choice(["stdio", "sse"]),
    default="stdio",
    help="Transport type",
)
@click.option("--wxid", default=None, help="wxid")
def main(port: int, transport: str, wxid: str) -> int:
    init()
    wxinfos = get_wxinfo()["body"]
    if wxid is not None:
        wx_info = next((x for x in wxinfos if x["wxid"] == wxid), None)
    else:
        wx_info = wxinfos[0]
        wxid = wx_info["wxid"]
    init_info = init_last(wx_info["wxid"])["body"]
    # wxid = init_info["wxid"]
    key = wx_info["key"]
    wx_dir = wx_info["wx_dir"]
    is_init = init_info["is_init"]
    if is_init == False:
        response = init_key(InitKeyRequest(wx_path=wx_dir, my_wxid=wxid, key=key))
        is_success = response["msg"] == "success"
        is_init = is_success
        if is_success:
            print("初始化成功...")
        pass
    assert is_init == True
    response = get_real_time_msg()
    is_success = response["msg"] == "success"
    merge_path = response["body"]
    assert is_success == True
    print("同步消息成功...")
    db_config = {"key": wxid, "type": "sqlite", "path": merge_path}
    wx = wxauto.WeChat()
    end_createtime = int(time.time())
    db = DBHandler(db_config, wxid)
    app = Server("mcp-wechat-bot")

    @app.call_tool()
    async def fetch_tool(
        name: str, arguments: dict
    ) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
        if name == "sql_wechat_message":
            if "sql" not in arguments:
                raise ValueError("Missing required argument 'sql'")
            sql = arguments["sql"]
            get_real_time_msg()
            res = db.execute(sql)
            print(str(res))
            return [types.TextContent(type="text", text=str(res))]
        if name == "get_wechat_message":
            get_real_time_msg()
            is_room = arguments["is_room"]
            name = arguments["name"]
            start_createtime = arguments.get("start_createtime")
            end_createtime = arguments.get("end_createtime")
            if not (start_createtime == "" or start_createtime is None):
                start_timestamp = int(
                    time.mktime(
                        datetime.fromisoformat(
                            arguments["start_createtime"]
                        ).timetuple()
                    )
                )
            else:
                start_timestamp = None
            if not (end_createtime == "" or end_createtime is None):
                end_timestamp = int(
                    time.mktime(
                        datetime.fromisoformat(arguments["end_createtime"]).timetuple()
                    )
                )
            else:
                end_timestamp = None

            session_list = db.get_session_list()
            session = next(
                (x for x in session_list.values() if x["strNickName"] == name), None
            )
            wxid = session["wxid"]
            start_index = int(arguments.get("start_index", 0))
            msgs = db.get_msg_list(
                wxids=[wxid],
                msg_type=1,
                start_index=start_index,
                page_size=int(arguments.get("page_size", 500)),
                start_createtime=start_timestamp,
                end_createtime=end_timestamp,
            )
            if arguments.get("page_size", None) is None and len(msgs[0]) >= int(
                arguments.get("page_size", 500)
            ):
                _msgs = msgs
                while len(_msgs[0]) >= int(arguments.get("page_size", 500)):
                    start_index = start_index + 500
                    _msgs = db.get_msg_list(
                        wxids=[wxid],
                        msg_type=1,
                        start_index=start_index,
                        page_size=500,
                        start_createtime=start_timestamp,
                        end_createtime=end_timestamp,
                    )
                    msgs = (msgs[0] + _msgs[0], list(set(msgs[1] + _msgs[1])))

            output = ""
            usersInfo = {}
            if is_room == False:
                for wxid in msgs[1]:
                    if wxid == "我":
                        usersInfo[wxid] = wxid
                    else:
                        userInfo = session_list[wxid]
                        usersInfo[wxid] = userInfo["strNickName"]
            else:
                room = db.get_room_list(None, [wxid]).get(wxid, None)
                if room is None:
                    return [types.TextContent(type="text", text="room not found")]

                for wxid in msgs[1]:
                    userinfo = room["wxid2userinfo"].get(wxid, None)
                    if userinfo is None:
                        usersInfo[wxid] = wxid
                    else:
                        usersInfo[wxid] = userinfo["nickname"]
                    pass

            for msg in msgs[0]:
                if msg["is_sender"] == 0:
                    output += f"[{usersInfo[msg['talker']]}] {msg['CreateTime']}\n{msg['msg']}\n\n---\n"
                else:
                    output += f"[我] {msg['CreateTime']}\n{msg['msg']}\n\n---\n"
            return [types.TextContent(type="text", text=output)]
        if name == "get_last_wechat_message":
            is_room = arguments["is_room"]
            name = arguments["name"]
            msg_size = arguments.get("msg_size", 100)
            get_real_time_msg()
            session_list = db.get_session_list()
            session = next(
                (x for x in session_list.values() if x["strNickName"] == name), None
            )
            sql = (
                "select * from  (select "
                "localId,TalkerId,MsgSvrID,Type,SubType,CreateTime,IsSender,Sequence,StatusEx,FlagEx,Status,"
                "MsgSequence,StrContent,MsgServerSeq,StrTalker,DisplayContent,Reserved0,Reserved1,Reserved3,"
                "Reserved4,Reserved5,Reserved6,CompressContent,BytesExtra,BytesTrans,Reserved2,"
                "ROW_NUMBER() OVER (ORDER BY CreateTime ASC) AS id "
                "  from `MSG` where StrTalker = ? and Type = 1 order by Sequence desc limit ? ) order by Sequence"
            )
            res = db.execute(sql, (session["wxid"], msg_size))
            output = ""
            usersInfo = {}
            if is_room == False:
                if session["wxid"].endswith("@chatroom"):
                    return [
                        types.TextContent(type="text", text="this session is chatroom")
                    ]
                for msg in res:
                    msg_detail = db.get_msg_detail(msg)
                    content = msg_detail["msg"]
                    createTime = msg_detail["CreateTime"]
                    if msg_detail["is_sender"] == 0:
                        output += (
                            f"[{session['nickname']}] {createTime}\n{content}\n\n---\n"
                        )
                    else:
                        output += f"[我] {createTime}\n{content}\n\n---\n"
                print(output)
                return [types.TextContent(type="text", text=output)]
            else:
                if not session["wxid"].endswith("@chatroom"):
                    return [
                        types.TextContent(
                            type="text", text="this session is not chatroom"
                        )
                    ]
                roomid = session["wxid"]
                room = db.get_room_list(None, [roomid]).get(roomid, None)
                if room is None:
                    return [types.TextContent(type="text", text="room not found")]

                for msg in res:
                    msg_detail = db.get_msg_detail(msg)
                    userinfo = room["wxid2userinfo"].get(msg_detail["talker"], None)
                    createTime = msg_detail["CreateTime"]
                    content = msg_detail["msg"]
                    if msg_detail["is_sender"] == 0:
                        output += (
                            f"[{userinfo['nickname']}] {createTime}\n{content}\n\n---\n"
                        )
                    else:
                        output += f"[我] {createTime}\n{content}\n\n---\n"

            return [types.TextContent(type="text", text=output)]
        if name == "send_wechat_message":
            if "who" not in arguments:
                raise ValueError("Missing required argument 'who'")
            if "content" not in arguments and "files" not in arguments:
                raise ValueError("Missing required argument 'content' or 'files'")

            who = arguments["who"]
            content = arguments.get("content", None)
            files = arguments.get("files", [])
            if content is None and len(files) == 0:
                raise ValueError("Missing required argument 'content' or 'files'")

            if content is not None:
                wx.SendMsg(content, who)

            if len(files) > 0:
                wx.SendFiles(filepath=files, who=who)
            return [types.TextContent(type="text", text="send success")]

        raise ValueError("Unknown tool")

    @app.list_tools()
    async def list_tools() -> list[types.Tool]:
        return [
            types.Tool(
                name="get_wechat_message",
                description="""Get WeChat Message""",
                inputSchema={
                    "type": "object",
                    "required": ["is_room", "name"],
                    "properties": {
                        "is_room": {
                            "type": "boolean",
                            # "default": False,
                        },
                        "name": {
                            "type": "string",
                            "description": "room name of user name",
                        },
                        "start_createtime": {
                            "type": ["string", "null"],
                            "description": "msg time example 2025-02-13 10:07",
                        },
                        "end_createtime": {
                            "type": ["string", "null"],
                            "description": "msg time example 2025-02-13 10:07",
                        },
                        "start_index": {
                            "type": ["integer", "null"],
                            "description": "start index",
                            # "default": 0,
                        },
                        "page_size": {
                            "type": ["integer", "null"],
                            "description": "page size",
                            # "default": 100,
                        },
                        "content": {
                            "type": "string",
                            "description": "keyword search",
                        },
                    },
                },
            ),
            types.Tool(
                name="get_last_wechat_message",
                description="""Get Last WeChat Message""",
                inputSchema={
                    "type": "object",
                    "required": ["is_room", "name", "msg_size"],
                    "properties": {
                        "is_room": {"type": "boolean"},
                        "name": {
                            "type": "string",
                            "description": "room name of user name",
                        },
                        "msg_size": {
                            "type": "integer",
                            "description": "message size",
                            "default": 50,
                        },
                    },
                },
            ),
            types.Tool(
                name="sql_wechat_message",
                description="""Query WeChat Message with SQL """,
                inputSchema={
                    "type": "object",
                    "required": ["sql"],
                    "properties": {
                        "sql": {
                            "type": "string",
                            "description": "sql to query message",
                        }
                    },
                },
            ),
            types.Tool(
                name="send_wechat_message",
                description="Send WeChat Message",
                inputSchema={
                    "type": "object",
                    "required": ["to"],
                    "properties": {
                        "who": {
                            "type": "string",
                            "description": "room name of user name",
                        },
                        "content": {
                            "type": "string",
                            "description": "content",
                        },
                        "files": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "file path",
                            },
                        },
                    },
                },
            ),
        ]

    if transport == "sse":
        from mcp.server.sse import SseServerTransport
        from starlette.applications import Starlette
        from starlette.routing import Mount, Route

        sse = SseServerTransport("/messages/")

        async def handle_sse(request):
            async with sse.connect_sse(
                request.scope, request.receive, request._send
            ) as streams:
                await app.run(
                    streams[0], streams[1], app.create_initialization_options()
                )

        starlette_app = Starlette(
            debug=True,
            routes=[
                Route("/sse", endpoint=handle_sse),
                Mount("/messages/", app=sse.handle_post_message),
            ],
        )

        import uvicorn

        uvicorn.run(starlette_app, host="127.0.0.1", port=port)
    else:
        from mcp.server.stdio import stdio_server

        async def arun():
            async with stdio_server() as streams:
                await app.run(
                    streams[0], streams[1], app.create_initialization_options()
                )

        anyio.run(arun)

    return 0


if __name__ == "__main__":
    main()
