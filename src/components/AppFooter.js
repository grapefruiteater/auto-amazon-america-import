import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2023 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Light Bringer-Import Tool
        </a>
        <span className="ms-1">from 2023 株式会社かめよしエクスプレス</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
