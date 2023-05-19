import { useState, useEffect, useCallback } from 'react';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  const [gotCookie, setGotCookie] = useState(!!props.cookies.MyCookie);

  useEffect(() => {
    if (loading && !gotCookie) {
      const fetchCookie = async () => {
        await fetch('./api/hello');
        setLoading(false);
        setGotCookie(true);
        document.location.reload();
      };
      fetchCookie();
    }
  }, [loading, gotCookie]);

  const onClickGet = useCallback(() => {
    setLoading(true);
  });

  const onClickDelete = useCallback(() => {
    document.cookie = 'MyCookie=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.location.reload();
  });

  return (
    <>
      <ol>
        <li>Click on the "Get cookie" button and verify in the Network tab that we get the <b>Set-Cookie</b> header from the request to <b>"/api/hello"</b>.</li>
        <li>Verify in the Application tab that we do have the cookie <b>MyCookie</b>.</li>
        <li>Verify that we get the cookie coming from the backend.</li>
      </ol>
      <br/>
      <button onClick={onClickGet} disabled={loading || gotCookie}>{loading ? "Loading..." : "Get cookie" }</button>
      <br/>
      {gotCookie ? <button onClick={onClickDelete}>Delete cookie</button> : null}
      <br/>
      {props.cookies.MyCookie ? <b>Got the cookie from the backend: {props.cookies.MyCookie}</b> : <b>No Cookie</b>}
    </>
  )
}

export const getServerSideProps = (ctx) => {
  const { req } = ctx;
  return {
    props: {
      cookies: req.cookies
    }
  }
}
