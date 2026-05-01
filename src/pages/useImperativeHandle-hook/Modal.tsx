import {useState, useImperativeHandle, forwardRef} from "react";

export type modalRef = {
    openModal: () => void,
    closeModal: () => void,
    toggleModal: () => void
}

export type modalProps = {
    children?: React.ReactNode,
}

export const Modal = forwardRef<modalRef, modalProps>(({children}, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    
    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        toggleModal: () => setIsOpen(prev => !prev)
    }), [])

    if(!isOpen) return null;
    
    return <article className="modal">
        <h1>Modal Title</h1>
        <p>Modal Content</p>
        {children}
        <p>Modal Status = {isOpen}</p>
        <button type="button" onClick={() => setIsOpen(false)}>Close</button>
    </article>
})