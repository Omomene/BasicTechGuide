// src/components/StepForm.jsx
import React, { useState } from "react";
import { FaTrash, FaBold, FaItalic, FaListUl, FaListOl } from "react-icons/fa";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

function StepForm({
  stepIndex,
  stepData = { type: "step", title: "", content: "" },
  onChange,
  onDelete
}) {
  const [localData, setLocalData] = useState(stepData);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange(stepIndex, updated);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    content: localData.content || "",
    editorProps: {
      attributes: {
        class: "tiptap-editor"
      }
    },
    onUpdate({ editor }) {
      handleChange("content", editor.getHTML());
    }
  });

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

        <button
          onClick={() => onDelete(stepIndex)}
          style={styles.delete}
        >
          <FaTrash />
        </button>
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
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <FaBold />
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <FaItalic />
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <FaListUl />
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <FaListOl />
          </button>

          <button onClick={() => editor.chain().focus().setParagraph().run()}>
            P
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            H3
          </button>
        </div>
      )}

      {/* EDITOR */}
      <div style={styles.editorBox}>
        <EditorContent editor={editor} />
      </div>

      {/* IMAGE */}
      {localData.type === "step" && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleChange("imageFile", e.target.files[0] || null)
          }
        />
      )}

      {/* PREVIEW */}
      <div style={styles.preview}>
        <h4>Preview</h4>

        {localData.type === "step" && (
          <h3>{localData.title}</h3>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: localData.content }}
        />

        {localData.imageFile && (
          <img
            src={URL.createObjectURL(localData.imageFile)}
            alt="preview"
            style={styles.previewImg}
          />
        )}
      </div>
    </div>
  );
}

const styles = {

  block: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "28px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px"
  },

  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  delete: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  title: {
    width: "100%",
    fontSize: "20px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "12px"
  },

  toolbar: {
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
    marginBottom: "10px"
  },

  editorBox: {
    minHeight: "180px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    background: "#fafafa"
  },

  preview: {
    marginTop: "20px",
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #eee"
  },

  previewImg: {
    maxWidth: "100%",
    marginTop: "10px",
    borderRadius: "6px"
  }
};

export default StepForm;