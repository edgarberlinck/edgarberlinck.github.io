import { PodcastEpisode } from '../lib/rss'

import style from './EpisodeList.module.scss'

interface Props {
  episodes: PodcastEpisode[]
}

const EpisodeList: React.FC<Props> = ({ episodes }) => {
  return (
    <>
      {episodes.map((episode: PodcastEpisode) => (
        <div key={episode.guid} className={style['episode-wrapper']}>
          <a href={episode.link} target="_blank">
            <h4>{episode.title}</h4>
          </a>
          <small>{episode.pubDate}</small>
          <p>{episode.description}</p>
        </div>
      ))}
    </>
  )
}

export default EpisodeList
