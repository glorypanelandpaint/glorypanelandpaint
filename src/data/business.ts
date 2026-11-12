export const business = {
  name: "Glory Panel & Paint",
  url: "https://glorypanelandpaint.co.nz/",
  phone: "03 420 2022",
  phoneTel: "+6434202022",
  mobile: "021 0880 5994",
  mobileTel: "+642108805994",
  mobileContact: "Joey",
  email: "info@glorypanelandpaint.co.nz",
  quotesEmail: "quotes@glorypanelandpaint.co.nz",
  address: {
    street: "13–15 Smarts Road",
    locality: "Hornby, Christchurch",
    region: "Canterbury",
    postalCode: "8042",
    country: "NZ",
    full: "13–15 Smarts Rd, Hornby, Christchurch 8042",
  },
  hours: [
    { days: "Mon – Fri", time: "7:30am – 5:00pm" },
    { days: "Saturday", time: "9:00am – 5:00pm" },
    { days: "Sunday", time: "Closed" },
  ],
  openingHoursSpecification: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ] as const,
      opens: "07:30",
      closes: "17:00",
    },
    {
      dayOfWeek: ["Saturday"] as const,
      opens: "09:00",
      closes: "17:00",
    },
  ],
  geo: {
    latitude: -43.540391,
    longitude: 172.5253968,
  },
  social: {
    facebook: "https://www.facebook.com/p/GLORY-Panel-Paint-100092353875124/",
    instagram: "https://www.instagram.com/glory_panel_paint/",
  },
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.0!2d172.525!3d-43.542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s13-15+Smarts+Rd%2C+Hornby%2C+Christchurch!5e0!3m2!1sen!2snz!4v1",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Trucks & Campervans", href: "/trucks-campervans/" },
  { label: "Insurance", href: "/insurance/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
