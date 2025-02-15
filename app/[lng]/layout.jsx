import './style.css'
import Sidebar from '@/components/Sidebar'
import { Foorter } from '@/components/Footer'
import { locales } from '@/config.js'

export async function generateStaticParams () {
  return locales.map(lng => ({ lng }))
}

export default async function RootLayout ({ children, params }) {
  const { lng } = await params

  return (
    <html lang={lng}>
      <body>
        <div className='container'>
          <div className='main'>
            <Sidebar lng={lng} />
            <section className='col note-viewer'>{children}</section>
          </div>
          <Foorter lng={lng} />
        </div>
      </body>
    </html>
  )
}
