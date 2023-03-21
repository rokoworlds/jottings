import StartPage from "./pages/StartPage"
import { Navigate, Route, Routes } from 'react-router-dom'
import { NewNote } from "./pages/NewNote"
import { EditNote } from "./pages/EditNote"
import { Navbar } from "./components/Navbar"
import { NoteList } from "./pages/NoteList"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react"
import {v4 as uuidV4} from 'uuid'
import { NoteLayout } from "./components/NoteLayout"
import { Note } from "./pages/Note"


export type Tag = {
  id: string
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Note = {
  id: string
} & NoteData



function App() {
  
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])


  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function onUpdateNote(id: string, { tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {...tag, label}
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
  <>
    <Navbar />
    <Routes>
      <Route path="/welcome" element={<StartPage/>}></Route>
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}></Route>
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}></Route>
      <Route path='*' element={<Navigate to='/welcome' />} />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />}></Route>
      </Route>
    </Routes>


  </>
  )
}

export default App
