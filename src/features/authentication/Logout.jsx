import { HiArrowRightOnRectangle } from "react-icons/hi2";

import useLogout from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
	const { logout, isLoading: isLoggingOut } = useLogout();

	return (
		<ButtonIcon disabled={isLoggingOut} onClick={logout}>
			{!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
};

export default Logout;
