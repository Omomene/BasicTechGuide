// src/pages/AdminPanel.jsx
import React, { useState, useRef } from "react";
import StepForm from "../components/StepForm";

function AdminPanel() {
  const [category, setCategory] = useState("");
  const [guideTitle, setGuideTitle] = useState("");
  const [steps, setSteps] = useState([
    { type: "step", title: "", content: "" }
  ]);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const categories = [
    "excel",
    "netsuite",
    "powerautomate",
    "powerbi",
    "powerpoint"
  ];

  // UPDATE STEP
  const handleStepChange = (index, data) => {
    const updated = [...steps];
    updated[index] = data;
    setSteps(updated);
  };

  // DELETE STEP
  const handleDeleteStep = (index) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
  };

  // ADD STEP
  const handleAddStep = () => {
    setSteps([...steps, { type: "step", title: "", content: "" }]);
  };

  // ADD PARAGRAPH
  const handleAddParagraph = () => {
    setSteps([...steps, { type: "paragraph", content: "" }]);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !guideTitle) {
      setMessage("❌ Please select a category and enter a guide title.");
      return;
    }

    if (steps.length === 0) {
      setMessage("❌ Please add at least one block.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();

    formData.append("category", category);
    formData.append("guideTitle", guideTitle);
    formData.append("steps", JSON.stringify(steps));

    steps.forEach((step) => {
      if (step.imageFile) {
        formData.append("images", step.imageFile);
      }
    });

    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:5000/generate-guide", {
        method: "POST",
        body: formData
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid JSON.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Guide generation failed.");
      }

      const slug = guideTitle
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      const guidePath = `/${category}/${slug}`;

      setMessage(
        `✅ Guide created successfully!

File: ${data.jsxFile || slug}

View: ${guidePath}`
      );

      // RESET FORM
      setCategory("");
      setGuideTitle("");
      setSteps([{ type: "step", title: "", content: "" }]);
      setImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Guide Editor</h1>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* CATEGORY */}
        <div style={styles.section}>
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div style={styles.section}>
          <label>Guide Title</label>

          <input
            type="text"
            value={guideTitle}
            onChange={(e) => setGuideTitle(e.target.value)}
            placeholder="Example: Create a Chart in Excel"
            style={styles.input}
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div style={styles.section}>
          <label>Optional Images</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* STEPS */}
        <h2 style={{ marginTop: "40px" }}>Guide Content</h2>

        {steps.map((step, idx) => (
          <StepForm
            key={idx}
            stepIndex={idx}
            stepData={step}
            onChange={handleStepChange}
            onDelete={handleDeleteStep}
          />
        ))}

        {/* ADD BLOCK BUTTONS */}
        <div style={styles.addButtons}>

          <button
            type="button"
            onClick={handleAddStep}
            style={styles.addStep}
          >
            + Add Step
          </button>

          <button
            type="button"
            onClick={handleAddParagraph}
            style={styles.addParagraph}
          >
            + Add Paragraph
          </button>

        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          style={styles.submit}
        >
          {loading ? "Generating Guide..." : "Generate Guide"}
        </button>

      </form>

      {/* LIVE ARTICLE PREVIEW */}
      <div style={styles.preview}>
        <h2>Live Article Preview</h2>

        <h1>{guideTitle}</h1>

        {steps.map((block, i) => (
          <div key={i} style={{ marginBottom: "25px" }}>
            {block.type === "step" && <h3>{block.title}</h3>}

            <div dangerouslySetInnerHTML={{ __html: block.content }} />

            {block.imageFile && (
              <img
                src={URL.createObjectURL(block.imageFile)}
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {

  page: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px"
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px"
  },

  message: {
    background: "#f3f4f6",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    whiteSpace: "pre-line"
  },

  section: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  addButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "20px"
  },

  addStep: {
    background: "#3b82f6",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  addParagraph: {
    background: "#10b981",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  submit: {
    marginTop: "30px",
    background: "#111827",
    color: "white",
    padding: "14px 28px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer"
  },

  preview: {
    marginTop: "60px",
    padding: "30px",
    border: "1px solid #eee",
    borderRadius: "12px",
    background: "#fafafa"
  }

};

export default AdminPanel;