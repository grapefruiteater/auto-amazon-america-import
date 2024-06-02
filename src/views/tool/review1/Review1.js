import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CSpinner,
  CAlert,
  CProgress,
  CProgressBar,
} from '@coreui/react'

const Breadcrumbs = () => {
  const countryCode = useSelector((state) => state.countryCode)
  const [responseData, setResponseData] = React.useState(null)
  const [ErrorFlag, setErrorFlag] = React.useState(false)

  React.useEffect(() => {
    initialTask()
  }, [])

  const initialTask = async () => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    await initSubmission(username)
    await handleSubmission('get', '')
  }

  const initSubmission = async (event) => {
    const article = { username: event }
    try {
      await axios
        .post(
          'https://kiz56ey9qg.execute-api.ap-northeast-1.amazonaws.com/default/InitialFunction',
          article,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          console.log(res.data)
        })
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmission = async (key, id) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const article = { username: username, key: key, id }
    try {
      await axios
        .post(
          'https://01n2qrgpme.execute-api.ap-northeast-1.amazonaws.com/default/Get-All-Process-From-DynamoDB-Import',
          article,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          if (key === 'get') {
            setResponseData(res.data)
          }
          if (key === 'stop') {
            alert('正常にキャンセルできました！')
          }
        })
    } catch (err) {
      setErrorFlag(true)
    }
  }

  const download = (event) => {
    const link = document.createElement('a')
    link.href = event
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  if (ErrorFlag) {
    return (
      <div>
        <h3>処理結果がありません</h3>
      </div>
    )
  } else if (!responseData) {
    return (
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
    )
  }

  return (
    <CRow>
      <h3 className="h3style">商品情報取得 - 処理結果一覧</h3>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>最新の処理結果から順に表示</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen flush>
              {responseData.data.map((item, index) => (
                <CAccordionItem itemKey={index} key={index}>
                  {item.url === 'cancel' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong style={{ color: '#BA8448' }}>キャンセル済み</strong>
                      &ensp;&ensp;
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  ) : item.url === 'waiting' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong style={{ color: '#2E8B57' }}>予約中</strong>
                      &ensp;&ensp;
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  ) : item.url === 'failure' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong style={{ color: '#B22222' }}>エラー</strong>
                      &ensp;&ensp;
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  ) : item.url.substr(0, 5) === 'https' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong>処理済み</strong>
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong>(自動価格改定)</strong>
                      ) : item.isExhibit === 'Yes' ? (
                        <strong>(自動出品済み)</strong>
                      ) : (
                        <strong>(自動出品無し)</strong>
                      )}
                      {item.startdatetime ? (
                        <div>
                          &ensp;&ensp;{item.startdatetime.substr(0, 4)}/
                          {item.startdatetime.substr(4, 2)}/{item.startdatetime.substr(6, 2)}&ensp;
                          {item.startdatetime.substr(8, 2)}:{item.startdatetime.substr(10, 2)}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {item.enddatetime ? (
                        <div>
                          &ensp;~&ensp;{item.enddatetime.substr(0, 4)}/
                          {item.enddatetime.substr(4, 2)}/{item.enddatetime.substr(6, 2)}&ensp;
                          {item.enddatetime.substr(8, 2)}:{item.enddatetime.substr(10, 2)}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      &ensp;&ensp;出品可能:{item.numberofavailable}件&ensp;&ensp;出品NG:
                      {item.numberofNG}件&ensp;&ensp;
                    </CAccordionHeader>
                  ) : item.url === 'ERROR_SP-API' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong style={{ color: '#808080' }}>SP-APIエラー</strong>&ensp;&ensp;
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  ) : (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}&ensp;&ensp;
                      <strong style={{ color: '#0000CD' }}>処理中</strong>&ensp;&ensp;
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  )}
                  <CAccordionBody>
                    {item.url.substr(0, 7) === 'loading' ? (
                      <div>
                        <CAlert color="primary">
                          <strong>[処理中] Now process is ongoing.</strong>
                        </CAlert>
                        <p></p>
                        <CProgress className="mb-3">
                          <CProgressBar value={Number(item.url.substr(7, 2))}>
                            {item.url.substr(7, 2)}%
                          </CProgressBar>
                        </CProgress>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="danger" onClick={() => handleSubmission('stop', item.id)}>
                            Stop Processing
                          </CButton>
                        </div>
                      </div>
                    ) : item.url === 'waiting' ? (
                      <div>
                        <CAlert color="success">
                          <strong>[予約中] process is waiting for previous job.</strong>
                        </CAlert>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="danger" onClick={() => handleSubmission('stop', item.id)}>
                            Cancel Scheduled Process
                          </CButton>
                        </div>
                      </div>
                    ) : item.url === 'failure' ? (
                      <div>
                        <CAlert color="danger">
                          <strong>[ERROR] process was failure.....</strong>
                        </CAlert>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="danger" onClick={() => handleSubmission('stop', item.id)}>
                            Delete Remain job
                          </CButton>
                        </div>
                      </div>
                    ) : item.url === 'ERROR_SP-API' ? (
                      <div>
                        <CAlert color="dark">
                          <strong>[ERROR] SP-API Key is something worse...</strong>
                        </CAlert>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="danger" onClick={() => handleSubmission('stop', item.id)}>
                            Delete Remain job
                          </CButton>
                        </div>
                      </div>
                    ) : item.url === 'cancel' ? (
                      <div>
                        <CAlert color="warning">
                          <strong>[キャンセル済み] This job was canceled by user.</strong>
                        </CAlert>
                      </div>
                    ) : !item.url_loader ? (
                      <div>
                        <div>
                          <strong>
                            Please click bellow buttun if you want to download result.
                          </strong>
                        </div>
                        <p></p>
                        <CButton onClick={() => download(item.url)}>Product Info Download</CButton>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <strong>
                            Please click bellow buttun if you want to download result.
                          </strong>
                        </div>
                        <p></p>
                        <CButton onClick={() => download(item.url)}>Product Info Download</CButton>
                        &ensp;
                        <CButton color="success" onClick={() => download(item.url_loader)}>
                          Inventory Loader Download
                        </CButton>
                        &ensp;
                        <CButton color="warning" onClick={() => download(item.url_promise)}>
                          Promising ASIN Download
                        </CButton>
                      </div>
                    )}
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Breadcrumbs
