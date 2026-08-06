import sqlite3

USERS = ["Mary", "Max", "Maximus", "Mandy", 
    "Brian", "Brad", "Brandon", "Brianna",
    "John", "Jonathan", "Jane", "Jack",
    "Alice", "Alex", "Amanda", "Amy",
    "Sam", "Samantha", "Sarah", "Sally",
    "Ryan", "Rick", "Richard", "Robert",]

conn = sqlite3.connect("users.db")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)")

cursor.execute("DELETE FROM users")

cursor.executemany("INSERT INTO users (name) VALUES (?)", [(name,) for name in USERS])

conn.commit()
conn.close()

print("Seeded users.db")