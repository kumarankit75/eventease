// import { useState, useCallback } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import BookingModal from './components/BookingModal'
// import Toast from './components/Toast'
// import useScrollReveal from './hooks/useScrollReveal'
// import Home from './pages/Home'
// import ServiceDetail from './pages/ServiceDetail'
// import EventPage from './pages/EventPage'
// import Contact from './pages/Contact'
// import NotFound from './pages/NotFound'

// function App() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [preselectedService, setPreselectedService] = useState('')
//   const [toastShow, setToastShow] = useState(false)
//   const [toastMessage, setToastMessage] = useState('')

//   useScrollReveal()

//   const handleBookNow = useCallback((service = '') => {
//     setPreselectedService(service)
//     setModalOpen(true)
//   }, [])

//   const handleModalClose = useCallback(() => {
//     setModalOpen(false)
//     setPreselectedService('')
//   }, [])

//   const handleModalSubmit = useCallback((name) => {
//     setModalOpen(false)
//     setPreselectedService('')
//     const msg = name
//       ? `Thanks, ${name}! We'll contact you shortly.`
//       : "Enquiry submitted! We'll be in touch soon."
//     setToastMessage(msg)
//     setToastShow(true)
//   }, [])

//   const handleToastHide = useCallback(() => setToastShow(false), [])

//   return (
//     <div className="min-h-screen bg-deep">
//       <Navbar onBookNow={handleBookNow} />

//       <Routes>
//         <Route path="/" element={<Home onBookNow={handleBookNow} />} />
//         <Route path="/services/:id" element={<ServiceDetail onBookNow={handleBookNow} />} />
//         <Route path="/events/:id" element={<EventPage onBookNow={handleBookNow} />} />
//         <Route path="/contact" element={<Contact onBookNow={handleBookNow} />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       <Footer />

//       <BookingModal
//         show={modalOpen}
//         onClose={handleModalClose}
//         onSubmit={handleModalSubmit}
//         preselectedService={preselectedService}
//       />

//       <Toast
//         message={toastMessage}
//         show={toastShow}
//         onHide={handleToastHide}
//       />
//     </div>
//   )
// }

// export default App










import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import useScrollReveal from './hooks/useScrollReveal'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import EventPage from './pages/EventPage'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useScrollReveal()

  const handleBookNow = useCallback((service = '') => {
    setPreselectedService(service)
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setPreselectedService('')
  }, [])

  const handleModalSubmit = useCallback((name) => {
    setModalOpen(false)
    setPreselectedService('')
    const msg = name
      ? `Thanks, ${name}! We'll contact you shortly.`
      : "Enquiry submitted! We'll be in touch soon."
    setToastMessage(msg)
    setToastShow(true)
  }, [])

  const handleToastHide = useCallback(() => setToastShow(false), [])

  return (
    <div className="min-h-screen bg-deep">
      <ScrollToTop />
      <Navbar onBookNow={handleBookNow} />

      <Routes>
        <Route path="/" element={<Home onBookNow={handleBookNow} />} />
        <Route path="/services/:id" element={<ServiceDetail onBookNow={handleBookNow} />} />
        <Route path="/events/:id" element={<EventPage onBookNow={handleBookNow} />} />
        <Route path="/contact" element={<Contact onBookNow={handleBookNow} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <BookingModal
        show={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        preselectedService={preselectedService}
      />

      <Toast
        message={toastMessage}
        show={toastShow}
        onHide={handleToastHide}
      />
    </div>
  )
}

export default App