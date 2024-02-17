import ConvexClientProvider from './ConvexClientProvider'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  )
}