import React from 'react'
import { useTranslation } from 'react-i18next' // <-- Import do hook
import { Row, Col } from 'react-bootstrap'
import {
  SectionLead,
  SectionTitle,
  SectionWrapper,
  TestimonialImage,
  TestimonialName,
  TestimonialText
} from './styled'
import { ITestimonial } from './types'
import FoodImage01 from '../../../../assets/img/09.jpg'
import FoodImage02 from '../../../../assets/img/08.jpg'
import FoodImage03 from '../../../../assets/img/07.jpg'

const GastronomySection: React.FC = () => {
  const { t } = useTranslation()

  /**
   * Substituímos os valores fixos do array pelos t('home.foodPastelNataTitle'), etc.
   */
  const testimonials: ITestimonial[] = [
    {
      id: 1,
      name: t('home.foodPastelNataTitle'),
      text: t('home.foodPastelNataText'),
      img: FoodImage01,
      alt: 'Pastel de Nata'
    },
    {
      id: 2,
      name: t('home.foodFrancesinhaTitle'),
      text: t('home.foodFrancesinhaText'),
      img: FoodImage02,
      alt: 'Francesinha'
    },
    {
      id: 3,
      name: t('home.foodBacalhauTitle'),
      text: t('home.foodBacalhauText'),
      img: FoodImage03,
      alt: 'Bacalhau à Brás'
    }
  ]

  return (
    <SectionWrapper>
      <div className="container">
        {/* Antes: "Delícias da Gastronomia Portuguesa" -> t('home.gastronomySectionTitle') */}
        <SectionTitle>{t('home.gastronomySectionTitle')}</SectionTitle>
        {/* Antes: "Prepare-se para..." -> t('home.gastronomySectionLead') */}
        <SectionLead>{t('home.gastronomySectionLead')}</SectionLead>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} lg={4} className="mb-4">
              <div className="mx-auto testimonial-item">
                <TestimonialImage
                  src={testimonial.img}
                  alt={testimonial.alt}
                  className="img-fluid rounded-circle"
                />
                <TestimonialName>{testimonial.name}</TestimonialName>
                <TestimonialText>{testimonial.text}</TestimonialText>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </SectionWrapper>
  )
}

export default GastronomySection
