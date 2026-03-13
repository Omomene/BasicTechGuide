// src/components/StepForm.jsx
import React, { useState, useEffect } from "react";
import {
  FaTrash, FaBold, FaItalic, FaListUl, FaListOl, FaParagraph, FaHeading, FaArrowUp, FaArrowDown
} from "react-icons/fa";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

function StepForm({ stepIndex, stepData, onChange, onDelete, onMoveUp, onMoveDown, onImageChange }) {
  const [localData, setLocalData] = useState(stepData);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: localData.content || "",
    editorProps: { attributes: { class: "tiptap-editor" } },
    onUpdate({ editor }) {
      handleChange("content", editor.getHTML());
    }
  });

  // Update localData and editor content when stepData changes
  useEffect(() => {
    setLocalData(stepData);
    if (editor && stepData.content !== editor.getHTML()) {
      editor.commands.setContent(stepData.content || "");
    }
  }, [stepData, editor]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange(stepIndex, updated);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    handleChange("imageFile", file);
    handleChange("image", "");
    if (onImageChange) onImageChange(e, stepIndex);
  };

  const imageSrc =
    localData.imageFile
      ? URL.createObjectURL(localData.imageFile)
      : localData.image || localData.originalImage || "";

  return (
    <div style={styles.block}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.blockType}>
          {localData.type === "step" ? "Step Block" : "Paragraph Block"}
        </div>
        <div style={styles.controls}>
          <button onClick={() => onMoveUp(stepIndex)} style={styles.moveBtn}><FaArrowUp /></button>
          <button onClick={() => onMoveDown(stepIndex)} style={styles.moveBtn}><FaArrowDown /></button>
          <button onClick={() => onDelete(stepIndex)} style={styles.delete}><FaTrash /></button>
        </div>
      </div>

      {/* STEP TITLE */}
      {localData.type === "step" && (
        <input
          type="text"
          placeholder="Step title..."
          value={localData.title || ""}
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
      <div style={styles.editorBox}>
        <EditorContent editor={editor} />
      </div>

      {/* IMAGE */}
      {localData.type === "step" && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
          {imageSrc && <img src={imageSrc} alt="preview" style={styles.previewImg} />}
        </>
      )}
    </div>
  );
}


const styles = {
  block: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "28px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
  },

  blockType: {
    fontWeight: "600",
    color: "#6b7280"
  },

  controls: {
    display: "flex",
    gap: "8px"
  },

  moveBtn: {
    border: "none",
    background: "#f3f4f6",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  delete: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  title: {
    width: "100%",
    fontSize: "20px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "16px"
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  toolBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  editorBox: {
    minHeight: "180px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "14px",
    background: "#fafafa"
  },

  fileInput: {
    marginTop: "12px"
  },

  previewImg: {
    maxWidth: "100%",
    marginTop: "12px",
    borderRadius: "10px"
  }
};

export default StepForm;