import { Fragment } from "react";
import { Create } from "../components/CreateBook";
import { Layout } from "../layout/Layout";

export const CreateBook = () => {
  return (
    <Fragment>
      <Layout>
      <Create />
      </Layout>
    </Fragment>
  );
};
