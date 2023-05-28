import { XMLParser } from 'fast-xml-parser'

export interface PodcastFeed {
  author: string
  description: string
  link: string
  image: RSSImage
  language: string
  title: string
  lastBuildDate: string
  items: PodcastEpisode[]
}

export interface RSSImage {
  link: string
  url: string
  title: string
}

export interface PodcastEpisode {
  guid: string
  title: string
  pubDate: string
  link: string
}

export default async function parseFeed(feedURL: string): Promise<PodcastFeed> {
  const req = await fetch(feedURL, {
    method: 'GET',
  })
  const xml = await req.text()

  const parser = new XMLParser()
  const obj = parser.parse(xml)

  return obj.rss.channel
}
