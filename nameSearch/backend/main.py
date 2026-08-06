import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow the Vite dev server (localhost:5173) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/search")
def search(q: str = ""):
    query = q.strip()
    if not query:
        return []

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM users WHERE name LIKE ? ORDER BY name", (f"%{query}%",))
    rows = cursor.fetchall()
    conn.close()


    return [row["name"] for row in rows]