import { Tooltip, Typography } from '@material-ui/core';
import { ChatBubbleOutline, Forward } from '@material-ui/icons';
import Link from 'next/link';
import * as React from 'react';
import renderHTML from 'react-render-html';

import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface ICommentProps {
  id: number;
  creationTime: number;
  indentationLevel: number;
  submitterId: string;
  text: string;
}

export const commentFragment = `
  fragment Comment on Comment {
    id
    creationTime
    comments {
      id
      creationTime
      submitterId
      text
    }
    submitterId
    text
  }
`;

export class Comment extends React.Component<ICommentProps> {
  render(): JSX.Element {
    const { id, creationTime, indentationLevel, submitterId, text } = this.props;

    const vote = (): void => {
      return undefined;
    };


    return (
      <tr className="athing comtr " id="15238246">
        <td>
          <table style={{ border: '0' }}>
            <tbody>
              <tr>
                {Array(indentationLevel).fill(0).map((_, index) => 
                  <td className="ind" style={{ borderLeft: '2px solid #d9dbdb' }} key={index}>
                    <img
                      alt=""
                      src="/static/s.gif"
                      height="1"
                      width={20} /* Width varies depending on comment level */
                    />
                  </td>
                )}
                <td className="default">
                  <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
                    <Typography variant="caption" style={{ fontSize: '8pt' }}>
                      {'Posted by '}
                      <Link href="/user?id=mstade">
                        <a style={{ color: '#6a7172' }}>{submitterId}</a>
                      </Link>
                      <span className="age">
                        {' '}
                        <Link href={`/item?id=${id}`}>
                          <a style={{ color: '#6a7172' }}>{convertNumberToTimeAgo(creationTime)}</a>
                        </Link>
                      </span>{' '}
                      <span id="unv_15238246" />
                      {/* <span className="par" />{' '}
                      <a className="togg" id="24" onClick={toggle}>
                        [-]
                      </a> */}
                      <span className="storyon" />
                    </Typography>
                  </div>
                  <br />
                  <div className="comment">
                    <span className="c00">
                      <span><Typography variant="caption">{renderHTML(text)}</Typography></span>
                      <div className="reply" style={{ padding: '6px 0' }}>
                        <Typography variant="caption" color="textSecondary">
                          {/* <a
                            style={{ color: '#6a7172' }}
                            onClick={vote}
                            href={`/vote?id=${id}&how=up&goto=item%3Fid%3D${id}`}
                          >
                            <Forward style={{ marginBottom: -5, fontSize: 20, marginRight: 2, transform: 'rotate(-90deg)', color: '#ff6600' }} />
                            Upvote
                          </a>
                          {' | '} */}
                          <Link href={`/reply?id=${id}&goto=item%3Fid%3D${id}`}>
                            <a style={{ color: '#6a7172' }}>
                              <ChatBubbleOutline style={{ marginBottom: -5, fontSize: 20, marginRight: 2 }} />
                                Reply</a>
                          </Link>
                        </Typography>
                      </div>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}
