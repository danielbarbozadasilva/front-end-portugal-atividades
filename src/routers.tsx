import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavigateComponent } from './hooks/navigation-context'

import Group from '@mui/material/Icon'
import ListAltIcon from '@mui/material/Icon'
import CategoryIcon from '@mui/material/Icon'
import DesignServicesIcon from '@mui/material/Icon'
import Home from './pages/portal/home'
import Error403 from './pages/error/403'
import Error404 from './pages/error/404'
import Error500 from './pages/error/500'
import Layout from './components/layout/main'
import SignIn from './pages/portal/auth/signin'
import SignUp from './pages/portal/auth/signup'

import { useAppSelector } from './hooks'
import AuthStorage from './config/auth'

// interface MenuItem {
//   title: string
//   icon: JSX.Element
//   route: string
//   visibleMenu: boolean
//   enabled: boolean
//   component: React.ComponentType<{ title: string }>
//   authorization: string[]
// }

// export const Menu: MenuItem[] = [
//   {
//     title: 'Usuários',
//     icon: <Group />,
//     route: '/users',
//     visibleMenu: true,
//     enabled: true,
//     component: Users,
//     authorization: ['admin']
//   },
//   {
//     title: 'Pedidos',
//     icon: <ListAltIcon />,
//     route: '/orders',
//     visibleMenu: true,
//     enabled: true,
//     component: Orders,
//     authorization: ['admin']
//   },
//   {
//     title: 'Categorias',
//     icon: <CategoryIcon />,
//     route: '/category',
//     visibleMenu: true,
//     enabled: true,
//     component: Category,
//     authorization: ['admin']
//   },
//   {
//     title: 'Serviços',
//     icon: <DesignServicesIcon />,
//     route: '/services',
//     visibleMenu: true,
//     enabled: true,
//     component: Product,
//     authorization: ['admin']
//   }
// ]

const MainRoutes: React.FC = () => {

  const authStorage = new AuthStorage()
  const isAuthenticated = () => authStorage.isAuthenticated()
  const typeUser = useAppSelector((state) => state.auth.user?.permissions)
  const authorizedRoutes = []; 
  
  // typeUser?.length
  //   ? Menu.filter((route) => route.authorization.includes(typeUser[0]))
  //   : []

  return (
    <Router>
      <NavigateComponent />
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Home title="Home" />} />
                <Route
                  path="product/search/:search"
                  element={<Home title="Produtos" />}
                />
                <Route path="signin" element={<SignIn title="Login" />} />
                <Route path="signup" element={<SignUp title="Cadastrar" />} />
                <Route
                  path="error404"
                  element={<Error404 title="Erro 404" />}
                />
                <Route
                  path="error403"
                  element={<Error403 title="Erro 403" />}
                />
                <Route
                  path="error500"
                  element={<Error500 title="Erro 500" />}
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
  )
}

export default MainRoutes
