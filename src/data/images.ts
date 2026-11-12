/** Central image paths — files live in public/images/ */
const img = (name: string) => `/images/${name}`;

export const images = {
  logo: img('1.png'),
  heroForecourt: img('glory-hero-forecourt-porsche.webp'),
  forecourtCars: img('glory-forecourt-cars.webp'),
  astonDbx: img('glory-aston-dbx.webp'),
  ferrariTestarossa: img('glory-ferrari-testarossa.webp'),
  ferrari488: img('glory-ferrari-488.webp'),
  lamborghiniHuracan: img('glory-lamborghini-huracan.webp'),
  lamborghiniGallardo: img('glory-lamborghini-gallardo.webp'),
  mclarenMaserati: img('glory-mclaren-maserati.webp'),
  nissanGtr: img('glory-nissan-gtr.webp'),
  porscheMclaren: img('glory-porsche-mclaren.webp'),
  porsche911Yellow: img('glory-forecourt-porsche-911-yellow.webp'),
  porsche911Grey: img('glory-forecourt-porsche-911-grey.webp'),
  ferrariCalifornia: img('glory-forecourt-ferrari-california.webp'),
  ferrariUrusWide: img('glory-forecourt-ferrari-urus-wide.webp'),
  assessment: img('assessment.jpg'),
} as const;

export const insurerLogos = [
  { src: img('iag.png'), alt: 'IAG' },
  { src: img('nzi.png'), alt: 'NZI' },
  { src: img('vero.png'), alt: 'Vero' },
  { src: img('ami.png'), alt: 'AMI' },
  { src: img('tower.png'), alt: 'Tower' },
  { src: img('state.png'), alt: 'State' },
  { src: img('aa.png'), alt: 'AA Insurance' },
  { src: img('aon.png'), alt: 'AON' },
  { src: img('lumley.png'), alt: 'Lumley', light: true },
  { src: img('swann.png'), alt: 'Swann Insurance', light: true },
] as const;

/** Photo strip images for the home page "Why choose us" section */
export const photoStripImages = [
  { src: images.astonDbx, alt: 'Black Aston Martin DBX outside GLORY Panel & Paint, Hornby Christchurch' },
  { src: images.ferrariTestarossa, alt: 'Classic red Ferrari Testarossa at GLORY Panel & Paint, Christchurch' },
  { src: images.lamborghiniHuracan, alt: 'Green Lamborghini Huracan at GLORY Panel & Paint, Christchurch' },
  { src: images.mclarenMaserati, alt: 'Yellow McLaren and Maserati at GLORY Panel & Paint, Christchurch' },
  { src: images.nissanGtr, alt: 'Black Nissan GT-R at GLORY Panel & Paint, Christchurch' },
  { src: images.porsche911Grey, alt: 'Grey Porsche 911 outside GLORY Panel & Paint, Hornby Christchurch' },
  { src: images.porscheMclaren, alt: 'Porsche 911 and yellow McLaren at GLORY Panel & Paint, Christchurch' },
  { src: images.ferrari488, alt: 'Red Ferrari 488 at GLORY Panel & Paint, Christchurch' },
  { src: images.ferrariCalifornia, alt: 'Red Ferrari California outside GLORY Panel & Paint, Hornby' },
  { src: images.porsche911Yellow, alt: 'Yellow Porsche 911 outside GLORY Panel & Paint, Hornby Christchurch' },
  { src: images.lamborghiniGallardo, alt: 'White Lamborghini Gallardo at GLORY Panel & Paint, Christchurch' },
] as const;
