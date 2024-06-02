import React, { Component, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import './scss/style.scss'

import { Amplify, API, Auth, Hub } from 'aws-amplify'
import {
  withAuthenticator,
  Theme,
  useTheme,
  View,
  Text,
  Image,
  Heading,
} from '@aws-amplify/ui-react'

import avatar from './assets/images/avatars/logo.png'

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_ylT2HTJGw',
    userPoolWebClientId: '19n0du241g5dcmil22a2uoh4k5',
    identityPoolId: 'ap-northeast-1:3713a236-4ec4-49a0-92e2-ef85d817c330',
    oauth: {
      domain: 'login-certification.auth.ap-northeast-1.amazoncognito.com',
      scope: ['openid'],
      redirectSignIn: 'https://us-import.lightbringer-kamex.com/',
      redirectSignOut: 'https://us-import.lightbringer-kamex.com/',
      responseType: 'code',
    },
  },
})

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const isLoggedIn = async () => {
  try {
    await Auth.currentAuthenticatedUser()
    return true
  } catch (error) {
    return false
  }
}

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const components = {
  Header() {
    const { tokens } = useTheme()
    return (
      <div>
        <Heading
          level={1}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          className="d-flex flex-row docs-highlight mb-1"
          style={{ color: 'red', margin: '0px', marginBottom: '-100px' }}
        >
          {/*<Image
            alt="Amplify logo"
            src={avatar}
            style={{ width: 140, height: 140, marginRight: '0px' }}
          />*/}
          {/*<Text
            className="text-md-start fs-1"
            color={'#FFFFFF'}
            fontWeight={tokens.fontWeights.normal}
            style={{ margin: '0px', marginBottom: '10px' }}
          >
            Auto Amazon
          </Text>*/}
        </Heading>
      </div>
    )
  },
  Footer() {
    const { tokens } = useTheme()

    return (
      <View textAlign="center" padding={tokens.space.medium}>
        <Text color={tokens.colors.neutral[10]}>&copy; All Rights Reserved</Text>
      </View>
    )
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme()
      return (
        <Heading
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          className="md-start fs-3"
          color={'#FFFFFF'}
          fontWeight={tokens.fontWeights.normal}
          display={'flex'}
          style={{ margin: '0px', marginTop: '20px', marginBottom: '-20px' }}
        >
          <Image
            alt="Amplify logo"
            src={avatar}
            style={{
              width: 60,
              height: 60,
              marginLeft: '-30px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          />
          <Text style={{ marginTop: '10px', marginBottom: '15px' }}>
            Light Bringer-Import
            <br />
            America
          </Text>
        </Heading>
      )
    },
  },
  SignUp: {
    Header() {
      const { tokens } = useTheme()
      return (
        <Heading
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          className="md-start fs-3"
          color={'#FFFFFF'}
          fontWeight={tokens.fontWeights.normal}
          display={'flex'}
          style={{ margin: '0px', marginTop: '20px', marginBottom: '-20px' }}
        >
          <Image
            alt="Amplify logo"
            src={avatar}
            style={{
              width: 60,
              height: 60,
              marginLeft: '-30px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          />
          <Text style={{ marginTop: '10px', marginBottom: '15px' }}>
            Light Bringer-Import
            <br />
            America to Japan
          </Text>
        </Heading>
      )
    },
  },
}

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

//export default withAuthenticator(App, {
//  loginMechanisms: ['email'],
//  signUpAttributes: ['email', 'username'],
//  components: components,
//  hideDefault: true,
//})

//const AuthenticatedApp = withAuthenticator(App, {
//  signUpAttributes: ['email', 'username'],
//  components: components,
//  includeGreetings: true,
//})

const AuthenticatedApp = withAuthenticator(App, {
  signUpAttributes: ['email', 'username'],
  components: components,
  includeGreetings: true,
  hideSignUp: true,
})

const AppWithBackground = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(() => {
    checkAuthState()
  }, [])

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser()
      setLoggedIn(true)
    } catch (error) {
      setLoggedIn(false)
    }
  }

  return (
    <div className="auth-screen">
      <AuthenticatedApp />
    </div>
  )
}

export default AppWithBackground
