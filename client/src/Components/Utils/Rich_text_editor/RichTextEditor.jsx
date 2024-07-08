import React, { useRef, useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  Modifier,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode,
  FaQuoteRight,
} from 'react-icons/fa';
import { MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { AiOutlineFontColors } from 'react-icons/ai';
import './RichTextEditor.css'; // Custom CSS for editor styling

export function RichTextEditor({
  defaultText = 'This feature will be available soon.',
}) {
  // Convert default text to content state
  const contentState = defaultText
    ? ContentState.createFromBlockArray(convertFromHTML(defaultText))
    : ContentState.createFromText('');

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };
  useEffect(() => {
    focusEditor();
  }, []);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const applyFontFamily = (fontFamily) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const nextContentState = Modifier.applyInlineStyle(
      contentState,
      selection,
      fontFamily
    );

    setEditorState(
      EditorState.push(editorState, nextContentState, 'change-inline-style')
    );
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    console.log(html); // Send HTML to the server or perform any action
  };

  return (
    <div className='border border-gray-300 rounded-lg'>
      <div className='flex border-b border-gray-300 bg-gray-50 rounded-t-lg'>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('BOLD');
          }}
        >
          <FaBold />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('ITALIC');
          }}
        >
          <FaItalic />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('UNDERLINE');
          }}
        >
          <FaUnderline />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle('CODE');
          }}
        >
          <FaCode />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('blockquote');
          }}
        >
          <FaQuoteRight />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('unordered-list-item');
          }}
        >
          <MdFormatListBulleted />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('ordered-list-item');
          }}
        >
          <MdFormatListNumbered />
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-one');
          }}
        >
          H1
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-two');
          }}
        >
          H2
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-three');
          }}
        >
          H3
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-four');
          }}
        >
          H4
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-five');
          }}
        >
          H5
        </button>
        <button
          className='p-2 hover:bg-gray-200'
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType('header-six');
          }}
        >
          H6
        </button>
        <div className='relative p-2'>
          <select
            className='font-dropdown'
            onChange={(e) => applyFontFamily(e.target.value)}
            defaultValue='Arial'
          >
            <option value='font-family-Arial'>Arial</option>
            <option value='font-family-Georgia'>Georgia</option>
            <option value='font-family-Courier'>Courier</option>
            <option value='font-family-Times'>Times</option>
          </select>
        </div>
      </div>
      <div
        className='editor-container p-4 min-h-[200px] max-h-[400px] overflow-y-auto'
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={{
            CODE: {
              background: '#000',
              color: '#f8f8f2',
              fontFamily: 'monospace',
              padding: '10px',
              borderRadius: '4px',
              display: 'block',
              whiteSpace: 'pre-wrap',
            },
            'font-family-Arial': { fontFamily: 'Arial, sans-serif' },
            'font-family-Georgia': { fontFamily: 'Georgia, serif' },
            'font-family-Courier': {
              fontFamily: "'Courier New', Courier, monospace",
            },
            'font-family-Times': {
              fontFamily: "'Times New Roman', Times, serif",
            },
          }}
          blockStyleFn={(block) => {
            switch (block.getType()) {
              case 'blockquote':
                return 'custom-blockquote';
              default:
                return null;
            }
          }}
        />
      </div>
      <div className='text-right mt-2'>
        <button
          className='submit-button p-2 bg-blue-500 text-white rounded'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
