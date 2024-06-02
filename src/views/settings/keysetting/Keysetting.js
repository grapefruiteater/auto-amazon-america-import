import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CSpinner,
  CAlert,
} from '@coreui/react'

const Parameter = () => {
  const button_color = 'dark'
  const [responseData, setResponseData] = React.useState(null)

  const [JPLWAAPPIDData1, setJPLWAAPPIDData1] = React.useState(null)
  const [JPLWACLIENTData1, setJPLWACLIENTData1] = React.useState(null)
  const [JPREFLESHData1, setJPREFLESHData1] = React.useState(null)
  const [JPLWAAPPIDData2, setJPLWAAPPIDData2] = React.useState(null)
  const [JPLWACLIENTData2, setJPLWACLIENTData2] = React.useState(null)
  const [JPREFLESHData2, setJPREFLESHData2] = React.useState(null)
  const [JPLWAAPPIDData3, setJPLWAAPPIDData3] = React.useState(null)
  const [JPLWACLIENTData3, setJPLWACLIENTData3] = React.useState(null)
  const [JPREFLESHData3, setJPREFLESHData3] = React.useState(null)
  const [JPLWAAPPIDData4, setJPLWAAPPIDData4] = React.useState(null)
  const [JPLWACLIENTData4, setJPLWACLIENTData4] = React.useState(null)
  const [JPREFLESHData4, setJPREFLESHData4] = React.useState(null)

  const [USLWAAPPIDData1, setUSLWAAPPIDData1] = React.useState(null)
  const [USLWACLIENTData1, setUSLWACLIENTData1] = React.useState(null)
  const [USREFLESHData1, setUSREFLESHData1] = React.useState(null)
  const [USLWAAPPIDData2, setUSLWAAPPIDData2] = React.useState(null)
  const [USLWACLIENTData2, setUSLWACLIENTData2] = React.useState(null)
  const [USREFLESHData2, setUSREFLESHData2] = React.useState(null)
  const [USLWAAPPIDData3, setUSLWAAPPIDData3] = React.useState(null)
  const [USLWACLIENTData3, setUSLWACLIENTData3] = React.useState(null)
  const [USREFLESHData3, setUSREFLESHData3] = React.useState(null)
  const [USLWAAPPIDData4, setUSLWAAPPIDData4] = React.useState(null)
  const [USLWACLIENTData4, setUSLWACLIENTData4] = React.useState(null)
  const [USREFLESHData4, setUSREFLESHData4] = React.useState(null)

  const [isAvairableSPAPIJP, setisAvairableSPAPIJP] = React.useState(['', '', '', ''])
  const [isAvairableSPAPIUS, setisAvairableSPAPIUS] = React.useState(['', '', '', ''])
  const [isLoading, setisLoading] = React.useState(false)
  const [isSaveLoading, setisSaveLoading] = React.useState(false)
  const countryCode = useSelector((state) => state.countryCode)

  React.useEffect(() => {
    initialTask()
  }, [])

  const initialTask = async () => {
    await handleSubmission('update', [], '')
  }

  const handleSubmission = async (keys, event, country) => {
    if (keys === 'check') {
      setisLoading(true)
    }
    if (keys === 'save') {
      setisSaveLoading(true)
    }
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { user: username, data: event, keys: keys, country: country }
    try {
      await axios
        .post(
          'https://lzeo9zo6tc.execute-api.ap-northeast-1.amazonaws.com/default/Revise-SP-API-Key-To-DynamoDB-Import',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          if ((keys === 'update') | (keys === 'save')) {
            setResponseData(res.data)
            setJPLWAAPPIDData1(res.data[0])
            setJPLWAAPPIDData2(res.data[1])
            setJPLWAAPPIDData3(res.data[2])
            setJPLWAAPPIDData4(res.data[3])
            setJPLWACLIENTData1(res.data[4])
            setJPLWACLIENTData2(res.data[5])
            setJPLWACLIENTData3(res.data[6])
            setJPLWACLIENTData4(res.data[7])
            setJPREFLESHData1(res.data[8])
            setJPREFLESHData2(res.data[9])
            setJPREFLESHData3(res.data[10])
            setJPREFLESHData4(res.data[11])
            setUSLWAAPPIDData1(res.data[12])
            setUSLWAAPPIDData2(res.data[13])
            setUSLWAAPPIDData3(res.data[14])
            setUSLWAAPPIDData4(res.data[15])
            setUSLWACLIENTData1(res.data[16])
            setUSLWACLIENTData2(res.data[17])
            setUSLWACLIENTData3(res.data[18])
            setUSLWACLIENTData4(res.data[19])
            setUSREFLESHData1(res.data[20])
            setUSREFLESHData2(res.data[21])
            setUSREFLESHData3(res.data[22])
            setUSREFLESHData4(res.data[23])
          } else if (keys === 'check') {
            setisAvairableSPAPIJP([res.data[0], res.data[1], res.data[2], res.data[3]])
            setisAvairableSPAPIUS([res.data[4], res.data[5], res.data[6], res.data[7]])
            alert('動作を確認できました。')
          }
          if (keys === 'save') {
            setisSaveLoading(false)
            alert('正常に保存できました！')
          }
        })
    } catch (err) {
      console.error(err)
    }
    setisLoading(false)
    setisSaveLoading(false)
  }

  let inputAllList = [
    JPLWAAPPIDData1,
    JPLWACLIENTData1,
    JPREFLESHData1,
    JPLWAAPPIDData2,
    JPLWACLIENTData2,
    JPREFLESHData2,
    JPLWAAPPIDData3,
    JPLWACLIENTData3,
    JPREFLESHData3,
    JPLWAAPPIDData4,
    JPLWACLIENTData4,
    JPREFLESHData4,
    USLWAAPPIDData1,
    USLWACLIENTData1,
    USREFLESHData1,
    USLWAAPPIDData2,
    USLWACLIENTData2,
    USREFLESHData2,
    USLWAAPPIDData3,
    USLWACLIENTData3,
    USREFLESHData3,
    USLWAAPPIDData4,
    USLWACLIENTData4,
    USREFLESHData4,
  ]

  if (!responseData) {
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
      <h3 className="h3style">SP-API キー設定</h3>
      {isAvairableSPAPIJP[0] && isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="success">※①のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="danger">※①のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIJP[1] && isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="success">※②のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="danger">※②のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIJP[2] && isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="success">※③のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="danger">※③のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIJP[3] && isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="success">※④のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIJP[0] !== '' ? (
        <div>
          <CAlert color="danger">※④のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>日本のセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="AWS IAM ARN ※下記APIキーを取得する際に使用する"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue="arn:aws:iam::501273628515:role/AWS_IAM_SPAPI_Access_Role"
                aria-label="SP-API"
                disabled
              />
            </CCol>
            <p></p>
            <mark style={{ color: '#CD5C5C' }}>
              ※①のSP-APIキーは出品処理に使用するため、出品対象の日本のセラーセントラルショップから取得する。
            </mark>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ①" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWAAPPIDData1}
                aria-label="SP-API"
                onChange={(event) => setJPLWAAPPIDData1(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ①"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWACLIENTData1}
                aria-label="SP-API"
                onChange={(event) => setJPLWACLIENTData1(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ①" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPREFLESHData1}
                aria-label="SP-API"
                onChange={(event) => setJPREFLESHData1(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ②" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWAAPPIDData2}
                aria-label="SP-API"
                onChange={(event) => setJPLWAAPPIDData2(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ②"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWACLIENTData2}
                aria-label="SP-API"
                onChange={(event) => setJPLWACLIENTData2(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ②" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPREFLESHData2}
                aria-label="SP-API"
                onChange={(event) => setJPREFLESHData2(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ③" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWAAPPIDData3}
                aria-label="SP-API"
                onChange={(event) => setJPLWAAPPIDData3(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ③"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWACLIENTData3}
                aria-label="SP-API"
                onChange={(event) => setJPLWACLIENTData3(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ③" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPREFLESHData3}
                aria-label="SP-API"
                onChange={(event) => setJPREFLESHData3(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ④" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWAAPPIDData4}
                aria-label="SP-API"
                onChange={(event) => setJPLWAAPPIDData4(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ④"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWACLIENTData4}
                aria-label="SP-API"
                onChange={(event) => setJPLWACLIENTData4(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ④" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPREFLESHData4}
                aria-label="SP-API"
                onChange={(event) => setJPREFLESHData4(event.target.value)}
              />
            </CCol>
            <p></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission('save', inputAllList, '')}
              >
                {isSaveLoading ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                保存
              </CButton>
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission('check', [], 'JP')}
              >
                {isLoading ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                動作確認
              </CButton>
            </div>
            <p></p>
            <small className="d-grid gap-2 d-md-flex justify-content-md-end">
              ※保存を押してから、動作確認を実行してください
            </small>
          </CCardBody>
        </CCard>
      </CCol>
      {isAvairableSPAPIUS[0] && isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="success">※①のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="danger">※①のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIUS[1] && isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="success">※②のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="danger">※②のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIUS[2] && isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="success">※③のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="danger">※③のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isAvairableSPAPIUS[3] && isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="success">※④のSP-API キーは正常に動作しました！</CAlert>
        </div>
      ) : isAvairableSPAPIUS[0] !== '' ? (
        <div>
          <CAlert color="danger">※④のSP-API キーの設定が間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>アメリカのセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="AWS IAM ARN ※下記APIキーを取得する際に使用する"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue="arn:aws:iam::501273628515:role/AWS_IAM_SPAPI_Access_Role"
                aria-label="SP-API"
                disabled
              />
            </CCol>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ①" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWAAPPIDData1}
                aria-label="SP-API"
                onChange={(event) => setUSLWAAPPIDData1(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ①"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWACLIENTData1}
                aria-label="SP-API"
                onChange={(event) => setUSLWACLIENTData1(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ①" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USREFLESHData1}
                aria-label="SP-API"
                onChange={(event) => setUSREFLESHData1(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ②" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWAAPPIDData2}
                aria-label="SP-API"
                onChange={(event) => setUSLWAAPPIDData2(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ②"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWACLIENTData2}
                aria-label="SP-API"
                onChange={(event) => setUSLWACLIENTData2(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ②" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USREFLESHData2}
                aria-label="SP-API"
                onChange={(event) => setUSREFLESHData2(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ③" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWAAPPIDData3}
                aria-label="SP-API"
                onChange={(event) => setUSLWAAPPIDData3(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ③"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWACLIENTData3}
                aria-label="SP-API"
                onChange={(event) => setUSLWACLIENTData3(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ③" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USREFLESHData3}
                aria-label="SP-API"
                onChange={(event) => setUSREFLESHData3(event.target.value)}
              />
            </CCol>
            <p></p>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID ④" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWAAPPIDData4}
                aria-label="SP-API"
                onChange={(event) => setUSLWAAPPIDData4(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット ④"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWACLIENTData4}
                aria-label="SP-API"
                onChange={(event) => setUSLWACLIENTData4(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン ④" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USREFLESHData4}
                aria-label="SP-API"
                onChange={(event) => setUSREFLESHData4(event.target.value)}
              />
            </CCol>
            <p></p>
            <div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                  type="button"
                  color={button_color}
                  onClick={() => handleSubmission('save', inputAllList, '')}
                >
                  {isSaveLoading ? (
                    <CSpinner
                      component="span"
                      size="sm"
                      aria-hidden="true"
                      style={{ marginRight: '5px' }}
                    />
                  ) : (
                    <div></div>
                  )}
                  保存
                </CButton>
                <CButton
                  type="button"
                  color={button_color}
                  onClick={() => handleSubmission('check', [], 'US')}
                >
                  {isLoading ? (
                    <CSpinner
                      component="span"
                      size="sm"
                      aria-hidden="true"
                      style={{ marginRight: '5px' }}
                    />
                  ) : (
                    <div></div>
                  )}
                  動作確認
                </CButton>
              </div>
            </div>
            <p></p>
            <small className="d-grid gap-2 d-md-flex justify-content-md-end">
              ※保存を押してから、動作確認を実行してください
            </small>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Parameter
