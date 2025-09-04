import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const LoaderCard = () => (
  <LoaderBgContainer data-testid="loader">
    <Loader type="TailSpin" color="#ff0000" height={50} width={50} />
  </LoaderBgContainer>
)

export default LoaderCard

const LoaderBgContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
