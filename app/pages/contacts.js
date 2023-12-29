import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Layout from '../components/Layout.js'

export default function Page() {
  const supabase = useSupabaseClient()
  const [message, setMessage] = useState(null)
  const onSubmit = async function(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const { error } = await supabase
      .from('contacts')
      .insert(Object.fromEntries(data), { returning: 'minimal' })
    if(error){
      setMessage('Sorry, an unexpected error occured.')
    }else{
      setMessage(
        <div>
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Thank you for contacting us. We will get back to you promptly.</p>
        </div>
      )
    }
  }
  return (
    <Layout title="Contacts" description="Generated by create next app">
      <div className="bg-gray-700 text-grey-800">
        <h1 className="text-4xl font-semibold ">Contact us</h1>
      </div>

      <form className="p-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            className="p-2 w-60 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="p-2 w-60 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-2 w-60 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            placeholder="Message"
            className="p-2 w-60 h-40 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-purple-500 resize-none"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:ring focus:ring-yellow-400"
          >
            Send
          </button>
        </div>
      </form>

      {message && (
        <div
          aria-label="Overflow below the drawer dialog"
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setMessage(null)}
          role="dialog"
        >
          <div
            aria-label="Alert pane"
            className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white rounded-lg shadow-lg"
          >
            {message}
          </div>
        </div>
      )}
    </Layout>
  );
}

