import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCategoryIcon } from "../utils/categoryIcons";
import { fetchCategories } from "../store/category/categorySlice";

export default function Categories() {
  const dispatch = useDispatch()
  const { categories = [], loading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Browse by Category</h1>
            <p className="text-gray-500 mt-2">
              Discover events across all interests
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center mt-10 text-gray-500">
              Loading categories...
            </p>
          )}

          {/* Empty State */}
          {!loading && categories.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              No categories available.
            </p>
          )}

          {!loading && categories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-12">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name);

                return (
                  <Link
                    key={category._id}
                    to={`/events?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
                  >
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full mb-3 flex items-center justify-center">
                      <Icon size={22} className="text-purple-600" />
                    </div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Explore Events
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}