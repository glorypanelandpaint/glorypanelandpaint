import { api } from '../client';
import type { ContactFormValues, LargeVehicleValues } from '../../lib/schemas/contact-form';
import type { ContactQuotePayload, ContactQuoteResponse } from './types';

/**
 * The quote backend only knows name, phone, email, vehicle, message and photos,
 * so the truck & campervan answers go at the top of the message.
 */
function largeVehicleSummary(details: LargeVehicleValues): string {
	const customer =
		details.enquiringAs === 'company'
			? `Company (${details.companyName.trim()})`
			: 'Individual';
	const claimNumber = details.claimNumber.trim();
	const claim =
		details.insuranceClaim === 'yes'
			? ['Yes', details.insurer, claimNumber && `claim number ${claimNumber}`]
				.filter(Boolean)
				.join(', ')
			: 'No';

	return [
		`Enquiring as: ${customer}`,
		`Vehicle type: ${details.vehicleType}`,
		`Service: ${details.service}`,
		`Insurance claim: ${claim}`,
	].join('\n');
}

function toQuotePayload(values: ContactFormValues): ContactQuotePayload {
	const details = values.largeVehicle;
	const vehicle = values.vehicle.trim();
	const message = values.message.trim();

	if (!details) {
		return {
			name: values.name.trim(),
			phone: values.phone.trim(),
			email: values.email.trim(),
			vehicle: vehicle || undefined,
			message,
			photos: values.photos.length > 0 ? values.photos : undefined,
		};
	}

	return {
		name: values.name.trim(),
		phone: values.phone.trim(),
		email: values.email.trim(),
		vehicle: [details.vehicleType, vehicle].filter(Boolean).join(' – '),
		message: `${largeVehicleSummary(details)}\n\n${message}`,
		photos: values.photos.length > 0 ? values.photos : undefined,
	};
}

export async function submitContactForm(
	values: ContactFormValues,
) {
	return api.post<ContactQuoteResponse>('/quote-request', toQuotePayload(values));
}
