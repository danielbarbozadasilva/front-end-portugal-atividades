import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Col } from 'react-bootstrap'
import {
  ShowcaseWrapper,
  ShowcaseRow,
  ShowcaseImg,
  ShowcaseText,
  ShowcaseTitle,
  ShowcaseLead,
  ShowcaseButton
} from './styled'
import TravelImage01 from '../../../../assets/img/11111.jpg'
import TravelImage02 from '../../../../assets/img/777.jpg'
import TravelImage03 from '../../../../assets/img/999.jpeg'

interface IShowcaseData {
  id: number
  title: string
  lead: string
  bgImage: string
  btnLabel: string
  reverse: boolean
}

const ShowCaseSectionComponent: React.FC = () => {
  const { t } = useTranslation()

  /**
   * Agora, cada item carrega as strings do i18n (ex.: t('home.showcase1Title')) 
   * em vez de texto fixo.
   */
  const showcases: IShowcaseData[] = [
    {
      id: 1,
      title: t('home.showcase1Title'),
      lead: t('home.showcase1Lead'),
      bgImage: TravelImage01,
      btnLabel: t('home.showcase1Btn'),
      reverse: true
    },
    {
      id: 2,
      title: t('home.showcase2Title'),
      lead: t('home.showcase2Lead'),
      bgImage: TravelImage02,
      btnLabel: t('home.showcase2Btn'),
      reverse: false
    },
    {
      id: 3,
      title: t('home.showcase3Title'),
      lead: t('home.showcase3Lead'),
      bgImage: TravelImage03,
      btnLabel: t('home.showcase3Btn'),
      reverse: true
    }
  ]

  return (
    <ShowcaseWrapper>
      <Container fluid className="p-0">
        {showcases.map((item) => (
          <ShowcaseRow key={item.id} className="g-0 align-items-center">
            {item.reverse ? (
              <>
                <ShowcaseImg
                  bgImage={item.bgImage}
                  className="order-lg-2 text-white"
                  as={Col}
                  lg={6}
                />
                <ShowcaseText as={Col} lg={6} className="order-lg-1">
                  <div>
                    <ShowcaseTitle>{item.title}</ShowcaseTitle>
                    <ShowcaseLead>{item.lead}</ShowcaseLead>
                    <ShowcaseButton variant="outline-light" className="mt-3">
                      {item.btnLabel}
                    </ShowcaseButton>
                  </div>
                </ShowcaseText>
              </>
            ) : (
              <>
                <ShowcaseImg bgImage={item.bgImage} as={Col} lg={6} />
                <ShowcaseText as={Col} lg={6}>
                  <div>
                    <ShowcaseTitle>{item.title}</ShowcaseTitle>
                    <ShowcaseLead>{item.lead}</ShowcaseLead>
                    <ShowcaseButton variant="outline-light" className="mt-3">
                      {item.btnLabel}
                    </ShowcaseButton>
                  </div>
                </ShowcaseText>
              </>
            )}
          </ShowcaseRow>
        ))}
      </Container>
    </ShowcaseWrapper>
  )
}

export default ShowCaseSectionComponent
