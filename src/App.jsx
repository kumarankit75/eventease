import { useState, useCallback } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminVendors from './pages/admin/AdminVendors'
import AdminContacts from './pages/admin/AdminContacts'
import AdminProtected from './pages/admin/AdminProtected'
import VendorRegister from './pages/vendor/VendorRegister'
import VendorLogin from './pages/vendor/VendorLogin'
import VendorPending from './pages/vendor/VendorPending'
import VendorRejected from './pages/vendor/VendorRejected'
import VendorLayout from './pages/vendor/VendorLayout'
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorBookings from './pages/vendor/VendorBookings'
import VendorProfile from './pages/vendor/VendorProfile'
import VendorProtected from './pages/vendor/VendorProtected'
import CustomerRegister from './pages/customer/CustomerRegister'
import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerAccount from './pages/customer/CustomerAccount'
import CustomerProtected from './pages/customer/CustomerProtected'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const location = useLocation()

  useScrollReveal()

  const isAdminPage = location.pathname.startsWith('/admin')
  const isVendorPage = location.pathname.startsWith('/vendor')
  const isSpecialPage = isAdminPage || isVendorPage

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

      {!isSpecialPage && <Navbar onBookNow={handleBookNow} />}

      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home onBookNow={handleBookNow} />} />
        <Route path="/services/:id" element={<ServiceDetail onBookNow={handleBookNow} />} />
        <Route path="/events/:id" element={<EventPage onBookNow={handleBookNow} />} />
        <Route path="/contact" element={<Contact onBookNow={handleBookNow} />} />

        {/* Customer auth */}
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/login" element={<CustomerLogin />} />

        {/* Customer protected */}
        <Route path="/account" element={
          <CustomerProtected>
            <CustomerAccount />
          </CustomerProtected>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminProtected>
            <AdminLayout />
          </AdminProtected>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Vendor routes */}
        <Route path="/vendor" element={<Navigate to="/vendor/login" replace />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/pending" element={<VendorPending />} />
        <Route path="/vendor/rejected" element={<VendorRejected />} />
        <Route path="/vendor/*" element={
          <VendorProtected>
            <VendorLayout />
          </VendorProtected>
        }>
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route index element={<Navigate to="/vendor/dashboard" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

      {!isSpecialPage && (
        <>
          <Footer />
          <BookingModal show={modalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} preselectedService={preselectedService} />
          <Toast message={toastMessage} show={toastShow} onHide={handleToastHide} />
        </>
      )}

    </div>
  )
}

export default App