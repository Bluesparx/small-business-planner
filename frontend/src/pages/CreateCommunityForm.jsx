import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateCommunityForm() {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    image: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Community Created:", formData);
    // Handle community creation logic
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6"   style={{ backgroundImage: 'url("https://previews.123rf.com/images/savvas511/savvas5111801/savvas511180100149/93639455-local-arts-and-crafts-handmade.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Card className="w-full max-w-lg shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900 ">
        <CardHeader>
          <CardTitle>Create Your Community</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="text" 
              name="name" 
              placeholder="Community Name" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
            <Input 
              type="text" 
              name="owner" 
              placeholder="Your Name" 
              value={formData.owner} 
              onChange={handleChange} 
              required
            />
            <Input 
              type="text" 
              name="image" 
              placeholder="Image URL" 
              value={formData.image} 
              onChange={handleChange} 
              required
            />
            <Input 
              type="text" 
              name="type" 
              placeholder="Business Type" 
              value={formData.type} 
              onChange={handleChange} 
              required
            />
            <Textarea 
              name="description" 
              placeholder="Community Description" 
              value={formData.description} 
              onChange={handleChange} 
              required
            />
            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Create Community
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
