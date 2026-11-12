export type { ContactFormValues } from '../../lib/schemas/contact-form';

export type ContactQuotePayload = {
	name: string;
	email: string;
	phone: string;
	vehicle?: string;
	message: string;
	/** Public URLs returned by the upload endpoint */
	photos?: string[];
} & Partial<LargeVehicleQuoteFields>;

/**
 * Truck & campervan form answers, sent as their own fields. The backend (Google Apps Script)
 * shows them under "Job Details" in the quote email and gives each a column in the Quote Requests sheet.
 */
export type LargeVehicleQuoteFields = {
	form: 'truck-campervan';
	enquiringAs: 'Individual' | 'Company';
	companyName?: string;
	vehicleType: string;
	service: string;
	insuranceClaim: 'Yes' | 'No';
	insurer?: string;
	claimNumber?: string;
};

export type ContactQuoteResponse = {
	success: boolean;
	message: string;
};

export type ContactUploadResponse = {
	success: boolean;
	message?: string;
	key: string;
	url: string;
};
