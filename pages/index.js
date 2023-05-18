import { useState, useEffect, useCallback } from 'react';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  const [gotCookie, setGotCookie] = useState(false);

  useEffect(() => {
    if (loading && !gotCookie) {
      const fetchCookie = async () => {
        await fetch('./api/hello');
        setLoading(false);
        setGotCookie(true);
      };
      fetchCookie();
    }
  }, [loading, gotCookie]);

  const onClickGet = useCallback(() => {
    setLoading(true);
  });

  const onClickRefresh = useCallback(() => {
    document.location.reload();
  });

  return (
    <>
      <ol>
        <li>Click on the "Get cookie" button and verify in the Network tab that we get the <b>Set-Cookie</b> header.</li>
        <li>Verify in the Application tab that we do have the cookie <b>MyCookie</b>.</li>
        <li>Click on the "Verify server cookie" button to refresh the page.</li>
        <li>Verify that we get the cookie in the frontend.</li>
      </ol>
      <br/>
      <button onClick={onClickGet} disabled={gotCookie}>Get cookie</button>
      <br/>
      {gotCookie ? <button onClick={onClickRefresh}>Verify server cookie</button> : null}
      <br/>
      {props.cookies.MyCookie ? <b>Got the cookie: {props.cookies.MyCookie}</b> : <b>No Cookie</b>}
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
