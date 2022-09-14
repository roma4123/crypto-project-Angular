export interface INews {
  status: string;
  totalResults: number;
  articles: IArticles[];
}

export interface IArticles {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
