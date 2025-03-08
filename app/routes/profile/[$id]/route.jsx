import { Form, json, useLoaderData } from "@remix-run/react";
import {
  Card,
  CardContent,
} from "../../../../src/components/components/ui/card";
import { Button } from "../../../../src/components/components/ui/button";
import { BadgeCheck, BarChart, Wallet } from "lucide-react";
import { Textarea } from "../../../../src/components/components/ui/textarea";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const reviews = [
  {
    id: 1,
    user: "John Doe",
    content: "Great trader! Fast and reliable.",
    rating: 5,
  },
  {
    id: 2,
    user: "Jane Smith",
    content: "Smooth transaction, highly recommend.",
    rating: 4,
  },
  {
    id: 3,
    user: "Mike Johnson",
    content: "Good communication and fast payment.",
    rating: 5,
  },
  {
    id: 4,
    user: "Emily Davis",
    content: "Had a slight delay but overall a good experience.",
    rating: 3,
  },
  {
    id: 5,
    user: "Chris Brown",
    content: "Excellent service, will trade again.",
    rating: 5,
  },
];
export const loader = async () => {
  //   const reviews = await fetchReviewsFromDB();
  return json(reviews);
};

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const newReview = {
//     user: formData.get("user"),
//     content: formData.get("content"),
//     rating: Number(formData.get("rating")),
//   };
//   await saveReviewToDB(newReview);
//   return json(newReview);
// };

export default function Index() {
  const reviews = useLoaderData();

  return (
    <div className=" container mx-auto px-5">
      <Navbar />
      <div className="flex flex-col md:flex-row mt-5 gap-5">
        <div className="md:min-w-[350px] md:w-1/3 w-full">
          <div className="rounded-lg bg-third px-4 pt-8 pb-10 shadow-lg">
            <div className="relative mx-auto w-36 rounded-full">
              <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img
                className="mx-auto h-auto w-full rounded-full"
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt="Profile"
              />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-white">
              Alice
            </h1>
            <h3 className="text-semibold text-center leading-6 text-gray-400 flex items-center justify-center gap-2">
              <BadgeCheck className="text-green-400" size={18} /> Verified
              Monero Trader
            </h3>
            <p className="text-center text-sm leading-6 text-gray-300 mt-2">
              98% Success Rate | 120 Total Trades
            </p>
            <ul className="mt-3 divide-y bg-primary rounded-lg py-2 px-3 text-gray-300 shadow-sm">
              <li className="flex items-center py-3 text-sm">
                <span>Trade Limits</span>
                <span className="ml-auto text-white">
                  Min: <strong>1 XMR</strong> | Max: <strong>5 XMR</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <Card className="w-full">
          <CardContent className="space-y-4 pt-5 bg-third rounded-lg h-full">
            <h3 className="text-xl font-medium text-secondary">
              Write a Review
            </h3>
            <Form method="post" className="space-y-4 h-full">
              <Textarea
                name="content"
                placeholder="Share your experience with this trader..."
                className="w-full md:h-2/3 h-32 bg-primary focus-within:border-0 text-white"
                required
              />
              <input type="hidden" name="user" value="Current User" />
              <div className="flex items-center space-x-2">
                <label className="text-gray-400">Rating:</label>
                <select
                  name="rating"
                  defaultValue={5}
                  className="border rounded p-1 bg-white"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  className="ml-auto bg-secondary text-white"
                >
                  Submit Review
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold my-5">Reviews</h2>

      <Card>
        <CardContent id="reviews" className="space-y-4 p-0 bg-primary">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className=" bg-third p-4 rounded-xl">
                <div className="flex">
                  <img
                    src="https://randomuser.me/api/portraits/women/21.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className=" ml-4 flex flex-col gap-2">
                    <h4 className="font-medium text-lg text-white">
                      {review.user}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      08, Feb, 2025
                    </p>
                    <p className="mt-2 text-white">{review.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Loading reviews...</p>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
