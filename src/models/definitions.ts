export interface TopicProps {
    _id: string,
    topicTitle: string,
    topicDescription: string
}

export interface DataProps {
    topicTitle: string,
    topicDescription: string
}

export interface IdProps {
    id: string
}

export interface Topic {
    topics: TopicProps[]
}