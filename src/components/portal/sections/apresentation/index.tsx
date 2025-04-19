import React from 'react'
import { useTranslation } from 'react-i18next' // <-- Import do hook
import {
  SectionWrapper,
  Overlay,
  Container,
  Title,
  Lead,
  Button
} from './styled'

const ApresentationSectionComponent: React.FC = () => {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="sobre">
      <Overlay>
        <picture>
          <source
            type="image/webp"
            srcSet="../../../../assets/img/012m.jpg"
            media="(max-width: 576px)"
          />
          <source
            srcSet="../../../../assets/img/012l.jpg"
            media="(max-width: 768px)"
          />
          <source
            srcSet="../../../../assets/img/012lg.jpg"
            media="(max-width: 1440px)"
          />
        </picture>
      </Overlay>
      <Container>
        {/* Antes: "Portugal Espera Por Si!" -> agora: t('home.apresentationTitle') */}
        <Title>{t('home.apresentationTitle')}</Title>

        {/* Antes: "Comece já a planear..." -> agora: t('home.apresentationLead') */}
        <Lead>{t('home.apresentationLead')}</Lead>

        {/* Antes: "Planear Aventura" -> agora: t('home.planAdventure') */}
        <Button href="#planejar" role="button">
          {t('home.planAdventure')}
        </Button>
      </Container>
    </SectionWrapper>
  )
}

export default ApresentationSectionComponent
