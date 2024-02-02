import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
	const [currentlyOpenWindowName, setCurrentlyOpenWindowName] = useState("");

	const closeModalWindow = () => setCurrentlyOpenWindowName("");
	const openModalWindow = setCurrentlyOpenWindowName;

	return (
		<ModalContext.Provider
			value={{ currentlyOpenWindowName, closeModalWindow, openModalWindow }}
		>
			{children}
		</ModalContext.Provider>
	);
};

// Note: cloneElement is uncommon: creates a new React element using another element as a starting point, we can then pass in props

//opens-> which window this open button opens or is associated to
const Open = ({ children, opens }) => {
	const { openModalWindow } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => openModalWindow(opens) });
};

const Window = ({ children, name }) => {
	const { currentlyOpenWindowName, closeModalWindow } =
		useContext(ModalContext);
	const ref = useClickOutside(closeModalWindow);

	if (name !== currentlyOpenWindowName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={closeModalWindow}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: closeModalWindow })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
