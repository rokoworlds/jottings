import { NoteData, Tag } from "../App";
import { NoteForm } from '../components/NoteForm'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewNote(  {onSubmit, onAddTag, availableTags} : NewNoteProps ) {
    return (
        <>
        <div className='mt-28 mx-4'>
            <h1 className="mb-4 text-center font-sora text-xl">New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
        </>
    )
}