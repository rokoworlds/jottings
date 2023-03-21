import { useMemo, useState, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { Tag } from "../App";
import { Dialog, Transition  } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import StartPage from "./StartPage";
import { useLocalStorage } from "../hooks/useLocalStorage";



type NoteListProps = {
    availableTags: Tag[] 
    notes: SimplifiedNote[]
    onDeleteTag:(id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type EditTagsModalProps = {
    show: boolean
    availableTags: Tag[] 
    handleClose: () => void
    onDeleteTag:(id: string) => void
    onUpdateTag: (id: string, label: string) => void
}


export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const [editTagsModelIsOpen, seteEditTagsModelIsOpen] = useState(false)
    let [isOpen, setIsOpen] = useState(true)


    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === '' || 
                note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))))
            })
        }, [title, selectedTags, notes])


    

    return (
        
        <div className="mt-20">
        <div >
            <div className="flex justify-end mr-6">
                <Link to='/new'>
                    <button className="btn-blue font-sora text-sm">
                        Create 
                    </button>
                </Link>
                <button 
                    className="btn-gray font-sora text-sm"
                    onClick={() => seteEditTagsModelIsOpen(true)}    
                >
                    Edit Tags
                </button>
            </div>

            <form className="flex flex-col justify-center items-center font-sora z-30" action="">

            <div className="mx-4">
                <div className="grid grid-cols-2 justify-center w-auto mb-6">
                    <div className="mr-10">
                        <h1 className="mb-2">Title</h1>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            className="bg-sky-50 p-2 w-full rounded-lg focus:outline-none
                             focus:border-blue-500 focus:ring-blue-500 focus:ring-1"/>
                    </div>
                    <div className="w-full ">
                        <h1 className="mb-2">Tags</h1>
                        <ReactSelect 
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
            </div>
        </form>
        <div className=" mx-7 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3">
        {filteredNotes.map(note => (
                    <div key={note.id} className=''>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </div>
                ))}
        </div>
        <EditTagsModal 
                show={editTagsModelIsOpen} 
                availableTags={availableTags} 
                handleClose={() => seteEditTagsModelIsOpen(false)} 
                onUpdateTag={onUpdateTag}
                onDeleteTag={onDeleteTag}
                />
        </div>
        <div className="animate-blob animation-delay-2000
                 filter blur-xl mix-blend-multiply absolute top-16 left-20 bg-sky-300 rounded-full
                 md:w-36 md:h-36  w-16 h-16">
                </div>
                <div className="animate-blob animation-delay-4000 filter blur-xl mix-blend-multiply absolute -bottom-12 left-20 w-64 h-64 bg-teal-300 rounded-full hidden md:block">
                </div>
                <div className="animate-blob animation-delay-2000 filter blur-xl mix-blend-multiply absolute -bottom-12 right-14 lg:w-80 lg:h-80 w-36 h-36 bg-green-300 rounded-full hidden md:block">
                </div>
        </div>
    )

}


function NoteCard({id, title, tags}: SimplifiedNote) {
    return (
        <Link to={`/${id}`}>
            <div className="bg-sky-100 h-28 rounded-lg flex  items-center justify-center shadow-lg transition ease-in-out hover:-translate-y-2 duration-300">
                <div className="gap-2 flex flex-col items-center justify-center h-28">
                    <span className="text-lg font-sora">{title}</span>
                    <div className="flex items-center justify-center flex-wrap">
                    {tags.map(tag => (
                            <div className="text-[11px] bg-sky-500 px-2 text-white font-mono rounded-xl ml-1" key={tag.id}>
                                {tag.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    ) 
}




function EditTagsModal({availableTags, show, handleClose, onDeleteTag, onUpdateTag}: EditTagsModalProps) {
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)
    
    return (
        <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-gray-900 sm:mx-0 sm:h-10 sm:w-10">
                      <FontAwesomeIcon icon={faTags} />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="font-semibold leading-6 my-2 text-lg text-gray-900">
                          Edit Tags
                        </Dialog.Title>
                        <div className="">
                            <div className="gap-2">
                                {availableTags.map(tag => (
                                    <div key={tag.id}>
                                        <div className="flex items-center justify-center gap-2 font-sora text-sm">
                                            <input 
                                                type="text"
                                                className="border p-2 ml-4 rounded-lg my-2"
                                                value={tag.label}
                                                onChange={e => onUpdateTag(tag.id, e.target.value)}
                                            />
                                            <div>
                                                <button 
                                                    onClick={() => onDeleteTag(tag.id)}
                                                    className="btn-red-tags"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>





    )}