import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";

const App = () => {
  const [review, setReview] = useState("Code Review");
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch review. Please try again.");
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />{" "}
        </div>
        <div className="review" onClick={reviewCode}>
          Review
        </div>
      </div>
      <div className="right">{review}</div>
    </main>
  );
};

export default App;
