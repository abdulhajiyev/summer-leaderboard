import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex justify-center py-24 my-auto">
			<SignIn signUpUrl="/signup"/>
		</div>
	);
}
