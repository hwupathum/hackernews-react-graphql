import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/client';
import renderHTML from 'react-render-html';

import { commentFragment } from '../src/components/comment';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { convertNumberToTimeAgo } from '../src/helpers/convert-number-to-time-ago';

const query = gql`
  query Comment($id: Int!) {
    comment(id: $id) {
      id
      ...Comment
    }
  }
  ${commentFragment}
`;

export interface IReplyPageProps {
  router;
  me?: boolean
}

function ReplyPage(props: IReplyPageProps): JSX.Element {
  const { router, me = false } = props;

  const { data } = useQuery(query, {
    variables: { id: (router.query && +router.query.id) || 0 },
  });

  const vote = (): void => {
    console.log('onclick');
  };

  const toggle = (): void => {
    console.log('toggle');
  };

  if (!data) return <div />

  return (
    <MainLayout title="Add Comment" currentUrl={router.pathname} isNavVisible={false}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="caption" color="textSecondary">
            <span className="comhead">
              <a href="user?id=philipkglass" className="hnuser">
                {data.comment.submitterId}
              </a>
              {" "}
              <span className="age">
                {convertNumberToTimeAgo(data.comment.creationTime)}
              </span>
            </span>
          </Typography>
          <br />
          <Typography variant="caption">
            {renderHTML(data.comment.text)}
          </Typography>
          <form method="post" action="comment">
            <input type="hidden" name="parent" value="15260438" />
            <input type="hidden" name="goto" value="item?id=15260384#15260438" />  
            {/* todo: ok */}
            <TextField
              name="text" rows={me ? 6 : 1}
              multiline fullWidth
              variant="outlined"
              disabled={!me}
              placeholder={me ? "Add comment" : "Log in or sign up to leave a comment"}
            />
            <br />
            <br />
            {me && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant='contained' color='primary' style={{ fontWeight: 600, color: 'white' }}>Reply</Button>
            </div>}
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default withDataAndRouter(ReplyPage);
