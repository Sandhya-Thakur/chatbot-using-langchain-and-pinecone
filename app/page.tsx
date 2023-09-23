"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("err:", err);
    }
  }
  async function sendQuery() {
    if (!query) return;
    setResult("");
    setLoading(true);
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });
      const json = await result.json();
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }
  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Append the file to the FormData object

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // File upload was successful
          console.log("File uploaded successfully.");
          // You can handle the server's response here
        } else {
          // File upload failed
          console.error("File upload failed.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <input
        className="text-black px-2 py-1"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2"
        onClick={sendQuery}
      >
        Ask AI
      </button>
      {loading && <p>Asking AI ...</p>}
      {result && <p>{result}</p>}
      {/* consider removing this button from the UI once the embeddings are created ... */}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={createIndexAndEmbeddings}
      >
        Create index and embeddings
      </button>
    </main>
  );
}
