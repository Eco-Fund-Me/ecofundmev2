/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("bold") ? "bg-gray-100" : ""
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("italic") ? "bg-gray-100" : ""
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : ""
        }`}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("bulletList") ? "bg-gray-100" : ""
        }`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("orderedList") ? "bg-gray-100" : ""
        }`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive("link") ? "bg-gray-100" : ""
        }`}
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-100" : ""
        }`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-100" : ""
        }`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-100" : ""
        }`}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export function CampaignContent() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  const riskEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[150px] p-4",
      },
    },
  });

  const [faqs, setFaqs] = React.useState([{ question: "", answer: "" }]);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Content</h2>
        <p className="text-sm text-gray-500">
          Tell your story and build trust with potential backers. Share your
          project details, vision, and what makes it special.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Campaign Story</Label>
          <div className="border rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <p className="text-xs text-gray-500">
            Describe your project in detail. What are you trying to achieve?
          </p>
        </div>

        <div className="space-y-4">
          <Label>Campaign Video</Label>
          <Input
            placeholder="Enter your video URL (YouTube, Vimeo)"
            type="url"
          />
          <p className="text-xs text-gray-500">
            A video can help backers better understand your project.
          </p>
        </div>

        <div className="space-y-4">
          <Label>Gallery Images</Label>
          <ImageUpload multiple />
          <p className="text-xs text-gray-500">
            Add up to 5 images to showcase your campaign.
          </p>
        </div>

        <div className="space-y-4">
          <Label>Risks</Label>
          <div className="border rounded-lg overflow-hidden">
            <MenuBar editor={riskEditor} />
            <EditorContent editor={riskEditor} />
          </div>
          <p className="text-xs text-gray-500">
            Make contributors aware of the risks involved in donating to your
            campaign.
          </p>
        </div>

        <div className="space-y-4">
          <Label>FAQ</Label>
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-4 relative">
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) => updateFaq(index, "question", e.target.value)}
              />
              <Textarea
                placeholder="Answer"
                className="min-h-[100px]"
                value={faq.answer}
                onChange={(e) => updateFaq(index, "answer", e.target.value)}
              />
              {faqs.length > 1 && (
                <button
                  onClick={() => removeFaq(index)}
                  className="absolute -top-2 right-0 p-1 text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addFaq}
            className="text-sm text-[#00EE7D] hover:text-[#00EE7D]/80"
          >
            + Add another FAQ
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  );
}
