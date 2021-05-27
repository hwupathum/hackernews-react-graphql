import { useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { ArrowUpward, ChatBubbleOutline, Visibility, VisibilityOff } from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';

import { HIDE_NEWS_ITEM_MUTATION } from '../data/mutations/hide-news-item-mutation';
import { UPVOTE_NEWS_ITEM_MUTATION } from '../data/mutations/upvote-news-item-mutation';
import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface INewsDetailProps {
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  id: number;
  isFavoriteVisible?: boolean;
  isJobListing?: boolean;
  isPostScrutinyVisible?: boolean;
  submitterId: string;
  upvoteCount: number;
}

export const newsDetailNewsItemFragment = `
  fragment NewsDetail on NewsItem {
    id
    commentCount
    creationTime
    hidden
    submitterId
    upvoteCount
  }
`;

const HIDE_BUTTON_STYLE = { cursor: 'pointer' };

export function NewsDetail(props: INewsDetailProps): JSX.Element {
  const {
    commentCount,
    creationTime,
    hidden,
    id,
    isFavoriteVisible = true,
    isJobListing = false,
    isPostScrutinyVisible = false,
    submitterId,
    upvoteCount,
  } = props;

  const [hideNewsItem] = useMutation(HIDE_NEWS_ITEM_MUTATION, {
    onError() {
      Router.push('/login', `/hide?id=${id}&how=up&goto=news`);
    },
    variables: { id },
  });

  const unhideNewsItem = (): void => undefined;

  return isJobListing ? (
    <div />
  ) : (
    <Typography variant="caption" color="textSecondary">
      <span className="score">{upvoteCount} points</span>
      {' | '}
      {hidden ? (
        <a onClick={(): void => unhideNewsItem()} style={HIDE_BUTTON_STYLE}>
          <VisibilityOff style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
            unhide
        </a>
      ) : (
        <a onClick={(): Promise<any> => hideNewsItem()} style={HIDE_BUTTON_STYLE}>
          <Visibility style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
            hide
        </a>
      )}
      {isPostScrutinyVisible && (
        <span>
          {' | '}
          <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0">
            past
            </a>
          {' | '}
          <a href="https://www.google.com/search?q=Sublime%20Text%203.0">web</a>
        </span>
      )}
      {' | '}
      <Link href={`/item?id=${id}`}>
        <a style={{ color: '#6a7172' }}>
          <ChatBubbleOutline style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
          {commentCount === 0
            ? 'discuss'
            : commentCount === 1
              ? '1 comment'
              : `${commentCount} comments`}
        </a>
      </Link>
      {/* {isFavoriteVisible && ' | favorite'} */}
    </Typography>
  );
}
