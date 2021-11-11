import { Fragment } from "react";
import Register from "../../components/user/Register";
import { Layout } from "../../layout/Layout";

export const Signup = () => {
  return (
    <Fragment>
      <Layout>
          <Register />
      </Layout>
    </Fragment>
  );
};
