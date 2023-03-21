import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatebleReactSelect from 'react-select/creatable'
import { NoteData, Tag } from "../App";
import {v4 as uuidV4} from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
   } & Partial<NoteData>

export function NoteForm({ 
    onSubmit, onAddTag, availableTags, title='', markdown='', tags= [] 
} : NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,

        })
        navigate('..')
    }

    return (
        <div className="mx-4">
        <form className="flex flex-col justify-center items-center font-sora z-30" onSubmit={handleSubmit} action="">

            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-auto mb-6 mx-2">
                    <div className="mr-10 h-auto">
                        <h1 className="mb-2">Title</h1>
                        <input type="text" ref={titleRef} required defaultValue={title} className="bg-sky-50 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"/>
                    </div>
                    <div className="w-full ">
                        <h1 className="mb-2">Tags</h1>
                        <CreatebleReactSelect  onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label}
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id}
                                })}
                                isMulti
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id}
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return {label: tag.label, id: tag.value }
                                    }))
                                }}  />
                        
                    </div>
                </div>
                <div>
                    <h1 className="mb-4">Body</h1>
                    <textarea name="" id="" cols={70} rows={10} defaultValue={markdown} ref={markdownRef} required className="bg-sky-50 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"></textarea>
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="btn-blue ">Save</button>
                    <Link to="..">
                        <button className="btn-gray">Cancel</button>
                    </Link>
                </div>
            </div>
        </form>

                <div className="animate-blob animation-delay-2000
                 filter blur-xl mix-blend-multiply absolute top-0 right-20 bg-sky-300 rounded-full
                 md:w-36 md:h-36  w-16 h-16">
                </div>
                <div className="animate-blob animation-delay-4000 filter blur-xl mix-blend-multiply absolute -bottom-12 left-20 w-64 h-64 bg-teal-300 rounded-full">
                </div>
                <div className="animate-blob animation-delay-2000 filter blur-xl mix-blend-multiply absolute -bottom-12 right-14 xl:w-80 xl:h-80 w-36 h-36 bg-green-300 rounded-full z-10">
                </div>
        </div>
    )

}