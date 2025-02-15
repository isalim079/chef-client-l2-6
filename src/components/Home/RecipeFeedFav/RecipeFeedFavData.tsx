import {
  FaUtensils,
  FaStore,
  FaUsers,
  FaHome,
  FaStar,
  FaGlobe,
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";

export const favCategoryData = [
  {
    id: 1,
    title: "Culinary Creations",
    posts: 5,
    icon: <FaUtensils />,
  },
  {
    id: 2,
    title: "Dining Destinations",
    posts: 3,
    icon: <FaStore />,
  },
  {
    id: 3,
    title: "Foodie Gatherings",
    posts: 3,
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "Gourmet Living",
    posts: 3,
    icon: <FaHome />,
  },
  {
    id: 5,
    title: "Taste Tested",
    posts: 2,
    icon: <FaStar />,
  },
  {
    id: 6,
    title: "Global Flavors",
    posts: 2,
    icon: <FaGlobe />,
  },
  {
    id: 7,
    title: "Comfort Bowls",
    posts: 1,
    icon: <FaBowlFood />,
  },
];

export const favRecipeData = [
  {
    id: 1,
    categories: "Allergens, Dinner",
    title: "Common Allergens in Everyday Meals",
    content:
      "Discover the most common allergens found in daily meals and how to avoid them for a safer dining experience.",
    image:
      "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600", 
  },
  {
    id: 2,
    categories: "Kitchen, Tools",
    title: "Essential Kitchen Tools for Every Chef",
    content:
      "Explore the must-have tools that can elevate your cooking game and make your kitchen time more efficient.",
    image:
      "https://images.pexels.com/photos/221143/pexels-photo-221143.jpeg?auto=compress&cs=tinysrgb&w=600", 
  },
  {
    id: 3,
    categories: "Cook, Dinner",
    title: "Top 10 Vegan Roast Recipes",
    content:
      "Check out these delicious vegan roast alternatives that are perfect for any dinner occasion.",
    image:
      "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600", 
  },
  {
    id: 4,
    categories: "Restaurant, Vegan",
    title: "Relax Cafe: A Vegan Paradise",
    content:
      "Visit Relax Cafe for a unique vegan dining experience that combines flavor, health, and relaxation.",
    image:
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600", 
  },
];
