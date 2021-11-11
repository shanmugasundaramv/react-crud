import { Fragment } from "react";
import Login from "../../components/user/Login";
import { Layout } from "../../layout/Layout";

export const Signin = () => {
  return (
    <Fragment>
      <Layout>
          <Login />
      </Layout>
    </Fragment>
  );
};
