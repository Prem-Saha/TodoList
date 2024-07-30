import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Todo List App</title>
    </Head>
    <div className="layout-primary">
      <div className="container-primary">
        {children}
      </div>
    </div>
  </>
);

export default Layout;
