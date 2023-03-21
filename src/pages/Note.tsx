import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../components/NoteLayout";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps ) {
    const note = useNote()
    const navigate = useNavigate()
    return (
        <>
            <div>

            <div className="flex mt-28 pt-5 justify-around font-sora">

                <div className="flex flex-col ">
                    <h1 className="text-4xl px-5 pb-1 ">{note.title}</h1>
                    {note.tags.length > 0 && (
                        <div className="flex px-5 pb-5 flex-wrap">
                            {note.tags.map(tag => (
                                <div className="text-[11px] bg-sky-500 px-2 text-white font-mono rounded-xl ml-1" key={tag.id}>
                                {tag.label}
                            </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <Link to={`/${note.id}/edit`}>
                            <button className="btn-blue">
                                Edit
                            </button>
                        </Link>
                        <button 
                            onClick={() => {
                                onDelete(note.id)
                                navigate('/')
                            }}
                            className='btn-red'
                        >
                            Delete
                        </button>
                        <Link to={'..'}>
                                <button className="btn-gray">
                                    Back
                                </button>
                            </Link>
                    </div>

                </div>
            </div>
            <div className="mx-24 my-16">
                <ReactMarkdown>
                    {note.markdown}
                </ReactMarkdown>
            </div>
            </div>
        </>
    )
}

