import { Card, CardContent, Divider } from '@material-ui/core';
import * as React from 'react';

import { NewsItemModel } from '../data/models';
import { CommentBox } from './comment-box';
import { Comments } from './comments';
import { LoadingSpinner } from './loading-spinner';
import { NewsDetail } from './news-detail';
import { NewsTitle } from './news-title';
import { IMeQuery, ME_QUERY } from '../data/queries/me-query';
import { useQuery } from '@apollo/client';

export interface INewsItemWithCommentsProps {
  error: Error;
  loading: boolean;
  newsItem: NewsItemModel;
}

/** Acts as the component for a page of a news item with all it's comments */
export function NewsItemWithComments(props: INewsItemWithCommentsProps): JSX.Element {
  const { loading, error, newsItem } = props;
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  if (error) {
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  }

  if (loading || !newsItem || !newsItem.comments) {
    return <LoadingSpinner />;
  }

  console.log(data)

  return (
    <Card variant="outlined">
      <CardContent>
        <NewsTitle isRankVisible={false} {...newsItem} />
        <NewsDetail isPostScrutinyVisible {...newsItem} />
        <Divider style={{margin: '12px 0'}}/>
        <CommentBox me={!!data?.me} />
        <Comments newsItem={newsItem} />
      </CardContent>
    </Card>
  );
}
