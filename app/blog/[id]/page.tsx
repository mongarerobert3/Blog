'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

const BlogPostPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get('id'));
  return <div>Helo</div>
};

export default BlogPostPage;
