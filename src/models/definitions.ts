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

export interface RegisterProps {
    first_name: string,
    last_name: string
    username: string,
    password: string
}

export interface LoginProps {
    username: string,
    password: string
}