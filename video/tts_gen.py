
import asyncio, json, os
import edge_tts

ROOT = r"C:\Users\jackmin\Documents\my_project\band-anime\video"
VOICE = "zh-CN-XiaoxiaoNeural"
RATE  = "+8%"

async def main():
    script = json.load(open(os.path.join(ROOT, "script.json"), encoding="utf-8"))
    os.makedirs(os.path.join(ROOT, "tts"), exist_ok=True)
    meta = []
    for s in script:
        out = os.path.join(ROOT, "tts", s["id"] + ".mp3")
        if not os.path.exists(out) or os.path.getsize(out) < 1000:
            c = edge_tts.Communicate(s["text"], VOICE, rate=RATE)
            await c.save(out)
        meta.append({"id": s["id"], "note": s["note"], "text": s["text"], "file": "tts/" + s["id"] + ".mp3"})
        print("ok", s["id"], os.path.getsize(out) // 1024, "KB")
    json.dump(meta, open(os.path.join(ROOT, "tts-meta.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)

asyncio.run(main())
