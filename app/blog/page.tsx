'use client'

import Link from 'next/link';
import React,{ useEffect, useState } from 'react';
import { fetchBlogs } from '@/components/Utils/lib';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Blog {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

const Blogs = () => {
  return (
    <div>
      <Title />
      <div className="grid grid-cols-1 md:grid-cols-3 px-7">
      <div className="md:col-span-2">
        <div className="w-full">
          <BlogPosts />
        </div>
      </div>
      <div className="md:col-span-1 px-2">
        <Sidebar />
      </div>
    </div>

      <Footer />
      <script src="https://kit.fontawesome.com/4bde94238d.js" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js" integrity="sha256-KzZiKy0DWYsnwMF+X1DvQngQ2/FxF7MF3Ff72XcpuPs=" crossOrigin="anonymous"></script>
    </div>
  );
};


const Title = () => {
  const handleTitleClick = (searchTerm: string) => {
    const router = useRouter();
    router.push(`/?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <>     
      {/* Topics */}
      <nav className="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
        <div className={`w-full ${open() ? 'block' : 'hidden'} flex-grow sm:flex sm:items-center sm:w-auto`}>
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('software')}>Software</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('cybersecurity')}>Cybersecurity</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('cloud')}>Cloud</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('mobile')}>Mobile Dev</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('trends')}>Tech Trends</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2" onClick={() => handleTitleClick('events')}>Events</a>
            {/**<a href="http://localhost:3002/" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Shop</a>*/}
          </div>
          <div className="flex items-center text-lg no-underline text-gray-900 pr-6">
            <a className="" href="https://www.facebook.com/courtelabs">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="pl-6" href="https://www.instagram.com/courte_labs/">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="pl-6" href="https://twitter.com/courte_labs">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="pl-6" href="https://www.linkedin.com/company/courte-labs/">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};


const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const BlogPosts = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData(searchTerm: string): Promise<void> {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&from=2024-03-22&sortBy=publishedAt&apiKey=03bfdf4f1c3b4885a02512afec65cc7f`);
        const fetchedBlogs = response.data.articles;
        console.log(fetchedBlogs);
        setBlogs(fetchedBlogs);
        setLoading(false)
      } catch (error: any) {
        console.error(error.message);
        setLoading(false)
      }
    }
    
    fetchData('technology')
  }, []);

  return (
    <div className="px-4">
      <section className="">
        {loading ? (
          <div className='text-center 2xl'>Loading.....</div>
        ) : (Array.isArray(blogs) && blogs.map(blog => (
          <article key={blog.source.id} className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75">
              <img src={blog.urlToImage} />
            </a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{blog.description}</a>
              <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{blog.title}</a>
              <p className="text-sm pb-3">
                By <a href="#" className="font-semibold hover:text-gray-800">{blog.author}</a>, Published on {formatDate(blog.publishedAt)}
              </p>
              <p className="pb-6">{blog.content}</p>
              <Link className="uppercase text-gray-800 hover:text-black" href={blog.url}>
                Continue Reading <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </article>
        ))
        )
        }
      </section>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <div className="w-full bg-white shadow flex flex-col my-4 p-6">
        <p className="text-xl font-semibold pb-5">About Us</p>
        <p className="pb-2">From custom software development and innovative mobile apps to robust web solutions and scalable cloud architectures, we leverage the latest tools and technologies to deliver tailor-made solutions that drive results.</p>
        <a href="/about" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
          Get to know us
        </a>
      </div>

      <div className="w-full bg-white shadow flex flex-col my-4 p-6">
        <p className="text-xl font-semibold pb-5">Instagram</p>
        <div className="grid grid-cols-3 gap-3">
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8" />
          <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9" />
        </div>
        <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
          <i className="fab fa-instagram mr-2"></i> Follow @courte_labs
        </a>
      </div>
      </>
    
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white pb-12">
      <div className="w-full container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
          <a href="/about" className="uppercase px-3">About Us</a>
          <a href="/privacy-policy" className="uppercase px-3">Privacy Policy</a>
          <a href="/t&c" className="uppercase px-3">Terms & Conditions</a>
          <a href="/contact" className="uppercase px-3">Contact Us</a>
        </div>
        <div className="uppercase pb-6">&copy; courtelabs.com</div>
      </div>
    </footer>
  );
};

export default Blogs;
