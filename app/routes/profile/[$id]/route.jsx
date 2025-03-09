import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  Card,
  CardContent,
} from "../../../../src/components/components/ui/card";
import { Button } from "../../../../src/components/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { Textarea } from "../../../../src/components/components/ui/textarea";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import tradeCounting from "../../../utils/tradesCounting.server";
import { getSession } from "../../../utils/session.server";
import { redirect } from "@remix-run/node";
import prisma from "../../../../prisma/prisma";

const reviews = [
  {
    id: 1,
    user: "John Doe",
    content: "Great trader! Fast and reliable.",
    rating: 5,
  },
  // {
  //   id: 2,
  //   user: "Jane Smith",
  //   content: "Smooth transaction, highly recommend.",
  //   rating: 4,
  // },
  // {
  //   id: 3,
  //   user: "Mike Johnson",
  //   content: "Good communication and fast payment.",
  //   rating: 5,
  // },
  // {
  //   id: 4,
  //   user: "Emily Davis",
  //   content: "Had a slight delay but overall a good experience.",
  //   rating: 3,
  // },
  // {
  //   id: 5,
  //   user: "Chris Brown",
  //   content: "Excellent service, will trade again.",
  //   rating: 5,
  // },
];
export const loader = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const { id } = params;

  const userStats = await tradeCounting(Number(id), "one");
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { toUserId: parseInt(Number(id)) }, // Get comments for this user
      orderBy: { createdAt: "desc" },
      include: {
        fromUser: { select: { id: true, username: true } }, // Fetch who left the feedback
      },
    });

    return {
      userData: userStats[0],
      currentUserID: userIdD,
      feedback: feedbacks,
    };
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return { error: "Failed to fetch feedback" }, { status: 500 };
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  // get the form data
  const content = formData.get("content");
  // get the rating
  const rating = formData.get("rating");
  // get the current user
  const currentUser = formData.get("currenUser");
  // get the visited user
  const visitedUser = formData.get("visitedUser");
  // check if the user is trying to submit a review for themselves
  if (currentUser === visitedUser) {
    return (
      { error: "You cannot submit a review for yourself" }, { status: 400 }
    );
  }
  try {
    await prisma.feedback.create({
      data: {
        fromUserId: Number(currentUser),
        toUserId: Number(visitedUser),
        rating: Number(rating),
        comment: content,
      },
    });
  } catch (error) {
    return { error: "Failed to submit feedback" }, { status: 500 };
  }

  return { response: "Review submitted successfully" };
};

export default function Index() {
  const [rating, setRating] = useState(5);
  const data = useLoaderData();
  console.log(data);
  return (
    <div className=" container mx-auto px-5">
      <Navbar />
      <div className="flex flex-col md:flex-row mt-5 gap-5">
        <div className="md:min-w-[350px] md:w-1/3 w-full">
          <div className="rounded-lg bg-third px-4 pt-8 pb-10 shadow-lg">
            <div className="relative mx-auto rounded-full">
              <img
                className="mx-auto h-36 w-36 rounded-full object-cover"
                src={
                  data.userData.imgsrc ||
                  "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
                }
                alt="Profile"
              />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-white">
              {data.userData.username}
            </h1>
            <h3 className="text-semibold text-center leading-6 text-gray-400 flex items-center justify-center gap-2">
              <BadgeCheck className="text-green-400" size={18} /> Verified
              Monero Trader
            </h3>
            <p className="text-center text-sm leading-6 text-gray-300 mt-2">
              {data.userData.successRate}% Success Rate |{" "}
              {data.userData.totalTrades} Total Trades
            </p>
            <ul className="mt-3 divide-y bg-primary rounded-lg py-2 px-3 text-gray-300 shadow-sm">
              <li className="flex items-center py-3 text-sm">
                <span>Trade Limits</span>
                <span className="ml-auto text-white">
                  <strong>5 XMR</strong>
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
              <input
                type="hidden"
                name="currenUser"
                value={data.currentUserID}
              />
              <input
                type="hidden"
                name="visitedUser"
                value={data.userData.id}
              />
              <input type="hidden" name="rating" value={rating} />
              <div className="flex items-center space-x-2">
                <label className="text-gray-400">Rating:</label>
                <select
                  name="rating"
                  defaultValue={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border rounded p-1 bg-white"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r}
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
          {data.feedback && data.feedback.length > 0 ? (
            data.feedback.map((review) => (
              <div key={review.id} className=" bg-third p-4 rounded-xl">
                <div className="flex">
                  <img
                    src="https://randomuser.me/api/portraits/women/21.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className=" ml-4 flex flex-col gap-2">
                    <h4 className="font-medium text-lg text-white">
                      {review.fromUser.username}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toDateString()}
                    </p>
                    <p className="mt-2 text-white">{review.comment}</p>
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
