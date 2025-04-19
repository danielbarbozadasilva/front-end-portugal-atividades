import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

// Create a simple fadeIn animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ContactSection = styled.section`
  padding: 60px 0;
  background-color: #f8f9fa;
`;

export const ContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 1rem;
    animation: ${fadeIn} 0.8s ease-out; 

`;

export const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
      animation: ${fadeIn} 0.8s ease-out 0.2s; /* Delay the animation slightly */
    animation-fill-mode: backwards;  /* Prevents flashing before animation starts */
`;

export const ContactForm = styled(Form)`
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out 0.4s;  /* Further delay for the form */
  animation-fill-mode: backwards;
 .form-label{
    font-weight: bold;
 }
  .btn-primary {
    background-color: #ffc107; /* Use your theme's primary color */
    border-color: #ffc107;
    color: #0c1c59;
    font-weight: 700;
    padding: 8px 18px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #fff;
      color: #0c1c59;
      border-color: #0c1c59;
    }
  }
`;

export const ContactInfo = styled.div`
  margin-top: 30px;
   animation: ${fadeIn} 0.8s ease-out 0.6s; /* Even further delay */
  animation-fill-mode: backwards;
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #6c757d;

  svg {
    margin-right: 10px;
    color: #ffc107; /* Use your theme's primary color for icons */
    font-size: 1.2rem;
  }
`;

export const MapContainer = styled.div`
    margin-top: 40px;
    border-radius: 10px;
    overflow: hidden;  /* Ensure map stays within rounded borders */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    animation: ${fadeIn} 0.8s ease-out 0.6s; /* Even further delay */
    animation-fill-mode: backwards;
`;

interface Props {}

const Contact: React.FC<Props> = () => {
  const { t } = useTranslation();

    // Basic form state (replace with your actual form handling logic)
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your form submission logic here (e.g., send to an API)
        console.log('Form submitted:', { name, email, message });
        // Reset form after submission (optional)
        setName('');
        setEmail('');
        setMessage('');
    };
  return (
    <Container>
      <ContactSection>
        <Row>
          <Col md={6}>
            <ContactTitle>{t('contact.title')}</ContactTitle>
            <ContactText>
              {t('contact.description')}
            </ContactText>

            <ContactInfo>
              <ContactInfoItem>
                <FaMapMarkerAlt />
                <span>{t('contact.address')}</span>
              </ContactInfoItem>
              <ContactInfoItem>
                <FaPhone />
                <span>{t('contact.phone')}</span>
              </ContactInfoItem>
              <ContactInfoItem>
                <FaEnvelope />
                <span>{t('contact.email')}</span>
              </ContactInfoItem>
            </ContactInfo>
          </Col>
          <Col md={6}>
            <ContactForm onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>{t('contact.form.nameLabel')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label={t('contact.form.nameLabel')} // ARIA label for accessibility
                />
                <Form.Text className="text-muted">
                    {t('contact.form.nameDescription')}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('contact.form.emailLabel')}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                   aria-label={t('contact.form.emailLabel')}
                />
                 <Form.Text className="text-muted">
                    {t('contact.form.emailDescription')}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>{t('contact.form.messageLabel')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  aria-label={t('contact.form.messageLabel')}
                />
                <Form.Text className="text-muted">
                    {t('contact.form.messageDescription')}
                </Form.Text>
              </Form.Group>
              {/* Adicione transições com keyframes */}
              <Button variant="primary" type="submit" >
                {t('contact.form.submitButton')}
              </Button>
            </ContactForm>
          </Col>
        </Row>
        {/*  Example map integration (using a placeholder image for now) */}
      </ContactSection>
        <Row>
            <Col>
                <MapContainer>
                    {/* Placeholder for a map (replace with your actual map integration, e.g., Google Maps) */}
                    <iframe
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25724.85186713266!2d-8.233862744272298!3d37.09425346736121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ab73d2cafa447%3A0x17757c4919ef865d!2sAlbufeira%2C%20Portugal!5e0!3m2!1sen!2sus!4v1685458871104!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        aria-label={t('contact.mapAlt')}
                    >
                    </iframe>
                </MapContainer>
            </Col>
        </Row>
    </Container>
  );
};

export default Contact;