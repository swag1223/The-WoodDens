import { useEffect, useRef } from "react";

const useClickOutside = (handler, listenCapturing = true) => {
	const ref = useRef();

	useEffect(() => {
		const handleClickOutsideModal = (e) => {
			if (ref.current && !ref.current.contains(e.target)) handler();
		};
		document.addEventListener(
			"click",
			handleClickOutsideModal,
			listenCapturing
		);

		return () =>
			document.removeEventListener(
				"click",
				handleClickOutsideModal,
				listenCapturing
			);
	}, [handler, listenCapturing]);

	return ref;
};

export default useClickOutside;
