export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  occasion: string[];
  color: string;
  flowerType: string;
  description: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  badge?: string;
  excerpt?: string;
  sizes: { label: string; price: number }[];
  wrappingOptions: { label: string; price: number }[];
  ribbonColors: string[];
  flowerMeanings: { flower: string; meaning: string }[];
  deliveryTime: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Red Roses Bouquet",
    slug: "royal-red-roses-bouquet",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&h=1000&fit=crop"],
    category: "Roses",
    occasion: ["Birthday", "Anniversary", "Valentine's Day"],
    color: "Red",
    flowerType: "Rose",
    description: "A stunning arrangement of 24 premium long-stemmed red roses, hand-tied with lush greenery.",
    inStock: true,
    isBestseller: true,
    badge: "Best Seller",
    excerpt: "Classic red roses for the ones you love.",
    sizes: [
      { label: "Small (12 roses)", price: 1499 },
      { label: "Medium (24 roses)", price: 2499 },
      { label: "Large (36 roses)", price: 3499 }
    ],
    wrappingOptions: [
      { label: "Kraft Paper", price: 0 },
      { label: "Premium Velvet", price: 300 }
    ],
    ribbonColors: ["#E91E63", "#C2185B", "#FFFFFF", "#FFD700"],
    flowerMeanings: [{ flower: "Red Rose", meaning: "Deep love, passion, and respect" }],
    deliveryTime: "Same Day"
  },
  {
    id: "2",
    name: "Sunshine Sunflower Arrangement",
    slug: "sunshine-sunflower-arrangement",
    price: 1899,
    rating: 4.8,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9e4166?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1591886960571-74d43a9e4166?w=800&h=1000&fit=crop"],
    category: "Sunflowers",
    occasion: ["Birthday", "Get Well Soon", "Congratulations"],
    color: "Yellow",
    flowerType: "Sunflower",
    description: "Bright and cheerful sunflowers arranged with seasonal fillers.",
    inStock: true,
    badge: "",
    excerpt: "Bring sunshine to their day.",
    sizes: [
      { label: "Small (5 stems)", price: 1299 },
      { label: "Medium (10 stems)", price: 1899 },
      { label: "Large (15 stems)", price: 2599 }
    ],
    wrappingOptions: [
      { label: "Kraft Paper", price: 0 },
      { label: "Burlap Wrap", price: 250 }
    ],
    ribbonColors: ["#FFD700", "#E91E63", "#4CAF50", "#FFFFFF"],
    flowerMeanings: [{ flower: "Sunflower", meaning: "Adoration, loyalty, and longevity" }],
    deliveryTime: "Same Day"
  },
  {
    id: "3",
    name: "Pink Orchid Elegance",
    slug: "pink-orchid-elegance",
    price: 3299,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 74,
    image: "https://images.unsplash.com/photo-1566928401-5b9b77a6b8e7?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1566928401-5b9b77a6b8e7?w=800&h=1000&fit=crop"],
    category: "Orchids",
    occasion: ["Anniversary", "Mother's Day", "Corporate Gift"],
    color: "Pink",
    flowerType: "Orchid",
    description: "Exquisite pink phalaenopsis orchids in a sleek ceramic pot.",
    inStock: true,
    isNew: true,
    badge: "New",
    excerpt: "Sophisticated orchids for a refined gesture.",
    sizes: [
      { label: "Single Stem", price: 3299 },
      { label: "Double Stem", price: 5499 }
    ],
    wrappingOptions: [
      { label: "Ceramic Pot", price: 0 },
      { label: "Glass Vase", price: 400 }
    ],
    ribbonColors: ["#E91E63", "#FFFFFF", "#C2185B"],
    flowerMeanings: [{ flower: "Pink Orchid", meaning: "Femininity, grace, and joy" }],
    deliveryTime: "Next Day"
  },
  {
    id: "4",
    name: "White Lily Serenity",
    slug: "white-lily-serenity",
    price: 2199,
    rating: 4.7,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1587578867323-1f9e0d42b17e?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1587578867323-1f9e0d42b17e?w=800&h=1000&fit=crop"],
    category: "Lilies",
    occasion: ["Condolence", "Get Well Soon", "Wedding"],
    color: "White",
    flowerType: "Lily",
    description: "Pure white oriental lilies with their intoxicating fragrance.",
    inStock: true,
    badge: "",
    excerpt: "Serene white lilies for remembrance and peace.",
    sizes: [
      { label: "Small (5 lilies)", price: 1499 },
      { label: "Medium (10 lilies)", price: 2199 },
      { label: "Large (15 lilies)", price: 2999 }
    ],
    wrappingOptions: [
      { label: "White Paper", price: 0 },
      { label: "Linen Wrap", price: 350 }
    ],
    ribbonColors: ["#FFFFFF", "#E91E63", "#C0C0C0"],
    flowerMeanings: [{ flower: "White Lily", meaning: "Purity, virtue, and renewal" }],
    deliveryTime: "Same Day"
  },
  {
    id: "5",
    name: "Mixed Seasonal Bouquet",
    slug: "mixed-seasonal-bouquet",
    price: 1799,
    originalPrice: 2199,
    rating: 4.6,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop"],
    category: "Mixed",
    occasion: ["Birthday", "Thank You", "Friendship Day"],
    color: "Mixed",
    flowerType: "Mixed",
    description: "A vibrant mix of seasonal blooms including roses, carnations, chrysanthemums.",
    inStock: true,
    isBestseller: true,
    badge: "Best Seller",
    excerpt: "A joyful mix of the season's best.",
    sizes: [
      { label: "Standard", price: 1799 },
      { label: "Deluxe", price: 2499 },
      { label: "Premium", price: 3499 }
    ],
    wrappingOptions: [
      { label: "Kraft Paper", price: 0 },
      { label: "Cellophane", price: 150 },
      { label: "Fabric Wrap", price: 400 }
    ],
    ribbonColors: ["#E91E63", "#FFD700", "#4CAF50", "#9C27B0", "#FFFFFF"],
    flowerMeanings: [{ flower: "Mixed Seasonal", meaning: "Joy, celebration, and diversity" }],
    deliveryTime: "Same Day"
  },
  {
    id: "6",
    name: "Dashain Marigold Garland Set",
    slug: "dashain-marigold-garland-set",
    price: 999,
    rating: 4.8,
    reviewCount: 345,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=800&h=1000&fit=crop"],
    category: "Festivals",
    occasion: ["Dashain", "Tihar", "Teej"],
    color: "Orange",
    flowerType: "Marigold",
    description: "Fresh marigold garlands perfect for Dashain puja and decorations.",
    inStock: true,
    badge: "Dashain Special",
    excerpt: "Traditional marigold for festive pujas.",
    sizes: [
      { label: "Small (3 garlands)", price: 999 },
      { label: "Medium (5 garlands)", price: 1499 },
      { label: "Large (10 garlands)", price: 2499 }
    ],
    wrappingOptions: [
      { label: "Traditional Wrap", price: 0 },
      { label: "Decorative Tray", price: 200 }
    ],
    ribbonColors: ["#FF9800", "#FFD700", "#E91E63"],
    flowerMeanings: [{ flower: "Marigold", meaning: "Passion, creativity, and positive energy" }],
    deliveryTime: "Same Day"
  },
  {
    id: "7",
    name: "Tihar Makhamali & Godawari Set",
    slug: "tihar-makhamali-godawari-set",
    price: 1299,
    rating: 4.9,
    reviewCount: 278,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&h=1000&fit=crop"],
    category: "Festivals",
    occasion: ["Tihar", "Bhai Tika"],
    color: "Mixed",
    flowerType: "Mixed",
    description: "Traditional Tihar flower set featuring makhamali and godawari garlands.",
    inStock: true,
    badge: "Tihar Special",
    excerpt: "Beautiful makhamali and godawari for Tihar.",
    sizes: [
      { label: "Standard Set", price: 1299 },
      { label: "Premium Set", price: 1999 }
    ],
    wrappingOptions: [
      { label: "Traditional Leaf Wrap", price: 0 },
      { label: "Brass Plate", price: 500 }
    ],
    ribbonColors: ["#FF9800", "#E91E63", "#FFD700"],
    flowerMeanings: [
      { flower: "Makhamali", meaning: "Immortality and eternal love" },
      { flower: "Godawari", meaning: "Joy and optimism" }
    ],
    deliveryTime: "Same Day"
  },
  {
    id: "8",
    name: "Teej Red Sari Bouquet",
    slug: "teej-red-sari-bouquet",
    price: 1599,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1523693916903-027d144a2806?w=600&h=750&fit=crop",
    images: ["https://images.unsplash.com/photo-1523693916903-027d144a2806?w=800&h=1000&fit=crop"],
    category: "Festivals",
    occasion: ["Teej", "Wedding", "Anniversary"],
    color: "Red",
    flowerType: "Mixed",
    description: "A vibrant red bouquet inspired by the Teej festival.",
    inStock: true,
    badge: "Teej Special",
    excerpt: "A bold red bouquet celebrating womanhood.",
    sizes: [
      { label: "Standard", price: 1599 },
      { label: "Deluxe", price: 2299 }
    ],
    wrappingOptions: [
      { label: "Festive Red Wrap", price: 0 },
      { label: "Gold Embellished", price: 400 }
    ],
    ribbonColors: ["#E91E63", "#FFD700", "#C2185B"],
    flowerMeanings: [{ flower: "Red Flowers", meaning: "Love, devotion, and celebration" }],
    deliveryTime: "Same Day"
  }
];

export const categories = [
  { id: "1", name: "Roses", slug: "roses", image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=500&fit=crop", count: 48 },
  { id: "2", name: "Orchids", slug: "orchids", image: "https://images.unsplash.com/photo-1566928401-5b9b77a6b8e7?w=400&h=500&fit=crop", count: 32 },
  { id: "3", name: "Lilies", slug: "lilies", image: "https://images.unsplash.com/photo-1587578867323-1f9e0d42b17e?w=400&h=500&fit=crop", count: 24 },
  { id: "4", name: "Sunflowers", slug: "sunflowers", image: "https://images.unsplash.com/photo-1591886960571-74d43a9e4166?w=400&h=500&fit=crop", count: 18 },
  { id: "5", name: "Peonies", slug: "peonies", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=500&fit=crop", count: 15 },
  { id: "6", name: "Mixed Bouquets", slug: "mixed", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=500&fit=crop", count: 36 },
  { id: "7", name: "Festivals", slug: "festivals", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=400&h=500&fit=crop", count: 28 },
  { id: "8", name: "Tropical", slug: "tropical", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=500&fit=crop", count: 12 },
];

export const occasions = [
  { id: "1", name: "Birthday", slug: "birthday", image: "https://images.unsplash.com/photo-1530103862676-de3c9a59aa38?w=400&h=500&fit=crop", description: "Make their birthday bloom with joy" },
  { id: "2", name: "Anniversary", slug: "anniversary", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=500&fit=crop", description: "Celebrate your love story" },
  { id: "3", name: "Wedding", slug: "wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop", description: "Floral elegance for your special day" },
  { id: "4", name: "Dashain", slug: "dashain", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=400&h=500&fit=crop", description: "Traditional flowers for the great festival" },
  { id: "5", name: "Tihar", slug: "tihar", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=500&fit=crop", description: "Light up the festival of lights" },
  { id: "6", name: "Teej", slug: "teej", image: "https://images.unsplash.com/photo-1523693916903-027d144a2806?w=400&h=500&fit=crop", description: "Celebrate womanhood and devotion" },
  { id: "7", name: "Get Well Soon", slug: "get-well-soon", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=500&fit=crop", description: "Wishing them a speedy recovery" },
  { id: "8", name: "Condolence", slug: "condolence", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44d83d?w=400&h=500&fit=crop", description: "Express your deepest sympathies" },
];

export const testimonials = [
  { id: "1", name: "Sunita Sharma", location: "Kathmandu", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating: 5, comment: "Ordered flowers for my mother's birthday and they were absolutely stunning! The roses were fresh and beautifully arranged. Will definitely order again!", date: "2025-12-15" },
  { id: "2", name: "Rajesh Gurung", location: "Pokhara", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 5, comment: "The Dashain marigold garlands were perfect for our puja. Fresh, fragrant, and delivered right on time to Lakeside. Highly recommend!", date: "2025-10-05" },
  { id: "3", name: "Priyanka Basnet", location: "Lalitpur", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", rating: 5, comment: "I ordered the Teej bouquet for my sister and she loved it! The red and gold wrapping was so festive. Thank you Suman Florals!", date: "2025-09-12" },
  { id: "4", name: "Amit Thapa", location: "Bhaktapur", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 4, comment: "Great selection of flowers and the website is very easy to use. The mixed bouquet for my wife's anniversary was gorgeous.", date: "2025-11-20" },
  { id: "5", name: "Anjali Rai", location: "Biratnagar", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", rating: 5, comment: "Living in Biratnagar, I was worried about delivery quality. But Suman Florals delivered fresh orchids in perfect condition. Amazing!", date: "2025-08-30" },
  { id: "6", name: "Deepak K.C.", location: "Chitwan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 5, comment: "The wedding floral arrangements were breathtaking. They transformed our venue into a floral paradise. Thank you!", date: "2025-07-18" },
];

export const navCategories = [
  { title: "By Flower Type", items: ["Roses", "Orchids", "Lilies", "Sunflowers", "Peonies", "Mixed Bouquets"] },
  { title: "By Occasion", items: ["Birthday", "Anniversary", "Wedding", "Get Well Soon", "Condolence", "Corporate Gift"] },
  { title: "Festivals", items: ["Dashain", "Tihar", "Teej", "Bhai Tika", "Holi", "Christmas"] },
  { title: "Special Collections", items: ["Best Sellers", "New Arrivals", "Premium Collection", "Budget Friendly"] },
];

export const deliveryCities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Butwal", "Biratnagar", "Dharan", "Chitwan", "Nepalgunj", "Janakpur", "Hetauda"];

export const storeLocations = [
  { id: "1", name: "Thamel Flagship", address: "Thamel Marg, Kathmandu 44600", phone: "+977 1-4412345" },
  { id: "2", name: "Lazimpat Boutique", address: "Lazimpat Road, Kathmandu 44600", phone: "+977 1-4416789" },
];

export const faqs = [
  { id: "1", category: "Delivery", question: "How long does delivery take?", answer: "We offer same-day delivery in Kathmandu Valley for orders placed before 2 PM. Outside the valley, delivery takes 1-2 business days." },
  { id: "2", category: "Payment", question: "What payment methods do you accept?", answer: "We accept Cash on Delivery, eSewa, Khalti, IME Pay, FonePay, and Bank Transfer." },
  { id: "3", category: "Products", question: "Are your flowers fresh?", answer: "Yes, we source daily from local farms and guarantee freshness for 5-7 days with proper care." },
  { id: "4", category: "Returns", question: "What is your return policy?", answer: "We offer a 24-hour freshness guarantee. If you're not satisfied, contact us for a replacement or refund." },
  { id: "5", category: "Corporate", question: "Do you offer corporate gifting?", answer: "Yes, we provide bulk orders and custom branding for corporate clients. Contact us for a quote." },
  { id: "6", category: "Orders", question: "How can I track my order?", answer: "You will receive SMS and email updates. You can also track your order on our Track Order page." },
  { id: "7", category: "Sustainability", question: "Are your flowers locally sourced?", answer: "We source over 70% of our flowers from local Nepali growers to support communities and reduce carbon footprint." },
];

export const blogPosts = [
  { id: "1", title: "The Language of Roses: What Each Color Means", slug: "language-of-roses", excerpt: "Explore the rich symbolism behind each rose color and how to choose the perfect one.", category: "Flower Meanings", author: "Suman Shrestha", readTime: "5 min", date: "Dec 2024", image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&h=400&fit=crop", featured: true },
  { id: "2", title: "How to Make Your Flowers Last Longer", slug: "flower-care-tips", excerpt: "Simple care tips to keep your bouquets fresh for up to two weeks.", category: "Care Tips", author: "Anita Gurung", readTime: "4 min", date: "Dec 2024", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44d83d?w=600&h=400&fit=crop", featured: false },
  { id: "3", title: "The Best Flowers for Dashain and Tihar", slug: "festival-flowers-nepal", excerpt: "Traditional flowers that make Nepali festivals special.", category: "Festivals", author: "Rajesh K.C.", readTime: "6 min", date: "Dec 2024", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=600&h=400&fit=crop", featured: false },
];

export const reviews = [
  { id: "1", name: "Sunita Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", rating: 5, date: "2026-07-14", verified: true, comment: "Absolutely loved the bouquet! The roses were fresh and the delivery was prompt." },
  { id: "2", name: "Rajesh Gurung", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", rating: 5, date: "2026-07-12", verified: true, comment: "The Dashain garlands were perfect for our puja. Highly recommend!" },
];

export const flowerTypes = ["Roses", "Orchids", "Lilies", "Sunflowers", "Peonies", "Tulips", "Daisies", "Chrysanthemums", "Carnations", "Hydrangeas"];
export const colors = ["Red", "Pink", "White", "Yellow", "Orange", "Purple", "Mixed"];
export const occasionsList = ["Birthday", "Anniversary", "Wedding", "Get Well Soon", "Condolence", "Corporate Gift", "Dashain", "Tihar", "Teej"];
