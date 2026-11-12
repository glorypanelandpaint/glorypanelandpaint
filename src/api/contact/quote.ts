import { api } from '../client';
import type { ContactFormValues, LargeVehicleValues } from '../../lib/schemas/contact-form';
import type { ContactQuotePayload, ContactQuoteResponse, LargeVehicleQuoteFields } from './types';

/**
 * Truck & campervan answers go to the backend as their own fields; the quote email lists them
 * under "Job Details". Answers that don't apply (company name for individuals, insurer when
 * it isn't a claim) are left out.
 */
function largeVehicleFields(details: LargeVehicleValues): LargeVehicleQuoteFields {
	const isCompany = details.enquiringAs === 'company';
	const isClaim = details.insuranceClaim === 'yes';

	return {
		form: 'truck-campervan',
		enquiringAs: isCompany ? 'Company' : 'Individual',
		companyName: isCompany ? details.companyName.trim() : undefined,
		vehicleType: details.vehicleType,
		service: details.service,
		insuranceClaim: isClaim ? 'Yes' : 'No',
		insurer: isClaim ? details.insurer : undefined,
		claimNumber: isClaim ? details.claimNumber.trim() || undefined : undefined,
	};
}

function toQuotePayload(values: ContactFormValues): ContactQuotePayload {
	const payload: ContactQuotePayload = {
		name: values.name.trim(),
		phone: values.phone.trim(),
		email: values.email.trim(),
		vehicle: values.vehicle.trim() || undefined,
		message: values.message.trim(),
		photos: values.photos.length > 0 ? values.photos : undefined,
	};

	return values.largeVehicle ? { ...payload, ...largeVehicleFields(values.largeVehicle) } : payload;
}

export async function submitContactForm(
	values: ContactFormValues,
) {
	return api.post<ContactQuoteResponse>('/quote-request', toQuotePayload(values));
}
