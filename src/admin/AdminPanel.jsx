// src/pages/AdminPanel.jsx
import React, { useState, useRef, useEffect } from "react";
import StepForm from "../components/StepForm";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { nanoid } from "nanoid"; // <-- unique IDs for steps

function AdminPanel() {
  const [category, setCategory] = useState("");
  const [guideTitle, setGuideTitle] = useState("");
  const [steps, setSteps] = useState([{ id: nanoid(), type: "paragraph", content: "" }]);
  const [images, setImages] = useState([]);
  const [existingGuides, setExistingGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [path, setPath] = useState(""); // track current guide path

  const fileInputRef = useRef(null);
  const categories = ["excel","netsuite","powerautomate","powerbi","powerpoint"];

  // -----------------------------
  // MOVE HANDLERS
  // -----------------------------
  const moveUp = (index) => {
    if (index === 0) return;
    setSteps(prev => {
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated;
    });
  };

  const moveDown = (index) => {
    setSteps(prev => {
      if (index === prev.length - 1) return prev;
      const updated = [...prev];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      return updated;
    });
  };

  // -----------------------------
  // LOAD EXISTING GUIDES
  // -----------------------------
  const loadGuides = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/get-guides");
      const data = await res.json();
      setExistingGuides(data.guides || []);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load guides");
    }
    setLoading(false);
  };

  useEffect(() => { loadGuides(); }, []);

  const groupGuidesByCategory = (guides) => {
    return guides.reduce((acc, guide) => {
      if (!acc[guide.category]) acc[guide.category] = [];
      acc[guide.category].push(guide);
      return acc;
    }, {});
  };

  // -----------------------------
  // HANDLE GUIDE EDIT
  // -----------------------------
  const handleEditGuide = async (guidePath) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/get-guide?path=${guidePath}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCategory(data.category);
      setGuideTitle(data.guideTitle);
      setSteps(data.steps.map(s => ({ ...s, id: nanoid(), imageFile: null }))); // <-- assign new IDs
      setImages([]);
      setPath(guidePath); 
      setMessage(`Loaded guide: ${data.guideTitle}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  const handleDeleteGuide = async (guidePath) => {
    if (!window.confirm("Delete this guide?")) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/delete-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: guidePath })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("✅ Guide deleted");
      loadGuides();
      if (guidePath === path) {
        setCategory("");
        setGuideTitle("");
        setSteps([{ id: nanoid(), type: "paragraph", content: "" }]);
        setImages([]);
        setPath("");
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  // -----------------------------
  // STEP HANDLERS
  // -----------------------------
  const handleStepChange = (index, data) => {
    const updated = [...steps];
    updated[index] = data;
    setSteps(updated);
  };

  const handleDeleteStep = (index) => setSteps(steps.filter((_, i) => i !== index));
  const handleAddStep = () => setSteps([...steps, { id: nanoid(), type: "step", title: "", content: "", image: "", imageFile: null }]);
  const handleAddParagraph = () => setSteps([...steps, { id: nanoid(), type: "paragraph", content: "" }]);
  const handleStepImageChange = (e, idx) => {
    const file = e.target.files[0] || null;
    const updated = [...steps];
    updated[idx].imageFile = file;
    updated[idx].image = "";
    setSteps(updated);
  };
  const handleGlobalImagesChange = (e) => setImages(Array.from(e.target.files));

  // -----------------------------
  // SUBMIT GUIDE
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !guideTitle) {
      setMessage("❌ Category and title required");
      return;
    }
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("category", category);
    formData.append("guideTitle", guideTitle);
    formData.append("steps", JSON.stringify(steps));
    formData.append("path", path);
    steps.forEach(s => { if (s.imageFile) formData.append("images", s.imageFile); });
    images.forEach(img => formData.append("images", img));

    try {
      const url = path ? "http://localhost:5000/save-guide" : "http://localhost:5000/generate-guide";
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("✅ Guide saved");
      if (!path && data.slug) setPath(data.slug);
      loadGuides();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Guides</h2>
        {loading && <div style={styles.spinner}><FaSpinner className="spin" /> Loading...</div>}
        {Object.entries(groupGuidesByCategory(existingGuides)).map(([cat, guides]) => (
          <div key={cat} style={styles.categoryBlock}>
            <h3 style={styles.categoryTitle}>{cat}</h3>
            {guides.map(g => (
              <div key={g.path} style={styles.guideItem}>
                <span style={styles.guideTitle}>{g.title}</span>
                <div style={styles.guideButtons}>
                  <button style={styles.editBtn} onClick={() => handleEditGuide(g.path)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDeleteGuide(g.path)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={styles.editor}>
        <h1>Guide Editor</h1>
        {message && <div style={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.section}>
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={styles.input}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={styles.section}>
            <label>Guide Title</label>
            <input type="text" value={guideTitle} onChange={e => setGuideTitle(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.section}>
            <label>Optional Images (Drag & Drop)</label>
            <input ref={fileInputRef} type="file" multiple onChange={handleGlobalImagesChange} />
          </div>

          <h2>Guide Content</h2>
          {steps.map((step, idx) => (
            <StepForm
              key={step.id}         // <-- use unique ID here
              stepIndex={idx}
              stepData={step}
              onChange={handleStepChange}
              onDelete={handleDeleteStep}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              onImageChange={handleStepImageChange}
            />
          ))}

          <div style={styles.addButtons}>
            <button type="button" onClick={handleAddStep} style={styles.addStep}><FaPlus /> Add Step</button>
            <button type="button" onClick={handleAddParagraph} style={styles.addParagraph}><FaPlus /> Add Paragraph</button>
          </div>

          <button type="submit" style={styles.submit} disabled={loading}>
            {loading ? <FaSpinner className="spin" /> : "Save Guide"}
          </button>
        </form>

        {/* LIVE PREVIEW */}
        <div style={styles.preview}>
          <h2>Live Preview</h2>
          <h1>{guideTitle}</h1>
          {steps.map((block, i) => (
            <div key={i} style={{ marginBottom: "25px" }}>
              {block.type === "step" && <h3>{block.title}</h3>}
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
              {block.imageFile ? (
                <img src={URL.createObjectURL(block.imageFile)} alt="preview" style={{ maxWidth: "100%", marginTop: "10px" }} />
              ) : block.image ? (
                <img src={block.image} alt="preview" style={{ maxWidth: "100%", marginTop: "10px" }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// STYLES (unchanged)
// -----------------------------
const styles = {
  container: { display: "flex", maxWidth: "1600px", margin: "40px auto" },
  sidebar: { width: "320px", borderRight: "1px solid #eee", padding: "20px", background: "#fafafa", height: "90vh", overflowY: "auto" },
  editor: { flex: 1, padding: "30px" },
  sidebarTitle: { fontSize: "22px", marginBottom: "20px" },
  categoryBlock: { marginBottom: "20px" },
  categoryTitle: { fontWeight: "bold", marginBottom: "8px" },
  guideItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "#fff", border: "1px solid #eee", borderRadius: "6px", marginBottom: "6px" },
  guideTitle: { fontSize: "14px" },
  guideButtons: { display: "flex", gap: "6px" },
  editBtn: { background: "#3b82f6", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { background: "#ef4444", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" },
  section: { marginBottom: "20px" },
  input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" },
  addButtons: { display: "flex", gap: "12px", marginTop: "20px" },
  addStep: { background: "#3b82f6", color: "white", padding: "10px 16px", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  addParagraph: { background: "#10b981", color: "white", padding: "10px 16px", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  submit: { marginTop: "30px", background: "#111827", color: "white", padding: "14px 28px", borderRadius: "8px", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  preview: { marginTop: "60px", padding: "30px", border: "1px solid #eee", borderRadius: "12px", background: "#fafafa" },
  message: { background: "#f3f4f6", padding: "16px", borderRadius: "8px", marginBottom: "20px" },
  spinner: { display: "flex", alignItems: "center", gap: "8px", color: "#555" }
};

export default AdminPanel;