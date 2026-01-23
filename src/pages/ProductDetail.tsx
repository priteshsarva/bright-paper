import { useParams, useNavigate } from 'react-router-dom';
import { Package, CheckCircle, ArrowLeft } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { PRODUCT_CATEGORIES } from '../constants';
import duplex from '../assets/images/1.jfif'
import craftpaper from '../assets/images/craftpaper.jpg'
import virginPaper from '../assets/images/Gemini_Generated_Image_6tlzvr6tlzvr6tlz.png'
import SBS from '../assets/images/SBS.jfif'
import FBB from '../assets/images/FBB.jfif'
import artPaper from '../assets/images/artpaper.jpg'
import kappaBoard from '../assets/images/kappaboard-4.jpg'
import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';
import AnimatedImage from '../components/AnimatedImage';


interface ProductData {
  [key: string]: {
    img: string,
    name: string;
    description: string;
    fullDescription: string;
    specifications: { label: string; value: string }[];
    features: string[];
    applications: string[];
  };
}

const PRODUCT_DATA: ProductData = {
  'duplex-board': {
    img: duplex,
    name: 'Duplex Board',
    description: 'Premium quality duplex board for packaging solutions',
    fullDescription: 'Our duplex board products are manufactured with precision to deliver superior strength and printability. Ideal for packaging applications requiring durability and excellent surface finish.',
    specifications: [
      { label: 'GSM Range', value: '200-450 GSM' },
      { label: 'Finish', value: 'Coated & Uncoated' },
      { label: 'Sizes', value: 'Custom sizes available' },
      { label: 'Color', value: 'White, Grey back' }
    ],
    features: [
      'High strength and durability',
      'Excellent printability',
      'Moisture resistant',
      'Smooth surface finish',
      'Cost-effective solution',
      'Available in various GSM options'
    ],
    applications: [
      'Packaging boxes',
      'Cartons',
      'Display materials',
      'Book covers',
      'Product packaging',
      'Industrial packaging'
    ],
  },
  'recycled-kraft-paper': {
    img: craftpaper, // Keep variable name as is, or rename to kraftPaper if you update imports
    name: 'Recycled kraft paper',
    description: 'Durable kraft paper for various industrial applications',
    fullDescription: 'High-quality kraft paper known for its exceptional strength and versatility. Perfect for heavy-duty packaging and industrial applications where durability is paramount.',
    specifications: [
      { label: 'GSM Range', value: '60-300 GSM' },
      { label: 'Type', value: 'Natural, Bleached, Semi-bleached' },
      { label: 'Sizes', value: 'Standard & Custom' },
      { label: 'Color', value: 'Brown, White, Natural' }
    ],
    features: [
      'Superior tensile strength',
      'Tear resistance',
      'Eco-friendly material',
      'Recyclable and biodegradable',
      'Excellent burst strength',
      'Cost-effective bulk option'
    ],
    applications: [
      'Shopping bags',
      'Corrugated boxes',
      'Wrapping material',
      'Industrial packaging',
      'Cement bags',
      'Food packaging'
    ]
  },
  'art-paper': {
    img: artPaper,
    name: 'Art Paper',
    description: 'Ultra-smooth coated paper for high-quality printing',
    fullDescription: 'Premium Art Paper featuring a smooth clay coating that ensures vibrant color reproduction and sharp detail. Ideal for high-end marketing materials and photographic printing.',
    specifications: [
      { label: 'GSM Range', value: '90-350 GSM' },
      { label: 'Finish', value: 'Gloss, Matte, Satin' },
      { label: 'Coating', value: 'Double sided (C2S)' },
      { label: 'Brightness', value: '91% and above' }
    ],
    features: [
      'Exceptional ink holdout',
      'High surface smoothness',
      'Vivid color reproduction',
      'Uniform coating',
      'Fast drying time',
      'Premium aesthetic appeal'
    ],
    applications: [
      'Brochures and flyers',
      'Magazines',
      'Calendars',
      'Postcards',
      'Art books',
      'Marketing collateral'
    ]
  },
  'kappa-board': {
    img: kappaBoard,
    name: 'Kappa Board',
    description: 'Heavy-duty stiff board for rigid packaging',
    fullDescription: 'Kappa Board (Grey Board) is a high-density, rigid material used as a core for high-quality book covers and luxury boxes, offering maximum structural integrity.',
    specifications: [
      { label: 'Thickness', value: '1mm - 4mm' },
      { label: 'GSM Range', value: '600-2500 GSM' },
      { label: 'Color', value: 'Grey' },
      { label: 'Sizes', value: 'Custom sheets available' }
    ],
    features: [
      'Extreme rigidity and stiffness',
      'Excellent flatness',
      'Smooth surface for lamination',
      'High impact resistance',
      'Environmentally friendly (Recycled)',
      'Consistent thickness'
    ],
    applications: [
      'Hardcover book binding',
      'Luxury rigid boxes',
      'Jigsaw puzzles',
      'Game boards',
      'Architectural models',
      'Diary and album covers'
    ]
  },
  'virgin-paper': {
    img: virginPaper,
    name: 'Virgin Kraft Paper',
    description: 'High-grade virgin paper products',
    fullDescription: 'Premium virgin paper manufactured from 100% virgin pulp, offering superior quality and consistency for demanding applications.',
    specifications: [
      { label: 'GSM Range', value: '80-250 GSM' },
      { label: 'Brightness', value: '90-95%' },
      { label: 'Sizes', value: 'A4, A3, Custom' },
      { label: 'Finish', value: 'Matte, Glossy' }
    ],
    features: [
      '100% virgin pulp',
      'High brightness',
      'Consistent quality',
      'Excellent opacity',
      'Smooth texture',
      'Acid-free options available'
    ],
    applications: [
      'Premium packaging',
      'Printing materials',
      'Labels',
      'Stationery',
      'Art prints',
      'High-end publications'
    ]
  },
  'fbb': {
    img: FBB,
    name: 'FBB (Folding Box Board)',
    description: 'Premium folding box board for packaging',
    fullDescription: 'Our Folding Box Board combines excellent stiffness with superior printability, making it ideal for premium packaging applications.',
    specifications: [
      { label: 'GSM Range', value: '200-400 GSM' },
      { label: 'Coating', value: 'Single & Double coated' },
      { label: 'Sizes', value: 'Custom available' },
      { label: 'Finish', value: 'High gloss, Matte' }
    ],
    features: [
      'Excellent stiffness',
      'Superior print quality',
      'High whiteness',
      'Good folding properties',
      'Moisture resistant coating',
      'Food-grade options'
    ],
    applications: [
      'Pharmaceutical packaging',
      'Cosmetic boxes',
      'Food packaging',
      'Consumer goods',
      'Gift boxes',
      'Luxury packaging'
    ]
  },
  'sbs': {
    img: SBS,
    name: 'SBS (Solid Bleached Sulfate)',
    description: 'High-quality solid bleached sulfate board',
    fullDescription: 'Premium SBS board offering exceptional brightness and print quality, ideal for high-end packaging and display applications.',
    specifications: [
      { label: 'GSM Range', value: '200-450 GSM' },
      { label: 'Brightness', value: '92-95%' },
      { label: 'Sizes', value: 'Standard & Custom' },
      { label: 'Coating', value: 'C1S, C2S' }
    ],
    features: [
      'Exceptional brightness',
      'Superior print surface',
      'High stiffness',
      'Excellent lay-flat properties',
      'Food-safe options',
      'Premium quality finish'
    ],
    applications: [
      'Premium packaging',
      'Point-of-sale displays',
      'Luxury brand packaging',
      'Greeting cards',
      'High-end labels',
      'Specialty packaging'
    ]
  }
};

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const productData = slug ? PRODUCT_DATA[slug] : null;
  const category = PRODUCT_CATEGORIES.find(cat => cat.slug === slug);

  if (!productData || !category) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <Package className="text-neutral-400 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-16 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[0px] z-0"
        />
        <div className="relative z-10">
          <PageWrapper>
            <button
              onClick={() => navigate('/products')}
              className="flex items-center text-primary hover:text-primary-600 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Products
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {productData.name}
            </h1>
            <p className="text-xl text-black-600">
              {productData.description}
            </p>
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="aspect-square  rounded-2xl flex items-center justify-center">
              <AnimatedImage
                src={productData.img}
                alt={productData.name}
                className="w-full h-full object-cover rounded-2xl"
                shine
                // direction="scale"
                direction='up'
                delay={0.1}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Product Overview</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                {productData.fullDescription}
              </p>

              <Card className="bg-gradient-to-br from-primary-50 to-white mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {productData.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="font-semibold text-neutral-700">{spec.label}</span>
                      <span className="text-neutral-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Button size="lg" onClick={() => navigate('/contact')} fullWidth>
                Request Quote
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Key Features</h3>
              <ul className="space-y-3">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-secondary mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Applications</h3>
              <ul className="space-y-3">
                {productData.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-neutral-700">{application}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Interested in {productData.name}?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Contact us for detailed specifications, bulk pricing, and custom requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/contact')}>
                Submit Inquiry
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/products')}>
                View All Products
              </Button>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
