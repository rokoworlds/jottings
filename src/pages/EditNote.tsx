import { NoteData, Tag } from "../App"
import { NoteForm } from '../components/NoteForm'
import { useNote } from "../components/NoteLayout"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function EditNote( {onSubmit, onAddTag, availableTags} : EditNoteProps ) {
    const note = useNote()
    return (
        <>
        <div className='mt-28'>
            <h1 className="mb-4 text-center font-sora text-xl">Edit Note</h1>
            <NoteForm 
                title={note.title}
                markdown={note.markdown}
                tags={note.tags} 
                onSubmit={data => onSubmit(note.id, data)} 
                onAddTag={onAddTag} 
                availableTags={availableTags}
            />
        </div>
        </>
    )
}