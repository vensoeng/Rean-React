import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
//inport from @tanstack/react-query installed 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//for helmet async
import { HelmetProvider } from 'react-helmet-async';
// webpage layout 
import Header from "./components/layout/header";
import Footer from './components/layout/footer';
//pages
import HomePage from './pages/home'; 
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/signup';
import AboutPage from './pages/about';
import CreatorPage from './pages/creator';
import EducationPage from './pages/education';
import DesignsPage from './pages/designs';
import WebsitePage from './pages/website';
import Services from './pages/services';
import ServicesDetail from './pages/serviceDetail';
import Story from './pages/story';
import StoryDetail from './pages/storyDetail';
//shop
import Shopping from './pages/shop';
//this is booking form
import BookingForm from './pages/bookingForm';



import './App.css';
import RequireAuth from './components/route/RequireAuth';
// admin layout 
import AdminHeader from './components/layout/admin/header';
// page 
import Dashboard from './pages/admin/dashboard';
import AdminBlogs from './pages/admin/blogs';
import AdminService from './pages/admin/service';
import AdminDesigns from './pages/admin/designs';
import AdminStorage from './pages/admin/storage';
import AdminCreator from './pages/admin/creator';
//shop
import AdminCategory from './pages/admin/category';
import AdminProduct from './pages/admin/product';
//Not fould webpage 
import NotFoundPage from './pages/404';

//for user queryClient
const queryClient = new QueryClient();

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminHeader />
      <main className="admin-page">
        <Outlet />
      </main>
    </div>
  );
}

function RoutePage() {
  return (
    <Routes>
      {/* webpage */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/creator' element={<CreatorPage />} />
        <Route path='/education' element={<EducationPage />} />
        <Route path='/designs' element={<DesignsPage />} />
        <Route path='/storys' element={<Story />} />
        <Route path='/website' element={<WebsitePage />} />
        <Route path='/services' element={<Services />} />
      </Route>
      {/* user route doesn't layout  */}
      <Route path="/storys/detail/:id" element={<StoryDetail />} />
      <Route path="/services/detail/:id" element={<ServicesDetail />} />
      <Route path="/booking/service/:id" element={<BookingForm />} />
      {/* this is shopping  */}
      <Route path='/shopping' element={<Shopping />} />
      {/* register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* admin */}
      <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path='admin/services' element={<AdminService/>} />
        <Route path='admin/designs' element={<AdminDesigns/>}/>
        <Route path='admin/storage' element={<AdminStorage/>}/>
        <Route path='admin/creator' element={<AdminCreator/>}/>
        {/* shop */}
        <Route path='admin/category' element={<AdminCategory/>}/>
        <Route path='admin/product' element={<AdminProduct/>}/>
      </Route>
      {/* Not Found  */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <RoutePage />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
