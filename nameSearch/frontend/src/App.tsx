import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const query = debouncedQuery.trim();
    if (query === "") {
      setResults([]);
      return;
    }
    // Re-runs on every keystroke since `query` is in the dependency array
    fetch(`http://localhost:8000/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, [debouncedQuery]);

  const handleClear = () => {
    setInputValue("");
    setDebouncedQuery("");
    setResults([]);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      />
      <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
        {results.map((name) => (
          <li key={name} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            {name}
          </li>
        ))}
      </ul>
      {debouncedQuery.trim() !== "" && results.length === 0 && (
        <p style={{ color: "#888" }}>No matches found.</p>
      )}
    </div>
  );
}

export default App;