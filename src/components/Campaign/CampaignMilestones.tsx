/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  GripVertical,
  Plus,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface Milestone {
  id: string
  title: string
  description: string
  estimatedCompletionDate: Date | undefined
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = prompt("Enter image URL")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor.chain().focus().setImage({ src: reader.result }).run()
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-gray-100" : ""}`}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "bg-gray-100" : ""}`}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : ""}`}
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bulletList") ? "bg-gray-100" : ""}`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "bg-gray-100" : ""}`}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter URL")
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-gray-100" : ""}`}
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      <button onClick={addImage} className="p-2 rounded hover:bg-gray-100">
        <ImageIcon className="h-4 w-4" />
      </button>
      <label className="p-2 rounded hover:bg-gray-100 cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        <span className="flex items-center">
          <ImageIcon className="h-4 w-4 mr-1" /> Upload
        </span>
      </label>
      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-gray-100">
        <Undo className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-gray-100">
        <Redo className="h-4 w-4" />
      </button>
    </div>
  )
}

export function CampaignMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "",
      description: "",
      estimatedCompletionDate: undefined,
    },
  ])

  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: milestones[currentMilestoneIndex]?.description || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      updateMilestone(currentMilestoneIndex, "description", html)
    },
  })

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: `milestone-${Date.now()}`,
      title: "",
      description: "",
      estimatedCompletionDate: undefined,
    }
    setMilestones([...milestones, newMilestone])
    setCurrentMilestoneIndex(milestones.length)
  }

  const removeMilestone = (index: number) => {
    if (milestones.length <= 1) {
      return
    }
    const newMilestones = milestones.filter((_, i) => i !== index)
    setMilestones(newMilestones)
    if (currentMilestoneIndex >= newMilestones.length) {
      setCurrentMilestoneIndex(newMilestones.length - 1)
    } else if (currentMilestoneIndex === index) {
      // Force editor content update
      setTimeout(() => {
        editor?.commands.setContent(newMilestones[currentMilestoneIndex]?.description || "")
      }, 0)
    }
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
    const newMilestones = [...milestones]
    newMilestones[index] = { ...newMilestones[index], [field]: value }
    setMilestones(newMilestones)
  }

  const selectMilestone = (index: number) => {
    setCurrentMilestoneIndex(index)
    editor?.commands.setContent(milestones[index]?.description || "")
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(milestones)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setMilestones(items)

    // Update current milestone index if it was moved
    if (currentMilestoneIndex === result.source.index) {
      setCurrentMilestoneIndex(result.destination.index)
    }
    // Or if the current milestone's position was affected by the move
    else if (
      (currentMilestoneIndex > result.source.index && currentMilestoneIndex <= result.destination.index) ||
      (currentMilestoneIndex < result.source.index && currentMilestoneIndex >= result.destination.index)
    ) {
      const newIndex =
        result.source.index > result.destination.index ? currentMilestoneIndex + 1 : currentMilestoneIndex - 1
      setCurrentMilestoneIndex(newIndex)
    }
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Campaign Milestones</h2>
        <p className="text-sm text-gray-500">
          Define key milestones for your campaign. These will help backers understand your project timeline and track
          progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Milestones</h3>
            <Button
              onClick={addMilestone}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-[#00EE7D]"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="milestones">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <Draggable key={milestone.id} draggableId={milestone.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center p-3 border rounded-lg ${
                            currentMilestoneIndex === index
                              ? "border-[#00EE7D] bg-[#00EE7D]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => selectMilestone(index)}>
                            <p className="font-medium truncate">{milestone.title || `Milestone ${index + 1}`}</p>
                            {milestone.estimatedCompletionDate && (
                              <p className="text-xs text-gray-500">
                                Due: {format(milestone.estimatedCompletionDate, "MMM d, yyyy")}
                              </p>
                            )}
                          </div>
                          {milestones.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMilestone(index)}
                              className="ml-2 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="md:col-span-2 space-y-6 border rounded-lg p-4">
          <div className="space-y-4">
            <Label htmlFor="milestone-title">Milestone Title</Label>
            <Input
              id="milestone-title"
              placeholder="Enter milestone title"
              value={milestones[currentMilestoneIndex]?.title || ""}
              onChange={(e) => updateMilestone(currentMilestoneIndex, "title", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Estimated Completion Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !milestones[currentMilestoneIndex]?.estimatedCompletionDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {milestones[currentMilestoneIndex]?.estimatedCompletionDate ? (
                    format(milestones[currentMilestoneIndex].estimatedCompletionDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={milestones[currentMilestoneIndex]?.estimatedCompletionDate}
                  onSelect={(date) => updateMilestone(currentMilestoneIndex, "estimatedCompletionDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <Label>Milestone Description</Label>
            <div className="border rounded-lg overflow-hidden">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="min-h-[200px] p-4" />
            </div>
            <div className="text-xs text-gray-500 space-y-2">
              <p>Describe what this milestone entails and how you will measure its completion.</p>
              <p className="font-medium">Tip: Use the image button to add images to your milestone description.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
        <p className="text-sm">
          <strong>Note:</strong> Milestones cannot be edited after your campaign is submitted. Make sure they are clear,
          achievable, and have measurable outcomes.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <h4 className="font-medium mb-2">Image Tips:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Click the image icon to add an image by URL</li>
          <li>Use the &quot;Upload&quot; button to upload an image from your device</li>
          <li>Images help visualize your milestone progress and outcomes</li>
          <li>Use images to show sketches, prototypes, or examples of your work</li>
        </ul>
      </div>
    </div>
  )
}
