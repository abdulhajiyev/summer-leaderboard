import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Section,
} from "@react-email/components";

interface BetterAuthResetPasswordEmailProps {
	username?: string;
	resetLink?: string;
}

export const ResetPasswordEmail = ({
	username,
	resetLink,
}: BetterAuthResetPasswordEmailProps) => {
	const previewText = `Better Auth şifrənizi sıfırlayın`;
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							<strong>Better Auth</strong> şifrənizi sıfırlayın
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Salam {username},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Better Auth hesabınızın şifrəsini sıfırlamaq üçün bir sorğu
							qəbul etdik. Əgər bu sorğunu siz etməmisinizsə, bu e-poçtu
							nəzərə almayın.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={resetLink}
							>
								Şifrəni Sıfırla
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Və ya bu URL-i kopyalayıb brauzerinizə yapışdırın:
							<Link href={resetLink} className="text-blue-600 no-underline">
								{resetLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Əgər şifrə sıfırlama tələbi etməmisinizsə, bu e-poçtu
							gözardı edin və ya narahatlığınız varsa dəstək xidməti ilə
							əlaqə saxlayın.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export function reactResetPasswordEmail(
	props: BetterAuthResetPasswordEmailProps,
) {
	return <ResetPasswordEmail {...props} />;
}