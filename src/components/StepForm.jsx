// src/components/StepForm.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaBold, FaItalic, FaListUl, FaListOl, FaParagraph, FaHeading } from "react-icons/fa";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

function StepForm({
  stepIndex,
  stepData = { type: "step", title: "", content: "", image: "", imageFile: null, originalImage: "" },
  onChange,
  onDelete,
  onImageChange
}) {
  const [localData, setLocalData] = useState(stepData);

  // Sync prop changes
  useEffect(() => setLocalData(stepData), [stepData]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange(stepIndex, updated);
  };

  const editor = useEditor({
    extensions: [StarterKit, Image, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: localData.content || "",
    editorProps: { attributes: { class: "tiptap-editor" } },
    onUpdate({ editor }) { handleChange("content", editor.getHTML()); },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    handleChange("imageFile", file);
    handleChange("image", "");
    if (onImageChange) onImageChange(e, stepIndex);
  };

  const imageSrc = localData.imageFile
    ? URL.createObjectURL(localData.imageFile)
    : localData.image || localData.originalImage || "";

  return (
    <div style={styles.block}>
      {/* HEADER */}
      <div style={styles.header}>
        <select
          value={localData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          style={styles.select}
        >
          <option value="step">Step</option>
          <option value="paragraph">Paragraph</option>
        </select>
        <button onClick={() => onDelete(stepIndex)} style={styles.delete}><FaTrash /></button>
      </div>

      {/* STEP TITLE */}
      {localData.type === "step" && (
        <input
          type="text"
          placeholder="Step title..."
          value={localData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={styles.title}
        />
      )}

      {/* TOOLBAR */}
      {editor && (
        <div style={styles.toolbar}>
          <button onClick={() => editor.chain().focus().toggleBold().run()} style={styles.toolBtn}><FaBold /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} style={styles.toolBtn}><FaItalic /></button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={styles.toolBtn}><FaListUl /></button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={styles.toolBtn}><FaListOl /></button>
          <button onClick={() => editor.chain().focus().setParagraph().run()} style={styles.toolBtn}><FaParagraph /></button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={styles.toolBtn}><FaHeading />2</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={styles.toolBtn}><FaHeading />3</button>
        </div>
      )}

      {/* EDITOR */}
      <div style={styles.editorBox}><EditorContent editor={editor} /></div>

      {/* IMAGE UPLOAD */}
      {localData.type === "step" && (
        <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
      )}

      {/* PREVIEW */}
      <div style={styles.preview}>
        <h4>Preview</h4>
        {localData.type === "step" && <h3 style={styles.previewTitle}>{localData.title}</h3>}
        <div dangerouslySetInnerHTML={{ __html: localData.content }} style={styles.previewContent} />
        {imageSrc && <img src={imageSrc} alt="preview" style={styles.previewImg} />}
      </div>
    </div>
  );
}

const styles = {
  block: {
    width: "100%",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "28px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "16px" },
  select: { padding: "6px 12px", borderRadius: "8px", border: "1px solid #ccc", fontWeight: "500" },
  delete: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  title: {
    width: "100%",
    fontSize: "20px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "16px",
    fontWeight: "600",
  },
  toolbar: { display: "flex", gap: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "12px" },
  toolBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "600",
  },
  editorBox: {
    minHeight: "180px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "14px",
    background: "#fafafa",
    transition: "all 0.2s ease",
  },
  fileInput: {
    marginTop: "12px",
    borderRadius: "8px",
    padding: "6px",
    cursor: "pointer",
  },
  preview: {
    marginTop: "24px",
    padding: "18px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #eee",
    transition: "all 0.3s ease",
  },
  previewTitle: { fontSize: "18px", marginBottom: "8px", color: "#111827" },
  previewContent: { fontSize: "15px", lineHeight: "1.6", color: "#374151" },
  previewImg: {
    maxWidth: "100%",
    marginTop: "12px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
  },
};

export default StepForm;