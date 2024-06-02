import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CCollapse,
  CNavbarNav,
  CDropdownDivider,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
} from '@coreui/react'
import { cifJp, cifUs, cifCa, cifSg, cifAu, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

import { Auth } from 'aws-amplify'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [user, setUser] = React.useState(' ')
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const domainName = window.location.hostname
  var currentName = ''
  var currentFlag = cifUs
  if (domainName === 'localhost') {
    currentName = 'localhost(輸入版) '
    var currentFlag = cifUs
  } else if (domainName === 'us-import.lightbringer-kamex.com') {
    currentName = 'US (輸入版) '
    var currentFlag = cifUs
  } else if (domainName === 'ca-import.lightbringer-kamex.com') {
    currentName = 'CA (輸入版) '
    var currentFlag = cifCa
  } else if (domainName === 'sg-import.lightbringer-kamex.com') {
    currentName = 'SG (輸入版) '
    var currentFlag = cifSg
  } else if (domainName === 'au-import.lightbringer-kamex.com') {
    currentName = 'AU (輸入版) '
    var currentFlag = cifAu
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CNavbarNav>
          <CDropdown
            dark
            component="li"
            variant="nav-item"
            style={{ fontSize: '21px', color: 'secondary' }}
          >
            <CDropdownToggle color="secondary">
              {currentName}
              {/*<CIcon icon={currentFlag} className="me-2" size={'xl'} />*/}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="https://us-export.lightbringer-kamex.com">
                <CIcon icon={cifUs} className="me-2" />
                US-JP (輸出版)
              </CDropdownItem>
              <CDropdownItem href="https://ca-export.lightbringer-kamex.com">
                <CIcon icon={cifCa} className="me-2" />
                CA-JP (輸出版)
              </CDropdownItem>
              <CDropdownItem href="https://sg-export.lightbringer-kamex.com">
                <CIcon icon={cifSg} className="me-2" />
                SG-JP (輸出版)
              </CDropdownItem>
              <CDropdownItem href="https://au-export.lightbringer-kamex.com">
                <CIcon icon={cifAu} className="me-2" />
                AU-JP (輸出版)
              </CDropdownItem>
              <CDropdownItem href="https://us-import.lightbringer-kamex.com">
                <CIcon icon={cifJp} className="me-2" />
                JP-US (輸入版)
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem onClick={() => Auth.signOut()} style={{ cursor: 'pointer' }}>
                <CIcon icon={cilAccountLogout} className="me-2" />
                ログアウト
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
        {/*<CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>*/}
        {/*<CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>*/}
        <div style={{ flexGrow: 1 }}></div>
        <strong> Account Name : &ensp;</strong>
        <strong style={{ color: '#7d0015' }}>{user.username}</strong>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
