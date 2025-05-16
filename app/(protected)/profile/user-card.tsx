"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient, signOut } from "@/lib/auth-client";
import { Edit, Loader2, LogOut, StopCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSessionContext } from "@/components/session-context";
import { MdOutlinePassword } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import type { Session, User } from "better-auth/types";

export default function UserCard() {
	const router = useRouter();
	const { session, isLoading } = useSessionContext();

	const [isSignOut, setIsSignOut] = useState<boolean>(false);
	const [emailVerificationPending, setEmailVerificationPending] =
		useState<boolean>(false);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Loader2 size={24} className="animate-spin" />
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>İstifadəçi ayarları</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8 grid-cols-1">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex ">
								<AvatarImage
									src={session?.user.image || undefined}
									alt="Avatar"
									className="object-cover"
								/>
								<AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="grid">
								<div className="flex items-center gap-1">
									<p className="text-sm font-medium leading-none">
										{session?.user.name}
									</p>
								</div>
								<p className="text-sm">{session?.user.email}</p>
							</div>
						</div>
						<EditUserDialog />
					</div>
				</div>

				{session?.user.emailVerified ? null : (
					<Alert variant="destructive">
						<AlertTitle>E-poçt ünvanınızı təsdiqləyin</AlertTitle>
						<AlertDescription className="text-muted-foreground">
							Zəhmət olmasa e-poçt ünvanınızı təsdiqləyin. Əgər təsdiq e-poçtunu
							almadınızsa, yenidən göndərmək üçün aşağıdakı düyməyə klikləyin.
						</AlertDescription>
						<div className="mt-2">
							<Button
								className="cursor-pointer"
								size="sm"
								onClick={async () => {
									await authClient.sendVerificationEmail(
										{
											email: session?.user.email || "",
										},
										{
											onRequest(context) {
												setEmailVerificationPending(true);
											},
											onError(context) {
												toast.error(context.error.message);
												setEmailVerificationPending(false);
											},
											onSuccess() {
												toast.success("Təsdiq e-poçtu uğurla göndərildi");
												setEmailVerificationPending(false);
											},
										},
									);
								}}
							>
								{emailVerificationPending ? (
									<Loader2 size={15} className="animate-spin" />
								) : (
									"Təstiq E-poçtunu yenidən göndər"
								)}
							</Button>
						</div>
					</Alert>
				)}
			</CardContent>
			<CardFooter className="gap-2 justify-between items-center">
				<ChangePassword />

				<Button
					className="gap-2 z-10 cursor-pointer"
					variant="secondary"
					onClick={async () => {
						setIsSignOut(true);
						await signOut({
							fetchOptions: {
								onSuccess() {
									router.push("/");
									router.refresh();
								},
							},
						});
						setIsSignOut(false);
					}}
					disabled={isSignOut}
				>
					<span className="text-sm">
						{isSignOut ? (
							<Loader2 size={15} className="animate-spin" />
						) : (
							<div className="flex items-center gap-2">
								<LogOut size={16} />
								Çıxış et
							</div>
						)}
					</span>
				</Button>
			</CardFooter>
		</Card>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [signOutDevices, setSignOutDevices] = useState<boolean>(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="gap-2 z-10 cursor-pointer"
					variant="outline"
					size="sm"
				>
					<MdOutlinePassword />

					<span className="text-sm text-muted-foreground">Şifrəni dəyiş</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] w-11/12">
				<DialogHeader>
					<DialogTitle>Şifrəni dəyiş</DialogTitle>
					<DialogDescription>Şifrənizi dəyişin</DialogDescription>
				</DialogHeader>
				<div className="grid gap-2">
					<Label htmlFor="current-password">Cari Şifrə</Label>
					<PasswordInput
						id="current-password"
						value={currentPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCurrentPassword(e.target.value)
						}
						autoComplete="new-password"
						placeholder="Şifrə"
					/>
					<Label htmlFor="new-password">Yeni Şifrə</Label>
					<PasswordInput
						value={newPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewPassword(e.target.value)
						}
						autoComplete="new-password"
						placeholder="Yeni Şifrə"
					/>
					<Label htmlFor="password">Şifrəni Təsdiqlə</Label>
					<PasswordInput
						value={confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirmPassword(e.target.value)
						}
						autoComplete="new-password"
						placeholder="Şifrəni Təsdiqlə"
					/>
					<div className="flex gap-2 items-center">
						<Checkbox
							onCheckedChange={(checked) =>
								checked ? setSignOutDevices(true) : setSignOutDevices(false)
							}
						/>
						<p className="text-sm">Digər cihazlardan çıxış et</p>
					</div>
				</div>
				<DialogFooter>
					<Button
						className="cursor-pointer"
						onClick={async () => {
							if (newPassword !== confirmPassword) {
								toast.error("Şifrələr uyğun gəlmir");
								return;
							}
							if (newPassword.length < 8) {
								toast.error("Şifrə ən azı 8 simvoldan ibarət olmalıdır");
								return;
							}
							setLoading(true);
							const res = await authClient.changePassword({
								newPassword: newPassword,
								currentPassword: currentPassword,
								revokeOtherSessions: signOutDevices,
							});
							setLoading(false);
							if (res.error) {
								toast.error(
									res.error.message ||
										"Şifrənizi dəyişmək mümkün olmadı! Düzgün olduğundan əmin olun",
								);
							} else {
								setOpen(false);
								toast.success("Şifrə uğurla dəyişdirildi");
								setCurrentPassword("");
								setNewPassword("");
								setConfirmPassword("");
							}
						}}
					>
						{loading ? (
							<Loader2 size={15} className="animate-spin" />
						) : (
							"Şifrəni dəyiş"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function EditUserDialog() {
	const { session } = useSessionContext();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const router = useRouter();
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	// populate with existing session values
	useEffect(() => {
		if (session) {
			const [first, ...rest] = session.user.name.split(" ");
			setFirstName(first);
			setLastName(rest.join(" "));
			setImagePreview(session.user.image || null);
		}
	}, [session]);
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-2 cursor-pointer" variant="secondary">
					<Edit size={13} />
					{/* Edit User in Azerbaijani */}
					Redaktə et
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] w-11/12">
				<DialogHeader>
					<DialogTitle>İstifadəçini redaktə edin</DialogTitle>
					<DialogDescription>
						İstifadəçi məlumatlarını redaktə edin
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-2">
					<Label htmlFor="first-name">Ad</Label>
					<Input
						id="first-name"
						type="text"
						value={firstName}
						placeholder="Ad"
						required
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Label htmlFor="last-name">Soyad</Label>
					<Input
						id="last-name"
						type="text"
						value={lastName}
						placeholder="Soyad"
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
					<div className="grid gap-2">
						<Label htmlFor="image">Profil Şəkli</Label>
						<div className="flex gap-4">
							{imagePreview && (
								// <div className="flex">
								<Image
									src={imagePreview}
									alt="Profil önizləməsi"
									width={96}
									height={96}
									className="rounded-sm object-cover"
								/>
								// </div>
							)}
							<div className="flex items-center gap-2 w-full">
								<Input
									id="image"
									type="file"
									accept="image/*"
									required
									onChange={handleImageChange}
									className="w-full text-muted-foreground"
								/>
								{imagePreview && (
									<X
										className="cursor-pointer"
										onClick={() => {
											setImage(null);
											setImagePreview(null);
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						className="cursor-pointer"
						disabled={isLoading}
						onClick={async () => {
							setIsLoading(true);
							await authClient.updateUser({
								image: image ? await convertImageToBase64(image) : undefined,
								name: `${firstName || ""} ${lastName || ""}`.trim(),
								fetchOptions: {
									onSuccess: () => {
										toast.success("İstifadəçi uğurla yeniləndi");
									},
									onError: (error) => {
										toast.error(error.error.message);
									},
								},
							});
							setFirstName("");
							setLastName("");
							router.refresh();
							setImage(null);
							setImagePreview(null);
							setIsLoading(false);
							setOpen(false);
						}}
					>
						{isLoading ? (
							<Loader2 size={15} className="animate-spin" />
						) : (
							"Yenilə"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
