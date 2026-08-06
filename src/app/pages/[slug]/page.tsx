import React from "react";
import CustomPageView from "./CustomPageView";

export async function generateStaticParams() {
  return [
    { slug: "sample-page" },
    { slug: "hearing-health-guide" },
    { slug: "privacy-policy" },
    { slug: "terms-and-conditions" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <CustomPageView slug={resolvedParams.slug} />;
}
