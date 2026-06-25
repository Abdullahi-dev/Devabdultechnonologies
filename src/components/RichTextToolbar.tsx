import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, 
  List, ListOrdered, Quote, 
  Undo, Redo, Link as LinkIcon, Image as ImageIcon, Youtube,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Highlighter, FileCode, UploadCloud, Check, X
} from 'lucide-react';
import { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export function RichTextToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [savedSelection, setSavedSelection] = useState<any>(null);

  if (!editor) {
    return null;
  }

  const handleLinkSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const openLinkInput = () => {
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkInput(true);
  };

  const addImage = () => {
    const previousUrl = editor.getAttributes('image').src;
    const url = window.prompt('Enter Image URL:', previousUrl || '');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleUploadClick = () => {
    setSavedSelection(editor.state.selection);
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `editor-images/${Date.now()}_${file.name}`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Restore selection before inserting image
      if (savedSelection) {
        editor.commands.setTextSelection(savedSelection);
      }
      
      // Insert image into editor
      editor.chain().focus().setImage({ src: downloadURL }).run();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter YouTube URL:');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const fontFamilies = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { name: 'Courier New', value: '"Courier New", Courier, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
    { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
    { name: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
    { name: 'Palatino', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
    { name: 'Garamond', value: 'Garamond, serif' },
    { name: 'Bookman', value: '"Bookman Old Style", serif' },
    { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  ];

  const fontSizes = [
    '8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-white/5 border-b border-white/10 rounded-t-xl">
      {/* Font Family */}
      <div className="relative flex items-center">
        <input
          type="text"
          list="font-families"
          placeholder="Font"
          onChange={(e) => {
            const val = e.target.value;
            const font = fontFamilies.find(f => f.name.toLowerCase() === val.toLowerCase());
            if (font) {
              editor.chain().setFontFamily(font.value).run();
            } else if (val) {
              editor.chain().setFontFamily(val).run();
            } else {
              editor.chain().unsetFontFamily().run();
            }
          }}
          className="bg-bg-dark border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none w-32"
          value={
            fontFamilies.find(f => f.value === editor.getAttributes('textStyle').fontFamily)?.name || 
            editor.getAttributes('textStyle').fontFamily?.replace(/['"]/g, '') || 
            ''
          }
        />
        <datalist id="font-families">
          {fontFamilies.map(font => (
            <option key={font.name} value={font.name} />
          ))}
        </datalist>
      </div>

      {/* Font Size */}
      <div className="relative flex items-center">
        <input
          type="text"
          list="font-sizes"
          placeholder="Size"
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              // Ensure it has 'px' if it's just a number
              const size = /^\d+$/.test(val) ? `${val}px` : val;
              editor.chain().setFontSize(size).run();
            } else {
              editor.chain().unsetFontSize().run();
            }
          }}
          className="bg-bg-dark border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none w-16"
          value={editor.getAttributes('textStyle').fontSize?.replace('px', '') || ''}
        />
        <datalist id="font-sizes">
          {fontSizes.map(size => (
            <option key={size} value={size} />
          ))}
        </datalist>
      </div>

      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* Headings */}
      <select
        onChange={(e) => {
          const val = e.target.value;
          if (val === 'p') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run();
          }
        }}
        className="bg-bg-dark border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none"
        value={
          editor.isActive('heading', { level: 1 }) ? '1' :
          editor.isActive('heading', { level: 2 }) ? '2' :
          editor.isActive('heading', { level: 3 }) ? '3' :
          editor.isActive('heading', { level: 4 }) ? '4' :
          editor.isActive('heading', { level: 5 }) ? '5' :
          editor.isActive('heading', { level: 6 }) ? '6' : 'p'
        }
      >
        <option value="p">Normal text</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>

      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('strike') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('code') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Inline Code"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('codeBlock') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Code Block"
      >
        <FileCode className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* Text Align */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Justify"
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bulletList') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('orderedList') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('blockquote') ? 'bg-white/20 text-white' : 'text-white/70'}`}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <div className="relative">
        <button
          onClick={openLinkInput}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-white/70'}`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        
        {showLinkInput && (
          <form 
            onSubmit={handleLinkSubmit}
            className="absolute top-full left-0 mt-2 p-2 bg-bg-dark border border-white/10 rounded-lg shadow-xl flex items-center gap-2 z-50"
          >
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-accent-blue w-64"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 bg-accent-blue text-white rounded hover:bg-accent-blue/90 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="p-1.5 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
      
      <div className="w-px h-6 bg-white/10 mx-1" />
      
      <button
        onClick={addImage}
        className={`p-2 rounded hover:bg-white/10 transition-colors text-white/70`}
        title="Insert Image URL"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      <button
        onClick={handleUploadClick}
        className={`p-2 rounded hover:bg-white/10 transition-colors text-white/70`}
        title="Upload Image"
      >
        <UploadCloud className="w-4 h-4" />
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      <button
        onClick={addYoutubeVideo}
        className={`p-2 rounded hover:bg-white/10 transition-colors text-white/70`}
        title="Add YouTube Video"
      >
        <Youtube className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <div className="flex items-center gap-1 relative group" title="Text Color">
        <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden relative">
          <input
            type="color"
            onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color || '#ffffff'}
            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 relative group ml-2" title="Highlight Color">
        <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden relative flex items-center justify-center bg-white/10">
          <Highlighter className="w-3 h-3 text-white absolute pointer-events-none z-10" />
          <input
            type="color"
            onInput={(event: any) => editor.chain().focus().toggleHighlight({ color: event.target.value }).run()}
            value={editor.getAttributes('highlight').color || '#ffff00'}
            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-white/10 transition-colors text-white/70 disabled:opacity-50"
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-white/10 transition-colors text-white/70 disabled:opacity-50"
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
}
