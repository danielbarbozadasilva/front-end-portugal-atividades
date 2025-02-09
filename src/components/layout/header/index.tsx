import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './styled.css'
import { useAppSelector } from '../../../hooks'
import { AppDispatch, RootState } from '../../../store'
import AuthAction from '../../../store/auth/auth.action'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

interface IDataModel {
  _id: string;
  token: string
  name: string
  email: string
  username: string
  permissions: string
}

const Header: React.FC = () => {
  const authResult: IDataModel = useAppSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  const authAction = new AuthAction()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <Navbar expand="lg">
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <div className="logo">
            <Link className="link" to="/" reloadDocument>
              <span className="text">Atividades Turisticas em Portugal</span>
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {authResult ? (
              <div className="avatarUser">
                <NavDropdown
                  title={authResult?.username}
                  id="basic-nav-dropdown"
                  show={open}
                  onClick={() => setOpen(!open)}
                >
                  <NavDropdown.Item as={Link} to="/orders" reloadDocument>
                    Pedidos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/messages" reloadDocument>
                    Mensagens
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/signin"
                    reloadDocument
                    onClick={()=>dispatch(authAction.logoutAction(authResult?._id)).then((result)=>{
                      console.log(result)

                      if(result.payload){
                        navigate('/')
                      } else {  
                        console.log(result)
                      }
                    })}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin" className="link loginLink">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/SignUp" className="link">
                  <button className="signupButton">Cadastrar</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Header
