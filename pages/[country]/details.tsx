import Link from "next/link";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useTranslation } from "next-i18next";

import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { useRouter } from "next/router";
import { serverSideTranslations } from "i18n/server-side-translations";

type Props = {
  // Add custom props here
};

const SecondPage = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation(["common", "second-page"]);

  const router = useRouter();

  const country = router.query.country;
  const locale = router.locale;

  return (
    <>
      <main>
        <h1> {"accessing de/de/details will not work"} </h1>
        <h1> {"accessing en/en/details will not work"} </h1>
        <Link href="/">
          <button type="button">{t("second-page:back-to-home")}</button>
        </Link>

        <Link href="/de/de/details">
          <button type="button">{"/de/de/details"}</button>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "second-page",
      "footer",
    ])),
  },
});

export default SecondPage;
