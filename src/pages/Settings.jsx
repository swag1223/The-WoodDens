import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

const Settings = () => {
	return (
		<>
			<Heading as="h1">Update hotel settings</Heading>
			<UpdateSettingsForm />
		</>
	);
};

export default Settings;
