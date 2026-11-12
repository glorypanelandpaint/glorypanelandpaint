import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	contactFormSchema,
	validateContactPhoto,
	type ContactFormValues,
} from '../../lib/schemas/contact-form';
import { submitContactForm, uploadContactFile } from '../../api/contact';
import { trackEvent } from '../../lib/analytics';
import {
	insurers,
	serviceGroups,
	vehicleTypes,
	type VehicleType,
} from '../../data/quote-options';
import { Button } from '@/components/ui/button';

interface Props {
	quotesEmail: string;
	/** "large-vehicle" adds the truck & campervan questions. */
	variant?: 'standard' | 'large-vehicle';
	/** Vehicle type chosen in advance on a vehicle-specific page. */
	defaultVehicleType?: VehicleType;
}

type PhotoUpload = {
	id: string;
	name: string;
	status: 'uploading' | 'done' | 'error';
	url?: string;
	error?: string;
};

const defaultValues: ContactFormValues = {
	name: '',
	phone: '',
	email: '',
	vehicle: '',
	message: '',
	photos: [],
};

function getStartValues(
	variant: Props['variant'],
	defaultVehicleType?: VehicleType,
): ContactFormValues {
	if (variant !== 'large-vehicle') return defaultValues;
	return {
		...defaultValues,
		largeVehicle: {
			enquiringAs: 'individual',
			companyName: '',
			vehicleType: defaultVehicleType ?? '',
			service: '',
			// Defaults to Yes so nobody skips past the question.
			insuranceClaim: 'yes',
			insurer: '',
			claimNumber: '',
		},
	};
}

function syncPhotoUrls(
	uploads: PhotoUpload[],
	setValue: ReturnType<typeof useForm<ContactFormValues>>['setValue'],
) {
	const urls = uploads
		.filter((item): item is PhotoUpload & { url: string } => item.status === 'done' && !!item.url)
		.map((item) => item.url);
	setValue('photos', urls, { shouldValidate: true });
}

export default function ContactForm({ quotesEmail, variant, defaultVehicleType }: Props) {
	const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
	const [successMessage, setSuccessMessage] = useState('');
	const [uploads, setUploads] = useState<PhotoUpload[]>([]);
	const [fileError, setFileError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isLargeVehicle = variant === 'large-vehicle';
	const startValues = useMemo(
		() => getStartValues(variant, defaultVehicleType),
		[variant, defaultVehicleType],
	);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		setError,
		clearErrors,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: startValues,
	});

	const largeVehicle = watch('largeVehicle');
	const largeVehicleErrors = errors.largeVehicle;

	const startUpload = (file: File) => {
		const id = crypto.randomUUID();
		setUploads((prev) => [...prev, { id, name: file.name, status: 'uploading' }]);

		uploadContactFile(file)
			.then((url) => {
				setUploads((prev) => {
					const next = prev.map((item) =>
						item.id === id ? { ...item, status: 'done' as const, url } : item,
					);
					syncPhotoUrls(next, setValue);
					return next;
				});
				window.posthog?.capture("quote_photo_uploaded");
			})
			.catch((err) => {
				setUploads((prev) =>
					prev.map((item) =>
						item.id === id
							? { ...item, status: 'error' as const, error: 'Upload failed' }
							: item,
					),
				);
				window.posthog?.captureException(err);
			});
	};

	const addPhotos = (files: FileList | null) => {
		if (!files?.length) return;

		const remaining = 8 - uploads.length;
		if (remaining <= 0) {
			setFileError('You can upload up to 8 photos.');
			return;
		}

		const toAdd = Array.from(files).slice(0, remaining);
		setFileError(null);
		clearErrors('photos');

		for (const file of toAdd) {
			const validationError = validateContactPhoto(file);
			if (validationError) {
				setFileError(validationError);
				continue;
			}
			startUpload(file);
		}
	};

	const removePhoto = (id: string) => {
		setUploads((prev) => {
			const next = prev.filter((item) => item.id !== id);
			syncPhotoUrls(next, setValue);
			return next;
		});
		setFileError(null);
	};

	const onSubmit = handleSubmit(async (values) => {
		if (uploads.some((item) => item.status === 'uploading')) {
			setError('root', { message: 'Please wait for photos to finish uploading.' });
			return;
		}

		setStatus('submitting');
		clearErrors('root');

		try {
			const result = await submitContactForm(values);
			setSuccessMessage(result.message);
			setStatus('success');
			reset(startValues);
			setUploads([]);
			if (fileInputRef.current) fileInputRef.current.value = '';
			const details = values.largeVehicle;
			// No personal details: no names, contact details, rego, company or claim number.
			trackEvent('quote_request_submitted', {
				form_variant: details ? 'large_vehicle' : 'standard',
				has_vehicle: !!values.vehicle.trim(),
				photo_count: values.photos.length,
				vehicle_type: details?.vehicleType,
				service: details?.service,
				enquiring_as: details?.enquiringAs,
				insurance_claim: details?.insuranceClaim,
				insurer: details?.insuranceClaim === 'yes' ? details.insurer : undefined,
			});
		} catch (err) {
			setError('root', {
				message: 'Something went wrong. Please try again or email us directly.',
			});
			setStatus('idle');
			window.posthog?.captureException(err);
		}
	});

	if (status === 'success') {
		return (
			<div className="glory-form" aria-live="polite">
				<div className="form-message form-message--success">{successMessage}</div>
				<button
					type="button"
					className="glory-btn-outline"
					style={{ marginTop: '16px' }}
					onClick={() => setStatus('idle')}
				>
					Send another request
				</button>
			</div>
		);
	}

	const hasUploading = uploads.some((item) => item.status === 'uploading');
	const submitting = status === 'submitting' || isSubmitting;

	return (
		<form className="glory-form" onSubmit={onSubmit} noValidate aria-label="Quote request form">
			{errors.root && <div className="form-message form-message--error">{errors.root.message}</div>}

			<div className="field">
				<label htmlFor="contact-name">Your name</label>
				<input
					id="contact-name"
					type="text"
					autoComplete="name"
					placeholder="Jane Smith"
					aria-invalid={!!errors.name}
					{...register('name')}
				/>
				{errors.name && <div className="field-error">{errors.name.message}</div>}
			</div>

			<div className="field-row">
				<div className="field">
					<label htmlFor="contact-phone">Phone</label>
					<input
						id="contact-phone"
						type="tel"
						autoComplete="tel"
						placeholder="021 123 4567"
						aria-invalid={!!errors.phone}
						{...register('phone')}
					/>
					{errors.phone && <div className="field-error">{errors.phone.message}</div>}
				</div>

				<div className="field">
					<label htmlFor="contact-email">Email</label>
					<input
						id="contact-email"
						type="email"
						autoComplete="email"
						placeholder="you@email.com"
						aria-invalid={!!errors.email}
						{...register('email')}
					/>
					{errors.email && <div className="field-error">{errors.email.message}</div>}
				</div>
			</div>

			{isLargeVehicle && (
				<>
					<fieldset className="field field-choice">
						<legend>Enquiring as</legend>
						<label>
							<input
								type="radio"
								value="individual"
								defaultChecked={startValues.largeVehicle?.enquiringAs === 'individual'}
								{...register('largeVehicle.enquiringAs')}
							/>
							Individual
						</label>
						<label>
							<input
								type="radio"
								value="company"
								defaultChecked={startValues.largeVehicle?.enquiringAs === 'company'}
								{...register('largeVehicle.enquiringAs')}
							/>
							Company
						</label>
					</fieldset>

					{largeVehicle?.enquiringAs === 'company' && (
						<div className="field">
							<label htmlFor="contact-company">
								Company name <span className="req" aria-hidden="true">*</span>
							</label>
							<input
								id="contact-company"
								type="text"
								autoComplete="organization"
								placeholder="ABC Transport Ltd"
								aria-required="true"
								aria-invalid={!!largeVehicleErrors?.companyName}
								{...register('largeVehicle.companyName')}
							/>
							{largeVehicleErrors?.companyName && (
								<div className="field-error">{largeVehicleErrors.companyName.message}</div>
							)}
						</div>
					)}

					<div className="field-row">
						<div className="field">
							<label htmlFor="contact-vehicle-type">Vehicle type</label>
							<select
								id="contact-vehicle-type"
								className={largeVehicle?.vehicleType ? undefined : 'is-placeholder'}
								defaultValue={startValues.largeVehicle?.vehicleType}
								aria-invalid={!!largeVehicleErrors?.vehicleType}
								{...register('largeVehicle.vehicleType')}
							>
								<option value="" disabled hidden>
									Choose a vehicle type
								</option>
								{vehicleTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
							{largeVehicleErrors?.vehicleType && (
								<div className="field-error">{largeVehicleErrors.vehicleType.message}</div>
							)}
						</div>

						<div className="field">
							<label htmlFor="contact-service">What do you need?</label>
							<select
								id="contact-service"
								className={largeVehicle?.service ? undefined : 'is-placeholder'}
								defaultValue={startValues.largeVehicle?.service}
								aria-invalid={!!largeVehicleErrors?.service}
								{...register('largeVehicle.service')}
							>
								<option value="" disabled hidden>
									Choose a service
								</option>
								{serviceGroups.map((group) => (
									<optgroup key={group.label} label={group.label}>
										{group.options.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</optgroup>
								))}
							</select>
							{largeVehicleErrors?.service && (
								<div className="field-error">{largeVehicleErrors.service.message}</div>
							)}
						</div>
					</div>
				</>
			)}

			<div className="field">
				<label htmlFor="contact-vehicle">Vehicle (make / model / rego)</label>
				<input
					id="contact-vehicle"
					type="text"
					placeholder={isLargeVehicle ? 'Isuzu FRR, ABC123' : 'Toyota Corolla, ABC123'}
					{...register('vehicle')}
				/>
			</div>

			{isLargeVehicle && (
				<>
					<fieldset className="field field-choice">
						<legend>Is this an insurance claim?</legend>
						<label>
							<input
								type="radio"
								value="yes"
								defaultChecked={startValues.largeVehicle?.insuranceClaim === 'yes'}
								{...register('largeVehicle.insuranceClaim')}
							/>
							Yes
						</label>
						<label>
							<input
								type="radio"
								value="no"
								defaultChecked={startValues.largeVehicle?.insuranceClaim === 'no'}
								{...register('largeVehicle.insuranceClaim')}
							/>
							No
						</label>
					</fieldset>

					{largeVehicle?.insuranceClaim === 'yes' && (
						<div className="field-row">
							<div className="field">
								<label htmlFor="contact-insurer">Insurance company</label>
								<select
									id="contact-insurer"
									className={largeVehicle.insurer ? undefined : 'is-placeholder'}
									defaultValue={startValues.largeVehicle?.insurer}
									aria-invalid={!!largeVehicleErrors?.insurer}
									{...register('largeVehicle.insurer')}
								>
									<option value="" disabled hidden>
										Choose your insurer
									</option>
									{insurers.map((insurer) => (
										<option key={insurer} value={insurer}>
											{insurer}
										</option>
									))}
								</select>
								{largeVehicleErrors?.insurer && (
									<div className="field-error">{largeVehicleErrors.insurer.message}</div>
								)}
							</div>

							<div className="field">
								<label htmlFor="contact-claim-number">Claim number (if you have it)</label>
								<input
									id="contact-claim-number"
									type="text"
									placeholder="CLM1234567"
									{...register('largeVehicle.claimNumber')}
								/>
							</div>
						</div>
					)}
				</>
			)}

			<div className="field">
				<label htmlFor="contact-message">How can we help?</label>
				<textarea
					id="contact-message"
					placeholder="Tell us about the damage…"
					aria-invalid={!!errors.message}
					{...register('message')}
				/>
				{errors.message && <div className="field-error">{errors.message.message}</div>}
			</div>

			<div className="field">
				<label htmlFor="contact-photos">Upload damage photos (optional)</label>
				<div
					className="glory-upload"
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => {
						e.preventDefault();
						addPhotos(e.dataTransfer.files);
					}}
				>
					<input
						ref={fileInputRef}
						id="contact-photos"
						type="file"
						accept="image/jpg,image/jpeg,image/png,image/webp,image/heic,image/heif,.heic"
						multiple
						onChange={(e) => {
							addPhotos(e.target.files);
							e.target.value = '';
						}}
					/>
					<div className="glory-upload__inner">
						<p className="glory-upload__title">Drag &amp; Drop Files Here</p>
						<span className="glory-upload__or">or</span>
						<button
							type="button"
							className="glory-upload__browse"
							onClick={() => fileInputRef.current?.click()}
						>
							Browse Files
						</button>
					</div>
					<span className="glory-upload__count" aria-live="polite">
						{uploads.length} of 8
					</span>
				</div>
				{(fileError || errors.photos) && (
					<div className="field-error">{fileError ?? errors.photos?.message}</div>
				)}
				{uploads.length > 0 && (
					<ul className="glory-upload__list">
						{uploads.map((item) => (
							<li
								key={item.id}
								className={
									item.status === 'uploading'
										? 'glory-upload__list-item--uploading'
										: item.status === 'error'
											? 'glory-upload__list-item--error'
											: undefined
								}
							>
								<span>
									{item.name}
									{item.status === 'uploading' && (
										<span className="glory-upload__status"> — Uploading…</span>
									)}
									{item.status === 'done' && (
										<span className="glory-upload__status glory-upload__status--done"> — Uploaded</span>
									)}
									{item.status === 'error' && (
										<span className="glory-upload__status glory-upload__status--error">
											{' '}
											— {item.error}
										</span>
									)}
								</span>
								<button
									type="button"
									onClick={() => removePhoto(item.id)}
									aria-label={`Remove ${item.name}`}
									disabled={item.status === 'uploading'}
								>
									&times;
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="field">
				<Button
					type="submit"
					variant="gold"
					size="xl"
					loading={submitting}
					disabled={hasUploading}
				>
					{hasUploading ? 'Waiting for uploads…' : 'Submit'}
				</Button>
			</div>

			<p className="glory-form__fallback">
				Or email us directly at{' '}
				<a href={`mailto:${quotesEmail}`}>{quotesEmail}</a>
			</p>
		</form>
	);
}
