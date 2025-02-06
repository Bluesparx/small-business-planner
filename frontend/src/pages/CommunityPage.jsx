import { PlusCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const communities = [
  {
    id: 1,
    name: "Handmade Crafts",
    owner: "Aarushi Patel",
    image: "https://growingfaith.com.au/images/made/images/uploads/growing-faith-682x341-2022-12-08c_682_341_int_c1_c_c__1.jpg",
    description: "Beautiful handmade crafts made with love."
  },
  {
    id: 2,
    name: "Organic Spices",
    owner: "Rahul Sharma",
    image: "https://cdn.shopify.com/s/files/1/0399/2056/6433/files/IMG_0160-min_50.jpg?v=1614316253",
    description: "Pure and organic spices directly from farms."
  },
  {
    id: 3,
    name: "Custom T-Shirts",
    owner: "Sneha Verma",
    image: "https://www.brokenarrowwear.com/additionalservices/img/foldingdetails.webp",
    description: "Unique and customized T-shirts for every occasion."
  },
  {
    id: 4,
    name: "Handmade Crafts",
    owner: "Aarushi Patel",
    image: "https://growingfaith.com.au/images/made/images/uploads/growing-faith-682x341-2022-12-08c_682_341_int_c1_c_c__1.jpg",
    description: "Beautiful handmade crafts made with love."
  },
  {
    id: 5,
    name: "Organic Spices",
    owner: "Rahul Sharma",
    image: "https://cdn.shopify.com/s/files/1/0399/2056/6433/files/IMG_0160-min_50.jpg?v=1614316253",
    description: "Pure and organic spices directly from farms."
  },
  {
    id: 6,
    name: "Custom T-Shirts",
    owner: "Sneha Verma",
    image: "https://www.brokenarrowwear.com/additionalservices/img/foldingdetails.webp",
    description: "Unique and customized T-shirts for every occasion."
  }
];

export default function CommunityPage() {
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  const handleJoin = (id) => {
    if (!joinedCommunities.includes(id)) {
      setJoinedCommunities([...joinedCommunities, id]);
    }
  };

  return (
    <div className="p-6 relative min-h-screen ">
      {/* Create Community Button */}
      <div className="absolute top-6 right-6">
      <Link to="/createcommunity">
        <Button className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
            
          <PlusCircle className="w-5 h-5" /> Create Your Community
        </Button>
        </Link>
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10 mt-12">
        {communities.map((community) => (
          <Card key={community.id} className="shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-0">
            <img 
                src={community.image} 
                alt={community.name} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle>{community.name}</CardTitle>
              <CardDescription>By {community.owner}</CardDescription>
              <p className="text-gray-500 text-sm mt-2">{community.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleJoin(community.id)}
                className={`flex items-center gap-2 w-full ${
                  joinedCommunities.includes(community.id) ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                } text-white`}
                disabled={joinedCommunities.includes(community.id)}
              >
                <UserPlus className="w-4 h-4" />
                {joinedCommunities.includes(community.id) ? "Joined" : "Join"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
