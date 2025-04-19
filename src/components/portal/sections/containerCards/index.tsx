import React from 'react'
import {  Row, Col, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FaHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import { ActivityCardProps } from './types'

export const ShowcaseWrapper = styled(Col)`
  display: inline-block;
  width: 400px;
  height: 550px;
  margin: 0 auto;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  padding: 2rem;
`

export const ShowcaseRow = styled(Row)`
  margin: 0;
`

export const CardImageContainer = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 180px;
  background: ${({ imageUrl }) =>
    imageUrl ? `url('${imageUrl}') no-repeat center center` : `#ccc`};
  background-size: cover;
  position: relative;
`

export const SpecialOfferBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #d32424;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 6px;
  border-radius: 4px;
  z-index: 2;
`

export const FavoriteIcon = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #e9e9e9;
    color: #d32424;
  }
`

export const CardContent = styled.div`
  padding: 12px 14px;
`

export const LocationRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  .location-text {
    margin-left: 4px;
    font-size: 0.9rem;
    color: #555;
  }

  .rating-text {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;

    .stars {
      color: #00af63;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
    }

    .count {
      color: #555;
      font-size: 0.8rem;
    }
  }
`

export const CardTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
`

export const PriceRow = styled.div`
  margin-top: 8px;
  font-size: 0.95rem;
  color: #333;

  .new-price {
    font-weight: 700;
    font-size: 1rem;
    color: #d32424;
  }

  .old-price {
    margin-left: 6px;
    color: #999;
    text-decoration: line-through;
    font-size: 0.85rem;
  }
`

export const PriceNote = styled.p`
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0;
`

export const SButton = styled(Button)`
  background-color: #ffc107;
  border: none;
  color: #0c1c59;
  font-weight: 700;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 10px;
  &:hover {
    background-color: #fff;
    color: #0c1c59;
  }
`

import { useTranslation } from 'react-i18next'


const ActivityCardContainer: React.FC<ActivityCardProps> = ({ activity }) => {
  const { t } = useTranslation()
  const { _id, images, name, shortDescription, location, startDate, endDate, likes, price, featured } = activity
  const likesCount = likes?.length || 0

  return (
    <ShowcaseWrapper md={3} xs={12} className="mb-4" key={_id}>
      <ShowcaseRow className="g-0">
        <CardImageContainer imageUrl={images && images.length > 0 ? images[0] : ''}>
          {/* Substitui “Oferta especial” -> t('home.specialOfferBadge') */}
          {featured && <SpecialOfferBadge>{t('home.specialOfferBadge')}</SpecialOfferBadge>}
          <FavoriteIcon>
            <FaHeart />
          </FavoriteIcon>
        </CardImageContainer>
        <CardContent>
          <LocationRow>
            <FaMapMarkerAlt />
            <span className="location-text">{location}</span>
            <div className="rating-text">
              <span className="stars">
                {[...Array(likesCount)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </span>
              <span className="count">({likesCount})</span>
            </div>
          </LocationRow>

          <CardTitle>{name}</CardTitle>

          {shortDescription && (
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '6px' }}>
              {shortDescription}
            </p>
          )}

          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
            <strong>Início:</strong> {new Date(startDate).toLocaleDateString()} |{' '}
            <strong>Fim:</strong> {new Date(endDate).toLocaleDateString()}
          </p>

          <PriceRow>
            <span>
              a partir de <span className="new-price">{price} R$</span>
            </span>
            {price && (
              <span className="old-price">{(price * 0.9).toFixed(2)} R$</span>
            )}
          </PriceRow>
          {/* Substitui “Os preços variam...” -> t('home.priceNote') */}
          <PriceNote>{t('home.priceNote')}</PriceNote>
          {/* Substitui “Participar” -> t('home.joinButton') */}
          <SButton>{t('home.joinButton')}</SButton>
        </CardContent>
      </ShowcaseRow>
    </ShowcaseWrapper>
  )
}

export default ActivityCardContainer

