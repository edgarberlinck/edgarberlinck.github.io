import { SocialIcon } from 'react-social-icons';
import { useTranslation } from 'react-i18next'

export default function SocialMedia() {
  const { t } = useTranslation()

  return (
    <div className='flex'>
      <SocialIcon url='https://twitter.com/edgarberlinck' network='twitter' fgColor='white' label={t('label-twitter') as string} />
      <SocialIcon url='https://t.me/edgarberlinck' network='telegram' fgColor='white' label={t('label-telegram') as string} />
      <SocialIcon url='https://github.com/edgarberlinck' network='github' bgColor='white' label={t('label-github') as string} />
      <SocialIcon url='https://linkedin.com/in/edgarberlinck' network='linkedin' fgColor='white' label={t('label-linkedin') as string} />
    </div>
  )
}