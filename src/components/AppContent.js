import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      {/*<Suspense fallback={<CSpinner color="dark" />}>*/}
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'center',
              height: '80vh',
            }}
          >
            <CSpinner color="dark" style={{ width: '5rem', height: '5rem' }} />
          </div>
        }
      >
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="home" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
