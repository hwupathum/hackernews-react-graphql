import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import * as React from 'react';
import { DataValue } from 'react-apollo';

import { NewsItemModel } from '../data/models';
import { LoadingSpinner } from './loading-spinner';
import { NewsDetail, newsDetailNewsItemFragment } from './news-detail';
import { NewsTitle, newsTitleFragment } from './news-title';

export interface INewsFeedProps {
  currentUrl: string;
  first: number;
  isJobListing?: boolean;
  isPostScrutinyVisible?: boolean;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  newsItems: Array<NewsItemModel | null>;
  notice?: JSX.Element;
  skip: number;
}

export const newsFeedNewsItemFragment = `
  fragment NewsFeed on NewsItem {
    id
    hidden
    ...NewsTitle
    ...NewsDetail
  }
  ${newsTitleFragment}
  ${newsDetailNewsItemFragment}
`;

export function NewsFeedView(props: INewsFeedProps): JSX.Element {
  const {
    isPostScrutinyVisible = false,
    first,
    newsItems,
    notice = null,
    skip,
    isJobListing = false,
    isRankVisible = true,
    isUpvoteVisible = true,
    currentUrl,
  } = props;

  const nextPage = Math.ceil(skip / first) + 1;

  return (
    <>
      {notice && notice}
      {newsItems
        .filter((newsItem): newsItem is NewsItemModel => !!newsItem && !newsItem.hidden)
        .flatMap((newsItem, index) => [
          <Card variant="outlined">
            <CardContent>
              <NewsTitle
                key={`${newsItem.id}title`}
                isRankVisible={isRankVisible}
                isUpvoteVisible={isUpvoteVisible}
                rank={skip + index + 1}
                {...newsItem}
              />
              <NewsDetail
                key={`${newsItem.id}detail`}
                isFavoriteVisible={false}
                isPostScrutinyVisible={isPostScrutinyVisible}
                isJobListing={isJobListing}
                {...newsItem}
              />
            </CardContent>
          </Card>,
          <div style={{ height: 5 }} />,
        ])}
      <div style={{ height: '20px' }} />
      <Pagination
        count={nextPage + 1}
        page={nextPage}
        color="primary"
        onChange={(event,value) => {window.location.href = `${currentUrl}?p=${value-1}`}}
      />
    </>
  );
}

export interface INewsFeedData {
  error;
  feed;
  loading;
}
export interface INewsFeedContainerProps {
  currentUrl: string;
  data: DataValue<INewsFeedData, {}>;
  first: number;
  isJobListing?: boolean;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  notice?: JSX.Element;
  skip: number;
}

export const NewsFeed: React.FC<INewsFeedContainerProps> = (props) => {
  const { data, currentUrl, first, skip, notice } = props;

  if (data?.error) {
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  }

  if (data?.feed?.length) {
    return (
      <NewsFeedView
        newsItems={data?.feed}
        currentUrl={currentUrl}
        first={first}
        skip={skip}
        notice={notice}
      />
    );
  }

  return <LoadingSpinner />;
};
