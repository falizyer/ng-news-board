declare const process: {
  production: boolean;
};

export namespace NewsBoard {

  export type SourceItemObject = {
    id: string,
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  };

  export type SourceItemResponseObject = {
    status: string;
    sources: SourceItemObject[];
  };

  export type ArticleObject = {
    source: {
      id: string;
      name: string;
    },
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };

  export type ArticleResponseObject = {
    status: string;
    totalResults: number;
    articles: ArticleObject;
  };

  export type FeedSearchItemObject = {
    language?: string;
  };
}
