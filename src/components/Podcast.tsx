import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import parseFeed, { PodcastFeed } from '../lib/rss'
import style from './podcast.module.scss'
import EpisodeList from './EpisodeList'

export default function Podcast() {
  const { t } = useTranslation()
  const [podcast, setPodcast] = useState<PodcastFeed>()

  useEffect(() => {
    const fetchData = async () => {
      //TODO: I can refactor this and turn it into a hook. I'll keep this in mind
      const feed = await parseFeed('https://anchor.fm/s/30c7a0d0/podcast/rss')
      setPodcast(feed)
    }

    fetchData()
  }, [])
  console.log(podcast)
  return (
    <>
      <h2>{t('podcast')}</h2>
      <p>{t('podcast-about')}</p>
      <h3>{t('podcast-myshow')}</h3>
      <figure className={style['podcast-cover']}>
        <img src={podcast?.image.url} alt={podcast?.title}></img>
        <figcaption>{podcast?.title}</figcaption>
      </figure>
      {podcast?.item && <EpisodeList episodes={podcast?.item} />}
      {/* <h3>{t('podcast-feat')}</h3> */}
    </>
  )
}
