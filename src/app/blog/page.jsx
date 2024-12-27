'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/api-integration/urlVariable';
import { Helmet } from 'react-helmet';
import { useRouter, useSearchParams } from 'next/navigation';

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('blogId');

  useEffect(() => {
    if(!id){
        router.push('/blogs')
    }else{
        axios.get(`${BASE_URL}/blog/${id}`)  // Replace with your API URL
      .then(response => setBlog(response.data.data))
      .catch(error => console.error('Error fetching blog details', error));
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-24  px-20 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chalo Ghoomne</title>
        <link rel="canonical" href="https://chaloghoomne.com/" />   
      </Helmet>
      <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover mb-6 rounded" />
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-4">{blog.publisher}</span>
        <span className="text-gray-600">{blog.readingTime}min</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      
      <div className="text-gray-800">
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
