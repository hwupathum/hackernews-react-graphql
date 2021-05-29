import { useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { ArrowUpward, ChatBubbleOutline, History, Language, Visibility, VisibilityOff } from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import queryString from "query-string";
import { HIDE_NEWS_ITEM_MUTATION } from '../data/mutations/hide-news-item-mutation';
import { UPVOTE_NEWS_ITEM_MUTATION } from '../data/mutations/upvote-news-item-mutation';
import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface INewsDetailProps {
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  id: number;
  title: string
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
    title,
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
            Unhide
        </a>
      ) : (
        <a onClick={(): Promise<any> => hideNewsItem()} style={HIDE_BUTTON_STYLE}>
          <Visibility style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
            Hide
        </a>
      )}
      {isPostScrutinyVisible && (
        <span>
          {' | '}
          <a href={`https://hn.algolia.com/?${queryString.stringify({query: title})}&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0`} style={{ color: '#6a7172' }}>
            <History style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
            Show history
            </a>
          {' | '}
          <a href={`https://www.google.com/search?${queryString.stringify({q: title})}`} style={{ color: '#6a7172' }}>
            <Language style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
            Search web
            </a>
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
