import React, { useState } from "react";

export default function CheckOwnerPopup({ recipeId, onSuccess }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/check-recipe-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, recipeId }), // fixed
      });

      const data = await res.json();

      if (res.ok && data.allowed) {
        setMessage("✅ You are authorized to edit.");
        onSuccess(); // trigger parent callback
      } else {
        setMessage(data.message || "❌ Not authorized.");
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", maxWidth: 300 }}>
      <form onSubmit={handleCheck}>
        <h4>Verify Owner</h4>
        <input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%" }}>Check</button>
        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </form>
    </div>
  );
}
