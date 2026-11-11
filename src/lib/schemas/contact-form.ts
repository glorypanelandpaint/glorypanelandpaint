import { z } from 'zod';
import { personEmailSchema, personNameSchema, personPhoneSchema } from './person-fields';

const contactPhotoSchema = z
	.file()
	.max(30 * 1024 * 1024, 'Each photo must be 30 MB or smaller.')
	.mime(
		['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
		'Photos must be JPG, PNG, HEIC or WebP.',
	);

export function validateContactPhoto(file: File): string | null {
	const result = contactPhotoSchema.safeParse(file);
	if (result.success) return null;
	return result.error.issues[0]?.message ?? 'Invalid file.';
}

/** Extra questions on the truck & campervan quote form. */
const largeVehicleSchema = z
	.object({
		enquiringAs: z.enum(['individual', 'company']),
		companyName: z.string(),
		vehicleType: z.string().min(1, 'Please choose a vehicle type.'),
		service: z.string().min(1, 'Please choose what you need.'),
		insuranceClaim: z.enum(['yes', 'no']),
		insurer: z.string(),
		claimNumber: z.string(),
	})
	.superRefine((value, ctx) => {
		if (value.enquiringAs === 'company' && !value.companyName.trim()) {
			ctx.addIssue({
				code: 'custom',
				path: ['companyName'],
				message: 'Please enter your company name.',
			});
		}
		if (value.insuranceClaim === 'yes' && !value.insurer) {
			ctx.addIssue({
				code: 'custom',
				path: ['insurer'],
				message: "Please choose your insurer, or select No if this isn't an insurance claim.",
			});
		}
	});

export type LargeVehicleValues = z.infer<typeof largeVehicleSchema>;

export const contactFormSchema = z.object({
	name: personNameSchema,
	phone: personPhoneSchema,
	email: personEmailSchema,
	vehicle: z.string(),
	message: z
		.string()
		.trim()
		.min(1, 'Please tell us how we can help.'),
	photos: z
		.array(z.url())
		.max(8, 'You can upload up to 8 photos.'),
	/** Only on the truck & campervan form. */
	largeVehicle: largeVehicleSchema.optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
