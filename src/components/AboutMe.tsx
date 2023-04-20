import { useTranslation } from 'react-i18next'
import styles from './AboutMe.module.scss'
import SocialMedia from './SocialMedia'

export default function AboutMe () {
  const { t } = useTranslation()
  
  return (
    <div className={styles.about}>
      <div>
        <h1>{ t('greet') }</h1>
        <p>{ t('about') }</p>
        <p>{ t('social') }</p>
        <SocialMedia />
        <p>{ t('mentoring') }</p>
      </div>
      <div>
        <img src={'https://github.com/edgarberlinck.png?size=300'} />
      </div>
    </div>
  )
}