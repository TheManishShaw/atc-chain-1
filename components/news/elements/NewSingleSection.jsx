import React from "react";
import Link from "next/link";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
//internal imports
import {
  ClockIcon,
  FireIcon,
  HomeIcon,
} from "../../../public/assets/icons/icons";
import { getAllBlogs } from "../../../fetchers/universalFetch";
import { ErrorBoundary, Loader, ProductNotFound } from "../../Ui";

const NewSingleSection = () => {
  //gettting the data from the API response
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: getAllBlogs,
  });
  //setting the API data in the blogsBlog
  const blogsBlog = data?.data?.blog;
  //defining the API calling state
  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="No Blog Data Found" />;
  return (
    <ErrorBoundary>
      {blogsBlog?.map((blog, index) => (
        <div
          key={index}
          className="flex relative cursor-pointer hover:bg-gray-500/20 my-4 p-3 rounded-lg border-b-2 gap-4 items-center"
        >
          <img
            className="h-48 rounded-xl min-w-[15rem] max-w-[15rem] "
            src={
              blog?.image_url
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${blog?.image_url}`
                : "/assets/images/blogs/blog-1.png"
            }
          />
          <Link href={`/news/${blog?.id}`} className=" group">
            <div className="w-full flex items-center gap-4">
              <p className="text-xs text-primary py-1">
                {blog?.author_id && blog?.author_id[1]}
              </p>
            </div>

            <h3 className="text-lg lg:text-[24px] text-primary fornt-medium my-2 group-hover:underline line-clamp-3">
              {blog?.name}
            </h3>
            <p className="text-text-gray flex gap-3 items-center">
              <ClockIcon /> {moment(blog?.create_date).format("h:mm")}
              {" | "}
              {moment(blog?.create_date).format("MMM Do YYYY")}
            </p>
            {blog?.type === "blog" ? (
              <span className="gap-2 absolute p-1 top-5 left-3  mx-3 flex items-center bg-[#FEE2E2] w-28 rounded-full px-4">
                <FireIcon />
                <span className="text-lg text-text-orange font-bold">
                  {blog?.type}
                </span>
              </span>
            ) : (
              <span className="gap-2 absolute p-1 top-5 left-3  text-[#1D4ED8] mx-3 flex items-center bg-[#DBEAFE] w-28 rounded-full px-4">
                <HomeIcon />
                <span className="text-lg  font-bold">{blog?.type}</span>
              </span>
            )}
          </Link>
        </div>
      ))}
    </ErrorBoundary>
  );
};

export default NewSingleSection;
