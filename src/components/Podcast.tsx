import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import parseFeed, { PodcastFeed } from '../lib/rss'
import style from './podcast.module.scss'

export default function Podcast() {
  const { t } = useTranslation()
  const [podcast, setPodcast] = useState<PodcastFeed>()

  useEffect(() => {
    const fetchData = async () => {
      const feed = await parseFeed('https://anchor.fm/s/30c7a0d0/podcast/rss')
      setPodcast(feed)
    }

    fetchData()
  }, [])

  return (
    <>
      <h2>{t('podcast')}</h2>
      <p>{t('podcast-about')}</p>
      <h3>{t('podcast-myshow')}</h3>
      <figure className={style['podcast-cover']}>
        <img src={podcast?.image.url} alt={podcast?.title}></img>
        <figcaption>{podcast?.title}</figcaption>
      </figure>
      {/* <h3>{t('podcast-feat')}</h3> */}
    </>
  )
}
