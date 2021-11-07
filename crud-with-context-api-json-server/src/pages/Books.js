import { Fragment } from "react";
import { BookList } from "../components/BookList";
import { Layout } from "../layout/Layout";

export const Books = () => {
  return (
    <Fragment>
      <Layout>
          <BookList />
      </Layout>
    </Fragment>
  );
};
