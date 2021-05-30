import { useQuery } from '@apollo/client';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, FormControl, IconButton, InputLabel, Modal, Popover, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import { FilterVintage, Help } from '@material-ui/icons';
import gql from 'graphql-tag';
import Link from 'next/link';
import * as React from 'react';
import renderHTML from 'react-render-html';

import { convertNumberToTimeAgo } from '../src/helpers/convert-number-to-time-ago';
import { withDataAndRouter } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';
import { MainLayout } from '../src/layouts/main-layout';

const query = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      about
      creationTime
      email
      karma
    }
    me {
      id
    }
  }
`;

export interface IUserPageProps {
  router;
}

export interface IUserPageQuery {
  loading;
  error;
  user;
  me;
}

function UserPage(props: IUserPageProps): JSX.Element {
  const { router } = props;

  const userId = (router.query && router.query.id) || '';

  const { data } = useQuery<IUserPageQuery>(query, { variables: { id: userId } });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (data?.error) {
    return <BlankLayout>Error loading news items.</BlankLayout>;
  }
  if (!data?.user) {
    return <BlankLayout>No such user.</BlankLayout>;
  }

  let about = data?.user?.about || '';
  let email = data?.user?.email || '';

  const onAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    about = e.target.value;
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    email = e.target.value;
  };

  if (data?.me && data?.user.id === data.me.id)
  return (
    <MainLayout currentUrl={router.pathname}>
      <Card variant="outlined" style={{ margin: 'auto', marginTop: 10, maxWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: '#ff6600' }}>
              {data?.user.id.substring(0, 1).toUpperCase()}
            </Avatar>
          }
          title={data?.user.id}
          subheader={`Created ${convertNumberToTimeAgo(data?.user.creationTime)}`}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
          <Tooltip title="Karma">
            <Typography variant="caption" color="textSecondary">
              <FilterVintage fontSize="small" color="primary" style={{ marginBottom: -5, padding: '0 2px' }} />
              {data?.user.karma}

            </Typography>
          </Tooltip>
        </div>
        <Divider />
        <CardContent>
          <form className="profileform" method="post" action="/xuser">
            <input type="hidden" name="id" value="clintonwoo" />
            <input type="hidden" name="hmac" value="71104445c3c41b4167c38db67a656e610d5fbad9" />
            <TextField
              defaultValue={renderHTML(about)}
              name="about"
              onChange={onAboutChange}
              rows={5}
              multiline
              fullWidth
              label="About"
              variant="outlined"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleClick}>
                <Help />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                
              >
                <CardContent style={{maxWidth: 400}}>
                  <Typography variant="caption">
                Blank lines separate paragraphs.
                      <p>
                  Text after a blank line that is indented by two or more spaces is reproduced
                  verbatim. (This is intended for code.)
                      </p>
                <p>
                  Text surrounded by asterisks is italicized, if the character after the first
                  asterisk isn&#39;t whitespace.
                      </p>
                <p>
                  Urls become links, except in the text field of a submission.
                </p>

                  </Typography>

                </CardContent>
              </Popover>
            </div>
            <div style={{ height: 12 }} />
            <TextField
              type="text"
              name="uemail"
              defaultValue={email}
              onChange={onEmailChange}
              fullWidth
              label="Email"
              variant="outlined"
            />
            <div style={{ height: 12 }} />
            <FormControl style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-label">Show Dead</InputLabel>
              <Select variant="outlined" fullWidth defaultValue="no" name="showd" id="demo-simple-select-label">
                <option value="yes">yes</option>
                <option value="no">no</option>
              </Select>
            </FormControl>
            <div style={{ height: 12 }} />
            <FormControl style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-label">No Procreastinate</InputLabel>
              <Select variant="outlined" fullWidth defaultValue="no" name="nopro" id="demo-simple-select-label">
                <option value="yes">yes</option>
                <option value="no">no</option>
              </Select>
            </FormControl>
            <div style={{ height: 12 }} />
            <TextField
              fullWidth
              label="Maxvisit"
              variant="outlined" type="text" name="maxv" defaultValue="20" />
            <div style={{ height: 12 }} />
            <TextField
              fullWidth
              label="MinAway"
              variant="outlined" type="text" name="mina" defaultValue="180" />
            <div style={{ height: 12 }} />
            <TextField
              fullWidth
              label="Delay"
              variant="outlined"
              type="text" name="delay" defaultValue="0" />
            <div style={{ height: 12 }} />
            <Button type="submit" color="primary" variant="contained" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>Update</Button>
          </form>
        </CardContent>
        <Divider />
        <CardActions style={{ display: 'block' }}>
          <Link href={`/submitted?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              submissions
              </Button>
          </Link>
          <Link href={`/threads?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              comments
              </Button>
          </Link>
          <Link href={`/favorites?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              favourites
              </Button>
          </Link>
          <Link href={"/hidden"}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              hidden
              </Button>
          </Link>
          <Link href={`/upvoted?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              upvoted submissions
              </Button>
          </Link>
          <Link href={`/upvoted?id=${data?.user.id}&comments=t`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              upvoted comments
              </Button>
          </Link>
          <Link href={`/submitted?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              submissions
              </Button>
          </Link>
        </CardActions>
      </Card>
    </MainLayout >
  );

  return (
    <MainLayout currentUrl={router.pathname}>
      <Card variant="outlined" style={{ maxWidth: 600, margin: 'auto', marginTop: 10 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: '#ff6600' }}>
              {data?.user.id.substring(0, 1).toUpperCase()}
            </Avatar>
          }
          title={data?.user.id}
          subheader={`Created ${convertNumberToTimeAgo(data?.user.creationTime)}`}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
          <Tooltip title="Karma">
            <Typography variant="caption" color="textSecondary">
              <FilterVintage fontSize="small" color="primary" style={{ marginBottom: -5, padding: '0 2px' }} />
              {data?.user.karma}

            </Typography>
          </Tooltip>
        </div>
        <Divider />
        <CardContent>
          <Typography variant="body2">
            {data?.user.about && renderHTML(data?.user.about)}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions style={{ display: 'block' }}>
          <Link href={`submitted?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              submissions
              </Button>
          </Link>
          <Link href={`threads?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              comments
              </Button>
          </Link>
          <Link href={`favorites?id=${data?.user.id}`}>
            <Button size="small" color="primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              favourites
              </Button>
          </Link>
        </CardActions>
      </Card>
    </MainLayout>
  );
}

export default withDataAndRouter(UserPage);
