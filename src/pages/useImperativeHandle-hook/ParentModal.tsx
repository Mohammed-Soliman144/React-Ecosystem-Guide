import { useRef } from "react";
import { type modalRef, Modal } from "./Modal";


export const ParentModal = () => {
    const modalRef = useRef<modalRef>(null)
    return <div className="container">
        <Modal ref={modalRef}>
            <p>Additional Content</p>
        </Modal>
        <button type="button" onClick={() => modalRef.current?.openModal()}>Open</button>
        <button type="button" onClick={() => modalRef.current?.toggleModal()}>Toggle</button>
        <button type="button" onClick={() => modalRef.current?.closeModal()}></button>
    </div>
}