import './style.css'
import Sidebar from '@/components/Sidebar'
import { locales } from '@/config.js'

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }))
}

export default async function RootLayout ({ children, params }) {
  const { lng } = await params

  return (
    <html lang={lng}>
      <body>
        <div className='container'>
          <div className='main'>
            <Sidebar />
            <section className='col note-viewer'>{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
