import { useRoutes } from 'react-router';
import Landing from './Layouts/Landing';
import AdminLogin from './views/Auth/Login/AdminLogin';
import Blog from './Layouts/Component/Blog/Blog';
import Links from './Layouts/Component/Link/Links';
import Forum from './Layouts/Component/Forum/Forum'
import Question from './Layouts/Component/Forum/Question'
import About from './Layouts/Component/About';
import Contact from './Layouts/Component/Contact';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import PageNotFound from './Layouts/Component/PageNotFound';
import BlogPost from './Layouts/Component/Blog/BlogPost';
import AdminMain from "./views/Admin/AdminMain";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import { useSelector } from "react-redux";
import TopUp from './Layouts/Component/TopUp'
import LoginForm from './Layouts/Component/Forum/LoginForm'

export default function Router() {

    const isAuthenticated = useSelector((state) => state.admin.isAuthenticated)

    let element = useRoutes([
        {
            path: '/',
            element: (
                <>
                    <Landing />
                </>
            ),
        },
        {
            path: '/blog',
            element: (
                <>
                    <Header />
                    <Blog />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/link',
            element: (
                <>
                    <Header />
                    <Links />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/forum',
            element: (
                <>
                    <Header />
                    <Forum />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/question/:id',
            element: (
                <>
                    <Header />
                    <Question />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/about',
            element: (
                <>
                    <Header />
                    <About />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/contact',
            element: (
                <>
                    <Header />
                    <Contact />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: "/blog/:schema/:id",
            element: (
                <>
                    <Header />
                    <BlogPost />
                    <TopUp />
                    <Footer />
                </>
            ),
        },
        {
            path: '/login',
            element: <LoginForm />,
        },
        {
            path: '/admin-login',
            element: <AdminLogin />,
        },
        {
            element: <ProtectedRoutes isLogged={isAuthenticated} />,
            children: [
                { path: '/admin/dashboard', element: <AdminMain /> }
            ]
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);

    return element;
}
