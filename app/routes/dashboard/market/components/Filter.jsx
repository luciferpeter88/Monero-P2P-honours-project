import { Form, useSearchParams } from "@remix-run/react";
import { Input } from "../../../../../src/components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../src/components/components/ui/select";
import { Button } from "../../../../../src/components/components/ui/button";
import { Search } from "lucide-react";

export default function MarketFilter() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const ratingFilter = searchParams.get("rating") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  return (
    <Form
      method="get"
      className="flex flex-wrap md:flex-nowrap gap-3  p-4 rounded-lg "
    >
      {/* Search Input */}
      <div className="relative w-1/2">
        <Input
          type="text"
          name="query"
          defaultValue={searchQuery}
          placeholder="Search sellers..."
          className="bg-primary text-white pl-10 text-muted-foreground"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
      </div>

      {/* Rating Filter */}
      <Select name="rating" defaultValue={ratingFilter}>
        <SelectTrigger className="max-w-[160px] bg-primary text text-muted-foreground">
          <SelectValue placeholder="Filter by Rating" />
        </SelectTrigger>
        <SelectContent className="bg-primary text-muted-foreground">
          <SelectItem
            value="all"
            className="focus:bg-third focus:text-white cursor-pointer text-muted-foreground"
          >
            All Ratings
          </SelectItem>
          <SelectItem
            value="5"
            className="focus:bg-third focus:text-white cursor-pointer"
          >
            5 Stars
          </SelectItem>
          <SelectItem
            value="4"
            className="focus:bg-third focus:text-white cursor-pointer"
          >
            4+ Stars
          </SelectItem>
          <SelectItem
            value="3"
            className="focus:bg-third focus:text-white cursor-pointer"
          >
            3+ Stars
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Price Range */}
      <div className="flex gap-2">
        <Input
          type="number"
          name="maxPrice"
          defaultValue={maxPrice}
          placeholder="Max Price"
          className="bg-primary text-white max-w-[160px]"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="bg-secondary  text-white">
        Search
      </Button>
    </Form>
  );
}
