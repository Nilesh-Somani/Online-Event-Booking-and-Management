import { Link } from "react-router-dom";
import { MusicIcon, TechnologyIcon, SportsIcon, ArtsIcon, FoodIcon, BusinessIcon, EducationIcon, HealthIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Categories() {
  const categories = [
    "Music & Concerts",
    "Technology",
    "Sports & Fitness",
    "Arts & Culture",
    "Food & Drink",
    "Business",
    "Education",
    "Health & Wellness",
  ];

  const categoryIcons = {
    "Music & Concerts": MusicIcon,
    "Technology": TechnologyIcon,
    "Sports & Fitness": SportsIcon,
    "Arts & Culture": ArtsIcon,
    "Food & Drink": FoodIcon,
    "Business": BusinessIcon,
    "Education": EducationIcon,
    "Health & Wellness": HealthIcon,
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-center">Browse by Category</h1>
          <p className="text-center text-gray-500 mt-2">
            Explore events across different categories
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-10">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/events?category=${encodeURIComponent(cat)}`}
                className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
              >
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full mb-3 flex items-center justify-center">
                  {(() => {
                    const Icon = categoryIcons[cat];
                    return <Icon size={22} className="text-purple-600" />;
                  })()}
                </div>
                <h4 className="font-semibold">{cat}</h4>
                <p className="text-sm text-gray-500 mt-1">Explore Events</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}