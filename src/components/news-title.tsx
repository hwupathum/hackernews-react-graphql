import { useMutation } from '@apollo/client';
import { Tooltip, Typography } from '@material-ui/core';
import { ArrowUpward, Forward, OpenInNew } from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { parse } from 'url';
import { UPVOTE_NEWS_ITEM_MUTATION } from '../data/mutations/upvote-news-item-mutation';

import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface INewsTitleProps {
  id: number;
  isRankVisible?: boolean;
  isJobListing?: boolean;
  creationTime: number;
  rank?: number;
  submitterId: string;
  title: string;
  url?: string;
  isUpvoteVisible?: boolean;
  upvoted?: boolean;
}

export const newsTitleFragment = `
  fragment NewsTitle on NewsItem {
    id
    title
    url
    upvoted
  }
`;

export function NewsTitle(props: INewsTitleProps): JSX.Element {
  const { id, isRankVisible = true, rank, title, url, isJobListing = false, isUpvoteVisible = true, upvoted, creationTime, submitterId } = props;
  const [upvoteNewsItem] = useMutation(UPVOTE_NEWS_ITEM_MUTATION, {
    onError: () => Router.push('/login', `/vote?id=${id}&how=up&goto=news`),
    variables: { id },
  });

  return (
    <>
      {isJobListing ? (
        <Typography variant="caption" style={{ fontSize: '8pt' }}>
          {`Posted ${convertNumberToTimeAgo(creationTime)}`}
        </Typography>
      ) : (
        <Typography variant="caption" color="textSecondary" style={{ fontSize: '8pt' }}>
          {'Posted by '}
          <Link href={`/user?id=${submitterId}`}>
            <a style={{ color: '#6a7172' }}>{submitterId}</a>
          </Link>
          {' '}
          <Link href={`/item?id=${id}`}>
            <a style={{ color: '#6a7172' }}>{convertNumberToTimeAgo(creationTime)}</a>
          </Link>
        </Typography>
      )}
      <Typography variant="subtitle1" color="textPrimary">
        {isRankVisible && `${rank}. `}
        <span style={{ color: '#ff6600' }}>
          {isUpvoteVisible && (
            <Tooltip title="upvote">
              <a
                className={upvoted ? 'nosee' : ' '}
                onClick={(): Promise<any> => upvoteNewsItem()}
                style={{ cursor: 'pointer' }}
              >
                <Forward style={{ marginBottom: -4, transform: 'rotate(-90deg)' }} />
              </a>
            </Tooltip>
          )}
        </span>
        {title}
        {url && <Typography variant="caption" color="textSecondary">
          {' '}
          <a href={url || `item?id=${id}`} style={{ color: '#6a7172' }}>
            {parse(url).hostname}
            <OpenInNew style={{ fontSize: 14, marginBottom: -3 }} />
          </a>
        </Typography>}
      </Typography>
    </>
  );
}
