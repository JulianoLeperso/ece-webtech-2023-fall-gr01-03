import Head from 'next/head'
import Image from 'next/image'

import Layout from '../components/Layout.js'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WebTech - contact us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="wt-title">
        Contact
      </h1>
      <form className="block">
        <div className="flex items-center mb-4">
          <label className="w-1/4" htmlFor="lastname">
            <span>First name</span>
            <input type="text" name="firstname" />
          </label>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/4" htmlFor="lastname">
            <span>Last name</span>
            <input type="text" name="lastname" />
          </label>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/4" htmlFor="lastname">
            <span>Email</span>
            <input type="text" name="email" />
          </label>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/4" htmlFor="lastname">
            <span>Message</span>
            <textarea name="message" />
          </label>
        </div>
        <button type="submit" class="rounded-full bg-blue-200 placeholder-blue-400 text-blue-800 font-bold py-2 px-4 ">
        Submit
        </button>

      </form>
    </Layout>
  )
}
