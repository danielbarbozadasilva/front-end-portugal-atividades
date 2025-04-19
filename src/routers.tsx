import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

// Páginas
import HomePage from './pages/portal/home';
import Layout from './components/layout/main';
import SignIn from './pages/portal/auth/signin';
import SignUpClientPage from './pages/portal/auth/signup/client/index';
import SignUpAgentPage from './pages/portal/auth/signup/agent/index';
import FormRecoveryPassword from './pages/portal/auth/recoveryPassword/index';
import ChangePasswordPage from './pages/portal/auth/changePassword/index';
import { useAppSelector } from './hooks';
import { AuthStorage } from './config/auth';

// Páginas de Erros
import Error401 from './pages/portal/error/401';
import Error403 from './pages/portal/error/403';
import Error404 from './pages/portal/error/404';
import Error500 from './pages/portal/error/500';
import { Group } from '@mui/icons-material';

// Profile Pages
import ProfileAgentPage from './pages/portal/auth/profile/agent';
import ProfileClientPage from './pages/portal/auth/profile/client';


interface MenuItem {
  title: string;
  icon: JSX.Element;
  route: string;
  visibleMenu: boolean;
  enabled: boolean;
  component: React.ComponentType<{ title: string }>;
  authorization: string[];
}

export const Menu: MenuItem[] = [
  {
    title: 'Usuários',
    icon: <Group />,
    route: '/users',
    visibleMenu: true,
    enabled: true,
    component: Error500,
    authorization: ['admin']
  }
];

const MainRoutes: React.FC = () => {
  const authStorage = new AuthStorage();
  const isAuthenticated = () => authStorage.isAuthenticated();
  const typeUser = useAppSelector((state) => state.auth.user?.permissions);
  const authorizedRoutes = [];

  // typeUser?.length
  //   ? Menu.filter((route) => route.authorization.includes(typeUser[0]))
  //   : []

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<HomePage title="Home" />} />
                <Route
                  path="product/search/:search"
                  element={<HomePage title="Produtos" />}
                />
                <Route path="signin" element={<SignIn title="SignIn" />} />
                <Route
                  path="signup-agent"
                  element={<SignUpAgentPage title="SignUp Agent" />}
                />
                <Route
                  path="signup-client"
                  element={<SignUpClientPage title="SignUp Client" />}
                />
                <Route
                  path="recovery-password"
                  element={<FormRecoveryPassword title="Recuperar senha" />}
                />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage title="Change Password" />}
                />
                <Route
                  path="profile-agent-page"
                  element={<ProfileAgentPage title="Profile Agent Page" />}
                />
                <Route
                  path="profile-client-page"
                  element={<ProfileClientPage title="Profile Client Page" />}
                />
                <Route
                  path="error401"
                  element={<Error401 title="Error 401" />}
                />
                <Route
                  path="error403"
                  element={<Error403 title="Error 403" />}
                />
                <Route
                  path="error404"
                  element={<Error404 title="Error 404" />}
                />
                <Route
                  path="error500"
                  element={<Error500 title="Error 500" />}
                />
                {/* <Route path="orders" element={<OrdersPage title="Pedidos" />} />
                <Route
                  path="messages"
                  element={<Messages title="Mensagens" />}
                />
                <Route
                  path="message/:id"
                  element={<Message title="Mensagens" />}
                />
                <Route
                  path="product/:id"
                  element={<ProductDetails title="Produtos" />}
                />
                <Route
                  path="category/:id"
                  element={<CategoryProducts title="Produtos" />}
                />
                <Route
                  path="pay/:id/buyerid/:buyerid"
                  element={<PayPage title="Pagamento" />}
                />
                <Route
                  path="success"
                  element={<PaymentSucessPage title="Sucesso" />}
                /> */}
              </Routes>
            </Layout>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <></>

            // <PanelLayout>
            //   <Routes>
            //     {isAuthenticated() &&
            //       authorizedRoutes.map(
            //         ({ component: Component, route, title }, i) => (
            //           <Route
            //             key={i}
            //             path={route}
            //             element={<Component title={title} />}
            //           />
            //         )
            //       )}
            //     <Route
            //       path="*"
            //       element={<Error404 title="Ocorreu um erro" />}
            //     />
            //   </Routes>
            // </PanelLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
