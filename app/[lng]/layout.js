import './style.css'
import Sidebar from '@/components/Sidebar'

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
